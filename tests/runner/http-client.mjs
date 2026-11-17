/**
 * Resilient HTTP Client for E2E Tests
 * Supports both standard fetch and direct in-process mock dispatch.
 */

import { CONFIG } from './config.mjs';

export class HttpClient {
  constructor(baseUrl = '', dispatchHandler = null) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.dispatchHandler = dispatchHandler;
  }

  async request(path, options = {}) {
    const url = path.startsWith('http://') || path.startsWith('https://')
      ? path
      : `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;

    const method = (options.method || 'GET').toUpperCase();
    const headers = new Headers(options.headers || {});

    let body = options.body;
    if (body && typeof body === 'object' && !(body instanceof FormData)) {
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
      body = JSON.stringify(body);
    }

    const startTime = Date.now();

    // Use direct in-process dispatcher if configured (sandbox-safe)
    if (this.dispatchHandler) {
      const result = await this.dispatchHandler({
        url,
        method,
        headers,
        body,
        clientIp: options.clientIp || headers.get('x-forwarded-for') || '127.0.0.1',
      });
      return {
        ...result,
        durationMs: Date.now() - startTime,
      };
    }

    // Otherwise execute standard network fetch
    const timeoutMs = options.timeoutMs || CONFIG.requestTimeoutMs;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        method,
        headers,
        body,
        signal: controller.signal,
      });

      const rawText = await response.text();
      let parsedBody = null;
      try {
        parsedBody = JSON.parse(rawText);
      } catch {
        parsedBody = rawText;
      }

      return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: parsedBody,
        text: rawText,
        ok: response.ok,
        url: response.url || url,
        durationMs: Date.now() - startTime,
      };
    } catch (err) {
      if (err.name === 'AbortError') {
        throw new Error(`HTTP request timed out after ${timeoutMs}ms: ${url}`);
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get(path, options = {}) {
    return this.request(path, { ...options, method: 'GET' });
  }

  async post(path, body, options = {}) {
    return this.request(path, { ...options, method: 'POST', body });
  }

  async put(path, body, options = {}) {
    return this.request(path, { ...options, method: 'PUT', body });
  }

  async delete(path, options = {}) {
    return this.request(path, { ...options, method: 'DELETE' });
  }
}
