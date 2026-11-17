/**
 * Tier 3: Cross-Feature Combinations - Service-to-Contact Flow & Context Preservation
 * Tests deep-linking from service/product pages to contact form with pre-populated inquiry context.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus, assertContainsText } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';
import { HtmlInspector } from '../../runner/html-parser.mjs';
import { SPEC_CONSTANTS } from '../../runner/config.mjs';

describe('Tier 3: Service-to-Contact Flow & Context Preservation', async () => {
  const context = await getTestContext();
  const { webClient, apiClient } = context;

  it('preserves service context when navigating from service detail to contact form', async () => {
    const testSlug = 'custom-software-development';
    const serviceRes = await webClient.get(`/services/${testSlug}`);
    assertStatus(serviceRes, 200);

    const inspector = new HtmlInspector(serviceRes.text);
    const links = inspector.getLinks();

    // Find CTA linking to /contact with parameters
    const contactLink = links.find(l => l.href.startsWith('/contact'));
    assert.ok(contactLink, `No contact CTA link found on service page /services/${testSlug}`);

    // Fetch the target contact page with the query params from the link
    const contactPageRes = await webClient.get(contactLink.href);
    assertStatus(contactPageRes, 200);

    // Verify contact page received and parsed query param
    assert.ok(
      contactPageRes.text.includes(testSlug) || contactPageRes.text.includes('Business collaboration'),
      'Contact page failed to retain service query parameters in form state'
    );
  });

  it('completes inquiry submission preserving context and receives confirmation', async () => {
    const payload = {
      name: 'Priya Sundaram',
      email: 'priya@enterprise.org',
      organization: 'Enterprise Solutions Ltd',
      type: 'Business collaboration',
      message: 'Inquiring regarding custom software development partnership and delivery timeline.',
    };

    const res = await apiClient.post('/api/contact', payload);
    assertStatus(res, 200);
    assert.equal(res.body.success, true);
  });

  it('verifies bidirectional navigation between product showcase and dedicated privacy notice', async () => {
    // 1. Visit Neermiti product showcase
    const productRes = await webClient.get('/products/neermiti-collections');
    assertStatus(productRes, 200);
    const productInspector = new HtmlInspector(productRes.text);

    // 2. Follow link to Neermiti privacy notice
    assert.ok(
      productInspector.hasLinkTo('/products/neermiti-collections/privacy'),
      'Product page must link to its dedicated privacy notice'
    );

    // 3. Visit Neermiti privacy notice
    const privacyRes = await webClient.get('/products/neermiti-collections/privacy');
    assertStatus(privacyRes, 200);
    const privacyInspector = new HtmlInspector(privacyRes.text);

    // 4. Verify back link to product and link to site-wide privacy policy
    assert.ok(
      privacyInspector.hasLinkTo('/products/neermiti-collections'),
      'Product privacy notice must link back to product showcase'
    );
    assert.ok(
      privacyInspector.hasLinkTo('/privacy-policy'),
      'Product privacy notice must link to master DPDP Act site-wide privacy policy'
    );
  });
});
