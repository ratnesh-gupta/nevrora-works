import type { Product } from "@nevrora/types";

export const PRODUCTS_DATA: Product[] = [
  {
    slug: "neermiti-collections",
    number: "01",
    title: "Neermiti Collections",
    category: "FASHION & LIFESTYLE",
    summary:
      "Thoughtful clothing and artisanal lifestyle pieces for considered everyday living.",
    overview:
      "Neermiti Collections unites timeless heritage Indian handloom textiles with contemporary silhouettes, celebrating master artisans, tactile organic materials, and an editorial sense of restraint.",
    audience:
      "For conscious patrons and connoisseurs who seek authentic handcrafted luxury with transparent supply chains.",
    valueProposition:
      "Direct-from-weaver ethical supply chain with digital authenticity and tactile, natural materials.",
    features: [
      "Artisan Storytelling & Heritage Weaves",
      "Handloom Traceability from Cluster to Wardrobe",
      "Natural Plant Dyes & Sustainable Fibers",
      "Seamless Omnichannel Checkout Experience",
    ],
    cta: "Explore Neermiti",
    theme: "neermiti",
    published: true,
    privacySlug: "/products/neermiti-collections/privacy",
    techBadges: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Stripe Connect",
      "GraphQL",
      "PostgreSQL",
      "Cloudflare",
    ],
    whiteLabelEcosystem: {
      highlight: "Multi-tenant artisan provenance & headless commerce engine",
      architectureType: "Headless E-Commerce & Provenance Ledger",
    },
  },
  {
    slug: "sadhana-daily",
    number: "02",
    title: "Sadhana Daily",
    category: "VEDIC WISDOM & DAILY PRACTICE",
    summary:
      "A calm daily spiritual companion rooted in authentic Vedic wisdom, astronomy, and daily sadhana rituals.",
    overview:
      "Sadhana Daily calculates high-precision Panchang, auspicious muhurtas, and personalized daily spiritual routines with uncluttered reverence.",
    audience:
      "For seekers and practitioners who want a grounded, unhurried daily rhythm with reference tools and guided practice in one quiet place.",
    valueProposition:
      "Algorithmic Vedic astrological accuracy presented with zero ads, deep reverence, and complete data privacy.",
    features: [
      "Daily Panchang Calculations (Tithi, Nakshatra, Yoga, Karana)",
      "Auspicious Muhurat & Rahu Kaal Windows",
      "Mantra Sadhana & Japa Counter with Haptic Pacing",
      "Vedic Solar-Lunar Calendar Integration",
    ],
    cta: "Explore Sadhana Daily",
    theme: "sadhana",
    published: true,
    privacySlug: "/products/sadhana-daily/privacy",
    techBadges: [
      "React Native",
      "TypeScript",
      "Vedic WASM",
      "Tailwind CSS",
      "SQLite",
      "Local-First",
    ],
    whiteLabelEcosystem: {
      highlight: "White-label offline-first ephemeris & daily ritual platform",
      architectureType: "Ephemeris WASM & Local-First Client Engine",
    },
  },
  {
    slug: "driveiq",
    number: "03",
    title: "DriveIQ",
    category: "SAAS / MOBILITY OPERATIONS",
    summary:
      "Smart CRM and ERP workflows for driving institutes and fleet operations.",
    overview:
      "Unpublished confidential incubation platform bringing student scheduling, telemetry, and operations into one workflow.",
    audience:
      "Commercial driving schools and fleet operators managing students and compliance.",
    valueProposition:
      "One unified operating dashboard built for daily operational decisions and student scheduling.",
    features: [
      "Student Management & Progress Tracking",
      "Fleet Telematics & Sensor Ingestion",
      "Automated Regulatory Compliance Reporting",
    ],
    cta: "Explore DriveIQ",
    theme: "driveiq",
    published: false, // STRICT REQUIREMENT: Confidential, must return 404
    techBadges: [
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "IoT Telematics",
    ],
  },
];

/**
 * Returns only verified, published products.
 * STRICT: Unpublished products (e.g. driveiq) are never returned.
 */
export function getPublishedProducts(): Product[] {
  return PRODUCTS_DATA.filter((p) => p.published);
}

/**
 * Retrieves a single product by slug only if published.
 * Returns undefined for unpublished products (e.g. driveiq).
 */
export function getProductBySlug(slug: string): Product | undefined {
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);
  if (!product || !product.published) {
    return undefined;
  }
  return product;
}
