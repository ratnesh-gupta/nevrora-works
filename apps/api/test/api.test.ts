import { describe, it, before, afterEach } from "node:test";
import assert from "node:assert";
import request from "supertest";
import { createApp } from "../src/app.js";
import { INQUIRY_TYPES } from "@nevrora/config";

describe("Nevrora API Test Suite", () => {
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

  describe("GET /api/services", () => {
    it("should return all 6 published services", async () => {
      const res = await request(app).get("/api/services");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(Array.isArray(res.body.data));
      assert.strictEqual(res.body.data.length, 6);

      // Verify all services are published
      for (const service of res.body.data) {
        assert.strictEqual(service.published, true);
        assert.ok(service.slug);
        assert.ok(service.title);
        assert.ok(service.statement);
        assert.ok(Array.isArray(service.problems));
        assert.ok(Array.isArray(service.capabilities));
        assert.ok(Array.isArray(service.deliverables));
        assert.ok(Array.isArray(service.processSteps));
        assert.ok(service.processSteps.length > 0);
        assert.ok(Array.isArray(service.techBadges));
        assert.ok(service.techBadges.length > 0);
      }
    });

    it("should return specific service details by slug", async () => {
      const res = await request(app).get(
        "/api/services/ai-intelligent-automation",
      );
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.slug, "ai-intelligent-automation");
      assert.strictEqual(res.body.data.number, "01");
      assert.strictEqual(res.body.data.title, "AI & Intelligent Automation");
      assert.strictEqual(res.body.data.processSteps.length, 4);
    });

    it("should return 404 for non-existent service slug", async () => {
      const res = await request(app).get(
        "/api/services/non-existent-service-slug",
      );
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.error);
    });
  });

  describe("GET /api/products (Concealment of DriveIQ)", () => {
    it("should return ONLY published products and strictly exclude driveiq", async () => {
      const res = await request(app).get("/api/products");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(Array.isArray(res.body.data));

      const slugs = res.body.data.map((p: { slug: string }) => p.slug);
      assert.ok(slugs.includes("neermiti-collections"));
      assert.ok(slugs.includes("sadhana-daily"));

      // STRICT INTEGRITY CHECK: driveiq must NEVER appear in products list
      assert.strictEqual(
        slugs.includes("driveiq"),
        false,
        "driveiq must be concealed from public products listing",
      );

      // Verify all returned products have published === true
      for (const product of res.body.data) {
        assert.strictEqual(product.published, true);
      }
    });

    it("should return details for published product neermiti-collections", async () => {
      const res = await request(app).get("/api/products/neermiti-collections");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.slug, "neermiti-collections");
      assert.strictEqual(res.body.data.published, true);
    });

    it("should return details for published product sadhana-daily", async () => {
      const res = await request(app).get("/api/products/sadhana-daily");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.slug, "sadhana-daily");
      assert.strictEqual(res.body.data.published, true);
    });

    it("should return 404 for unpublished product driveiq", async () => {
      // STRICT NEGATIVE CONSTRAINT: Direct query for driveiq must return 404
      const res = await request(app).get("/api/products/driveiq");
      assert.strictEqual(
        res.status,
        404,
        "driveiq must return 404 because published: false",
      );
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.error);
    });

    it("should return 404 for unknown product", async () => {
      const res = await request(app).get("/api/products/unknown-product");
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });
  });

  describe("GET /api/company", () => {
    it("should return statutory corporate details conforming to Companies Act Rule 26", async () => {
      const res = await request(app).get("/api/company");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(
        res.body.data.legalName,
        "Nevrora Technologies Private Limited",
      );
      assert.strictEqual(res.body.data.cin, "U72900KA2024PTC189000");
      assert.strictEqual(
        res.body.data.registeredOffice,
        "Bengaluru, Karnataka, India",
      );
      assert.strictEqual(
        res.body.data.grievanceContact.name,
        "Ratnesh Kumar Gupta",
      );
      assert.strictEqual(
        res.body.data.grievanceContact.email,
        "ratnesh.k.gupta@icloud.com",
      );
    });
  });

  describe("POST /api/contact", () => {
    const validPayload = {
      name: "Aditi Sharma",
      email: "aditi.sharma@example.com",
      organization: "Acme Enterprises",
      type: "Venture idea",
      message:
        "We are exploring an enterprise AI transformation project and would like to collaborate with Nevrora.",
    };

    it("should accept valid submission and return mailto fallback when no webhook is set", async () => {
      delete process.env.GOOGLE_SHEET_WEBHOOK_URL;

      const res = await request(app).post("/api/contact").send(validPayload);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.forwardedToSheets, false);
      assert.ok(typeof res.body.mailtoFallback === "string");
      assert.ok(
        res.body.mailtoFallback.startsWith(
          "mailto:ratnesh.k.gupta@icloud.com?subject=",
        ),
      );
      assert.ok(res.body.mailtoFallback.includes("Aditi%20Sharma"));
    });

    it("should reject message shorter than 20 characters with HTTP 400", async () => {
      const res = await request(app)
        .post("/api/contact")
        .send({
          ...validPayload,
          message: "Short msg", // 9 chars, less than 20
        });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.error, "Validation failed");
      assert.ok(res.body.details);
      assert.ok(res.body.details.fieldErrors.message);
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
      assert.ok(res.body.details.fieldErrors.email);
    });

    it("should reject name shorter than 2 characters with HTTP 400", async () => {
      const res = await request(app)
        .post("/api/contact")
        .send({
          ...validPayload,
          name: "A",
        });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.details.fieldErrors.name);
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
      assert.ok(res.body.details.fieldErrors.type);
    });

    it("should accept submission without optional organization field", async () => {
      const payloadWithoutOrg = {
        name: "Vikram Mehta",
        email: "vikram@example.org",
        type: "Strategic partnership",
        message:
          "Interested in exploring strategic partnership opportunities for digital product engineering.",
      };

      const res = await request(app)
        .post("/api/contact")
        .send(payloadWithoutOrg);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(res.body.mailtoFallback);
    });

    it("should forward to Google Sheets webhook when configured and successful", async () => {
      // Mock global fetch
      const originalFetch = globalThis.fetch;
      let webhookCalled = false;
      let capturedBody = "";

      globalThis.fetch = (async (
        url: string | URL | Request,
        init?: RequestInit,
      ) => {
        webhookCalled = true;
        capturedBody = init?.body as string;
        return new Response(JSON.stringify({ result: "success" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }) as typeof fetch;

      process.env.GOOGLE_SHEET_WEBHOOK_URL =
        "https://script.google.com/macros/s/test-webhook/exec";

      try {
        const res = await request(app).post("/api/contact").send(validPayload);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.success, true);
        assert.strictEqual(res.body.forwardedToSheets, true);
        assert.strictEqual(webhookCalled, true);
        assert.ok(capturedBody.includes("Aditi Sharma"));
      } finally {
        globalThis.fetch = originalFetch;
        delete process.env.GOOGLE_SHEET_WEBHOOK_URL;
      }
    });

    it("should fallback cleanly to mailto if Google Sheets webhook responds with error", async () => {
      const originalFetch = globalThis.fetch;

      globalThis.fetch = (async () => {
        return new Response("Internal Server Error", { status: 500 });
      }) as typeof fetch;

      process.env.GOOGLE_SHEET_WEBHOOK_URL =
        "https://script.google.com/macros/s/failing-webhook/exec";

      try {
        const res = await request(app).post("/api/contact").send(validPayload);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.success, true);
        assert.strictEqual(res.body.forwardedToSheets, false);
        assert.ok(res.body.mailtoFallback);
      } finally {
        globalThis.fetch = originalFetch;
        delete process.env.GOOGLE_SHEET_WEBHOOK_URL;
      }
    });
  });

  describe("Negative Constraints & 404 Handlers", () => {
    it("should return 404 for forbidden /ventures route", async () => {
      const res = await request(app).get("/ventures");
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });

    it("should return 404 for arbitrary unmapped routes", async () => {
      const res = await request(app).get("/api/does-not-exist");
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });
  });
});
