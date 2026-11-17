/**
 * Tier 3: Cross-Feature Combinations - Brand Theme & Design System Consistency
 * Tests Palette A color tokens and typography font families across all platform routes.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';
import { SPEC_CONSTANTS } from '../../runner/config.mjs';

describe('Tier 3: Brand Theme & Design System Consistency', async () => {
  const context = await getTestContext();
  const { webClient } = context;

  const sampleRoutes = [
    '/',
    '/about',
    '/services/ai-intelligent-automation',
    '/products/neermiti-collections',
    '/contact',
    '/privacy-policy',
  ];

  it('verifies Palette A design tokens are embedded across all primary layouts', async () => {
    for (const route of sampleRoutes) {
      const res = await webClient.get(route);
      assertStatus(res, 200, `Failed fetching route ${route} for theme verification`);

      const text = res.text.toLowerCase();
      // Verify forest green / evergreen background or theme color
      const hasBrandPalette =
        text.includes('#173c32') ||
        text.includes('#071b18') ||
        text.includes('#c9a35b') ||
        text.includes('color-evergreen') ||
        text.includes('color-forest');

      assert.ok(
        hasBrandPalette,
        `Palette A brand colors missing from layout stylesheet for ${route}`
      );
    }
  });

  it('verifies typography font stack definitions across layouts', async () => {
    for (const route of sampleRoutes) {
      const res = await webClient.get(route);
      assertStatus(res, 200);

      const text = res.text;
      const hasPlayfair = text.includes('Playfair Display') || text.includes('var(--font-display)') || text.includes('font-serif');
      const hasInter = text.includes('Inter') || text.includes('Instrument Sans') || text.includes('var(--font-body)') || text.includes('font-sans');

      assert.ok(hasPlayfair || hasInter, `Typography font family stacks missing on ${route}`);
    }
  });

  it('verifies meta theme-color matches brand Palette A evergreen/forest', async () => {
    const res = await webClient.get('/');
    assertStatus(res, 200);

    const matchesThemeColor = /<meta\s+name=["']theme-color["']\s+content=["']#(173c32|071b18)["']/i.test(res.text);
    assert.ok(matchesThemeColor, 'meta theme-color does not match brand primary Palette A tokens');
  });
});
