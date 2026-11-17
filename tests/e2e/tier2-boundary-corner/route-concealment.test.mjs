/**
 * Tier 2: Boundary & Corner Cases - Route Concealment & Negative Assertions
 * Tests strict concealment of /ventures route hierarchy and unpublished product DriveIQ.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';

describe('Tier 2: Route Concealment & Negative Assertions', async () => {
  const context = await getTestContext();
  const { webClient, apiClient } = context;

  it('strictly returns 404 on direct access to /ventures and subpaths', async () => {
    const forbiddenPaths = [
      '/ventures',
      '/ventures/',
      '/ventures/portfolio',
      '/ventures/driveiq',
    ];

    for (const forbiddenPath of forbiddenPaths) {
      const res = await webClient.get(forbiddenPath);
      assertStatus(
        res,
        404,
        `Forbidden route '${forbiddenPath}' returned status ${res.status} instead of 404 Not Found`
      );
    }
  });

  it('strictly returns 404 on direct web access to unpublished product /products/driveiq', async () => {
    const res = await webClient.get('/products/driveiq');
    assertStatus(res, 404, 'Direct access to /products/driveiq must return 404 Not Found');
  });

  it('strictly returns 404 on direct API access to /api/products/driveiq', async () => {
    const res = await apiClient.get('/api/products/driveiq');
    assertStatus(res, 404, 'GET /api/products/driveiq must return 404 Not Found');
    assert.equal(res.body.success, false);
  });

  it('ensures zero unpublished products exist in public API /api/products listing', async () => {
    const res = await apiClient.get('/api/products');
    assertStatus(res, 200);

    const products = res.body.data;
    assert.ok(Array.isArray(products));

    for (const product of products) {
      assert.equal(
        product.published,
        true,
        `Product '${product.slug}' has published: false and must NOT be in public listing`
      );
      assert.notEqual(
        product.slug,
        'driveiq',
        'Product DriveIQ was found in public listing despite being confidential'
      );
    }
  });
});
