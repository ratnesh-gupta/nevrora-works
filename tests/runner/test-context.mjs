/**
 * Test Context Manager
 * Resolves live vs in-process mock dispatchers, providing unified Web and API HttpClients.
 */

import { CONFIG } from './config.mjs';
import { HttpClient } from './http-client.mjs';
import { dispatchMockRequest } from './mock-server.mjs';

async function isServerAlive(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(1000) });
    return res.status < 500;
  } catch {
    return false;
  }
}

export async function getTestContext() {
  if (CONFIG.targetMode === 'live') {
    return {
      webClient: new HttpClient(CONFIG.webUrl),
      apiClient: new HttpClient(CONFIG.apiUrl),
      webUrl: CONFIG.webUrl,
      apiUrl: CONFIG.apiUrl,
      mode: 'live',
      cleanup: async () => {},
    };
  }

  if (CONFIG.targetMode === 'auto') {
    const webAlive = await isServerAlive(CONFIG.webUrl);
    const apiAlive = await isServerAlive(`${CONFIG.apiUrl}/health`);
    if (webAlive && apiAlive) {
      return {
        webClient: new HttpClient(CONFIG.webUrl),
        apiClient: new HttpClient(CONFIG.apiUrl),
        webUrl: CONFIG.webUrl,
        apiUrl: CONFIG.apiUrl,
        mode: 'live',
        cleanup: async () => {},
      };
    }
  }

  // Direct in-process mock dispatcher (safe in sandbox and zero external network dependencies)
  return {
    webClient: new HttpClient('http://localhost:3000', dispatchMockRequest),
    apiClient: new HttpClient('http://localhost:8000', dispatchMockRequest),
    webUrl: 'http://localhost:3000',
    apiUrl: 'http://localhost:8000',
    mode: 'in-process-mock',
    cleanup: async () => {},
  };
}

export async function teardownTestContext() {
  // Teardown resources if any
}
