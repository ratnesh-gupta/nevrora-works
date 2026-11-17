/**
 * Assertion Library for E2E Tests
 * Extends node:assert/strict with domain-specific diagnostic helpers.
 */

import assert from 'node:assert/strict';
import { SPEC_CONSTANTS } from './config.mjs';

export { assert };

/**
 * Asserts HTTP response status code matches expected status.
 */
export function assertStatus(response, expectedStatus, customMessage = '') {
  const msg = customMessage || `Expected HTTP status ${expectedStatus}, received ${response.status} for ${response.url || 'request'}. Body: ${typeof response.body === 'object' ? JSON.stringify(response.body) : response.text?.slice(0, 200)}`;
  assert.equal(response.status, expectedStatus, msg);
}

/**
 * Asserts HTTP response header exists and matches pattern/value.
 */
export function assertHeader(response, headerName, expectedValueOrRegex, customMessage = '') {
  const actualValue = response.headers.get(headerName);
  const msg = customMessage || `Expected header '${headerName}' on ${response.url}`;
  assert.ok(actualValue !== null && actualValue !== undefined, `${msg}: header missing`);

  if (expectedValueOrRegex instanceof RegExp) {
    assert.match(actualValue, expectedValueOrRegex, `${msg}: expected pattern ${expectedValueOrRegex}, got '${actualValue}'`);
  } else if (expectedValueOrRegex !== undefined) {
    assert.equal(actualValue, expectedValueOrRegex, `${msg}: expected '${expectedValueOrRegex}', got '${actualValue}'`);
  }
}

/**
 * Asserts text contains expected substring.
 */
export function assertContainsText(haystack, needle, customMessage = '') {
  const msg = customMessage || `Expected text to contain '${needle}'`;
  assert.ok(haystack && haystack.includes(needle), msg);
}

/**
 * Asserts text does not contain forbidden substring.
 */
export function assertNotContainsText(haystack, needle, customMessage = '') {
  const msg = customMessage || `Forbidden text '${needle}' found in document`;
  assert.ok(!haystack || !haystack.includes(needle), msg);
}

/**
 * Asserts corporate footer conforms to Companies Act 2013 Rule 26.
 */
export function assertRule26Compliant(htmlOrText) {
  const text = String(htmlOrText);
  assertContainsText(text, SPEC_CONSTANTS.statutory.legalName, 'Rule 26: Legal Name missing');
  assertContainsText(text, SPEC_CONSTANTS.statutory.cin, 'Rule 26: CIN missing');
  assertContainsText(text, SPEC_CONSTANTS.statutory.registeredOffice, 'Rule 26: Registered Office missing');
  assertContainsText(text, SPEC_CONSTANTS.statutory.phone, 'Rule 26: Phone missing');
  assertContainsText(text, SPEC_CONSTANTS.statutory.email, 'Rule 26: Email missing');
  assertContainsText(text, SPEC_CONSTANTS.statutory.grievanceEmail, 'Rule 26: Grievance Contact Email missing');
}

/**
 * Asserts privacy document conforms to DPDP Act 2023.
 */
export function assertDPDPActCompliant(htmlOrText) {
  const text = String(htmlOrText).toLowerCase();
  assert.ok(
    text.includes('digital personal data protection') || text.includes('dpdp act') || text.includes('dpdp'),
    'DPDP Act reference missing from privacy document'
  );
  assert.ok(
    text.includes('data principal') || text.includes('principal'),
    'DPDP Act Data Principal terminology missing'
  );
  assert.ok(
    text.includes('grievance') || text.includes('grievance officer'),
    'DPDP Act Grievance Redressal mechanism missing'
  );
  assert.ok(
    text.includes('ratnesh') || text.includes('ratnesh.k.gupta@icloud.com'),
    'DPDP Act designated Grievance Officer details missing'
  );
}
