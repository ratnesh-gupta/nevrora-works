/**
 * Tier 4: Real-World Scenarios - Statutory Compliance & Investor Due Diligence
 * Simulates investor / legal auditor reviewing Companies Act Rule 26 corporate footer,
 * DPDP Act 2023 site and product privacy notices, terms, and disclaimer.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus, assertRule26Compliant, assertDPDPActCompliant, assertContainsText } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';
import { HtmlInspector } from '../../runner/html-parser.mjs';

describe('Tier 4: Scenario 3 - Statutory Compliance & Investor Due Diligence', async () => {
  const context = await getTestContext();
  const { webClient } = context;

  it('audits Companies Act 2013 Rule 26 corporate disclosures across platform', async () => {
    // 1. Audit homepage corporate footer strip
    const homeRes = await webClient.get('/');
    assertStatus(homeRes, 200);
    assertRule26Compliant(homeRes.text);

    // 2. Audit secondary pages to guarantee persistent statutory footer
    const aboutRes = await webClient.get('/about');
    assertStatus(aboutRes, 200);
    assertRule26Compliant(aboutRes.text);
  });

  it('audits DPDP Act 2023 compliance across master and product privacy notices', async () => {
    // 1. Audit site-wide privacy policy
    const masterPolicyRes = await webClient.get('/privacy-policy');
    assertStatus(masterPolicyRes, 200);
    assertDPDPActCompliant(masterPolicyRes.text);

    const masterInspector = new HtmlInspector(masterPolicyRes.text);
    assert.ok(
      masterInspector.containsText('Data Principal'),
      'Master policy must specify Data Principal statutory rights'
    );

    // 2. Audit product-specific privacy policy: Neermiti Collections
    const neermitiPrivacyRes = await webClient.get('/products/neermiti-collections/privacy');
    assertStatus(neermitiPrivacyRes, 200);
    assertDPDPActCompliant(neermitiPrivacyRes.text);

    // 3. Audit product-specific privacy policy: Sadhana Daily
    const sadhanaPrivacyRes = await webClient.get('/products/sadhana-daily/privacy');
    assertStatus(sadhanaPrivacyRes, 200);
    assertDPDPActCompliant(sadhanaPrivacyRes.text);
  });

  it('audits completeness of secondary statutory pages (/terms, /disclaimer, /cookies)', async () => {
    const legalRoutes = [
      { path: '/terms', keyword: 'Terms of Use' },
      { path: '/disclaimer', keyword: 'Disclaimer' },
      { path: '/cookies', keyword: 'Cookie' },
    ];

    for (const route of legalRoutes) {
      const res = await webClient.get(route.path);
      assertStatus(res, 200, `Statutory page ${route.path} missing or unreachable`);
      assertContainsText(res.text, route.keyword);
    }
  });
});
