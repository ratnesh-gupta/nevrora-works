import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { contactSchema } from "../components/contact/ContactForm";

describe("Nevrora Works Contact Form Zod Schema Validation Unit Tests", () => {
  it("accepts valid product notification inquiry payload", () => {
    const validPayload = {
      name: "Priya Sundaram",
      email: "priya@example.org",
      productSlug: "sadhana-daily",
      type: "Product early access / Notify me",
      message:
        "Please notify me when Sadhana Daily launches on Google Play.",
    };

    const result = contactSchema.safeParse(validPayload);
    assert.equal(result.success, true);
  });

  it("rejects message with fewer than 20 characters", () => {
    const shortPayload = {
      name: "Priya",
      email: "priya@example.org",
      type: "General product inquiry",
      message: "Too short message",
    };

    const result = contactSchema.safeParse(shortPayload);
    assert.equal(result.success, false);
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
        type: "General product inquiry",
        message:
          "This is a sufficiently long test message that exceeds 20 characters.",
      };
      const result = contactSchema.safeParse(payload);
      assert.equal(result.success, false);
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
