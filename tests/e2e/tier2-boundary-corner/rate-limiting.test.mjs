/**
 * Tier 2: Boundary & Corner Cases - Rate Limiting Thresholds
 * Tests IP burst submission throttling and HTTP 429 Too Many Requests response.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';

describe('Tier 2: Rate Limiting & Throttling Thresholds', async () => {
  const context = await getTestContext();
  const { apiClient } = context;

  it('triggers HTTP 429 Too Many Requests after burst submissions exceeding threshold', async () => {
    const payload = {
      name: 'Rapid Fire Bot',
      email: 'bot@automated-test.net',
      type: 'General inquiry',
      message: 'Automated rapid fire load test message satisfying twenty character limit.',
    };

    let rateLimitEncountered = false;
    let rateLimitResponse = null;
    const testIp = '198.51.100.99';

    // Send 15 consecutive requests from dedicated burst IP
    for (let i = 0; i < 15; i++) {
      const res = await apiClient.post('/api/contact', payload, {
        clientIp: testIp,
        headers: { 'X-Forwarded-For': testIp },
      });
      if (res.status === 429) {
        rateLimitEncountered = true;
        rateLimitResponse = res;
        break;
      }
    }

    assert.ok(
      rateLimitEncountered,
      'Rate limiter did not trigger HTTP 429 after 15 rapid-fire requests from same client'
    );

    assertStatus(rateLimitResponse, 429);
    assert.equal(rateLimitResponse.body.success, false);
    assert.ok(
      rateLimitResponse.headers.has('retry-after') || rateLimitResponse.headers.has('ratelimit-remaining'),
      'Rate limit response missing Retry-After or RateLimit header'
    );
  });
});
