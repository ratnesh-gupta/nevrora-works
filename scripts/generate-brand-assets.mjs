#!/usr/bin/env node
/**
 * Nevrora Ventures — Brand Asset Generator
 * Generates vector SVGs, anti-aliased high-res PNGs, favicons (.ico/.png/.svg),
 * Open Graph image, PWA manifest, and full Android icon suite (mipmap-* & adaptive XML).
 *
 * Pure Node.js (zero external dependencies) using an analytical SDF rasterizer.
 */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT_DIR, "apps", "web", "public");
const BRAND_DIR = path.join(PUBLIC_DIR, "brand");
const PNG_DIR = path.join(BRAND_DIR, "png");
const ANDROID_DIR = path.join(PUBLIC_DIR, "android");

const COLORS = {
  midnight: "#0B1020",
  midnightDeep: "#070B16",
  blue: "#3B82F6",
  violet: "#7C3AED",
  magenta: "#D946EF",
  cyan: "#06D6D6",
  white: "#FFFFFF",
  slate: "#94A3B8",
  borderLight: "#E2E8F0",
};

const GRADIENT_STOPS = [
  { t: 0.0, rgb: hexToRgb(COLORS.magenta) },
  { t: 0.32, rgb: hexToRgb(COLORS.violet) },
  { t: 0.68, rgb: hexToRgb(COLORS.blue) },
  { t: 1.0, rgb: hexToRgb(COLORS.cyan) },
];

const APP_GRADIENT_STOPS = [
  { t: 0.0, rgb: hexToRgb(COLORS.blue) },
  { t: 0.5, rgb: hexToRgb(COLORS.violet) },
  { t: 1.0, rgb: hexToRgb(COLORS.magenta) },
];

/**
 * Exact 100x100 symbol geometry (centered at (50, 50) by applying +5 Y offset to 13..77 -> 18..82)
 * Wait: SVG paths in spec use raw coordinates in 100x100 viewBox:
 *   Path 1: M 18 42 L 36 24 L 64 52 L 82 34
 *   Path 2: M 18 56 L 36 38 L 64 66 L 82 48
 *   Left 3: M 18 70 L 36 52
 *   Left 4: M 25 77 L 36 66
 *   Right 3: M 64 38 L 82 20
 *   Right 4: M 64 24 L 75 13
 * Applying a +5 Y translate centers the figure optically at (50, 50).
 */
const SYMBOL_SEGMENTS = [
  // Upper N-track
  [18, 47, 36, 29],
  [36, 29, 64, 57],
  [64, 57, 82, 39],
  // Lower N-track
  [18, 61, 36, 43],
  [36, 43, 64, 71],
  [64, 71, 82, 53],
  // Left Progressive Bars
  [18, 75, 36, 57],
  [25, 82, 36, 71],
  // Right Progressive Bars
  [64, 43, 82, 25],
  [64, 29, 75, 18],
];

const SYMBOL_PATHS_SVG = [
  "M 18 42 L 36 24 L 64 52 L 82 34",
  "M 18 56 L 36 38 L 64 66 L 82 48",
  "M 18 70 L 36 52",
  "M 25 77 L 36 66",
  "M 64 38 L 82 20",
  "M 64 24 L 75 13",
];

// ---------------------------------------------------------------------------
// Color & Math Helpers
// ---------------------------------------------------------------------------

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const n = parseInt(clean, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function sampleGradient(stops, t) {
  const ct = clamp(t, 0, 1);
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (ct >= a.t && ct <= b.t) {
      const f = (ct - a.t) / (b.t - a.t);
      return [
        a.rgb[0] + (b.rgb[0] - a.rgb[0]) * f,
        a.rgb[1] + (b.rgb[1] - a.rgb[1]) * f,
        a.rgb[2] + (b.rgb[2] - a.rgb[2]) * f,
      ];
    }
  }
  return stops[stops.length - 1].rgb;
}

function sdSegment(px, py, ax, ay, bx, by) {
  const pax = px - ax;
  const pay = py - ay;
  const bax = bx - ax;
  const bay = by - ay;
  const denom = bax * bax + bay * bay;
  const h = denom > 0 ? clamp((pax * bax + pay * bay) / denom, 0, 1) : 0;
  const dx = pax - bax * h;
  const dy = pay - bay * h;
  return Math.sqrt(dx * dx + dy * dy);
}

function sdRoundedBox(px, py, cx, cy, halfW, halfH, r) {
  const qx = Math.abs(px - cx) - halfW + r;
  const qy = Math.abs(py - cy) - halfH + r;
  const ox = Math.max(qx, 0);
  const oy = Math.max(qy, 0);
  return Math.sqrt(ox * ox + oy * oy) + Math.min(Math.max(qx, qy), 0) - r;
}

