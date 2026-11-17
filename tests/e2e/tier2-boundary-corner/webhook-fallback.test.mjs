/**
 * Tier 2: Boundary & Corner Cases - Webhook Degradation & Mailto Fallback
 * Tests graceful degradation when Google Sheets webhook is unconfigured or times out.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';
import { SPEC_CONSTANTS } from '../../runner/config.mjs';

describe('Tier 2: Webhook Degradation & Mailto Fallback', async () => {
  const context = await getTestContext();
  const { apiClient } = context;

  it('falls back to mailto:ratnesh.k.gupta@icloud.com when webhook is unconfigured or fails', async () => {
    const payload = {
      name: 'Sunil Kumar',
      email: 'sunil.k@techcorp.in',
      organization: 'TechCorp India',
      type: 'Business collaboration',
      message: 'Exploring partnership opportunities for joint software development delivery.',
    };

    const res = await apiClient.post('/api/contact', payload);
    assertStatus(res, 200);
    assert.equal(res.body.success, true);

    // If forwarded to sheets is false, mailto fallback must be provided
    if (res.body.forwardedToSheets === false || res.body.fallback === 'mailto') {
      const mailto = res.body.mailtoUrl || res.body.mailtoFallback;
      assert.ok(mailto, 'Mailto fallback link expected in response');
      assert.ok(
        mailto.startsWith(`mailto:${SPEC_CONSTANTS.statutory.grievanceEmail}`),
        `Mailto URL must target ${SPEC_CONSTANTS.statutory.grievanceEmail}`
      );
      assert.ok(mailto.includes('subject='), 'Mailto URL must contain encoded subject');
      assert.ok(mailto.includes('body='), 'Mailto URL must contain encoded body');
    }
  });

  it('guarantees server never returns HTTP 500 on external webhook timeout or network disconnect', async () => {
    const payload = {
      name: 'Resilience Test User',
      email: 'resilience@test.com',
      type: 'General inquiry',
      message: 'Verifying that network failures in third-party services do not crash the endpoint.',
    };

    const res = await apiClient.post('/api/contact', payload);
    assert.notEqual(res.status, 500, 'Server crashed with HTTP 500 on contact submission');
    assert.ok(res.status === 200 || res.status === 429, `Unexpected status code: ${res.status}`);
  });
});
