import type { Config } from "tailwindcss";
import { PALETTE_A, PALETTE_LIGHT_GRADIENT } from "@nevrora/config";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette A compatibility
        forest: PALETTE_A.forest,
        evergreen: PALETTE_A.evergreen,
        gold: PALETTE_A.gold,
        cream: PALETTE_A.cream,
        charcoal: PALETTE_A.charcoal,
        sage: PALETTE_A.sage,
        white: PALETTE_A.white,

        // Apple Light-Gradient daylight tokens
        canvas: PALETTE_LIGHT_GRADIENT.bgCanvas,
        "canvas-subtle": PALETTE_LIGHT_GRADIENT.bgCanvasSubtle,
        primary: PALETTE_LIGHT_GRADIENT.textPrimary,
        secondary: PALETTE_LIGHT_GRADIENT.textSecondary,
        muted: PALETTE_LIGHT_GRADIENT.textMuted,
        cobalt: PALETTE_LIGHT_GRADIENT.cobalt,
        violet: PALETTE_LIGHT_GRADIENT.violet,
        cyan: PALETTE_LIGHT_GRADIENT.cyan,
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Space Grotesk",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        body: [
          "var(--font-body)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      boxShadow: {
        elevated:
          "0 12px 32px -8px rgba(11, 16, 32, 0.06), 0 4px 12px -2px rgba(11, 16, 32, 0.03)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
