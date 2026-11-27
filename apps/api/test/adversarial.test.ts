import { describe, it } from "node:test";
import assert from "node:assert";
import request from "supertest";
import { createApp } from "../src/app.js";

describe("Nevrora Works Adversarial & Compliance Test Suite", () => {
  const app = createApp();

  let ipCounter = 1;
  const nextIp = () => `192.168.10.${ipCounter++}`;

  describe("Adversarial: Internal Draft Concealment (NW-FR-03, NW-FR-11)", () => {
    it("GET /api/products strictly omits internal_draft items", async () => {
      const res = await request(app).get("/api/products");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);

      const jsonStr = JSON.stringify(res.body.data).toLowerCase();
      assert.strictEqual(
        jsonStr.includes("internal-draft-sandbox"),
        false,
        "Payload must not expose internal_draft product",
      );

      for (const p of res.body.data) {
        assert.strictEqual(p.published, true);
        assert.notStrictEqual(p.lifecycle_status, "internal_draft");
      }
    });

    it("GET /api/products/internal-draft-sandbox strictly returns 404", async () => {
      const res = await request(app).get(
        "/api/products/internal-draft-sandbox",
      );
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });

    it("GET /api/products?status=internal_draft returns empty array and never leaks drafts", async () => {
      const res = await request(app).get("/api/products?status=internal_draft");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.data.length, 0);
    });

    it("All 3 Coming Soon portfolio products return 200 with full Section 7 & 8 schema", async () => {
      for (const slug of [
        "sadhana-daily",
        "neermiti-collections",
        "driveiq",
      ]) {
        const res = await request(app).get(`/api/products/${slug}`);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.success, true);
        assert.strictEqual(res.body.data.slug, slug);
        assert.strictEqual(res.body.data.lifecycle_status, "coming_soon");
        assert.strictEqual(res.body.data.published, true);
        assert.ok(res.body.data.tagline);
        assert.ok(res.body.data.problemSolved);
        assert.ok(res.body.data.statusNotice);
        assert.ok(Array.isArray(res.body.data.platforms));
        assert.ok(Array.isArray(res.body.data.structuredFeatures));
        assert.ok(Array.isArray(res.body.data.mediaGallery));
        assert.ok(Array.isArray(res.body.data.faqs));
        assert.strictEqual(
          res.body.data.support.supportEmail,
          "support@nevrora-works.com",
        );
      }
    });
  });

  describe("Adversarial: Contact Form Zod Validation & Rate Limiting", () => {
    const validBase = {
      name: "Challenger Oracle",
      email: "challenger@example.com",
      organization: "Quality Lab",
      productSlug: "sadhana-daily",
      type: "Product early access / Notify me",
      message:
        "This is an adversarial stress test message with sufficient length.",
    };

    it("Rejects message with 19 characters with HTTP 400", async () => {
      const res = await request(app)
        .post("/api/contact")
        .set("X-Forwarded-For", nextIp())
        .send({
          ...validBase,
          message: "1234567890123456789",
        });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
    });

    it("Accepts message with 20 characters and routes fallback to support@nevrora-works.com", async () => {
      delete process.env.GOOGLE_SHEET_WEBHOOK_URL;
      const res = await request(app)
        .post("/api/contact")
        .set("X-Forwarded-For", nextIp())
        .send({
          ...validBase,
          message: "12345678901234567890",
        });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(
        res.body.mailtoFallback.startsWith("mailto:support@nevrora-works.com"),
      );
    });

    it("Enforces 10 req/15min limit and returns HTTP 429 on 11th burst", async () => {
      delete process.env.GOOGLE_SHEET_WEBHOOK_URL;
      const burstIp = "10.88.88.88";

      for (let i = 1; i <= 10; i++) {
        const res = await request(app)
          .post("/api/contact")
          .set("X-Forwarded-For", burstIp)
          .send(validBase);
        assert.strictEqual(res.status, 200);
      }

      const burstRes = await request(app)
        .post("/api/contact")
        .set("X-Forwarded-For", burstIp)
        .send(validBase);

      assert.strictEqual(burstRes.status, 429);
      assert.strictEqual(burstRes.body.success, false);
    });
  });

  describe("Adversarial: B2B Isolation & Negative Routes", () => {
    it("Strictly blocks B2B /api/services and /ventures with 404", async () => {
      for (const path of [
        "/api/services",
        "/api/services/custom-software-development",
        "/ventures",
        "/api/ventures",
      ]) {
        const res = await request(app).get(path);
        assert.strictEqual(res.status, 404, `Path ${path} must return 404`);
        assert.strictEqual(res.body.success, false);
      }
    });
  });
});