function blendPixel(buf, idx, r, g, b, alpha) {
  if (alpha <= 0) return;
  const a = clamp(alpha, 0, 1);
  const dstA = buf[idx + 3] / 255;
  const outA = a + dstA * (1 - a);
  if (outA <= 0) return;
  buf[idx] = Math.round((r * a + buf[idx] * dstA * (1 - a)) / outA);
  buf[idx + 1] = Math.round((g * a + buf[idx + 1] * dstA * (1 - a)) / outA);
  buf[idx + 2] = Math.round((b * a + buf[idx + 2] * dstA * (1 - a)) / outA);
  buf[idx + 3] = Math.round(outA * 255);
}

// ---------------------------------------------------------------------------
// PNG & ICO Encoders
// ---------------------------------------------------------------------------

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcInput = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function encodePNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = 0; // filter type 0
    rgbaBuffer.copy(raw, rowStart + 1, y * stride, (y + 1) * stride);
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    signature,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", compressed),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function encodeICO(pngEntries) {
  // pngEntries: [{ size, buffer }]
  const count = pngEntries.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Icon type
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  let offset = 6 + count * 16;

  for (const entry of pngEntries) {
    const dir = Buffer.alloc(16);
    dir[0] = entry.size >= 256 ? 0 : entry.size;
    dir[1] = entry.size >= 256 ? 0 : entry.size;
    dir[2] = 0;
    dir[3] = 0;
    dir.writeUInt16LE(1, 4); // planes
    dir.writeUInt16LE(32, 6); // bpp
    dir.writeUInt32LE(entry.buffer.length, 8);
    dir.writeUInt32LE(offset, 12);
    dirEntries.push(dir);
    offset += entry.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngEntries.map((e) => e.buffer)]);
}

// ---------------------------------------------------------------------------
// Geometric Vector Font (Space Grotesk inspired) for Crisp PNG Wordmarks
// Defined in normalized [0..1] width x [0..1] height cells
// ---------------------------------------------------------------------------

const VECTOR_GLYPHS = {
  N: [
    [0.12, 1.0, 0.12, 0.0],
    [0.12, 0.0, 0.88, 1.0],
    [0.88, 1.0, 0.88, 0.0],
  ],
  E: [
    [0.14, 0.0, 0.14, 1.0],
    [0.14, 0.0, 0.88, 0.0],
    [0.14, 0.49, 0.78, 0.49],
    [0.14, 1.0, 0.88, 1.0],
  ],
  V: [
    [0.08, 0.0, 0.5, 1.0],
    [0.5, 1.0, 0.92, 0.0],
  ],
  R: [
    [0.14, 0.0, 0.14, 1.0],
    [0.14, 0.0, 0.68, 0.0],
    [0.68, 0.0, 0.86, 0.12],
    [0.86, 0.12, 0.86, 0.39],
    [0.86, 0.39, 0.68, 0.51],
    [0.68, 0.51, 0.14, 0.51],
    [0.54, 0.51, 0.88, 1.0],
  ],
  O: [
    [0.3, 0.0, 0.7, 0.0],
    [0.7, 0.0, 0.9, 0.18],
    [0.9, 0.18, 0.9, 0.82],
    [0.9, 0.82, 0.7, 1.0],
    [0.7, 1.0, 0.3, 1.0],
    [0.3, 1.0, 0.1, 0.82],
    [0.1, 0.82, 0.1, 0.18],
    [0.1, 0.18, 0.3, 0.0],
  ],
  A: [
    [0.08, 1.0, 0.5, 0.0],
    [0.5, 0.0, 0.92, 1.0],
    [0.24, 0.64, 0.76, 0.64],
  ],
  T: [
    [0.06, 0.0, 0.94, 0.0],
    [0.5, 0.0, 0.5, 1.0],
  ],
  U: [
    [0.14, 0.0, 0.14, 0.82],
    [0.14, 0.82, 0.32, 1.0],
    [0.32, 1.0, 0.68, 1.0],
    [0.68, 1.0, 0.86, 0.82],
    [0.86, 0.82, 0.86, 0.0],
  ],
  S: [
    [0.84, 0.14, 0.68, 0.0],
    [0.68, 0.0, 0.3, 0.0],
    [0.3, 0.0, 0.14, 0.14],
    [0.14, 0.14, 0.14, 0.36],
    [0.14, 0.36, 0.3, 0.48],
    [0.3, 0.48, 0.7, 0.52],
    [0.7, 0.52, 0.86, 0.64],
    [0.86, 0.64, 0.86, 0.86],
    [0.86, 0.86, 0.7, 1.0],
    [0.7, 1.0, 0.3, 1.0],
    [0.3, 1.0, 0.12, 0.86],
  ],
};

function buildTextSegments(text, centerX, topY, charW, charH, tracking) {
  const chars = text.split("");
  const totalWidth =
    chars.length * charW + Math.max(0, chars.length - 1) * tracking;
  let xCursor = centerX - totalWidth / 2;
  const segments = [];
  for (const ch of chars) {
    const glyph = VECTOR_GLYPHS[ch];
    if (glyph) {
      for (const [x1, y1, x2, y2] of glyph) {
        segments.push([
          xCursor + x1 * charW,
          topY + y1 * charH,
          xCursor + x2 * charW,
          topY + y2 * charH,
        ]);
      }
    }
    xCursor += charW + tracking;
  }
  return segments;
}

