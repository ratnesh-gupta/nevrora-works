import { describe, it } from "node:test";
import assert from "node:assert";
import request from "supertest";
import { createApp } from "../src/app.js";

describe("Empirical Challenger Adversarial Test Suite", () => {
  const app = createApp();

  // Helper to ensure each test case has a distinct client IP
  let ipCounter = 1;
  const nextIp = () => `192.168.10.${ipCounter++}`;

  // =========================================================================
  // 1. PRODUCT CONCEALMENT (driveiq negative constraints)
  // =========================================================================
  describe("Adversarial: Product Concealment (driveiq)", () => {
    it("GET /api/products strictly omits driveiq in all shapes and forms", async () => {
      const res = await request(app).get("/api/products");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(Array.isArray(res.body.data));

      const jsonStr = JSON.stringify(res.body.data).toLowerCase();
      assert.strictEqual(
        jsonStr.includes("driveiq"),
        false,
        "Payload must not mention driveiq anywhere",
      );

      for (const p of res.body.data) {
        assert.strictEqual(
          p.published,
          true,
          `Product ${p.slug} must have published: true`,
        );
        assert.notStrictEqual(p.slug, "driveiq");
      }
    });

    it("GET /api/products/driveiq strictly returns 404", async () => {
      const res = await request(app).get("/api/products/driveiq");
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.error, "Product 'driveiq' not found");
    });

    it("GET /api/products/DriveIQ (casing variance) returns 404", async () => {
      const res = await request(app).get("/api/products/DriveIQ");
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });

    it("GET /api/products/%64%72%69%76%65%69%71 (URL encoded) returns 404", async () => {
      const res = await request(app).get("/api/products/%64%72%69%76%65%69%71");
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });

    it("GET /api/products?includeUnpublished=true does not bypass filter", async () => {
      const res = await request(app).get(
        "/api/products?includeUnpublished=true&published=false",
      );
      assert.strictEqual(res.status, 200);
      const jsonStr = JSON.stringify(res.body.data).toLowerCase();
      assert.strictEqual(jsonStr.includes("driveiq"), false);
    });

    it("Published products neermiti-collections and sadhana-daily return 200 with full schema", async () => {
      for (const slug of ["neermiti-collections", "sadhana-daily"]) {
        const res = await request(app).get(`/api/products/${slug}`);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.success, true);
        assert.strictEqual(res.body.data.slug, slug);
        assert.strictEqual(res.body.data.published, true);
        assert.ok(res.body.data.title);
        assert.ok(res.body.data.summary);
        assert.ok(res.body.data.overview);
        assert.ok(res.body.data.audience);
        assert.ok(res.body.data.valueProposition);
        assert.ok(
          Array.isArray(res.body.data.features) &&
            res.body.data.features.length > 0,
        );
        assert.ok(res.body.data.privacySlug);
      }
    });
  });

  // =========================================================================
  // 2. CONTACT ZOD VALIDATION STRESS TESTS
  // =========================================================================
  describe("Adversarial: Contact Form Zod Validation", () => {
    const validBase = {
      name: "Challenger Oracle",
      email: "challenger@example.com",
      organization: "Empirical Quality Lab",
      type: "Venture idea",
      message:
        "This is an empirical challenger stress test message with sufficient length.",
    };

    it("Rejects message with exactly 19 characters with HTTP 400", async () => {
      const res = await request(app)
        .post("/api/contact")
        .set("X-Forwarded-For", nextIp())
        .send({
          ...validBase,
          message: "1234567890123456789", // 19 chars
        });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.error, "Validation failed");
      assert.ok(res.body.details.fieldErrors.message);
      assert.ok(
        res.body.details.fieldErrors.message[0].includes("at least 20"),
      );
    });

    it("Accepts message with exactly 20 characters with HTTP 200", async () => {
      delete process.env.GOOGLE_SHEET_WEBHOOK_URL;
      const res = await request(app)
        .post("/api/contact")
        .set("X-Forwarded-For", nextIp())
        .send({
          ...validBase,
          message: "12345678901234567890", // exactly 20 chars
        });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
    });

    it("Rejects whitespace-only message (30 spaces trimmed to 0) with HTTP 400", async () => {
      const res = await request(app)
        .post("/api/contact")
        .set("X-Forwarded-For", nextIp())
        .send({
          ...validBase,
          message: "                              ", // 30 spaces
        });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.details.fieldErrors.message);
    });

    it("Rejects whitespace-padded message that is < 20 chars after trim", async () => {
      const res = await request(app)
        .post("/api/contact")
        .set("X-Forwarded-For", nextIp())
        .send({
          ...validBase,
          message: "   short text   ", // 10 chars after trim
        });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.details.fieldErrors.message);
    });

    it("Rejects invalid emails (missing domain, missing @, malformed syntax)", async () => {
      const invalidEmails = [
        "notanemail",
        "user@",
        "@domain.com",
        "user@domain..com",
        "user space@domain.com",
        "",
      ];
      for (const email of invalidEmails) {
        const res = await request(app)
          .post("/api/contact")
          .set("X-Forwarded-For", nextIp())
          .send({ ...validBase, email });
        assert.strictEqual(
          res.status,
          400,
          `Email '${email}' should be rejected with 400`,
        );
        assert.strictEqual(res.body.success, false);
        assert.ok(res.body.details.fieldErrors.email);
      }
    });

    it("Rejects invalid inquiry categories not in INQUIRY_TYPES", async () => {
      const invalidTypes = [
        "Random Inquiry",
        "Support",
        "Hacking",
        "",
        "venture idea",
        "Strategic Partnership",
      ];
      for (const type of invalidTypes) {
        const res = await request(app)
          .post("/api/contact")
          .set("X-Forwarded-For", nextIp())
          .send({ ...validBase, type });
        assert.strictEqual(
          res.status,
          400,
          `Type '${type}' should be rejected with 400`,
        );
        assert.strictEqual(res.body.success, false);
        assert.ok(res.body.details.fieldErrors.type);
      }
    });

    it("Rejects short name (< 2 characters) or whitespace name", async () => {
      const invalidNames = ["", "A", "   ", " B "];
      for (const name of invalidNames) {
        const res = await request(app)
          .post("/api/contact")
          .set("X-Forwarded-For", nextIp())
          .send({ ...validBase, name });
        assert.strictEqual(
          res.status,
          400,
          `Name '${name}' should be rejected with 400`,
        );
        assert.strictEqual(res.body.success, false);
        assert.ok(res.body.details.fieldErrors.name);
      }
    });

    it("Rejects missing required fields entirely", async () => {
      const res = await request(app)
        .post("/api/contact")
        .set("X-Forwarded-For", nextIp())
        .send({});
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.details.fieldErrors.name);
      assert.ok(res.body.details.fieldErrors.email);
      assert.ok(res.body.details.fieldErrors.type);
      assert.ok(res.body.details.fieldErrors.message);
    });

    it("Rejects malformed JSON syntax with HTTP 400 via errorHandler", async () => {
      const res = await request(app)
        .post("/api/contact")
        .set("X-Forwarded-For", nextIp())
        .set("Content-Type", "application/json")
        .send('{"name": "Bad JSON", broken');
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.error);
    });

    it("Rejects payload exceeding 100kb body limit with HTTP 413", async () => {
      const hugeMessage = "A".repeat(1024 * 110); // 110KB
      const res = await request(app)
        .post("/api/contact")
        .set("X-Forwarded-For", nextIp())
        .send({ ...validBase, message: hugeMessage });
      assert.strictEqual(res.status, 413);
      assert.strictEqual(res.body.success, false);
    });
  });

  // =========================================================================
  // 3. GOOGLE SHEETS WEBHOOK & MAILTO FALLBACK
  // =========================================================================
  describe("Adversarial: Webhook Handling & Mailto Fallback", () => {
    const validPayload = {
      name: "Rohit Verma",
      email: "rohit@verma.co",
      organization: "Verma Dynamics",
      type: "Business collaboration",
      message:
        "Looking for cloud architecture and microservices consulting for our fintech platform.",
    };

    it("Generates comprehensive, correctly encoded mailto link when webhook is absent", async () => {
      delete process.env.GOOGLE_SHEET_WEBHOOK_URL;
      const res = await request(app)
        .post("/api/contact")
        .set("X-Forwarded-For", nextIp())
        .send(validPayload);
      assert.strictEqual(
        res.status,
        200,
        `Expected 200 but got ${res.status}: ${JSON.stringify(res.body)}`,
      );
      assert.strictEqual(res.body.forwardedToSheets, false);
      assert.ok(res.body.mailtoFallback);

      const mailtoUrl = new URL(res.body.mailtoFallback);
      assert.strictEqual(mailtoUrl.protocol, "mailto:");
      assert.strictEqual(mailtoUrl.pathname, "ratnesh.k.gupta@icloud.com");

      const subject = mailtoUrl.searchParams.get("subject");
      assert.strictEqual(
        subject,
        "[Nevrora Inquiry] Business collaboration - Rohit Verma",
      );

      const body = mailtoUrl.searchParams.get("body");
      assert.ok(body?.includes("Name: Rohit Verma"));
      assert.ok(body?.includes("Email: rohit@verma.co"));
      assert.ok(body?.includes("Organization: Verma Dynamics"));
      assert.ok(body?.includes("Category: Business collaboration"));
      assert.ok(body?.includes("Looking for cloud architecture"));
    });

    it("Recovers gracefully without throwing when webhook network fetch fails (e.g. DNS/timeout error)", async () => {
      const originalFetch = globalThis.fetch;
      globalThis.fetch = (async () => {
        throw new Error("ENOTFOUND script.google.com");
      }) as typeof fetch;

      process.env.GOOGLE_SHEET_WEBHOOK_URL =
        "https://script.google.com/macros/s/unreachable/exec";

      try {
        const res = await request(app)
          .post("/api/contact")
          .set("X-Forwarded-For", nextIp())
          .send(validPayload);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.success, true);
        assert.strictEqual(res.body.forwardedToSheets, false);
        assert.ok(res.body.mailtoFallback);
      } finally {
        globalThis.fetch = originalFetch;
        delete process.env.GOOGLE_SHEET_WEBHOOK_URL;
      }
    });

    it("Recovers gracefully when webhook returns HTTP 502 Bad Gateway", async () => {
      const originalFetch = globalThis.fetch;
      globalThis.fetch = (async () => {
        return new Response("Bad Gateway", { status: 502 });
      }) as typeof fetch;

      process.env.GOOGLE_SHEET_WEBHOOK_URL =
        "https://script.google.com/macros/s/bad-gateway/exec";

      try {
        const res = await request(app)
          .post("/api/contact")
          .set("X-Forwarded-For", nextIp())
          .send(validPayload);
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

  // =========================================================================
  // 4. RATE LIMITING STRESS TEST (Contact Form 10 req/15min)
  // =========================================================================
  describe("Adversarial: Rate Limiter Burst Test", () => {
    it("Enforces 10 req/15min limit and returns HTTP 429 + Retry-After on 11th burst", async () => {
      delete process.env.GOOGLE_SHEET_WEBHOOK_URL;
      const burstIp = "10.88.88.88";
      const testPayload = {
        name: "Rate Limit Tester",
        email: "ratelimit@example.com",
        type: "General inquiry",
        message:
          "Burst rate testing message payload with twenty plus characters.",
      };

      // Requests 1..10 should succeed (HTTP 200)
      for (let i = 1; i <= 10; i++) {
        const res = await request(app)
          .post("/api/contact")
          .set("X-Forwarded-For", burstIp)
          .send(testPayload);
        assert.strictEqual(
          res.status,
          200,
          `Request #${i} within rate limit should succeed. Got ${res.status}: ${JSON.stringify(res.body)} (Headers: ${JSON.stringify(res.headers)})`,
        );
      }

      // Request 11 from the same IP MUST trigger HTTP 429
      const burstRes = await request(app)
        .post("/api/contact")
        .set("X-Forwarded-For", burstIp)
        .send(testPayload);

      assert.strictEqual(
        burstRes.status,
        429,
        "11th request from same IP must return HTTP 429",
      );
      assert.strictEqual(burstRes.body.success, false);
      assert.ok(
        burstRes.body.error.includes("Too many contact submissions"),
        "Error message should indicate rate limit exceeded",
      );
      assert.ok(
        burstRes.headers["retry-after"] ||
          burstRes.headers["ratelimit-remaining"] === "0",
        "Should emit rate limit retry headers",
      );
    });
  });

  // =========================================================================
  // 5. SECURITY HEADERS & CORS HARDENING
  // =========================================================================
  describe("Adversarial: Security Headers & CORS", () => {
    it("Verifies complete Helmet security headers suite", async () => {
      const res = await request(app).get("/health");
      assert.strictEqual(res.headers["x-content-type-options"], "nosniff");
      assert.strictEqual(res.headers["x-dns-prefetch-control"], "off");
      assert.strictEqual(res.headers["x-frame-options"], "SAMEORIGIN");
      assert.strictEqual(res.headers["x-download-options"], "noopen");
      assert.strictEqual(res.headers["x-xss-protection"], "0");
      assert.ok(res.headers["content-security-policy"]);
      // Confirm X-Powered-By is hidden
      assert.strictEqual(res.headers["x-powered-by"], undefined);
    });

    it("Allows authorized web origins in CORS", async () => {
      const allowed = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://nevrora.com",
        "https://www.nevrora.com",
      ];
      for (const origin of allowed) {
        const res = await request(app).get("/health").set("Origin", origin);
        assert.strictEqual(
          res.headers["access-control-allow-origin"],
          origin,
          `Origin ${origin} should be allowed`,
        );
      }
    });

    it("Rejects unauthorized origins when NODE_ENV=production", async () => {
      const prevEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";
      try {
        const res = await request(app)
          .get("/health")
          .set("Origin", "https://unauthorized-malicious-domain.com");
        // CORS callback returns Error which reaches errorHandler (HTTP 500)
        assert.strictEqual(res.status, 500);
        assert.strictEqual(res.body.success, false);
        assert.ok(res.body.error.includes("CORS policy violation"));
      } finally {
        if (prevEnv !== undefined) {
          process.env.NODE_ENV = prevEnv;
        } else {
          delete process.env.NODE_ENV;
        }
      }
    });
  });

  // =========================================================================
  // 6. COMMERCIAL SERVICES SPECIFICATION INTEGRITY
  // =========================================================================
  describe("Adversarial: Services Commercial Specification", () => {
    const EXPECTED_SERVICES = [
      {
        slug: "ai-intelligent-automation",
        number: "01",
        title: "AI & Intelligent Automation",
      },
      {
        slug: "custom-software-development",
        number: "02",
        title: "Custom Software Development",
      },
      {
        slug: "web-digital-experiences",
        number: "03",
        title: "Web & Digital Experiences",
      },
      {
        slug: "mobile-application-development",
        number: "04",
        title: "Mobile Application Development",
      },
      {
        slug: "cloud-devops",
        number: "05",
        title: "Cloud & DevOps Engineering",
      },
      {
        slug: "technology-consulting",
        number: "06",
        title: "Technology Strategy & Architecture Consulting",
      },
    ];

    it("GET /api/services returns exactly the 6 canonical services", async () => {
      const res = await request(app).get("/api/services");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.length, 6);

      const returnedSlugs = res.body.data.map((s: { slug: string }) => s.slug);
      for (const exp of EXPECTED_SERVICES) {
        assert.ok(
          returnedSlugs.includes(exp.slug),
          `Missing service: ${exp.slug}`,
        );
      }
    });

    it("Every service contains valid processSteps, techBadges, deliverables, capabilities, and problems", async () => {
      const res = await request(app).get("/api/services");
      for (const service of res.body.data) {
        assert.ok(
          service.statement,
          `Service ${service.slug} missing statement`,
        );
        assert.ok(
          Array.isArray(service.problems) && service.problems.length >= 3,
          `Service ${service.slug} must have >= 3 problems`,
        );
        assert.ok(
          Array.isArray(service.capabilities) &&
            service.capabilities.length >= 3,
          `Service ${service.slug} must have >= 3 capabilities`,
        );
        assert.ok(
          Array.isArray(service.deliverables) &&
            service.deliverables.length >= 3,
          `Service ${service.slug} must have >= 3 deliverables`,
        );
        assert.ok(
          Array.isArray(service.processSteps) &&
            service.processSteps.length === 4,
          `Service ${service.slug} must have exactly 4 process steps`,
        );
        for (const step of service.processSteps) {
          assert.ok(step.step);
          assert.ok(step.title);
          assert.ok(step.description);
        }
        assert.ok(
          Array.isArray(service.techBadges) && service.techBadges.length >= 3,
          `Service ${service.slug} must have >= 3 tech badges`,
        );
      }
    });

    it("Individual service slug endpoint returns accurate details", async () => {
      for (const exp of EXPECTED_SERVICES) {
        const res = await request(app).get(`/api/services/${exp.slug}`);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.data.slug, exp.slug);
        assert.strictEqual(res.body.data.number, exp.number);
      }
    });
  });

  // =========================================================================
  // 7. STATUTORY CORPORATE DISCLOSURES & NEGATIVE CONSTRAINTS
  // =========================================================================
  describe("Adversarial: Statutory & Negative Route Boundaries", () => {
    it("GET /api/company returns statutory Rule 26 disclosures", async () => {
      const res = await request(app).get("/api/company");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(
        res.body.data.legalName,
        "Nevrora Technologies Private Limited",
      );
      assert.strictEqual(res.body.data.cin, "U72900KA2024PTC189000");
      assert.strictEqual(
        res.body.data.grievanceContact.email,
        "ratnesh.k.gupta@icloud.com",
      );
    });

    it("Strictly blocks forbidden /ventures route with 404", async () => {
      const getRes = await request(app).get("/ventures");
      assert.strictEqual(getRes.status, 404);
      assert.strictEqual(getRes.body.success, false);

      const postRes = await request(app).post("/ventures");
      assert.strictEqual(postRes.status, 404);
      assert.strictEqual(postRes.body.success, false);

      const apiVentures = await request(app).get("/api/ventures");
      assert.strictEqual(apiVentures.status, 404);
      assert.strictEqual(apiVentures.body.success, false);
    });

    it("Returns standardized JSON for unmapped paths", async () => {
      const res = await request(app).get("/api/unknown/random/endpoint");
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.error.includes("Route not found"));
    });
  });
});
