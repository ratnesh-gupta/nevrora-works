import { describe, it } from "node:test";
import assert from "node:assert";
import request from "supertest";
import { createApp } from "../src/app.js";

describe("Nevrora Works API Test Suite", () => {
  const app = createApp();

  describe("GET /health", () => {
    it("should return status ok and ISO timestamp", async () => {
      const res = await request(app).get("/health");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.status, "ok");
      assert.ok(typeof res.body.timestamp === "string");
      assert.ok(!isNaN(Date.parse(res.body.timestamp)));
    });
  });

  describe("Security Headers & CORS", () => {
    it("should include security headers from Helmet", async () => {
      const res = await request(app).get("/health");
      assert.strictEqual(res.headers["x-content-type-options"], "nosniff");
      assert.ok(res.headers["content-security-policy"]);
    });

    it("should return appropriate CORS headers for allowed origins", async () => {
      const res = await request(app)
        .get("/health")
        .set("Origin", "http://localhost:3000");
      assert.strictEqual(
        res.headers["access-control-allow-origin"],
        "http://localhost:3000",
      );
      assert.strictEqual(
        res.headers["access-control-allow-credentials"],
        "true",
      );
    });
  });

  describe("GET /api/products (NW-FR-01, NW-FR-03, NW-FR-11)", () => {
    it("should return published coming_soon products and strictly exclude internal_draft", async () => {
      const res = await request(app).get("/api/products");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(Array.isArray(res.body.data));
      assert.strictEqual(res.body.data.length, 3);

      const slugs = res.body.data.map((p: { slug: string }) => p.slug);
      assert.ok(slugs.includes("sadhana-daily"));
      assert.ok(slugs.includes("neermiti-collections"));
      assert.ok(slugs.includes("driveiq"));

      assert.strictEqual(
        slugs.includes("internal-draft-sandbox"),
        false,
        "internal-draft-sandbox must be concealed from public products listing",
      );

      for (const product of res.body.data) {
        assert.strictEqual(product.published, true);
        assert.strictEqual(product.lifecycle_status, "coming_soon");
        assert.ok(Array.isArray(product.platforms));
        assert.ok(Array.isArray(product.structuredFeatures));
        assert.ok(Array.isArray(product.mediaGallery));
        assert.ok(Array.isArray(product.faqs));
        assert.strictEqual(
          product.support.supportEmail,
          "support@nevrora-works.com",
        );
      }
    });

    it("should support filtering by category and platform", async () => {
      const res = await request(app).get(
        "/api/products?platform=saas&status=coming_soon",
      );
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.data.length, 1);
      assert.strictEqual(res.body.data[0].slug, "driveiq");
    });

    it("should return details for published product sadhana-daily", async () => {
      const res = await request(app).get("/api/products/sadhana-daily");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.slug, "sadhana-daily");
      assert.strictEqual(res.body.data.lifecycle_status, "coming_soon");
    });

    it("should return 404 for internal_draft product internal-draft-sandbox", async () => {
      const res = await request(app).get(
        "/api/products/internal-draft-sandbox",
      );
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });

    it("should return 404 for unknown product", async () => {
      const res = await request(app).get("/api/products/unknown-product");
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });
  });

  describe("GET /api/support & GET /api/announcements (NW-FR-06, NW-FR-08)", () => {
    it("should return support routing directory for published products", async () => {
      const res = await request(app).get("/api/support");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(
        res.body.data.generalSupportEmail,
        "support@nevrora-works.com",
      );
      assert.strictEqual(res.body.data.products.length, 3);
    });

    it("should return published announcements only", async () => {
      const res = await request(app).get("/api/announcements");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.length, 3);
      for (const ann of res.body.data) {
        assert.strictEqual(ann.status, "published");
      }
    });
  });

  describe("GET /api/company", () => {
    it("should return Nevrora Works identity and statutory corporate details", async () => {
      const res = await request(app).get("/api/company");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.name, "Nevrora Works");
      assert.strictEqual(res.body.data.tagline, "Ideas into products.");
      assert.strictEqual(
        res.body.data.legalName,
        "Nevrora Technologies Private Limited",
      );
      assert.strictEqual(res.body.data.cin, "U72900KA2024PTC189000");
      assert.strictEqual(
        res.body.data.supportEmail,
        "support@nevrora-works.com",
      );
      assert.strictEqual(
        res.body.data.grievanceContact.email,
        "support@nevrora-works.com",
      );
    });
  });

  describe("POST /api/contact", () => {
    const validPayload = {
      name: "Aditi Sharma",
      email: "aditi.sharma@example.com",
      organization: "Sunrise Studio",
      productSlug: "sadhana-daily",
      type: "Product early access / Notify me",
      message:
        "Please notify me as soon as Sadhana Daily opens its Google Play preview.",
    };

    it("should accept valid submission and return mailto fallback to support@nevrora-works.com", async () => {
      delete process.env.GOOGLE_SHEET_WEBHOOK_URL;

      const res = await request(app).post("/api/contact").send(validPayload);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.forwardedToSheets, false);
      assert.ok(typeof res.body.mailtoFallback === "string");
      assert.ok(
        res.body.mailtoFallback.startsWith(
          "mailto:support@nevrora-works.com?subject=",
        ),
      );
      assert.ok(res.body.mailtoFallback.includes("Aditi%20Sharma"));
    });

    it("should reject message shorter than 20 characters with HTTP 400", async () => {
      const res = await request(app)
        .post("/api/contact")
        .send({
          ...validPayload,
          message: "Short msg",
        });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.error, "Validation failed");
    });

    it("should reject invalid email format with HTTP 400", async () => {
      const res = await request(app)
        .post("/api/contact")
        .send({
          ...validPayload,
          email: "invalid-email-address",
        });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
    });

    it("should reject invalid inquiry category with HTTP 400", async () => {
      const res = await request(app)
        .post("/api/contact")
        .send({
          ...validPayload,
          type: "Invalid Category Here",
        });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
    });
  });

  describe("Negative Constraints & B2B Isolation (Section 3 & 11)", () => {
    it("should return 404 for B2B /api/services endpoint", async () => {
      const res = await request(app).get("/api/services");
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });

    it("should return 404 for forbidden /ventures route", async () => {
      const res = await request(app).get("/ventures");
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });
  });
});