function drawSegmentsIntoBuffer(buf, width, height, segments, strokeRadius, colorRgb) {
  if (!segments.length) return;
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const [x1, y1, x2, y2] of segments) {
    minX = Math.min(minX, x1, x2);
    minY = Math.min(minY, y1, y2);
    maxX = Math.max(maxX, x1, x2);
    maxY = Math.max(maxY, y1, y2);
  }
  const pad = Math.ceil(strokeRadius + 3);
  const startX = clamp(Math.floor(minX - pad), 0, width - 1);
  const endX = clamp(Math.ceil(maxX + pad), 0, width - 1);
  const startY = clamp(Math.floor(minY - pad), 0, height - 1);
  const endY = clamp(Math.ceil(maxY + pad), 0, height - 1);
  const aa = Math.max(0.75, strokeRadius * 0.14);

  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      let minDist = Infinity;
      const px = x + 0.5;
      const py = y + 0.5;
      for (let i = 0; i < segments.length; i++) {
        const s = segments[i];
        const d = sdSegment(px, py, s[0], s[1], s[2], s[3]);
        if (d < minDist) minDist = d;
      }
      const alpha = 1 - smoothstep(strokeRadius - aa, strokeRadius + aa, minDist);
      if (alpha > 0.002) {
        blendPixel(
          buf,
          (y * width + x) * 4,
          colorRgb[0],
          colorRgb[1],
          colorRgb[2],
          alpha,
        );
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Rasterizers for Icon & Brand Banners
// ---------------------------------------------------------------------------

function renderSymbolIntoBuffer(buf, width, height, boxX, boxY, boxSize, strokeColorMode) {
  const scale = boxSize / 100;
  const strokeRadius = 3.25 * scale;
  const aa = Math.max(0.65, 0.85);
  const whiteRgb = hexToRgb(COLORS.white);
  const midnightRgb = hexToRgb(COLORS.midnight);

  const scaledSegments = SYMBOL_SEGMENTS.map(([x1, y1, x2, y2]) => [
    boxX + x1 * scale,
    boxY + y1 * scale,
    boxX + x2 * scale,
    boxY + y2 * scale,
  ]);

  const startX = clamp(Math.floor(boxX), 0, width - 1);
  const endX = clamp(Math.ceil(boxX + boxSize), 0, width - 1);
  const startY = clamp(Math.floor(boxY), 0, height - 1);
  const endY = clamp(Math.ceil(boxY + boxSize), 0, height - 1);

  // Gradient vector from bottom-left (18, 82) to top-right (82, 18) in 100x100 box
  const gx0 = boxX + 18 * scale;
  const gy0 = boxY + 82 * scale;
  const gx1 = boxX + 82 * scale;
  const gy1 = boxY + 18 * scale;
  const gdx = gx1 - gx0;
  const gdy = gy1 - gy0;
  const gLenSq = gdx * gdx + gdy * gdy;

  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      let minDist = Infinity;
      for (let i = 0; i < scaledSegments.length; i++) {
        const s = scaledSegments[i];
        const d = sdSegment(px, py, s[0], s[1], s[2], s[3]);
        if (d < minDist) minDist = d;
      }
      const alpha = 1 - smoothstep(strokeRadius - aa, strokeRadius + aa, minDist);
      if (alpha > 0.002) {
        let rgb;
        if (strokeColorMode === "gradient") {
          const t = ((px - gx0) * gdx + (py - gy0) * gdy) / gLenSq;
          rgb = sampleGradient(GRADIENT_STOPS, t);
        } else if (strokeColorMode === "white") {
          rgb = whiteRgb;
        } else {
          rgb = midnightRgb;
        }
        blendPixel(buf, (y * width + x) * 4, rgb[0], rgb[1], rgb[2], alpha);
      }
    }
  }
}

/**
 * Renders a square app/favicon icon into an RGBA buffer.
 * variant: "transparent" | "dark" | "light" | "gradient" | "mono" | "maskable" | "round"
 */
