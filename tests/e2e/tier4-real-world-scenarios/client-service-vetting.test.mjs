/**
 * Tier 4: Real-World Scenarios - Enterprise Client Service Vetting
 * Simulates enterprise buyer vetting engineering capabilities, process steppers,
 * tech stacks, and case studies.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';
import { HtmlInspector } from '../../runner/html-parser.mjs';

describe('Tier 4: Scenario 2 - Enterprise Client Service Vetting', async () => {
  const context = await getTestContext();
  const { webClient, apiClient } = context;

  it('vets AI & Intelligent Automation service capabilities, process steppers, and tech badges', async () => {
    // 1. Fetch service via API contract
    const apiRes = await apiClient.get('/api/services/ai-intelligent-automation');
    assertStatus(apiRes, 200);
    assert.equal(apiRes.body.data.slug, 'ai-intelligent-automation');

    const service = apiRes.body.data;
    assert.ok(service.processSteps.length >= 4, 'Expected at least 4 discrete process delivery steps');
    assert.ok(service.techBadges.length >= 3, 'Expected modern AI tech badges');

    // 2. Fetch service web presentation
    const webRes = await webClient.get('/services/ai-intelligent-automation');
    assertStatus(webRes, 200);

    const inspector = new HtmlInspector(webRes.text);

    // 3. Verify process stepper steps are rendered in HTML
    for (const step of service.processSteps) {
      assert.ok(
        inspector.containsText(step.title),
        `Process step '${step.title}' missing from service stepper HTML`
      );
    }

    // 4. Verify tech badges are visually rendered
    for (const badge of service.techBadges) {
      assert.ok(
        inspector.containsText(badge),
        `Tech badge '${badge}' missing from rendered badges grid`
      );
    }

    // 5. Navigate to /our-work to cross-verify client references
    const ourWorkRes = await webClient.get('/our-work');
    assertStatus(ourWorkRes, 200);
    const ourWorkInspector = new HtmlInspector(ourWorkRes.text);
    assert.ok(
      ourWorkInspector.containsText('Our Work') || ourWorkInspector.containsText('Case Studies'),
      'Case studies or work portfolio not visible on /our-work'
    );
  });
});
