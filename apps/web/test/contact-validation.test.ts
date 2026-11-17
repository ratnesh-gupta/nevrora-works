import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { contactSchema } from "../components/contact/ContactForm";

describe("Contact Form Zod Schema Validation Unit Tests", () => {
  it("accepts valid enterprise inquiry payload", () => {
    const validPayload = {
      name: "Priya Sundaram",
      email: "priya@enterprise.org",
      organization: "Enterprise Solutions Ltd",
      type: "Business collaboration",
      message:
        "We want to explore a custom software development partnership for our operations platform.",
    };

    const result = contactSchema.safeParse(validPayload);
    assert.equal(result.success, true);
  });

  it("rejects message with fewer than 20 characters", () => {
    const shortPayload = {
      name: "Priya",
      email: "priya@enterprise.org",
      type: "General inquiry",
      message: "Too short message",
    };

    const result = contactSchema.safeParse(shortPayload);
    assert.equal(result.success, false);
    if (!result.success) {
      const messageErr = result.error.issues.find((e) =>
        e.path.includes("message"),
      );
      assert.ok(messageErr, "Expected error on message field");
    }
  });

  it("rejects invalid email formats", () => {
    const invalidEmails = [
      "plainaddress",
      "user@",
      "user@domain..com",
      "@domain.com",
    ];

    for (const email of invalidEmails) {
      const payload = {
        name: "Test User",
        email,
        type: "Venture idea",
        message:
          "This is a sufficiently long test message that exceeds 20 characters.",
      };
      const result = contactSchema.safeParse(payload);
      assert.equal(
        result.success,
        false,
        `Expected failure for email: ${email}`,
      );
    }
  });

  it("rejects unknown inquiry types", () => {
    const invalidTypePayload = {
      name: "Test User",
      email: "test@example.com",
      type: "Unsupported Inquiry Type",
      message:
        "This is a sufficiently long test message that exceeds 20 characters.",
    };

    const result = contactSchema.safeParse(invalidTypePayload);
    assert.equal(result.success, false);
  });
});
