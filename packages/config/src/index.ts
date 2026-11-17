/**
 * @nevrora/config
 * Shared design tokens, brand constants, lifecycle rules, navigation, and statutory configuration
 * for Nevrora Works ("Ideas into products.")
 */

import type {
  NavigationItem,
  ProductLifecycleStatus,
  SiteConfig,
} from "@nevrora/types";

/**
 * Palette A: Deep Forest theme design tokens
 */
export const PALETTE_A = {
  forest: "#173C32",
  evergreen: "#071B18",
  gold: "#C9A35B",
  cream: "#F7F2E9",
  charcoal: "#252725",
  sage: "#A8B7A8",
  white: "#FFFFFF",
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
 */
export const TYPOGRAPHY = {
  fontDisplay: "Playfair Display, Georgia, serif",
  fontBody:
    "Inter, Instrument Sans, -apple-system, BlinkMacSystemFont, sans-serif",
  fontMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as const;

/**
 * Official support email for Nevrora Works and its product portfolio
 */
export const OFFICIAL_SUPPORT_EMAIL = "support@nevrora-works.com" as const;

/**
 * Section 4: Nevrora Works primary navigation items (6 items)
 * Strictly excludes B2B Digital service routes (/services, /our-work, /ventures)
 */
export const LOCKED_NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Support", href: "/support" },
  { label: "About", href: "/about" },
  { label: "Announcements", href: "/announcements" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Primary navigation CTA button for Nevrora Works (Product Discovery P0)
 */
export const LOCKED_NAVIGATION_CTA = {
  label: "Explore Products",
  href: "/products",
} as const;

export type LockedNavigation = typeof LOCKED_NAVIGATION_ITEMS & {
  readonly cta: typeof LOCKED_NAVIGATION_CTA;
  readonly items: typeof LOCKED_NAVIGATION_ITEMS;
};

/**
 * Locked navigation structure combining items and primary CTA
 */
export const LOCKED_NAVIGATION: LockedNavigation = Object.assign(
  [...LOCKED_NAVIGATION_ITEMS],
  {
    cta: LOCKED_NAVIGATION_CTA,
    items: LOCKED_NAVIGATION_ITEMS,
  },
) as unknown as LockedNavigation;

/**
 * Section 5 & NW-FR-03: Lifecycle status rules controlling visibility, labels, and CTA behavior
 */
export interface LifecycleRule {
  status: ProductLifecycleStatus;
  label: string;
  isPublic: boolean;
  defaultCtaLabel: string;
  badgeStyle: string;
  description: string;
}

export const LIFECYCLE_STATUS_CONFIG: Record<
  ProductLifecycleStatus,
  LifecycleRule
> = {
  internal_draft: {
    status: "internal_draft",
    label: "Internal Draft",
    isPublic: false,
    defaultCtaLabel: "Internal Only",
    badgeStyle: "bg-slate-100 text-slate-600 border-slate-300",
    description: "Internal draft not visible to the public.",
  },
  coming_soon: {
    status: "coming_soon",
    label: "Coming Soon",
    isPublic: true,
    defaultCtaLabel: "Notify Me",
    badgeStyle: "bg-amber-50 text-amber-800 border-amber-300/80",
    description:
      "Approved product preview. Release timing will be announced when confirmed.",
  },
  beta: {
    status: "beta",
    label: "Beta",
    isPublic: true,
    defaultCtaLabel: "Join Beta",
    badgeStyle: "bg-violet-50 text-violet-800 border-violet-300/80",
    description:
      "Limited beta release with early-access eligibility and known preview boundaries.",
  },
  live: {
    status: "live",
    label: "Live",
    isPublic: true,
    defaultCtaLabel: "Get it on Google Play",
    badgeStyle: "bg-emerald-50 text-emerald-800 border-emerald-300/80",
    description: "Generally available on supported platforms.",
  },
  maintenance: {
    status: "maintenance",
    label: "Maintenance",
    isPublic: true,
    defaultCtaLabel: "Contact Support",
    badgeStyle: "bg-orange-50 text-orange-800 border-orange-300/80",
    description:
      "Temporarily undergoing scheduled maintenance or platform upgrades.",
  },
  discontinued: {
    status: "discontinued",
    label: "Discontinued",
    isPublic: true,
    defaultCtaLabel: "Migration & Support",
    badgeStyle: "bg-rose-50 text-rose-800 border-rose-300/80",
    description:
      "End of active distribution; see support and migration options.",
  },
} as const;

/**
 * Portfolio categories for product directory filtering (Section 4)
 */
export const PRODUCT_CATEGORIES = [
  "Mobile & Daily Practice",
  "Commerce & Lifestyle",
  "SaaS & Operations",
  "AI & Productivity",
] as const;

/**
 * Supported platform filter options for product directory (Section 4)
 */
export const PRODUCT_PLATFORM_FILTERS = [
  { id: "android", label: "Android (Google Play)" },
  { id: "web", label: "Web Application" },
  { id: "ios", label: "iOS" },
  { id: "saas", label: "Cloud SaaS" },
] as const;

/**
 * Supported contact & product inquiry categories for Nevrora Works (Section 4)
 */
export const INQUIRY_TYPES = [
  "Product early access / Notify me",
  "Product support & feedback",
  "Product & distribution partnership",
  "General product inquiry",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

/**
 * Indian legal and regulatory disclosures conforming to
 * Companies Act 2013 Rule 26 and DPDP Act 2023
 */
export const STATUTORY_DETAILS = {
  legalName: "Nevrora Technologies Private Limited",
  cin: "U72900KA2024PTC189000",
  registeredOffice: "Bengaluru, Karnataka, India",
  phone: "+91 80 4123 4567",
  email: OFFICIAL_SUPPORT_EMAIL,
  supportEmail: OFFICIAL_SUPPORT_EMAIL,
  grievanceContact: {
    name: "Ratnesh Kumar Gupta",
    role: "Grievance Officer & Data Protection Officer",
    email: OFFICIAL_SUPPORT_EMAIL,
    phone: "+91 80 4123 4567",
    address: "Bengaluru, Karnataka, India",
  },
} as const;

/**
 * Complete default site configuration for Nevrora Works
 */
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  name: "Nevrora Works",
  tagline: "Ideas into products.",
  description:
    "Nevrora Works is a product company creating, owning, and operating useful digital products across mobile, web, SaaS, and AI-enabled categories.",
  legalName: STATUTORY_DETAILS.legalName,
  cin: STATUTORY_DETAILS.cin,
  registeredOffice: STATUTORY_DETAILS.registeredOffice,
  phone: STATUTORY_DETAILS.phone,
  email: STATUTORY_DETAILS.email,
  supportEmail: STATUTORY_DETAILS.supportEmail,
  grievanceContact: { ...STATUTORY_DETAILS.grievanceContact },
  navigation: [...LOCKED_NAVIGATION_ITEMS],
  cta: { ...LOCKED_NAVIGATION_CTA },
  inquiryTypes: INQUIRY_TYPES,
};