function renderAppIconPNG(size, variant, symbolScaleRatio = 0.72) {
  const buf = Buffer.alloc(size * size * 4, 0);
  const midnightRgb = hexToRgb(COLORS.midnight);
  const whiteRgb = hexToRgb(COLORS.white);
  const borderLightRgb = hexToRgb(COLORS.borderLight);

  if (variant === "maskable") {
    // Full-bleed midnight background with subtle corner gradient glow, no rounded transparency
    const blueRgb = hexToRgb(COLORS.blue);
    const violetRgb = hexToRgb(COLORS.violet);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4;
        const u = x / size;
        const v = y / size;
        const glowTopLeft = Math.exp(-((u - 0.15) ** 2 + (v - 0.15) ** 2) * 5) * 0.2;
        const glowBotRight = Math.exp(-((u - 0.85) ** 2 + (v - 0.85) ** 2) * 5) * 0.18;
        buf[idx] = Math.min(255, Math.round(midnightRgb[0] + violetRgb[0] * glowTopLeft + blueRgb[0] * glowBotRight));
        buf[idx + 1] = Math.min(255, Math.round(midnightRgb[1] + violetRgb[1] * glowTopLeft + blueRgb[1] * glowBotRight));
        buf[idx + 2] = Math.min(255, Math.round(midnightRgb[2] + violetRgb[2] * glowTopLeft + blueRgb[2] * glowBotRight));
        buf[idx + 3] = 255;
      }
    }
    // Safe zone is central 60%-66% for adaptive maskable icons
    const symSize = size * 0.56;
    const offset = (size - symSize) / 2;
    renderSymbolIntoBuffer(buf, size, size, offset, offset, symSize, "gradient");
    return encodePNG(size, size, buf);
  }

  if (variant === "round") {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.48;
    const borderW = Math.max(1.2, size * 0.02);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const px = x + 0.5;
        const py = y + 0.5;
        const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2) - r;
        const fillAlpha = 1 - smoothstep(-0.75, 0.75, dist);
        if (fillAlpha > 0.002) {
          const idx = (y * size + x) * 4;
          blendPixel(buf, idx, midnightRgb[0], midnightRgb[1], midnightRgb[2], fillAlpha);
          const ringAlpha =
            (1 - smoothstep(-0.75, 0.75, Math.abs(dist + borderW * 0.5) - borderW * 0.5)) *
            0.75;
          if (ringAlpha > 0.002) {
            const t = (px / size + (1 - py / size)) * 0.5;
            const gRgb = sampleGradient(GRADIENT_STOPS, t);
            blendPixel(buf, idx, gRgb[0], gRgb[1], gRgb[2], ringAlpha);
          }
        }
      }
    }
    const symSize = size * 0.66;
    const offset = (size - symSize) / 2;
    renderSymbolIntoBuffer(buf, size, size, offset, offset, symSize, "gradient");
    return encodePNG(size, size, buf);
  }

  if (variant !== "transparent") {
    const cx = size / 2;
    const cy = size / 2;
    const half = size * 0.48;
    const cornerR = size * 0.22;
    const borderW = Math.max(1.0, size * 0.02);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const px = x + 0.5;
        const py = y + 0.5;
        const d = sdRoundedBox(px, py, cx, cy, half, half, cornerR);
        const fillAlpha = 1 - smoothstep(-0.75, 0.75, d);
        if (fillAlpha > 0.002) {
          const idx = (y * size + x) * 4;
          if (variant === "dark" || variant === "mono") {
            blendPixel(buf, idx, midnightRgb[0], midnightRgb[1], midnightRgb[2], fillAlpha);
            // Subtle border
            const borderDist = Math.abs(d + borderW * 0.5) - borderW * 0.5;
            const borderAlpha = (1 - smoothstep(-0.75, 0.75, borderDist)) * (variant === "mono" ? 0.35 : 0.7);
            if (borderAlpha > 0.002) {
              const bRgb =
                variant === "mono"
                  ? whiteRgb
                  : sampleGradient(GRADIENT_STOPS, (px / size + (1 - py / size)) * 0.5);
              blendPixel(buf, idx, bRgb[0], bRgb[1], bRgb[2], borderAlpha);
            }
          } else if (variant === "light") {
            blendPixel(buf, idx, whiteRgb[0], whiteRgb[1], whiteRgb[2], fillAlpha);
            const borderDist = Math.abs(d + borderW * 0.5) - borderW * 0.5;
            const borderAlpha = 1 - smoothstep(-0.75, 0.75, borderDist);
            if (borderAlpha > 0.002) {
              blendPixel(buf, idx, borderLightRgb[0], borderLightRgb[1], borderLightRgb[2], borderAlpha);
            }
          } else if (variant === "gradient") {
            const t = (px / size + py / size) * 0.5;
            const gRgb = sampleGradient(APP_GRADIENT_STOPS, t);
            blendPixel(buf, idx, gRgb[0], gRgb[1], gRgb[2], fillAlpha);
          }
        }
      }
    }
  }

  const symSize = size * symbolScaleRatio;
  const offset = (size - symSize) / 2;
  const symColor =
    variant === "gradient" || variant === "mono" ? "white" : "gradient";
  renderSymbolIntoBuffer(buf, size, size, offset, offset, symSize, symColor);

  return encodePNG(size, size, buf);
}

