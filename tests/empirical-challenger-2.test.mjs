import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Direct imports of TypeScript data and config modules via tsx loader
import { PALETTE_A, TYPOGRAPHY, PALETTE_LIGHT_GRADIENT } from '../packages/config/src/index.ts';
import { productsData as apiProductsData } from '../apps/api/src/data/products.data.ts';
import {
  PRODUCTS_DATA as webProductsData,
  getPublishedProducts,
  getProductBySlug,
} from '../apps/web/lib/products-data.ts';
import { getPublishedServices } from '../apps/web/lib/services-data.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

describe('Empirical Challenger 2: Token System, Compatibility, Numbering & Showcase Harness', () => {

  // =========================================================================
  // 1. Config Compatibility & Token Invariance Stress-Test
  // =========================================================================
  describe('1. Design Token System & Backward Compatibility', () => {
    it('executes packages/config/test/config.test.ts cleanly with exit code 0', () => {
      const output = execSync('npx tsx packages/config/test/config.test.ts', {
        cwd: rootDir,
        encoding: 'utf8',
      });
      // No exception thrown means exit code 0
      assert.ok(true, 'config.test.ts passed cleanly');
    });

    it('verifies all 7 PALETTE_A colors remain strictly intact and unchanged', () => {
      const EXPECTED_PALETTE_A = {
        forest: '#173C32',
        evergreen: '#071B18',
        gold: '#C9A35B',
        cream: '#F7F2E9',
        charcoal: '#252725',
        sage: '#A8B7A8',
        white: '#FFFFFF',
      };

      for (const [key, expectedHex] of Object.entries(EXPECTED_PALETTE_A)) {
        assert.equal(
          PALETTE_A[key],
          expectedHex,
          `PALETTE_A.${key} must strictly equal ${expectedHex}`
        );
      }
      assert.equal(Object.keys(PALETTE_A).length, 7, 'PALETTE_A must have exactly 7 colors');
    });

    it('verifies all 3 TYPOGRAPHY font stacks remain strictly intact and unchanged', () => {
      const EXPECTED_TYPOGRAPHY = {
        fontDisplay: 'Playfair Display, Georgia, serif',
        fontBody: 'Inter, Instrument Sans, -apple-system, BlinkMacSystemFont, sans-serif',
        fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      };

      for (const [key, expectedFont] of Object.entries(EXPECTED_TYPOGRAPHY)) {
        assert.equal(
          TYPOGRAPHY[key],
          expectedFont,
          `TYPOGRAPHY.${key} must strictly equal "${expectedFont}"`
        );
      }
      assert.equal(Object.keys(TYPOGRAPHY).length, 3, 'TYPOGRAPHY must have exactly 3 font stacks');
    });

    it('verifies PALETTE_LIGHT_GRADIENT tokens are defined with required Apple Daylight values', () => {
      assert.ok(PALETTE_LIGHT_GRADIENT, 'PALETTE_LIGHT_GRADIENT must be exported');
      assert.equal(PALETTE_LIGHT_GRADIENT.bgCanvas, '#F8FAFC');
      assert.equal(PALETTE_LIGHT_GRADIENT.bgCanvasSubtle, '#F5F5F7');
      assert.equal(PALETTE_LIGHT_GRADIENT.surfaceCard, 'rgba(255, 255, 255, 0.82)');
      assert.equal(PALETTE_LIGHT_GRADIENT.surfaceElevated, '#FFFFFF');
      assert.equal(PALETTE_LIGHT_GRADIENT.borderSubtle, 'rgba(15, 23, 42, 0.08)');
      assert.equal(PALETTE_LIGHT_GRADIENT.textPrimary, '#0B1020');
      assert.equal(PALETTE_LIGHT_GRADIENT.textSecondary, '#475569');
      assert.equal(PALETTE_LIGHT_GRADIENT.textMuted, '#64748B');
      assert.equal(PALETTE_LIGHT_GRADIENT.cobalt, '#2563EB');
      assert.equal(PALETTE_LIGHT_GRADIENT.violet, '#7C3AED');
      assert.equal(PALETTE_LIGHT_GRADIENT.cyan, '#0891B2');
    });

    it('verifies textPrimary contrast on bgCanvas exceeds WCAG AAA standard (7:1)', () => {
      // Relative luminance calculation for #0B1020 on #F8FAFC
      function hexToRgb(hex) {
        const bigint = parseInt(hex.replace('#', ''), 16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
      }
      function relativeLuminance([r, g, b]) {
        const [rs, gs, bs] = [r, g, b].map(c => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      }
      const l1 = relativeLuminance(hexToRgb('#F8FAFC'));
      const l2 = relativeLuminance(hexToRgb('#0B1020'));
      const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

      assert.ok(contrast >= 7.0, `Contrast ratio ${contrast.toFixed(2)}:1 must meet WCAG AAA (>= 7:1)`);
    });
  });

  // =========================================================================
  // 2. Sequential Venture Numbering Across API & Web
  // =========================================================================
  describe('2. Sequential Venture Numbering Verification', () => {
    it('verifies published products in apps/api/src/data/products.data.ts list sequentially ("01", "02")', () => {
      const published = apiProductsData.filter(p => p.published === true);
      assert.equal(published.length, 2, 'Exactly 2 published products must exist in API data');

      assert.equal(published[0].slug, 'neermiti-collections');
      assert.equal(published[0].number, '01', 'Neermiti Collections must have number "01"');

      assert.equal(published[1].slug, 'sadhana-daily');
      assert.equal(published[1].number, '02', 'Sadhana Daily must have number "02"');

      // Assert zero-padded two-digit regex
      assert.match(published[0].number, /^0\d$/, 'Venture number must be zero-padded 2-digit format');
      assert.match(published[1].number, /^0\d$/, 'Venture number must be zero-padded 2-digit format');
    });

    it('verifies published products in apps/web/lib/products-data.ts list sequentially ("01", "02")', () => {
      const published = webProductsData.filter(p => p.published === true);
      assert.equal(published.length, 2, 'Exactly 2 published products must exist in Web data');

      assert.equal(published[0].slug, 'neermiti-collections');
      assert.equal(published[0].number, '01', 'Neermiti Collections must have number "01"');

      assert.equal(published[1].slug, 'sadhana-daily');
      assert.equal(published[1].number, '02', 'Sadhana Daily must have number "02"');

      // Assert getPublishedProducts() helper output
      const helperPublished = getPublishedProducts();
      assert.equal(helperPublished.length, 2);
      assert.equal(helperPublished[0].number, '01');
      assert.equal(helperPublished[1].number, '02');
    });

    it('verifies sequential difference between published venture numbers is strictly 1', () => {
      const published = getPublishedProducts();
      const num1 = parseInt(published[0].number, 10);
      const num2 = parseInt(published[1].number, 10);
      assert.equal(num2 - num1, 1, 'Difference between consecutive venture numbers must be exactly 1');
    });
  });

  // =========================================================================
  // 3. Strict DriveIQ Concealment Stress-Test
  // =========================================================================
  describe('3. Strict DriveIQ Concealment & Adversarial Queries', () => {
    it('verifies driveiq has published === false and number === "03" in API data layer', () => {
      const driveiq = apiProductsData.find(p => p.slug === 'driveiq');
      assert.ok(driveiq, 'driveiq must exist in API master data');
      assert.equal(driveiq.published, false, 'driveiq.published must be strictly false');
      assert.equal(driveiq.number, '03', 'driveiq must have number "03"');
    });

    it('verifies driveiq has published === false and number === "03" in Web data layer', () => {
      const driveiq = webProductsData.find(p => p.slug === 'driveiq');
      assert.ok(driveiq, 'driveiq must exist in Web master data');
      assert.equal(driveiq.published, false, 'driveiq.published must be strictly false');
      assert.equal(driveiq.number, '03', 'driveiq must have number "03"');
    });

    it('verifies driveiq is completely excluded from getPublishedProducts()', () => {
      const published = getPublishedProducts();
      const found = published.find(p => p.slug === 'driveiq');
      assert.equal(found, undefined, 'driveiq must never be returned by getPublishedProducts()');
    });

    it('adversarial query resistance: getProductBySlug returns undefined for driveiq variants', () => {
      const maliciousQueries = [
        'driveiq',
        'DriveIQ',
        'DRIVEIQ',
        'driveiq/',
        '../driveiq',
        'driveiq%00',
        '%64%72%69%76%65%69%71',
        '__proto__',
        'constructor',
        'toString',
        'undefined',
        '',
      ];

      for (const query of maliciousQueries) {
        const result = getProductBySlug(query);
        assert.equal(
          result,
          undefined,
          `Adversarial query "${query}" must return undefined`
        );
      }
    });
  });

  // =========================================================================
  // 4. Service Action Labels & Legacy Text Purging
  // =========================================================================
  describe('4. Service Action Labels & Legacy Text Purging', () => {
    it('verifies apps/web/app/services/page.tsx contains "View Architecture & Specs" and zero legacy strings', () => {
      const servicesPagePath = path.join(rootDir, 'apps/web/app/services/page.tsx');
      assert.ok(fs.existsSync(servicesPagePath), 'services/page.tsx must exist');
      const content = fs.readFileSync(servicesPagePath, 'utf8');

      assert.ok(
        content.includes('View Architecture & Specs'),
        'services/page.tsx must contain "View Architecture & Specs"'
      );
      assert.ok(
        !content.includes('Explore Service & Stepper'),
        'services/page.tsx must NOT contain "Explore Service & Stepper"'
      );
      assert.ok(
        !content.includes('Explore Service'),
        'services/page.tsx must NOT contain "Explore Service"'
      );
      assert.ok(
        !content.includes('Explore practice'),
        'services/page.tsx must NOT contain "Explore practice"'
      );
    });

    it('verifies apps/web/app/page.tsx contains "View Architecture & Specs" and zero legacy stepper strings', () => {
      const homePagePath = path.join(rootDir, 'apps/web/app/page.tsx');
      assert.ok(fs.existsSync(homePagePath), 'app/page.tsx must exist');
      const content = fs.readFileSync(homePagePath, 'utf8');

      assert.ok(
        content.includes('View Architecture & Specs'),
        'app/page.tsx must contain "View Architecture & Specs"'
      );
      assert.ok(
        !content.includes('Explore Service & Stepper'),
        'app/page.tsx must NOT contain "Explore Service & Stepper"'
      );
    });
  });

  // =========================================================================
  // 5. Service Tech Badges Rendering & Parity
  // =========================================================================
  describe('5. Service Tech Badges Rendering & Parity', () => {
    it('verifies service.techBadges are rendered on /services', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'apps/web/app/services/page.tsx'),
        'utf8'
      );
      assert.ok(
        content.includes('service.techBadges'),
        'services/page.tsx must map over service.techBadges'
      );
    });

    it('verifies service.techBadges are rendered on / (home page)', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'apps/web/app/page.tsx'),
        'utf8'
      );
      assert.ok(
        content.includes('service.techBadges'),
        'page.tsx must map over service.techBadges'
      );
    });

    it('verifies all 6 published services define a non-empty techBadges array with valid strings', () => {
      const services = getPublishedServices();
      assert.equal(services.length, 6, 'Exactly 6 published services must exist');

      for (const service of services) {
        assert.ok(Array.isArray(service.techBadges), `${service.slug} must have techBadges array`);
        assert.ok(
          service.techBadges.length >= 3,
          `${service.slug} must have at least 3 tech badges (found ${service.techBadges.length})`
        );
        for (const badge of service.techBadges) {
          assert.equal(typeof badge, 'string');
          assert.ok(badge.trim().length > 0, 'Badge must not be empty or whitespace');
        }
      }
    });
  });

  // =========================================================================
  // 6. 3D & 2D Constellation Badges & Visual Stage Integrity
  // =========================================================================
  describe('6. 3D & 2D Constellation Badges & Stage Integrity', () => {
    it('verifies VentureConstellation.tsx contains <Html> overlays, translucent glass stage, and cobalt/violet colors', () => {
      const constellationPath = path.join(
        rootDir,
        'apps/web/components/hero/VentureConstellation.tsx'
      );
      assert.ok(fs.existsSync(constellationPath), 'VentureConstellation.tsx must exist');
      const content = fs.readFileSync(constellationPath, 'utf8');

      // Drei Html overlay
      assert.ok(
        content.includes('<Html') && content.includes('@react-three/drei'),
        'VentureConstellation.tsx must import and render <Html> from @react-three/drei'
      );

      // Interactive badges for 01 & 02
      assert.ok(
        content.includes('badgeNumber === "01"'),
        'Must support badgeNumber "01"'
      );
      assert.ok(
        content.includes('badgeNumber="01"') && content.includes('badgeNumber="02"'),
        'Must instantiate nodes with badgeNumber "01" and "02"'
      );

      // Translucent glass stage
      assert.ok(
        content.includes('TranslucentStage'),
        'VentureConstellation.tsx must include TranslucentStage component'
      );
      assert.ok(
        content.includes('circleGeometry args={[4.2, 64]}'),
        'TranslucentStage must render a circular glass geometry'
      );

      // Material colors
      assert.ok(
        content.includes('PALETTE_LIGHT_GRADIENT.cobalt'),
        'Node 1 must use cobalt color'
      );
      assert.ok(
        content.includes('PALETTE_LIGHT_GRADIENT.violet'),
        'Node 2 must use violet color'
      );
    });

    it('verifies ConstellationFallback.tsx contains interactive links, cobalt/violet, and 01/02 badges', () => {
      const fallbackPath = path.join(
        rootDir,
        'apps/web/components/hero/ConstellationFallback.tsx'
      );
      assert.ok(fs.existsSync(fallbackPath), 'ConstellationFallback.tsx must exist');
      const content = fs.readFileSync(fallbackPath, 'utf8');

      // Interactive links
      assert.ok(
        content.includes('href="/products/neermiti-collections"'),
        'Must link to /products/neermiti-collections'
      );
      assert.ok(
        content.includes('href="/products/sadhana-daily"'),
        'Must link to /products/sadhana-daily'
      );

      // Colors
      assert.ok(content.includes('#2563EB'), 'Must include cobalt hex #2563EB');
      assert.ok(content.includes('#7C3AED'), 'Must include violet hex #7C3AED');

      // Visual text badges
      assert.ok(
        content.includes('01 &bull; NEERMITI'),
        'Must render badge text "01 • NEERMITI"'
      );
      assert.ok(
        content.includes('02 &bull; SADHANA'),
        'Must render badge text "02 • SADHANA"'
      );
    });
  });

  // =========================================================================
  // 7. E2E Theme Consistency Runner
  // =========================================================================
  describe('7. E2E Theme Consistency Test Execution', () => {
    it('executes node --test tests/e2e/tier3-cross-feature/theme-consistency.test.mjs with 100% pass', () => {
      const cleanEnv = { ...process.env };
      delete cleanEnv.NODE_TEST_CONTEXT;
      delete cleanEnv.NODE_OPTIONS;
      const output = execSync(
        'node --test tests/e2e/tier3-cross-feature/theme-consistency.test.mjs',
        {
          cwd: rootDir,
          encoding: 'utf8',
          env: cleanEnv,
        }
      );
      assert.ok(output.includes('pass 3'), 'All 3 theme consistency assertions must pass');
      assert.ok(output.includes('fail 0'), 'Zero test failures allowed');
    });
  });

  // =========================================================================
  // 8. 4-Tier E2E Integration Suite Runner
  // =========================================================================
  describe('8. Complete 4-Tier E2E Integration Suite Runner', () => {
    it('executes node tests/runner/index.mjs with 63/63 passing assertions', () => {
      const cleanEnv = { ...process.env };
      delete cleanEnv.NODE_TEST_CONTEXT;
      delete cleanEnv.NODE_OPTIONS;
      const output = execSync('node tests/runner/index.mjs', {
        cwd: rootDir,
        encoding: 'utf8',
        env: cleanEnv,
      });
      assert.ok(
        output.includes('[E2E SUMMARY] Passed: 63 | Failed: 0'),
        'Must pass exactly 63 assertions with 0 failures'
      );
      assert.ok(
        output.includes('[RESULT] SUCCESS - All test cases in scope passed.'),
        'Runner must report overall SUCCESS'
      );
    });
  });
});
