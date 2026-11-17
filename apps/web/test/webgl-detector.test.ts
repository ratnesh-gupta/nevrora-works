import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  supportsWebGL,
  isWebGLAvailable,
  prefersReducedMotion,
} from "../components/hero/webglDetector";

describe("WebGL and Motion Detection Unit Tests", () => {
  it("returns false in SSR environment when window is undefined", () => {
    // In Node.js testing environment without global window
    assert.equal(typeof window, "undefined");
    assert.equal(supportsWebGL(), false);
    assert.equal(isWebGLAvailable(), false);
    assert.equal(prefersReducedMotion(), false);
  });

  it("detects WebGL2 rendering context when WebGL2RenderingContext is instantiated", () => {
    // Mock browser DOM classes where WebGL2 does not inherit from WebGLRenderingContext
    class MockWebGLRenderingContextBase {}
    class MockWebGLRenderingContext extends MockWebGLRenderingContextBase {}
    class MockWebGL2RenderingContext extends MockWebGLRenderingContextBase {}

    const mockGL2Instance = new MockWebGL2RenderingContext();

    // Verify empirical fact: WebGL2 is not an instance of WebGLRenderingContext
    assert.equal(
      mockGL2Instance instanceof MockWebGLRenderingContext,
      false,
      "WebGL2 should NOT inherit from WebGLRenderingContext",
    );

    // Mock global window and document
    const originalWindow = globalThis.window;
    const originalDocument = globalThis.document;

    try {
      (globalThis as any).window = {
        WebGLRenderingContext: MockWebGLRenderingContext,
        WebGL2RenderingContext: MockWebGL2RenderingContext,
        matchMedia: () => ({ matches: false }),
      };

      (globalThis as any).document = {
        createElement: (tag: string) => {
          if (tag === "canvas") {
            return {
              getContext: (type: string) => {
                if (type === "webgl2") {
                  return mockGL2Instance;
                }
                return null;
              },
            };
          }
          return {};
        },
      };

      assert.equal(
        supportsWebGL(),
        true,
        "supportsWebGL must return true for WebGL2RenderingContext",
      );
      assert.equal(
        isWebGLAvailable(),
        true,
        "isWebGLAvailable must return true for WebGL2RenderingContext",
      );
    } finally {
      (globalThis as any).window = originalWindow;
      (globalThis as any).document = originalDocument;
    }
  });

  it("detects WebGL1 rendering context when only WebGLRenderingContext is supported", () => {
    class MockWebGLRenderingContextBase {}
    class MockWebGLRenderingContext extends MockWebGLRenderingContextBase {}

    const mockGL1Instance = new MockWebGLRenderingContext();

    const originalWindow = globalThis.window;
    const originalDocument = globalThis.document;

    try {
      (globalThis as any).window = {
        WebGLRenderingContext: MockWebGLRenderingContext,
        matchMedia: () => ({ matches: false }),
      };

      (globalThis as any).document = {
        createElement: (tag: string) => {
          if (tag === "canvas") {
            return {
              getContext: (type: string) => {
                if (type === "webgl") {
                  return mockGL1Instance;
                }
                return null;
              },
            };
          }
          return {};
        },
      };

      assert.equal(
        supportsWebGL(),
        true,
        "supportsWebGL must return true for WebGLRenderingContext",
      );
      assert.equal(
        isWebGLAvailable(),
        true,
        "isWebGLAvailable must return true for WebGLRenderingContext",
      );
    } finally {
      (globalThis as any).window = originalWindow;
      (globalThis as any).document = originalDocument;
    }
  });

  it("respects prefers-reduced-motion: reduce by returning false from isWebGLAvailable", () => {
    class MockWebGL2RenderingContext {}
    const mockGL2Instance = new MockWebGL2RenderingContext();

    const originalWindow = globalThis.window;
    const originalDocument = globalThis.document;

    try {
      (globalThis as any).window = {
        WebGL2RenderingContext: MockWebGL2RenderingContext,
        matchMedia: (query: string) => ({
          matches: query === "(prefers-reduced-motion: reduce)",
        }),
      };

      (globalThis as any).document = {
        createElement: (tag: string) => {
          if (tag === "canvas") {
            return {
              getContext: (type: string) => {
                if (type === "webgl2") return mockGL2Instance;
                return null;
              },
            };
          }
          return {};
        },
      };

      assert.equal(prefersReducedMotion(), true);
      assert.equal(
        supportsWebGL(),
        true,
        "GPU supports WebGL even if motion is reduced",
      );
      assert.equal(
        isWebGLAvailable(),
        false,
        "isWebGLAvailable must return false when reduced motion is preferred",
      );
    } finally {
      (globalThis as any).window = originalWindow;
      (globalThis as any).document = originalDocument;
    }
  });
});
