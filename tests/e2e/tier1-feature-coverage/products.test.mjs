/**
 * Tier 1: Feature Coverage - Product Showcases & Concealment
 * Tests published launch products (Neermiti, Sadhana) and strict concealment of DriveIQ.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus, assertContainsText, assertNotContainsText } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';
import { HtmlInspector } from '../../runner/html-parser.mjs';
import { SPEC_CONSTANTS } from '../../runner/config.mjs';

describe('Tier 1: Product Showcases & Concealment', async () => {
  const context = await getTestContext();
  const { webClient, apiClient } = context;

  it('verifies GET /api/products lists only published products and strictly excludes driveiq', async () => {
    const res = await apiClient.get('/api/products');
    assertStatus(res, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data), 'Expected data to be an array of products');

    const productSlugs = res.body.data.map(p => p.slug);
    assert.ok(productSlugs.includes('neermiti-collections'), 'Neermiti Collections missing from /api/products');
    assert.ok(productSlugs.includes('sadhana-daily'), 'Sadhana Daily missing from /api/products');

    // Strict exclusion of driveiq
    assert.equal(
      productSlugs.includes('driveiq'),
      false,
      'CRITICAL: Unpublished product driveiq leaked in GET /api/products response'
    );

    // Assert all returned items have published === true
    for (const p of res.body.data) {
      assert.equal(p.published, true, `Product ${p.slug} has published !== true`);
    }
  });

  it('verifies GET /api/products/:slug returns details for published products and 404 for driveiq', async () => {
    // Neermiti
    const neermitiRes = await apiClient.get('/api/products/neermiti-collections');
    assertStatus(neermitiRes, 200);
    assert.equal(neermitiRes.body.data.slug, 'neermiti-collections');
    assert.ok(neermitiRes.body.data.valueProposition, 'Neermiti value proposition missing');
    assert.ok(Array.isArray(neermitiRes.body.data.features), 'Neermiti features missing');

    // Sadhana Daily
    const sadhanaRes = await apiClient.get('/api/products/sadhana-daily');
    assertStatus(sadhanaRes, 200);
    assert.equal(sadhanaRes.body.data.slug, 'sadhana-daily');
    assert.ok(sadhanaRes.body.data.valueProposition, 'Sadhana value proposition missing');
    assert.ok(Array.isArray(sadhanaRes.body.data.features), 'Sadhana features missing');

    // DriveIQ directly via API must return 404
    const driveiqRes = await apiClient.get('/api/products/driveiq');
    assertStatus(driveiqRes, 404, 'Direct API access to unpublished product driveiq must return 404 Not Found');
  });

  it('verifies web product showcases render complete content and driveiq is concealed', async () => {
    // Products index
    const indexRes = await webClient.get('/products');
    assertStatus(indexRes, 200);
    const indexInspector = new HtmlInspector(indexRes.text);
    assert.ok(indexInspector.hasLinkTo('/products/neermiti-collections'), 'Neermiti link missing from /products');
    assert.ok(indexInspector.hasLinkTo('/products/sadhana-daily'), 'Sadhana link missing from /products');
    assert.equal(indexInspector.hasLinkTo('/products/driveiq'), false, 'Forbidden link to driveiq found on /products');

    // Neermiti showcase page
    const neermitiPage = await webClient.get('/products/neermiti-collections');
    assertStatus(neermitiPage, 200);
    assertContainsText(neermitiPage.text, 'Neermiti Collections');
    assertContainsText(neermitiPage.text, 'Artisan', 'Neermiti artisan context missing');

    // Sadhana showcase page
    const sadhanaPage = await webClient.get('/products/sadhana-daily');
    assertStatus(sadhanaPage, 200);
    assertContainsText(sadhanaPage.text, 'Sadhana Daily');
    assertContainsText(sadhanaPage.text, 'Panchang', 'Sadhana Panchang context missing');

    // DriveIQ direct web route must return 404
    const driveiqPage = await webClient.get('/products/driveiq');
    assertStatus(driveiqPage, 404, 'Direct web route /products/driveiq must return 404 Not Found');
  });
});
