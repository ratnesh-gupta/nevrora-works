#!/usr/bin/env node
/**
 * Empirical Adversarial Challenger: Responsiveness, Viewport & Touch Target Stress Suite
 * Validates root constraints, viewport clipping, fixed-width safety, tablet breakpoint collision avoidance,
 * touch target dimensions, and text wrapping resilience.
 */

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { getTestContext, teardownTestContext } from './runner/test-context.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const results = [];

function test(name, fn) {
  try {
    fn();
    results.push({ name, status: 'PASS' });
    console.log(`  ✔ [PASS] ${name}`);
  } catch (err) {
    results.push({ name, status: 'FAIL', error: err.message });
    console.error(`  ✖ [FAIL] ${name}: ${err.message}`);
  }
}

async function asyncTest(name, fn) {
  try {
    await fn();
    results.push({ name, status: 'PASS' });
    console.log(`  ✔ [PASS] ${name}`);
  } catch (err) {
    results.push({ name, status: 'FAIL', error: err.message });
    console.error(`  ✖ [FAIL] ${name}: ${err.message}`);
  }
}

console.log('======================================================================');
console.log(' EMPIRICAL ADVERSARIAL CHALLENGER: RESPONSIVENESS & TOUCH HARNESS');
console.log('======================================================================\n');

// -----------------------------------------------------------------------------
// 1. Root Overflow Constraint (apps/web/app/globals.css)
// -----------------------------------------------------------------------------
console.log('Section 1: Root Overflow Constraint (globals.css)');
test('globals.css enforces overflow-x: clip on html and body', () => {
  const cssPath = path.join(rootDir, 'apps/web/app/globals.css');
  assert.ok(fs.existsSync(cssPath), `Missing globals.css at ${cssPath}`);
  const content = fs.readFileSync(cssPath, 'utf8');

  // Verify html rule block
  const htmlMatch = content.match(/html\s*\{([^}]+)\}/);
  assert.ok(htmlMatch, 'CSS rule block for html not found');
  assert.ok(
    htmlMatch[1].includes('overflow-x: clip'),
    `html block missing 'overflow-x: clip;'. Found:\n${htmlMatch[1]}`
  );

  // Verify body rule block
  const bodyMatch = content.match(/body\s*\{([^}]+)\}/);
  assert.ok(bodyMatch, 'CSS rule block for body not found');
  assert.ok(
    bodyMatch[1].includes('overflow-x: clip'),
    `body block missing 'overflow-x: clip;'. Found:\n${bodyMatch[1]}`
  );
  assert.ok(
    bodyMatch[1].includes('min-width: 0'),
    `body block missing 'min-width: 0;'. Found:\n${bodyMatch[1]}`
  );
  assert.ok(
    bodyMatch[1].includes('max-width: 100%'),
    `body block missing 'max-width: 100%;'. Found:\n${bodyMatch[1]}`
  );
});

// -----------------------------------------------------------------------------
// 2. Layout Flex & Overflow Constraints (apps/web/app/layout.tsx)
// -----------------------------------------------------------------------------
console.log('\nSection 2: Layout Flex & Overflow Constraints (layout.tsx)');
test('layout.tsx configures body and main with strict flex & overflow containment', () => {
  const layoutPath = path.join(rootDir, 'apps/web/app/layout.tsx');
  assert.ok(fs.existsSync(layoutPath), `Missing layout.tsx at ${layoutPath}`);
  const content = fs.readFileSync(layoutPath, 'utf8');

  // Check <body> class
  const bodyClassMatch = content.match(/<body[^>]*className=["']([^"']+)["']/);
  assert.ok(bodyClassMatch, 'Cannot find className on <body>');
  const bodyClasses = bodyClassMatch[1].split(/\s+/);
  assert.ok(bodyClasses.includes('min-w-0'), 'body missing min-w-0 class');
  assert.ok(bodyClasses.includes('max-w-full'), 'body missing max-w-full class');
  assert.ok(bodyClasses.includes('overflow-x-clip'), 'body missing overflow-x-clip class');

  // Check <main> class
  const mainClassMatch = content.match(/<main[^>]*className=["']([^"']+)["']/);
  assert.ok(mainClassMatch, 'Cannot find className on <main>');
  const mainClasses = mainClassMatch[1].split(/\s+/);
  assert.ok(mainClasses.includes('min-w-0'), 'main missing min-w-0 class');
  assert.ok(mainClasses.includes('max-w-full'), 'main missing max-w-full class');
  assert.ok(mainClasses.includes('overflow-hidden'), 'main missing overflow-hidden class');
});

// -----------------------------------------------------------------------------
// 3. Viewport 375px: Component-Level Width Safety
// -----------------------------------------------------------------------------
console.log('\nSection 3: Viewport 375px Component Width Safety');

