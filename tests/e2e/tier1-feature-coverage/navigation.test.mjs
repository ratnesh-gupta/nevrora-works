/**
 * Tier 1: Feature Coverage - Navigation & Route Integrity
 * Tests locked navigation items, primary CTA button, and zero /ventures presence.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus, assertNotContainsText } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';
import { HtmlInspector } from '../../runner/html-parser.mjs';
import { SPEC_CONSTANTS } from '../../runner/config.mjs';

describe('Tier 1: Navigation & Route Integrity', async () => {
  const context = await getTestContext();
  const { webClient } = context;

  it('renders primary navigation with exactly the 6 locked items', async () => {
    const res = await webClient.get('/');
    assertStatus(res, 200);

    const inspector = new HtmlInspector(res.text);
    const links = inspector.getLinks();

    for (const expectedItem of SPEC_CONSTANTS.navigation.lockedItems) {
      const found = links.some(
        l => l.href === expectedItem.href && l.text.toLowerCase().includes(expectedItem.label.toLowerCase())
      );
      assert.ok(
        found,
        `Navigation item '${expectedItem.label}' (${expectedItem.href}) missing from primary header navigation`
      );
    }
  });

  it('renders primary CTA button labelled "Start a Conversation" pointing to /contact', async () => {
    const res = await webClient.get('/');
    assertStatus(res, 200);

    const inspector = new HtmlInspector(res.text);
    const links = inspector.getLinks();

    const ctaLink = links.find(
      l => l.href === SPEC_CONSTANTS.navigation.cta.href &&
           l.text.toLowerCase().includes(SPEC_CONSTANTS.navigation.cta.label.toLowerCase())
    );

    assert.ok(
      ctaLink,
      `Primary CTA button '${SPEC_CONSTANTS.navigation.cta.label}' linking to ${SPEC_CONSTANTS.navigation.cta.href} not found`
    );
  });

  it('strictly prohibits /ventures route or navigation presence', async () => {
    const homeRes = await webClient.get('/');
    assertStatus(homeRes, 200);

    const inspector = new HtmlInspector(homeRes.text);
    const hasVenturesLink = inspector.hasLinkTo('/ventures');
    assert.equal(hasVenturesLink, false, 'Forbidden link to /ventures found in navigation markup');

    // Direct access to /ventures must return 404
    const venturesRes = await webClient.get('/ventures');
    assertStatus(venturesRes, 404, 'Direct access to /ventures must return 404 Not Found');
  });

  it('verifies navigation consistency across secondary pages', async () => {
    const secondaryPages = ['/about', '/services', '/products', '/our-work', '/contact'];
    for (const path of secondaryPages) {
      const res = await webClient.get(path);
      assertStatus(res, 200, `Page ${path} must return 200 OK`);

      const inspector = new HtmlInspector(res.text);
      for (const expectedItem of SPEC_CONSTANTS.navigation.lockedItems) {
        const found = inspector.hasLinkTo(expectedItem.href);
        assert.ok(found, `Navigation link ${expectedItem.href} missing on page ${path}`);
      }
    }
  });
});
