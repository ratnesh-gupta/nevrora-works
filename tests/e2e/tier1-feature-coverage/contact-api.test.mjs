/**
 * Tier 1: Feature Coverage - Contact Form & API Validation
 * Tests contact submission endpoint, Zod validation, and web form structure.
 */

import { describe, it } from 'node:test';
import { assert, assertStatus } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';
import { HtmlInspector } from '../../runner/html-parser.mjs';
import { SPEC_CONSTANTS } from '../../runner/config.mjs';

describe('Tier 1: Contact Form & API Validation', async () => {
  const context = await getTestContext();
  const { webClient, apiClient } = context;

  it('submits valid contact form inquiry with all fields successfully', async () => {
    const payload = {
      name: 'Aditi Rao',
      email: 'aditi.rao@example.com',
      organization: 'Venture Studio Inc',
      type: 'Venture idea',
      message: 'We are seeking an architectural evaluation and technical diligence for our platform.',
    };

    const res = await apiClient.post('/api/contact', payload);
    assertStatus(res, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.message, 'Success message must be returned');
  });

  it('submits valid contact inquiry without optional organization field', async () => {
    const payload = {
      name: 'Vikram Mehta',
      email: 'vikram.m@domain.co.in',
      type: 'Strategic partnership',
      message: 'Looking forward to discussing strategic alignment on cloud and edge services.',
    };

    const res = await apiClient.post('/api/contact', payload);
    assertStatus(res, 200);
    assert.equal(res.body.success, true);
  });

  it('accepts all 4 supported inquiry types from specification', async () => {
    for (const inquiryType of SPEC_CONSTANTS.inquiryTypes) {
      const payload = {
        name: `Inquirer for ${inquiryType}`,
        email: 'inquiry.test@example.com',
        type: inquiryType,
        message: `Detailed test message for inquiry category ${inquiryType} satisfying the minimum length requirement.`,
      };

      const res = await apiClient.post('/api/contact', payload);
      assertStatus(res, 200, `Failed submitting with inquiry type: ${inquiryType}`);
      assert.equal(res.body.success, true);
    }
  });

  it('rejects submissions with missing required fields with HTTP 400', async () => {
    const invalidPayloads = [
      { email: 'test@example.com', type: 'Venture idea', message: 'Message meeting the 20 character length requirement.' }, // Missing name
      { name: 'Test User', type: 'Venture idea', message: 'Message meeting the 20 character length requirement.' }, // Missing email
      { name: 'Test User', email: 'test@example.com', message: 'Message meeting the 20 character length requirement.' }, // Missing type
      { name: 'Test User', email: 'test@example.com', type: 'Venture idea' }, // Missing message
    ];

    for (const invalidPayload of invalidPayloads) {
      const res = await apiClient.post('/api/contact', invalidPayload);
      assertStatus(res, 400, 'Expected HTTP 400 when required fields are missing');
      assert.equal(res.body.success, false);
    }
  });

  it('verifies /contact page renders interactive form and required fields', async () => {
    const res = await webClient.get('/contact');
    assertStatus(res, 200);

    const inspector = new HtmlInspector(res.text);
    const formFields = inspector.getFormFields();
    const fieldNames = formFields.map(f => f.name);

    assert.ok(fieldNames.includes('name'), 'Name input missing on contact form');
    assert.ok(fieldNames.includes('email'), 'Email input missing on contact form');
    assert.ok(fieldNames.includes('type'), 'Type selector missing on contact form');
    assert.ok(fieldNames.includes('message'), 'Message textarea missing on contact form');
  });
});
