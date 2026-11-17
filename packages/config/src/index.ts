/**
 * @nevrora/config
 * Shared design tokens, brand constants, navigation, and statutory configuration
 */

import type { NavigationItem, SiteConfig } from "@nevrora/types";

/**
 * Palette A: Deep Forest theme design tokens
 * Authoritative color specification for Nevrora Ventures platform
 */
export const PALETTE_A = {
  forest: "#173C32", // Deep forest green (brand primary dark)
  evergreen: "#071B18", // Dark evergreen (deep background)
  gold: "#C9A35B", // Champagne gold (accent & highlight)
  cream: "#F7F2E9", // Warm cream (light surface & typography)
  charcoal: "#252725", // Charcoal (dark neutral)
  sage: "#A8B7A8", // Muted sage (secondary accent & borders)
  white: "#FFFFFF", // Crisp white
} as const;

export type Palette = typeof PALETTE_A;
export type PaletteColor = keyof Palette;

/**
 * Palette Light Gradient: Apple Daylight & Aurora Mesh design tokens
 */
export const PALETTE_LIGHT_GRADIENT = {
  bgCanvas: "#F8FAFC",
  bgCanvasSubtle: "#F5F5F7",
  bgHeroGradient:
    "radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.12) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(124, 58, 237, 0.10) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(8, 145, 178, 0.08) 0px, transparent 50%), linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
  bgSectionGradient:
    "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)",
  surfaceCard: "rgba(255, 255, 255, 0.82)",
  surfaceElevated: "#FFFFFF",
  borderSubtle: "rgba(15, 23, 42, 0.08)",
  borderSubtleHover: "rgba(59, 130, 246, 0.40)",
  textPrimary: "#0B1020",
  textSecondary: "#475569",
  textMuted: "#64748B",
  btnPrimary: "linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #7C3AED 100%)",
  textGradient: "linear-gradient(90deg, #2563EB 0%, #7C3AED 55%, #0891B2 100%)",
  badgeSurface:
    "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)",
  badgeBorder: "rgba(59, 130, 246, 0.22)",
  badgeText: "#1D4ED8",
  cobalt: "#2563EB",
  violet: "#7C3AED",
  cyan: "#0891B2",
} as const;

/**
 * Brand typography stacks
 * Editorial serif (Playfair Display) paired with clean sans-serif (Inter / Instrument Sans)
 */
export const TYPOGRAPHY = {
  fontDisplay: "Playfair Display, Georgia, serif",
  fontBody:
    "Inter, Instrument Sans, -apple-system, BlinkMacSystemFont, sans-serif",
  fontMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as const;

/**
 * Locked primary navigation items (6 items)
 * Strict rule: /ventures route and nav item are strictly prohibited
 */
export const LOCKED_NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Our Work", href: "/our-work" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Primary navigation CTA button
 */
export const LOCKED_NAVIGATION_CTA = {
  label: "Start a Conversation",
  href: "/contact",
} as const;

export type LockedNavigation = typeof LOCKED_NAVIGATION_ITEMS & {
  readonly cta: typeof LOCKED_NAVIGATION_CTA;
  readonly items: typeof LOCKED_NAVIGATION_ITEMS;
};

/**
 * Locked navigation structure combining items and primary CTA
 * Can be used as an iterable array of navigation links or as an object with .cta and .items
 */
export const LOCKED_NAVIGATION: LockedNavigation = Object.assign(
  [...LOCKED_NAVIGATION_ITEMS],
  {
    cta: LOCKED_NAVIGATION_CTA,
    items: LOCKED_NAVIGATION_ITEMS,
  },
) as unknown as LockedNavigation;

/**
 * Supported contact inquiry categories
 */
export const INQUIRY_TYPES = [
  "Venture idea",
  "Strategic partnership",
  "Business collaboration",
  "General inquiry",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

/**
 * Indian legal and regulatory disclosures conforming to
 * Companies Act 2013 Rule 26 and DPDP Act 2023
 */
export const STATUTORY_DETAILS = {
  legalName: "Nevrora Technologies Private Limited",
  cin: "U72900KA2024PTC189000", // Formatted MCA CIN
  registeredOffice: "Bengaluru, Karnataka, India",
  phone: "+91 80 4123 4567",
  email: "hello@nevrora.com",
  grievanceContact: {
    name: "Ratnesh Kumar Gupta",
    role: "Grievance Officer & Data Protection Officer",
    email: "ratnesh.k.gupta@icloud.com",
    phone: "+91 80 4123 4567",
    address: "Bengaluru, Karnataka, India",
  },
} as const;

/**
 * Complete default site configuration conforming to SiteConfig interface
 */
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  name: "Nevrora Ventures",
  tagline: "Venture Studio & Intelligent Engineering",
  description:
    "Institutional venture studio and elite engineering consultancy architecting intelligent systems, transformative products, and resilient platforms.",
  legalName: STATUTORY_DETAILS.legalName,
  cin: STATUTORY_DETAILS.cin,
  registeredOffice: STATUTORY_DETAILS.registeredOffice,
  phone: STATUTORY_DETAILS.phone,
  email: STATUTORY_DETAILS.email,
  grievanceContact: { ...STATUTORY_DETAILS.grievanceContact },
  navigation: [...LOCKED_NAVIGATION_ITEMS],
  cta: { ...LOCKED_NAVIGATION_CTA },
  inquiryTypes: INQUIRY_TYPES,
};