function renderBrandLockupPNG(width, height, { layout, theme }) {
  const buf = Buffer.alloc(width * height * 4, 0);
  const bgRgb =
    theme === "dark" || theme === "mono-dark"
      ? hexToRgb(COLORS.midnight)
      : hexToRgb(COLORS.white);
  const primaryTextRgb =
    theme === "dark" || theme === "mono-dark"
      ? hexToRgb(COLORS.white)
      : hexToRgb(COLORS.midnight);
  const secondaryTextRgb =
    theme === "dark"
      ? hexToRgb(COLORS.cyan)
      : theme === "light"
        ? hexToRgb(COLORS.blue)
        : primaryTextRgb;
  const dividerRgb =
    theme === "dark" || theme === "mono-dark"
      ? [255, 255, 255]
      : [11, 16, 32];
  const symMode =
    theme === "mono-dark"
      ? "white"
      : theme === "mono-light"
        ? "midnight"
        : "gradient";

  // Fill background
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    buf[idx] = bgRgb[0];
    buf[idx + 1] = bgRgb[1];
    buf[idx + 2] = bgRgb[2];
    buf[idx + 3] = 255;
  }

  if (theme === "dark") {
    const violetRgb = hexToRgb(COLORS.violet);
    const cyanRgb = hexToRgb(COLORS.cyan);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const v = y / height;
        const g1 = Math.exp(-((u - 0.15) ** 2 + (v - 0.2) ** 2) * 6) * 0.16;
        const g2 = Math.exp(-((u - 0.85) ** 2 + (v - 0.85) ** 2) * 6) * 0.12;
        const idx = (y * width + x) * 4;
        buf[idx] = Math.min(255, Math.round(buf[idx] + violetRgb[0] * g1 + cyanRgb[0] * g2));
        buf[idx + 1] = Math.min(255, Math.round(buf[idx + 1] + violetRgb[1] * g1 + cyanRgb[1] * g2));
        buf[idx + 2] = Math.min(255, Math.round(buf[idx + 2] + violetRgb[2] * g1 + cyanRgb[2] * g2));
      }
    }
  }

  if (layout === "stacked") {
    const symSize = Math.round(height * 0.42);
    const symX = (width - symSize) / 2;
    const symY = Math.round(height * 0.14);
    renderSymbolIntoBuffer(buf, width, height, symX, symY, symSize, symMode);

    const nevroraSegs = buildTextSegments(
      "NEVRORA",
      width / 2,
      height * 0.63,
      width * 0.056,
      height * 0.1,
      width * 0.016,
    );
    drawSegmentsIntoBuffer(buf, width, height, nevroraSegs, height * 0.0085, primaryTextRgb);

    const venturesSegs = buildTextSegments(
      "VENTURES",
      width / 2,
      height * 0.785,
      width * 0.025,
      height * 0.044,
      width * 0.028,
    );
    drawSegmentsIntoBuffer(buf, width, height, venturesSegs, height * 0.0042, secondaryTextRgb);
  } else {
    // Horizontal lockup (also used for OG card 1200x630 & Horizontal 1200x400)
    const symSize = Math.round(height * 0.48);
    const leftEdge = Math.round(width * 0.14);
    const symY = (height - symSize) / 2;
    renderSymbolIntoBuffer(buf, width, height, leftEdge, symY, symSize, symMode);

    // Vertical divider
    const divX = leftEdge + symSize + Math.round(width * 0.036);
    const divTop = height * 0.28;
    const divBot = height * 0.72;
    drawSegmentsIntoBuffer(
      buf,
      width,
      height,
      [[divX, divTop, divX, divBot]],
      1.5,
      [
        Math.round(dividerRgb[0] * 0.3 + bgRgb[0] * 0.7),
        Math.round(dividerRgb[1] * 0.3 + bgRgb[1] * 0.7),
        Math.round(dividerRgb[2] * 0.3 + bgRgb[2] * 0.7),
      ],
    );

    const textCenterX = divX + Math.round(width * 0.295);
    const nevroraH = Math.round(height * 0.21);
    const nevroraW = Math.round(nevroraH * 0.68);
    const nevroraSegs = buildTextSegments(
      "NEVRORA",
      textCenterX,
      height * 0.33,
      nevroraW,
      nevroraH,
      nevroraW * 0.24,
    );
    drawSegmentsIntoBuffer(buf, width, height, nevroraSegs, nevroraH * 0.085, primaryTextRgb);

    const venturesH = Math.round(height * 0.095);
    const venturesW = Math.round(venturesH * 0.68);
    const venturesSegs = buildTextSegments(
      "VENTURES",
      textCenterX,
      height * 0.61,
      venturesW,
      venturesH,
      venturesW * 0.85,
    );
    drawSegmentsIntoBuffer(buf, width, height, venturesSegs, venturesH * 0.09, secondaryTextRgb);
  }

  return encodePNG(width, height, buf);
}

// ---------------------------------------------------------------------------
// SVG Generators
// ---------------------------------------------------------------------------

function makeSymbolPathsSvg(strokeRef, strokeWidth = 6.5, yTranslate = 5) {
  return `<g transform="translate(0, ${yTranslate})" fill="none" stroke="${strokeRef}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
    ${SYMBOL_PATHS_SVG.map((d) => `<path d="${d}" />`).join("\n    ")}
  </g>`;
}

