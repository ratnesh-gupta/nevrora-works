/**
 * Tier 4: Real-World Scenarios - User Inquiry Submission Journey
 * Simulates end-to-end journey of an entrepreneur or prospective partner:
 * Home -> Service Exploration -> CTA Navigation -> Form Completion -> Submission.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';
import { HtmlInspector } from '../../runner/html-parser.mjs';

describe('Tier 4: Scenario 1 - Complete User Inquiry Submission Journey', async () => {
  const context = await getTestContext();
  const { webClient, apiClient } = context;

  it('executes full journey from homepage discovery through confirmed inquiry submission', async () => {
    // 1. Visit landing page
    const homeRes = await webClient.get('/');
    assertStatus(homeRes, 200);
    const homeInspector = new HtmlInspector(homeRes.text);
    assert.ok(homeInspector.hasLinkTo('/services'), 'Homepage must link to services overview');

    // 2. Navigate to services directory
    const servicesRes = await webClient.get('/services');
    assertStatus(servicesRes, 200);
    const servicesInspector = new HtmlInspector(servicesRes.text);
    assert.ok(
      servicesInspector.hasLinkTo('/services/web-digital-experiences'),
      'Services listing must link to Web & Digital Experiences'
    );

    // 3. Inspect specific service details
    const serviceDetailRes = await webClient.get('/services/web-digital-experiences');
    assertStatus(serviceDetailRes, 200);
    const serviceInspector = new HtmlInspector(serviceDetailRes.text);

    // 4. Follow CTA link to contact form
    const contactLink = serviceInspector.findLink(l => l.href.startsWith('/contact'));
    assert.ok(contactLink, 'Service detail must provide contact CTA');

    const contactPageRes = await webClient.get(contactLink.href);
    assertStatus(contactPageRes, 200);

    // 5. Submit realistic enterprise inquiry payload
    const submissionPayload = {
      name: 'Kavita Singhania',
      email: 'kavita@retailbrand.com',
      organization: 'Singhania Retail',
      type: 'Business collaboration',
      message: 'We want to overhaul our omnichannel e-commerce digital experience with immersive 3D product interactions.',
    };

    const submitRes = await apiClient.post('/api/contact', submissionPayload);
    assertStatus(submitRes, 200);
    assert.equal(submitRes.body.success, true);
    assert.ok(submitRes.body.message, 'Inquiry acknowledgment message expected');
  });
});
