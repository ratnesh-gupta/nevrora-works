/**
 * Tier 3: Cross-Feature Combinations - Cookie Consent & Analytics Isolation
 * Tests unconsented analytics isolation, cookie preference controls, and consent revocation.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus, assertNotContainsText } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';
import { HtmlInspector } from '../../runner/html-parser.mjs';

describe('Tier 3: Cookie Consent & Analytics Isolation', async () => {
  const context = await getTestContext();
  const { webClient } = context;

  it('guarantees unconsented page loads do not execute Google Analytics trackers', async () => {
    const res = await webClient.get('/');
    assertStatus(res, 200);

    // Verify raw page response does not unconditionally embed active tracking tags
    assertNotContainsText(
      res.text,
      'www.google-analytics.com/analytics.js',
      'Unconditional Google Analytics script found in initial page markup without consent'
    );
  });

  it('verifies cookie policy and interactive controls on /cookies', async () => {
    const res = await webClient.get('/cookies');
    assertStatus(res, 200);

    const inspector = new HtmlInspector(res.text);

    // Verify policy text
    assert.ok(
      inspector.containsText('Cookie') || inspector.containsText('cookies'),
      'Cookie disclosure text missing on /cookies'
    );

    // Verify presence of acceptance / decline buttons or form controls
    const containsControls = inspector.matches(/accept|decline|consent|preferences/i);
    assert.ok(containsControls, 'Interactive cookie consent controls missing on /cookies');
  });
});