function makeGradientDefs(idPrefix) {
  return `<defs>
    <linearGradient id="${idPrefix}-brand-grad" x1="18%" y1="82%" x2="82%" y2="18%">
      <stop offset="0%" stop-color="${COLORS.magenta}" />
      <stop offset="32%" stop-color="${COLORS.violet}" />
      <stop offset="68%" stop-color="${COLORS.blue}" />
      <stop offset="100%" stop-color="${COLORS.cyan}" />
    </linearGradient>
    <linearGradient id="${idPrefix}-app-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.blue}" />
      <stop offset="50%" stop-color="${COLORS.violet}" />
      <stop offset="100%" stop-color="${COLORS.magenta}" />
    </linearGradient>
  </defs>`;
}

function generateStandaloneIconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  ${makeGradientDefs("icon")}
  ${makeSymbolPathsSvg("url(#icon-brand-grad)", 6.5, 5)}
</svg>
`;
}

function generateAppSquircleSvg(variant) {
  const id = `app-${variant}`;
  let bg = "";
  let strokeRef = `url(#${id}-brand-grad)`;
  if (variant === "dark") {
    bg = `<rect x="2" y="2" width="96" height="96" rx="22" fill="${COLORS.midnight}" stroke="url(#${id}-brand-grad)" stroke-width="2" />`;
  } else if (variant === "light") {
    bg = `<rect x="2" y="2" width="96" height="96" rx="22" fill="${COLORS.white}" stroke="${COLORS.borderLight}" stroke-width="2" />`;
  } else if (variant === "gradient") {
    bg = `<rect x="2" y="2" width="96" height="96" rx="22" fill="url(#${id}-app-grad)" />`;
    strokeRef = COLORS.white;
  } else if (variant === "mono") {
    bg = `<rect x="2" y="2" width="96" height="96" rx="22" fill="${COLORS.midnight}" stroke="rgba(255,255,255,0.28)" stroke-width="2" />`;
    strokeRef = COLORS.white;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  ${makeGradientDefs(id)}
  ${bg}
  <g transform="translate(14, 14) scale(0.72)">
    ${makeSymbolPathsSvg(strokeRef, 6.5, 5)}
  </g>
</svg>
`;
}

function generateStackedLockupSvg(theme) {
  const id = `stacked-${theme}`;
  const isDark = theme === "dark" || theme === "mono-dark";
  const isMono = theme === "mono-dark" || theme === "mono-light";
  const bg = isDark ? COLORS.midnight : COLORS.white;
  const wordColor = isDark ? COLORS.white : COLORS.midnight;
  const subColor = isMono
    ? wordColor
    : isDark
      ? COLORS.cyan
      : COLORS.blue;
  const symStroke = isMono ? wordColor : `url(#${id}-brand-grad)`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none">
  ${makeGradientDefs(id)}
  <rect width="400" height="300" rx="20" fill="${bg}" />
  <g transform="translate(135, 36) scale(1.3)">
    ${makeSymbolPathsSvg(symStroke, 6.5, 5)}
  </g>
  <text x="200" y="216" text-anchor="middle" fill="${wordColor}" font-family="'Space Grotesk', 'Inter', Arial, sans-serif" font-size="38" font-weight="700" letter-spacing="5">NEVRORA</text>
  <text x="200" y="250" text-anchor="middle" fill="${subColor}" font-family="'Space Grotesk', 'Inter', Arial, sans-serif" font-size="15" font-weight="600" letter-spacing="9">VENTURES</text>
</svg>
`;
}

function generateHorizontalLockupSvg(theme, transparent = false) {
  const id = `horiz-${theme}${transparent ? "-tr" : ""}`;
  const isDark = theme === "dark" || theme === "mono-dark";
  const isMono = theme === "mono-dark" || theme === "mono-light";
  const bg = isDark ? COLORS.midnight : COLORS.white;
  const wordColor = isDark ? COLORS.white : COLORS.midnight;
  const subColor = isMono
    ? wordColor
    : isDark
      ? COLORS.cyan
      : COLORS.blue;
  const symStroke = isMono ? wordColor : `url(#${id}-brand-grad)`;
  const dividerColor = isDark ? "rgba(255,255,255,0.22)" : "rgba(11,16,32,0.2)";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 160" fill="none">
  ${makeGradientDefs(id)}
  ${transparent ? "" : `<rect width="560" height="160" rx="16" fill="${bg}" />`}
  <g transform="translate(36, 30) scale(1.0)">
    ${makeSymbolPathsSvg(symStroke, 6.5, 5)}
  </g>
  <line x1="164" y1="42" x2="164" y2="118" stroke="${dividerColor}" stroke-width="2" />
  <text x="196" y="78" fill="${wordColor}" font-family="'Space Grotesk', 'Inter', Arial, sans-serif" font-size="40" font-weight="700" letter-spacing="4.5">NEVRORA</text>
  <text x="199" y="109" fill="${subColor}" font-family="'Space Grotesk', 'Inter', Arial, sans-serif" font-size="16" font-weight="600" letter-spacing="8.5">VENTURES</text>
</svg>
`;
}

// ---------------------------------------------------------------------------
// File System Utilities
// ---------------------------------------------------------------------------

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeOut(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`  ✓ ${path.relative(ROOT_DIR, filePath)}`);
}

// ---------------------------------------------------------------------------
// Main Generation Routine
// ---------------------------------------------------------------------------

function main() {
  console.log("Generating Nevrora Ventures Brand Assets (The Brand Board Version)...");

  // 1. Brand SVGs
  writeOut(path.join(BRAND_DIR, "logo-primary-dark.svg"), generateStackedLockupSvg("dark"));
  writeOut(path.join(BRAND_DIR, "logo-primary-light.svg"), generateStackedLockupSvg("light"));
  writeOut(path.join(BRAND_DIR, "logo-monochrome-dark.svg"), generateStackedLockupSvg("mono-dark"));
  writeOut(path.join(BRAND_DIR, "logo-monochrome-light.svg"), generateStackedLockupSvg("mono-light"));
  writeOut(path.join(BRAND_DIR, "logo-horizontal-dark.svg"), generateHorizontalLockupSvg("dark", false));
  writeOut(path.join(BRAND_DIR, "logo-horizontal-light.svg"), generateHorizontalLockupSvg("light", false));
  writeOut(path.join(BRAND_DIR, "logo-horizontal-transparent.svg"), generateHorizontalLockupSvg("dark", true));
  writeOut(path.join(BRAND_DIR, "logo-icon.svg"), generateStandaloneIconSvg());
  writeOut(path.join(BRAND_DIR, "icon-dark.svg"), generateAppSquircleSvg("dark"));
  writeOut(path.join(BRAND_DIR, "icon-light.svg"), generateAppSquircleSvg("light"));
  writeOut(path.join(BRAND_DIR, "icon-gradient.svg"), generateAppSquircleSvg("gradient"));
  writeOut(path.join(BRAND_DIR, "icon-mono.svg"), generateAppSquircleSvg("mono"));

  // 2. High-Res Brand PNGs
  writeOut(
    path.join(PNG_DIR, "logo-primary-dark.png"),
    renderBrandLockupPNG(1200, 900, { layout: "stacked", theme: "dark" }),
  );
  writeOut(
    path.join(PNG_DIR, "logo-primary-light.png"),
    renderBrandLockupPNG(1200, 900, { layout: "stacked", theme: "light" }),
  );
  writeOut(
    path.join(PNG_DIR, "logo-monochrome-dark.png"),
    renderBrandLockupPNG(1200, 900, { layout: "stacked", theme: "mono-dark" }),
  );
  writeOut(
    path.join(PNG_DIR, "logo-monochrome-light.png"),
    renderBrandLockupPNG(1200, 900, { layout: "stacked", theme: "mono-light" }),
  );
  writeOut(
    path.join(PNG_DIR, "logo-horizontal-dark.png"),
    renderBrandLockupPNG(1200, 400, { layout: "horizontal", theme: "dark" }),
  );
  writeOut(
    path.join(PNG_DIR, "logo-horizontal-light.png"),
    renderBrandLockupPNG(1200, 400, { layout: "horizontal", theme: "light" }),
  );
  writeOut(
    path.join(PNG_DIR, "logo-icon-transparent.png"),
    renderAppIconPNG(1024, "transparent", 0.86),
  );
  writeOut(
    path.join(PNG_DIR, "app-icon-dark-1024.png"),
    renderAppIconPNG(1024, "dark", 0.7),
  );
  writeOut(
    path.join(PNG_DIR, "app-icon-light-1024.png"),
    renderAppIconPNG(1024, "light", 0.7),
  );
  writeOut(
    path.join(PNG_DIR, "app-icon-gradient-1024.png"),
    renderAppIconPNG(1024, "gradient", 0.7),
  );
  writeOut(
    path.join(PNG_DIR, "app-icon-mono-1024.png"),
    renderAppIconPNG(1024, "mono", 0.7),
  );

  // 3. Web Favicons & Open Graph Banner
  writeOut(path.join(PUBLIC_DIR, "favicon.svg"), generateAppSquircleSvg("dark"));
  const png16 = renderAppIconPNG(16, "dark", 0.74);
  const png32 = renderAppIconPNG(32, "dark", 0.72);
  const png48 = renderAppIconPNG(48, "dark", 0.72);
  writeOut(path.join(PUBLIC_DIR, "favicon-16x16.png"), png16);
  writeOut(path.join(PUBLIC_DIR, "favicon-32x32.png"), png32);
  writeOut(
    path.join(PUBLIC_DIR, "favicon.ico"),
    encodeICO([
      { size: 16, buffer: png16 },
      { size: 32, buffer: png32 },
      { size: 48, buffer: png48 },
    ]),
  );
  writeOut(
    path.join(PUBLIC_DIR, "apple-touch-icon.png"),
    renderAppIconPNG(180, "dark", 0.7),
  );
  writeOut(
    path.join(PUBLIC_DIR, "og-image.png"),
    renderBrandLockupPNG(1200, 630, { layout: "horizontal", theme: "dark" }),
  );

  // 4. PWA & Android Chrome Icons
  writeOut(
    path.join(PUBLIC_DIR, "android-chrome-192x192.png"),
    renderAppIconPNG(192, "dark", 0.7),
  );
  writeOut(
    path.join(PUBLIC_DIR, "android-chrome-512x512.png"),
    renderAppIconPNG(512, "dark", 0.7),
  );
  writeOut(
    path.join(PUBLIC_DIR, "android-maskable-192x192.png"),
    renderAppIconPNG(192, "maskable"),
  );
  writeOut(
    path.join(PUBLIC_DIR, "android-maskable-512x512.png"),
    renderAppIconPNG(512, "maskable"),
  );

  // Web App Manifest
  const webManifest = {
    name: "Nevrora Ventures",
    short_name: "Nevrora",
    description:
      "A Global Technology Holding Company — Institutional Venture Studio & Engineering Advisory.",
    start_url: "/",
    display: "standalone",
    background_color: COLORS.midnight,
    theme_color: COLORS.midnight,
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
  writeOut(
    path.join(PUBLIC_DIR, "site.webmanifest"),
    JSON.stringify(webManifest, null, 2) + "\n",
  );

  // 5. Native Android Assets (Play Store + Mipmap Densities + Adaptive XMLs)
  writeOut(
    path.join(ANDROID_DIR, "playstore-icon.png"),
    renderAppIconPNG(512, "dark", 0.7),
  );

  const mipmapDensities = [
    { name: "mipmap-mdpi", launcher: 48, foreground: 108 },
    { name: "mipmap-hdpi", launcher: 72, foreground: 162 },
    { name: "mipmap-xhdpi", launcher: 96, foreground: 216 },
    { name: "mipmap-xxhdpi", launcher: 144, foreground: 324 },
    { name: "mipmap-xxxhdpi", launcher: 192, foreground: 432 },
  ];

  for (const density of mipmapDensities) {
    const dir = path.join(ANDROID_DIR, density.name);
    writeOut(
      path.join(dir, "ic_launcher.png"),
      renderAppIconPNG(density.launcher, "dark", 0.7),
    );
    writeOut(
      path.join(dir, "ic_launcher_round.png"),
      renderAppIconPNG(density.launcher, "round"),
    );
    writeOut(
      path.join(dir, "ic_launcher_foreground.png"),
      renderAppIconPNG(density.foreground, "transparent", 0.56),
    );
  }

  // Android Adaptive Icon XMLs (API 26+)
  const icBackgroundXml = `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <solid android:color="${COLORS.midnight}" />
</shape>
`;
  // Safe zone for Android 108dp vector drawable: central 66dp (inset 21dp)
  const icForegroundXml = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:aapt="http://schemas.android.com/aapt"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <group
        android:translateX="21"
        android:translateY="24.3"
        android:scaleX="0.66"
        android:scaleY="0.66">
        ${SYMBOL_PATHS_SVG.map(
          (d) => `<path
            android:pathData="${d}"
            android:strokeWidth="6.5"
            android:strokeLineCap="round"
            android:strokeLineJoin="round">
            <aapt:attr name="android:strokeColor">
                <gradient
                    android:type="linear"
                    android:startX="18"
                    android:startY="77"
                    android:endX="82"
                    android:endY="13">
                    <item android:offset="0.0" android:color="${COLORS.magenta}" />
                    <item android:offset="0.32" android:color="${COLORS.violet}" />
                    <item android:offset="0.68" android:color="${COLORS.blue}" />
                    <item android:offset="1.0" android:color="${COLORS.cyan}" />
                </gradient>
            </aapt:attr>
        </path>`,
        ).join("\n        ")}
    </group>
</vector>
`;
  const anydpiLauncherXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background" />
    <foreground android:drawable="@drawable/ic_launcher_foreground" />
</adaptive-icon>
`;

  writeOut(
    path.join(ANDROID_DIR, "drawable", "ic_launcher_background.xml"),
    icBackgroundXml,
  );
  writeOut(
    path.join(ANDROID_DIR, "drawable", "ic_launcher_foreground.xml"),
    icForegroundXml,
  );
  writeOut(
    path.join(ANDROID_DIR, "mipmap-anydpi-v26", "ic_launcher.xml"),
    anydpiLauncherXml,
  );
  writeOut(
    path.join(ANDROID_DIR, "mipmap-anydpi-v26", "ic_launcher_round.xml"),
    anydpiLauncherXml,
  );

  console.log("\nAll brand assets generated successfully!");
}

main();
