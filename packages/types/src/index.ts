/**
 * @nevrora/types
 * Core domain types and interfaces for Nevrora Works Product Portfolio Platform
 * Baseline: Nevrora Works Requirements Document v1.0
 */

/**
 * Brand visual theme identifier for portfolio products
 */
export type VentureTheme = "neermiti" | "driveiq" | "sadhana" | "default";

/**
 * Section 5: Product Lifecycle States
 * - internal_draft: Not public (strictly excluded from public routes, listings, search, and sitemaps)
 * - coming_soon: Approved preview; do not publish an unconfirmed launch date
 * - beta: Limited release with eligibility and limitations explained
 * - live: Available on the stated platform(s)
 * - maintenance: Clear user-impact notice and expected next steps where known
 * - discontinued: Explain end of support and migration/support options where relevant
 */
export type ProductLifecycleStatus =
  | "internal_draft"
  | "coming_soon"
  | "beta"
  | "live"
  | "maintenance"
  | "discontinued";

/**
 * Supported delivery platforms for Nevrora Works products
 */
export type PlatformType = "android" | "ios" | "web" | "saas" | "desktop";

/**
 * Section 8: Platform availability & store destination record
 */
export interface ProductPlatform {
  productId: string;
  platformType: PlatformType;
  label: string;
  availability: "available" | "coming_soon" | "beta" | "unavailable";
  /**
   * Verified Google Play listing URL or web app URL when available (NW-FR-04)
   */
  storeOrAppUrl?: string;
  minimumRequirements?: string;
  status: ProductLifecycleStatus;
}

/**
 * Section 8: Prioritized product feature item
 */
export interface ProductFeature {
  id: string;
  productId: string;
  title: string;
  description: string;
  displayOrder: number;
  mediaUrl?: string;
  mediaAlt?: string;
}

/**
 * Section 8 & NW-FR-05: Responsive media gallery item with required alt text and caption
 */
export interface ProductMedia {
  id: string;
  productId: string;
  assetType: "screenshot" | "video" | "illustration";
  url: string;
  altText: string;
  caption: string;
  displayOrder: number;
}

/**
 * Section 8 & NW-FR-06: Product-specific FAQ entry
 */
export interface ProductFAQ {
  id: string;
  productId: string;
  question: string;
  answer: string;
  displayOrder: number;
  status: "published" | "draft";
}

/**
 * Section 8 & NW-FR-06: Product-specific support destination
 */
export interface SupportDestination {
  productId: string;
  supportEmail: string;
  supportUrl: string;
  helpCentreUrl?: string;
  responseInfo: string;
}

/**
 * Section 8 & NW-FR-07: Product-specific legal destination
 */
export interface LegalDestination {
  productId: string;
  privacyUrl: string;
  termsUrl: string;
  effectiveDate: string;
  version: string;
}

/**
 * Section 8 & NW-FR-08: Product launch or major update announcement
 */
export interface Announcement {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  title: string;
  slug: string;
  summary: string;
  content: string[];
  date: string;
  status: "published" | "draft";
  mediaUrl?: string;
  mediaAlt?: string;
}

/**
 * Section 7 & NW-FR-09: Product discovery & SEO metadata
 */
export interface ProductSEO {
  pageTitle: string;
  metaDescription: string;
  canonicalPath: string;
  socialImage?: string;
  applicationCategory: string;
  operatingSystem: string;
}

/**
 * Section 7 & 8: Complete Product portfolio entity model
 */
export interface Product {
  id: string;
  slug: string;
  number: string;
  name: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  overview: string;
  category: string;
  lifecycle_status: ProductLifecycleStatus;
  featured: boolean;
  /**
   * Derived / synchronized publication flag.
   * Must be false whenever lifecycle_status === "internal_draft" (NW-FR-03, NW-FR-11).
   */
  published: boolean;
  icon?: string;
  heroMedia: {
    url: string;
    altText: string;
    caption?: string;
  };
  audience: string;
  problemSolved: string;
  valueProposition: string;
  releaseVersion?: string;
  /**
   * Lifecycle-specific banner notice (e.g., Coming Soon preview note without unconfirmed launch date,
   * Beta eligibility/limitations, Maintenance impact notice, or Discontinued migration guidance).
   */
  statusNotice: string;
  platforms: ProductPlatform[];
  structuredFeatures: ProductFeature[];
  features: string[];
  mediaGallery: ProductMedia[];
  faqs: ProductFAQ[];
  support: SupportDestination;
  legal: LegalDestination;
  seo: ProductSEO;
  cta: string;
  ctaHref: string;
  theme: VentureTheme;
  image?: string;
  privacySlug?: string;
  termsSlug?: string;
  techBadges?: string[];
}

/**
 * NW-FR-10: Segmented product analytics event payload
 */
export interface ProductAnalyticsEvent {
  eventType:
    | "product_page_view"
    | "product_cta_click"
    | "product_filter_change"
    | "support_route_click";
  productId: string;
  productSlug: string;
  lifecycleStatus: ProductLifecycleStatus;
  platform?: PlatformType;
  ctaLabel?: string;
  destinationUrl?: string;
  timestamp: string;
}

/**
 * Contact details for legal / statutory Grievance & Data Protection Officer
 * Required under Companies Act 2013 Rule 26 and DPDP Act 2023
 */
export interface GrievanceOfficer {
  name: string;
  role: string;
  email: string;
  phone?: string;
  address?: string;
}

/**
 * Clause item in a privacy notice or terms document
 */
export interface PrivacyClause {
  heading: string;
  body: string[];
  list?: string[];
  table?: {
    head: string[];
    rows: string[][];
  };
}

/**
 * DPDP Act 2023 compliant privacy notice or terms model
 */
export interface PrivacyNotice {
  slug: string;
  title: string;
  productSlug?: string;
  effectiveVersion?: string;
  lastUpdated: string;
  dataCollected: string[];
  purposes: string[];
  rights: string[];
  grievanceOfficer: GrievanceOfficer;
  clauses: PrivacyClause[];
}

/**
 * User contact / product inquiry form submission payload
 */
export interface ContactSubmission {
  name: string;
  email: string;
  organization?: string;
  productSlug?: string;
  type: string;
  message: string;
  createdAt?: string;
}

/**
 * Navigation item structure
 */
export interface NavigationItem {
  label: string;
  href: string;
}

/**
 * Comprehensive Nevrora Works website configuration
 * Conforms to Companies Act 2013 Rule 26 and locked site navigation
 */
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  legalName: string;
  cin: string;
  registeredOffice: string;
  phone: string;
  email: string;
  supportEmail: string;
  grievanceContact: GrievanceOfficer;
  navigation: NavigationItem[];
  cta: {
    label: string;
    href: string;
  };
  inquiryTypes: readonly string[];
}

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  forwardedToSheets?: boolean;
  mailtoFallback?: string;
}
