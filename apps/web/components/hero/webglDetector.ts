/**
 * WebGL and motion preference capability detector
 */

export function supportsWebGL(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    return Boolean(
      gl &&
      ((typeof window.WebGLRenderingContext !== "undefined" &&
        gl instanceof window.WebGLRenderingContext) ||
        (typeof window.WebGL2RenderingContext !== "undefined" &&
          gl instanceof window.WebGL2RenderingContext)),
    );
  } catch {
    return false;
  }
}

export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  // Check prefers-reduced-motion first
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return false;
  }

  return supportsWebGL();
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
}
