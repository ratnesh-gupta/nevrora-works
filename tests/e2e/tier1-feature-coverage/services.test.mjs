/**
 * Tier 1: Feature Coverage - Service Showcases & API
 * Tests 6 commercial service routes, process steppers, tech badges, and API endpoints.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus, assertContainsText } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';
import { HtmlInspector } from '../../runner/html-parser.mjs';
import { SPEC_CONSTANTS } from '../../runner/config.mjs';

describe('Tier 1: Service Showcases & API', async () => {
  const context = await getTestContext();
  const { webClient, apiClient } = context;

  it('verifies GET /api/services returns all 6 published services', async () => {
    const res = await apiClient.get('/api/services');
    assertStatus(res, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data), 'Expected data to be an array');
    assert.equal(res.body.data.length, 6, 'Expected exactly 6 published services');

    const receivedSlugs = res.body.data.map(s => s.slug);
    for (const expectedSlug of SPEC_CONSTANTS.services) {
      assert.ok(
        receivedSlugs.includes(expectedSlug),
        `Service slug '${expectedSlug}' missing from GET /api/services response`
      );
    }
  });

  it('verifies GET /api/services/:slug for each valid service and 404 for invalid slug', async () => {
    for (const slug of SPEC_CONSTANTS.services) {
      const res = await apiClient.get(`/api/services/${slug}`);
      assertStatus(res, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.slug, slug);
      assert.ok(res.body.data.title, 'Service title must be present');
      assert.ok(res.body.data.statement, 'Commercial statement must be present');
      assert.ok(Array.isArray(res.body.data.processSteps), 'processSteps must be an array');
      assert.ok(Array.isArray(res.body.data.techBadges), 'techBadges must be an array');
      assert.equal(res.body.data.published, true);
    }

    // Invalid slug must return 404
    const notFoundRes = await apiClient.get('/api/services/non-existent-service');
    assertStatus(notFoundRes, 404);
    assert.equal(notFoundRes.body.success, false);
  });

  it('verifies all 6 web service routes render complete content, steppers, and tech badges', async () => {
    for (const slug of SPEC_CONSTANTS.services) {
      const res = await webClient.get(`/services/${slug}`);
      assertStatus(res, 200, `Service route /services/${slug} returned unexpected status`);

      const inspector = new HtmlInspector(res.text);
      const headings = inspector.getHeadings();
      assert.ok(headings.length > 0, `Headings missing on /services/${slug}`);

      // Process stepper elements
      const containsStepper = inspector.matches(/process-stepper|stepper|process/i);
      assert.ok(containsStepper, `Process stepper missing on /services/${slug}`);

      // Tech badges elements
      const containsBadges = inspector.matches(/tech-badge|badges|technology/i);
      assert.ok(containsBadges, `Technology badges grid missing on /services/${slug}`);

      // Call-to-action
      const hasCta = inspector.hasLinkTo('/contact') || inspector.matches(/start a conversation|contact/i);
      assert.ok(hasCta, `Engagement CTA missing on /services/${slug}`);
    }
  });
});