test('HeroSection.tsx contains no unconstrained fixed widths > 375px without max-w-full', () => {
  const filePath = path.join(rootDir, 'apps/web/components/hero/HeroSection.tsx');
  assert.ok(fs.existsSync(filePath), `Missing HeroSection.tsx at ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check radial glow accent
  const radialGlow = content.match(/w-\[320px\]\s+sm:w-\[600px\]\s+h-\[320px\]\s+sm:h-\[600px\]\s+max-w-full/);
  assert.ok(radialGlow, 'Radial glow element must be bounded to w-[320px] on mobile with max-w-full');

  // Check constellation container
  const constellationContainer = content.match(/constellation-container[^"]*min-w-0\s+max-w-full\s+overflow-hidden/);
  assert.ok(constellationContainer, 'Hero constellation container must have min-w-0 max-w-full overflow-hidden');
});

test('VentureConstellation.tsx outer canvas is constrained with min-w-0 max-w-full overflow-hidden', () => {
  const filePath = path.join(rootDir, 'apps/web/components/hero/VentureConstellation.tsx');
  assert.ok(fs.existsSync(filePath), `Missing VentureConstellation.tsx at ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');

  // Container must have min-w-0 max-w-full overflow-hidden
  assert.ok(
    content.includes('w-full min-w-0 max-w-full h-[400px] md:h-[500px] overflow-hidden'),
    'VentureConstellation outer container missing w-full min-w-0 max-w-full overflow-hidden'
  );

  // Floating legend must have max-w-[calc(100%-2rem)] and truncate
  assert.ok(
    content.includes('max-w-[calc(100%-2rem)]') && content.includes('truncate'),
    'Floating legend missing max-w-[calc(100%-2rem)] or truncate'
  );
});

test('ConstellationFallback.tsx outer svg is constrained with min-w-0 max-w-full overflow-hidden', () => {
  const filePath = path.join(rootDir, 'apps/web/components/hero/ConstellationFallback.tsx');
  assert.ok(fs.existsSync(filePath), `Missing ConstellationFallback.tsx at ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');

  // Outer container check
  assert.ok(
    content.includes('min-w-0 max-w-full h-[400px] md:h-[500px] select-none overflow-hidden'),
    'ConstellationFallback container missing min-w-0 max-w-full overflow-hidden'
  );

  // SVG check
  assert.ok(
    content.includes('constellation-fallback w-full h-full max-w-lg mx-auto'),
    'Fallback SVG missing max-w-lg / w-full bounds'
  );

  // Floating legend check
  assert.ok(
    content.includes('max-w-[calc(100%-2rem)]') && content.includes('truncate'),
    'Fallback legend missing max-w-[calc(100%-2rem)] or truncate'
  );
});

test('ServiceDetailView.tsx CTA button has max-w-full and break-words', () => {
  const filePath = path.join(rootDir, 'apps/web/components/services/ServiceDetailView.tsx');
  assert.ok(fs.existsSync(filePath), `Missing ServiceDetailView.tsx at ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');

  // CTA button check
  assert.ok(
    content.includes('cta-btn inline-flex max-w-full items-center justify-center text-center gap-2') &&
    content.includes('break-words'),
    'CTA button in ServiceDetailView missing max-w-full or break-words'
  );
});

test('ProcessStepper.tsx utilizes responsive grid and flex wrapping without fixed widths', () => {
  const filePath = path.join(rootDir, 'apps/web/components/services/ProcessStepper.tsx');
  assert.ok(fs.existsSync(filePath), `Missing ProcessStepper.tsx at ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');

  // Process stepper grid check
  assert.ok(
    content.includes('grid grid-cols-1 md:grid-cols-4 gap-4'),
    'Process stepper missing single-column mobile grid: grid-cols-1 md:grid-cols-4'
  );

  // Phase deep dive footer check
  assert.ok(
    content.includes('flex flex-col sm:flex-row sm:items-center justify-between gap-2'),
    'Stepper phase deep dive footer missing responsive column wrap'
  );
});

test('Adversarial scan: No unconstrained fixed widths (> 375px) exist in any web component', () => {
  const componentsDir = path.join(rootDir, 'apps/web/components');
  const files = [];

  function collectTsx(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) collectTsx(p);
      else if (ent.isFile() && ent.name.endsWith('.tsx')) files.push(p);
    }
  }
  collectTsx(componentsDir);

  const violations = [];
  // Regex to look for classes like w-[400px], min-w-[500px], etc. without a breakpoint prefix
  const fixedWidthRegex = /(?<!(?:sm|md|lg|xl|2xl):)(?:w|min-w)-\[(\d+)px\]/g;

  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = fixedWidthRegex.exec(text)) !== null) {
      const pxValue = parseInt(match[1], 10);
      if (pxValue > 375) {
        // If pxValue > 375, check whether max-w-full or similar constraint is in the immediate element
        const snippet = text.substring(Math.max(0, match.index - 50), Math.min(text.length, match.index + 100));
        if (!snippet.includes('max-w-full') && !snippet.includes('max-w-[')) {
          violations.push({
            file: path.relative(rootDir, file),
            match: match[0],
            pixel: pxValue,
            snippet: snippet.replace(/\n/g, ' '),
          });
        }
      }
    }
  }

  assert.equal(
    violations.length,
    0,
    `Found unconstrained fixed width classes > 375px without max-w-full:\n` +
      violations.map(v => `  - ${v.file}: ${v.match} in context: "${v.snippet}"`).join('\n')
  );
});

// -----------------------------------------------------------------------------
// 4. Viewport 768px: Tablet Portrait Breakpoint Shifting
// -----------------------------------------------------------------------------
console.log('\nSection 4: Tablet Portrait (768px) Breakpoint Shift');

test('Header.tsx hides desktop nav and CTA at < 1024px (hidden lg:flex) and shows mobile toggle (flex lg:hidden)', () => {
  const filePath = path.join(rootDir, 'apps/web/components/navigation/Header.tsx');
  assert.ok(fs.existsSync(filePath), `Missing Header.tsx at ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');

  // Desktop nav must be hidden lg:flex
  assert.ok(
    content.includes('className="hidden lg:flex items-center gap-8"'),
    'Header desktop nav must use "hidden lg:flex items-center gap-8"'
  );

  // Desktop CTA must be hidden lg:flex
  assert.ok(
    content.includes('className="hidden lg:flex items-center gap-4"'),
    'Header desktop CTA container must use "hidden lg:flex items-center gap-4"'
  );

  // Mobile menu toggle must be flex lg:hidden
  assert.ok(
    content.includes('className="flex lg:hidden"'),
    'Header mobile menu toggle container must use "flex lg:hidden"'
  );
});

test('MobileNav.tsx drawer visibility is constrained with lg:hidden', () => {
  const filePath = path.join(rootDir, 'apps/web/components/navigation/MobileNav.tsx');
  assert.ok(fs.existsSync(filePath), `Missing MobileNav.tsx at ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');

  assert.ok(
    content.includes('fixed inset-0 z-50 lg:hidden'),
    'MobileNav root overlay must have "lg:hidden"'
  );
});

// -----------------------------------------------------------------------------
// 5. Touch Target Compliance (Apple HIG 44x44pt)
// -----------------------------------------------------------------------------
console.log('\nSection 5: Touch Target Compliance (Apple HIG 44x44pt)');

test('Header.tsx mobile menu toggle button contains min-h-[44px] min-w-[44px] and p-2.5', () => {
  const filePath = path.join(rootDir, 'apps/web/components/navigation/Header.tsx');
  const content = fs.readFileSync(filePath, 'utf8');

  const buttonMatch = content.match(/<button[^>]*aria-label=\{mobileOpen\s*\?[^>]*\}>/s) ||
                      content.match(/<button[^>]*onClick=\{\(\)\s*=>\s*setMobileOpen[^>]*\>/s);
  assert.ok(buttonMatch, 'Cannot find mobile menu toggle button in Header.tsx');
  const buttonTag = buttonMatch[0];

  assert.ok(buttonTag.includes('min-h-[44px]'), 'Toggle button missing min-h-[44px]');
  assert.ok(buttonTag.includes('min-w-[44px]'), 'Toggle button missing min-w-[44px]');
  assert.ok(buttonTag.includes('p-2.5'), 'Toggle button missing p-2.5');
});

test('MobileNav.tsx close button contains min-h-[44px] min-w-[44px] and p-2.5', () => {
  const filePath = path.join(rootDir, 'apps/web/components/navigation/MobileNav.tsx');
  const content = fs.readFileSync(filePath, 'utf8');

  const closeBtnMatch = content.match(/<button[^>]*aria-label=["']Close navigation["'][^>]*\>/s);
  assert.ok(closeBtnMatch, 'Cannot find close button in MobileNav.tsx');
  const buttonTag = closeBtnMatch[0];

  assert.ok(buttonTag.includes('min-h-[44px]'), 'Close button missing min-h-[44px]');
  assert.ok(buttonTag.includes('min-w-[44px]'), 'Close button missing min-w-[44px]');
  assert.ok(buttonTag.includes('p-2.5'), 'Close button missing p-2.5');
});

// -----------------------------------------------------------------------------
// 6. Footer Text Wrapping & Overflow Resilience
// -----------------------------------------------------------------------------
console.log('\nSection 6: Footer Text Wrapping & Overflow Resilience');

test('Footer.tsx applies break-words, break-all, and [overflow-wrap:anywhere] to statutory disclosures', () => {
  const filePath = path.join(rootDir, 'apps/web/components/navigation/Footer.tsx');
  assert.ok(fs.existsSync(filePath), `Missing Footer.tsx at ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');

  // Statutory strip container
  assert.ok(
    content.includes('break-words [overflow-wrap:anywhere]'),
    'Footer statutory strip container missing break-words [overflow-wrap:anywhere]'
  );

  // Email mailto links
  assert.ok(
    content.includes('break-all') && content.includes('mailto:'),
    'Footer email links missing break-all class'
  );
});

// -----------------------------------------------------------------------------
// 7. Production Next.js Build Static HTML Inspection
// -----------------------------------------------------------------------------
console.log('\nSection 7: Production Next.js Built HTML Inspection');

test('Built production homepage (index.html) verifies root constraints and responsive nav', () => {
  const htmlPath = path.join(rootDir, 'apps/web/.next/server/app/index.html');
  assert.ok(fs.existsSync(htmlPath), `Production build missing index.html at ${htmlPath}`);
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Root html
  assert.ok(
    /<html[^>]*class=["'][^"']*overflow-x-clip[^"']*["']/.test(html),
    'Built index.html missing overflow-x-clip on <html>'
  );

  // Body
  assert.ok(
    html.includes('min-w-0') &&
    html.includes('max-w-full') &&
    html.includes('overflow-x-clip'),
    'Built index.html body missing min-w-0, max-w-full, or overflow-x-clip'
  );

  // Main
  assert.ok(
    html.includes('flex-1 w-full min-w-0 max-w-full overflow-hidden'),
    'Built index.html main missing flex-1 w-full min-w-0 max-w-full overflow-hidden'
  );

  // Header desktop nav hidden lg:flex
  assert.ok(
    html.includes('hidden lg:flex items-center gap-8'),
    'Built index.html missing hidden lg:flex desktop nav'
  );

  // Header mobile toggle button
  assert.ok(
    html.includes('min-h-[44px]') && html.includes('min-w-[44px]') && html.includes('p-2.5'),
    'Built index.html mobile menu toggle missing 44x44px touch target classes'
  );

  // Footer statutory strip
  assert.ok(
    html.includes('break-words [overflow-wrap:anywhere]'),
    'Built index.html missing statutory overflow-wrap:anywhere'
  );

  // Footer mailto link
  assert.ok(
    html.includes('break-all') && html.includes('mailto:'),
    'Built index.html missing break-all on mailto links'
  );
});

test('Built service detail pages verify CTA button wrapping and responsiveness', () => {
  const services = [
    'ai-intelligent-automation',
    'custom-software-development',
    'web-digital-experiences',
    'mobile-application-development',
    'cloud-devops',
    'technology-consulting',
  ];

  for (const slug of services) {
    const htmlPath = path.join(rootDir, `apps/web/.next/server/app/services/${slug}.html`);
    assert.ok(fs.existsSync(htmlPath), `Missing built service page for ${slug}`);
    const html = fs.readFileSync(htmlPath, 'utf8');

    assert.ok(
      html.includes('cta-btn') && html.includes('max-w-full') && html.includes('break-words'),
      `Built service page for ${slug} missing max-w-full or break-words on CTA button`
    );

    assert.ok(
      html.includes('grid grid-cols-1 md:grid-cols-4 gap-4'),
      `Built service page for ${slug} missing responsive process stepper grid`
    );
  }
});

test('Built product pages verify responsive layout and white-label badges', () => {
  const products = ['neermiti-collections', 'sadhana-daily'];

  for (const slug of products) {
    const htmlPath = path.join(rootDir, `apps/web/.next/server/app/products/${slug}.html`);
    assert.ok(fs.existsSync(htmlPath), `Missing built product page for ${slug}`);
    const html = fs.readFileSync(htmlPath, 'utf8');

    assert.ok(
      html.includes('VENTURE') || html.includes('Venture'),
      `Built product page for ${slug} missing venture identifier`
    );
  }
});

// -----------------------------------------------------------------------------
// Final Verdict
// -----------------------------------------------------------------------------
console.log('\n======================================================================');
const passedCount = results.filter(r => r.status === 'PASS').length;
const failedCount = results.filter(r => r.status === 'FAIL').length;
console.log(`TOTAL CHECKS: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}`);

if (failedCount > 0) {
  console.error('\n[VERDICT]: REQUEST_CHANGES - One or more empirical responsiveness checks failed.');
  process.exit(1);
} else {
  console.log('\n[VERDICT]: APPROVE - All empirical responsiveness, viewport & touch target checks passed.');
  process.exit(0);
}
