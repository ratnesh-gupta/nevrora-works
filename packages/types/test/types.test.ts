import type {
  Product,
  ProductLifecycleStatus,
  ProductPlatform,
  ProductFeature,
  ProductMedia,
  ProductFAQ,
  SupportDestination,
  LegalDestination,
  Announcement,
  ProductAnalyticsEvent,
  PrivacyNotice,
  ContactSubmission,
  SiteConfig,
  ApiResponse,
  VentureTheme,
} from "../src/index";

const _mockTheme: VentureTheme = "sadhana";
const _mockStatus: ProductLifecycleStatus = "coming_soon";

const _mockPlatform: ProductPlatform = {
  productId: "prod-sadhana",
  platformType: "android",
  label: "Android (Google Play)",
  availability: "coming_soon",
  minimumRequirements: "Android 10.0+",
  status: "coming_soon",
};

const _mockFeature: ProductFeature = {
  id: "feat-1",
  productId: "prod-sadhana",
  title: "Daily Panchang",
  description: "High-precision tithi, nakshatra, yoga, and karana calculations.",
  displayOrder: 1,
};

const _mockMedia: ProductMedia = {
  id: "media-1",
  productId: "prod-sadhana",
  assetType: "screenshot",
  url: "/brand/logo-primary-light.svg",
  altText: "Sadhana Daily Panchang dashboard preview",
  caption: "Daily Panchang and Muhurat overview",
  displayOrder: 1,
};

const _mockFaq: ProductFAQ = {
  id: "faq-1",
  productId: "prod-sadhana",
  question: "When will Sadhana Daily launch?",
  answer:
    "Sadhana Daily is currently in Coming Soon preview. Register via Notify Me for release updates.",
  displayOrder: 1,
  status: "published",
};

const _mockSupport: SupportDestination = {
  productId: "prod-sadhana",
  supportEmail: "support@nevrora-works.com",
  supportUrl: "/support#sadhana-daily",
  helpCentreUrl: "/support#sadhana-daily",
  responseInfo: "Responses within 1–2 business days via support@nevrora-works.com",
};

const _mockLegal: LegalDestination = {
  productId: "prod-sadhana",
  privacyUrl: "/products/sadhana-daily/privacy",
  termsUrl: "/products/sadhana-daily/terms",
  effectiveDate: "2026-11-16",
  version: "1.0",
};

const _mockProduct: Product = {
  id: "prod-sadhana",
  slug: "sadhana-daily",
  number: "01",
  name: "Sadhana Daily",
  title: "Sadhana Daily",
  tagline: "Vedic wisdom for daily clarity.",
  summary: "A calm daily companion for Vedic wisdom and daily practice.",
  description: "Full description of Sadhana Daily.",
  overview: "Full overview of Sadhana Daily.",
  category: "Mobile & Daily Practice",
  lifecycle_status: _mockStatus,
  featured: true,
  published: true,
  heroMedia: {
    url: "/brand/logo-primary-light.svg",
    altText: "Sadhana Daily preview",
  },
  audience: "Seekers and daily practitioners",
  problemSolved: "Fragmented, ad-cluttered calendar and spiritual reference tools",
  valueProposition: "Calm, offline-first daily Panchang and guided sadhana companion",
  statusNotice:
    "Coming Soon — Approved product preview. Sign up to be notified when released.",
  platforms: [_mockPlatform],
  structuredFeatures: [_mockFeature],
  features: ["Daily Panchang"],
  mediaGallery: [_mockMedia],
  faqs: [_mockFaq],
  support: _mockSupport,
  legal: _mockLegal,
  seo: {
    pageTitle: "Sadhana Daily | Nevrora Works",
    metaDescription: "Vedic wisdom and daily practice companion by Nevrora Works.",
    canonicalPath: "/products/sadhana-daily",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Android",
  },
  cta: "Notify Me",
  ctaHref: "/contact?type=Product+early+access+%2F+Notify+me&product=sadhana-daily",
  theme: _mockTheme,
  privacySlug: "/products/sadhana-daily/privacy",
  termsSlug: "/products/sadhana-daily/terms",
};

const _mockAnnouncement: Announcement = {
  id: "ann-1",
  productId: "prod-sadhana",
  productName: "Sadhana Daily",
  productSlug: "sadhana-daily",
  title: "Sadhana Daily Product Preview Announced",
  slug: "sadhana-daily-preview",
  summary: "Introducing our upcoming offline-first Vedic daily practice app.",
  content: ["Sadhana Daily is entering final preview preparation under Nevrora Works."],
  date: "2026-11-16",
  status: "published",
};

const _mockAnalytics: ProductAnalyticsEvent = {
  eventType: "product_cta_click",
  productId: "prod-sadhana",
  productSlug: "sadhana-daily",
  lifecycleStatus: "coming_soon",
  platform: "android",
  ctaLabel: "Notify Me",
  destinationUrl: "/contact?product=sadhana-daily",
  timestamp: "2026-11-16T00:00:00.000Z",
};

const _mockContact: ContactSubmission = {
  name: "Jane Doe",
  email: "jane@example.com",
  productSlug: "sadhana-daily",
  type: "Product early access / Notify me",
  message: "Please notify me when Sadhana Daily launches.",
};

const _mockPrivacyNotice: PrivacyNotice = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  lastUpdated: "2026-11-16",
  dataCollected: ["Name", "Email"],
  purposes: ["Product support communication"],
  rights: ["Access", "Correction", "Erasure"],
  grievanceOfficer: {
    name: "Ratnesh Kumar Gupta",
    role: "Grievance Officer",
    email: "support@nevrora-works.com",
  },
  clauses: [
    {
      heading: "Collection of Personal Data",
      body: ["We collect data provided voluntarily."],
    },
  ],
};

const _mockApiResponse: ApiResponse<Product> = {
  success: true,
  data: _mockProduct,
  message: "Product retrieved successfully",
};

const _mockSiteConfig: SiteConfig = {
  name: "Nevrora Works",
  tagline: "Ideas into products.",
  description: "Product company building useful digital products.",
  legalName: "Nevrora Technologies Private Limited",
  cin: "U72900KA2024PTC189000",
  registeredOffice: "Bengaluru, Karnataka, India",
  phone: "+91 80 4123 4567",
  email: "support@nevrora-works.com",
  supportEmail: "support@nevrora-works.com",
  grievanceContact: {
    name: "Ratnesh Kumar Gupta",
    role: "Grievance Officer",
    email: "support@nevrora-works.com",
  },
  navigation: [{ label: "Home", href: "/" }],
  cta: { label: "Explore Products", href: "/products" },
  inquiryTypes: ["General product inquiry"],
};

export const typeCheckPassed =
  Boolean(_mockProduct) &&
  Boolean(_mockAnnouncement) &&
  Boolean(_mockAnalytics) &&
  Boolean(_mockContact) &&
  Boolean(_mockPrivacyNotice) &&
  Boolean(_mockApiResponse) &&
  Boolean(_mockSiteConfig);
