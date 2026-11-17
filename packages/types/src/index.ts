/**
 * @nevrora/types
 * Core domain types and interfaces for Nevrora Ventures platform
 */

/**
 * Brand visual theme identifier for venture products
 */
export type VentureTheme = "neermiti" | "driveiq" | "sadhana";

/**
 * Product entity model representing a venture brand
 */
export interface Product {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  overview: string;
  audience: string;
  valueProposition: string;
  features: string[];
  cta: string;
  theme: VentureTheme;
  /**
   * Publication flag.
   * When false, product MUST be strictly excluded from all public listings,
   * search, sitemaps, and public API responses (e.g. driveiq).
   */
  published: boolean;
  image?: string;
  privacySlug?: string;
  techBadges?: string[];
  whiteLabelEcosystem?: {
    highlight: string;
    architectureType: string;
  };
}

/**
 * Step in a structured service engagement process
 */
export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

/**
 * Commercial service offering entity model
 */
export interface Service {
  slug: string;
  number: string;
  title: string;
  short: string;
  statement: string;
  problems: string[];
  capabilities: string[];
  deliverables: string[];
  processSteps: ServiceProcessStep[];
  techBadges: string[];
  color: string;
  published: boolean;
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
 * Clause item in a privacy notice or legal disclosure
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
 * DPDP Act 2023 compliant privacy notice model
 */
export interface PrivacyNotice {
  slug: string;
  title: string;
  productSlug?: string;
  lastUpdated: string;
  dataCollected: string[];
  purposes: string[];
  rights: string[];
  grievanceOfficer: GrievanceOfficer;
  clauses: PrivacyClause[];
}

/**
 * User contact / inquiry form submission payload
 */
export interface ContactSubmission {
  name: string;
  email: string;
  organization?: string;
  type: string;
  message: string;
  createdAt?: string;
}

/**
 * Client or internal venture case study showcase
 */
export interface CaseStudy {
  slug: string;
  title: string;
  client?: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  featured?: boolean;
}

/**
 * Navigation item structure
 */
export interface NavigationItem {
  label: string;
  href: string;
}

/**
 * Comprehensive corporate and website configuration
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
