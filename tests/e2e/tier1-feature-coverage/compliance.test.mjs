/**
 * Tier 1: Feature Coverage - Regulatory & Legal Compliance
 * Tests Companies Act 2013 Rule 26 footer strip, DPDP Act 2023 privacy pages, and legal policies.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus, assertRule26Compliant, assertDPDPActCompliant, assertContainsText } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';

describe('Tier 1: Regulatory & Legal Compliance', async () => {
  const context = await getTestContext();
  const { webClient } = context;

  it('verifies Companies Act 2013 Rule 26 corporate footer strip on homepage', async () => {
    const res = await webClient.get('/');
    assertStatus(res, 200);
    assertRule26Compliant(res.text);
  });

  it('verifies standalone DPDP Act 2023 Privacy Policy page at /privacy-policy', async () => {
    const res = await webClient.get('/privacy-policy');
    assertStatus(res, 200);
    assertDPDPActCompliant(res.text);
    assertContainsText(res.text, 'Data Principal', 'DPDP Act Data Principal rights missing');
    assertContainsText(res.text, 'Grievance', 'DPDP Act Grievance redressal missing');
  });

  it('verifies dedicated product privacy notice for Neermiti Collections', async () => {
    const res = await webClient.get('/products/neermiti-collections/privacy');
    assertStatus(res, 200);
    assertDPDPActCompliant(res.text);
    assertContainsText(res.text, 'Neermiti Collections', 'Neermiti product privacy notice title missing');
  });

  it('verifies dedicated product privacy notice for Sadhana Daily', async () => {
    const res = await webClient.get('/products/sadhana-daily/privacy');
    assertStatus(res, 200);
    assertDPDPActCompliant(res.text);
    assertContainsText(res.text, 'Sadhana Daily', 'Sadhana Daily product privacy notice title missing');
  });

  it('verifies standalone legal pages: Terms of Use, Disclaimer, and Cookie Notice', async () => {
    // /terms
    const termsRes = await webClient.get('/terms');
    assertStatus(termsRes, 200);
    assertContainsText(termsRes.text, 'Terms of Use');

    // /disclaimer
    const disclaimerRes = await webClient.get('/disclaimer');
    assertStatus(disclaimerRes, 200);
    assertContainsText(disclaimerRes.text, 'Disclaimer');

    // /cookies
    const cookiesRes = await webClient.get('/cookies');
    assertStatus(cookiesRes, 200);
    assertContainsText(cookiesRes.text, 'Cookie');
  });
});
