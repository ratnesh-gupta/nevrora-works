import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  SERVICES_DATA,
  getPublishedServices,
  getServiceBySlug,
} from "../lib/services-data";

describe("Services Data Layer & Stepper Unit Tests", () => {
  it("defines exactly 6 published commercial services", () => {
    const published = getPublishedServices();
    assert.equal(published.length, 6);

    const expectedSlugs = [
      "ai-intelligent-automation",
      "custom-software-development",
      "web-digital-experiences",
      "mobile-application-development",
      "cloud-devops",
      "technology-consulting",
    ];

    const actualSlugs = published.map((s) => s.slug);
    assert.deepEqual(actualSlugs, expectedSlugs);
  });

  it("ensures every service contains commercial depth, steppers, and tech badges", () => {
    for (const service of SERVICES_DATA) {
      assert.ok(
        service.statement.length > 10,
        `${service.slug} missing commercial statement`,
      );
      assert.ok(
        service.problems.length >= 3,
        `${service.slug} must specify at least 3 problems`,
      );
      assert.ok(
        service.capabilities.length >= 4,
        `${service.slug} must specify at least 4 capabilities`,
      );
      assert.ok(
        service.deliverables.length >= 3,
        `${service.slug} must specify at least 3 deliverables`,
      );
      assert.ok(
        service.processSteps.length >= 4,
        `${service.slug} must have at least 4 process steps`,
      );
      assert.ok(
        service.techBadges.length >= 3,
        `${service.slug} must have at least 3 tech badges`,
      );
      assert.equal(service.published, true);
    }
  });

  it("retrieves individual services by slug", () => {
    const aiService = getServiceBySlug("ai-intelligent-automation");
    assert.ok(aiService);
    assert.equal(aiService.number, "01");

    const nonExistent = getServiceBySlug("non-existent-practice");
    assert.equal(nonExistent, undefined);
  });
});
