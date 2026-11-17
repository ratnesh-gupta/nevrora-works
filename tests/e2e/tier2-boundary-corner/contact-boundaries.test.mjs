/**
 * Tier 2: Boundary & Corner Cases - Contact Validation Boundaries
 * Tests exact message length thresholds (< 20 rejected, >= 20 accepted),
 * email format edge cases, and inquiry category enums.
 */

import { describe, it, beforeEach } from 'node:test';
import { assert, assertStatus } from '../../runner/assertions.mjs';
import { getTestContext } from '../../runner/test-context.mjs';
import { resetRateLimitStore } from '../../runner/mock-server.mjs';

describe('Tier 2: Contact Form Validation Boundaries', async () => {
  const context = await getTestContext();
  const { apiClient } = context;

  beforeEach(() => {
    resetRateLimitStore();
  });

  const validBasePayload = {
    name: 'Rohit Sharma',
    email: 'rohit@example.com',
    type: 'Venture idea',
  };

  it('rejects message with exactly 19 characters (< 20 threshold)', async () => {
    const payload = {
      ...validBasePayload,
      message: '1234567890123456789', // Exactly 19 characters
    };

    const res = await apiClient.post('/api/contact', payload);
    assertStatus(res, 400, 'Message with 19 characters must be rejected');
    assert.equal(res.body.success, false);
  });

  it('accepts message with exactly 20 characters (>= 20 threshold)', async () => {
    const payload = {
      ...validBasePayload,
      message: '12345678901234567890', // Exactly 20 characters
    };

    const res = await apiClient.post('/api/contact', payload);
    assertStatus(res, 200, 'Message with exactly 20 characters must be accepted');
    assert.equal(res.body.success, true);
  });

  it('accepts message with 21 characters', async () => {
    const payload = {
      ...validBasePayload,
      message: '123456789012345678901', // Exactly 21 characters
    };

    const res = await apiClient.post('/api/contact', payload);
    assertStatus(res, 200);
    assert.equal(res.body.success, true);
  });

  it('rejects message containing only whitespace even if length >= 20', async () => {
    const payload = {
      ...validBasePayload,
      message: '                         ', // 25 spaces
    };

    const res = await apiClient.post('/api/contact', payload);
    assertStatus(res, 400, 'Whitespace-only message must be rejected');
    assert.equal(res.body.success, false);
  });

  it('handles large message payloads (5,000 characters) cleanly', async () => {
    const largeMessage = 'A'.repeat(5000);
    const payload = {
      ...validBasePayload,
      message: largeMessage,
    };

    const res = await apiClient.post('/api/contact', payload);
    assertStatus(res, 200);
    assert.equal(res.body.success, true);
  });

  it('rejects diverse invalid email formats', async () => {
    const invalidEmails = [
      'plainaddress',
      '@missingusername.com',
      'username@.com',
      'username@domain..com',
      'username with spaces@domain.com',
      'user@domain,com',
    ];

    for (const invalidEmail of invalidEmails) {
      const payload = {
        ...validBasePayload,
        email: invalidEmail,
        message: 'Valid message exceeding twenty characters.',
      };

      const res = await apiClient.post('/api/contact', payload);
      assertStatus(res, 400, `Invalid email '${invalidEmail}' was improperly accepted`);
      assert.equal(res.body.success, false);
    }
  });

  it('accepts complex valid email formats (tags, subdomains, regional TLDs)', async () => {
    const validEmails = [
      'user.name+tag@subdomain.example.com',
      'partner_contact@venture.co.in',
      'operations@nevrora.tech',
    ];

    for (const validEmail of validEmails) {
      const payload = {
        ...validBasePayload,
        email: validEmail,
        message: 'Valid message exceeding twenty characters.',
      };

      const res = await apiClient.post('/api/contact', payload);
      assertStatus(res, 200, `Valid email '${validEmail}' was rejected`);
      assert.equal(res.body.success, true);
    }
  });

  it('rejects unauthorized or unknown inquiry types', async () => {
    const payload = {
      ...validBasePayload,
      type: 'Unknown Category Not In Spec',
      message: 'Valid message exceeding twenty characters.',
    };

    const res = await apiClient.post('/api/contact', payload);
    assertStatus(res, 400, 'Unauthorized inquiry category must be rejected');
    assert.equal(res.body.success, false);
  });
});
