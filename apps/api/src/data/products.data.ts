import type { Product } from "@nevrora/types";

export const productsData: Product[] = [
  {
    slug: "neermiti-collections",
    number: "01",
    title: "Neermiti Collections",
    category: "FASHION & LIFESTYLE",
    summary: "Thoughtful clothing for everyday living.",
    overview:
      "Neermiti Collections is a clothing and lifestyle venture focused on pieces that feel considered, comfortable, and made for real days.",
    audience:
      "For people who want clothing with a quiet point of view, chosen for how it feels as much as how it looks.",
    valueProposition:
      "Everyday clothing with tactile, natural materials and an editorial sense of restraint.",
    features: [
      "Tactile natural fabrics",
      "Editorial minimalist silhouettes",
      "Mindful sustainable craftsmanship",
      "Timeless everyday essentials",
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
    summary: "Vedic wisdom for daily clarity.",
    overview:
      "Sadhana Daily is a calm daily companion that brings Vedic wisdom and everyday practice into one quiet place.",
    audience:
      "For people who want a grounded, unhurried daily rhythm, with reference tools and guided practice in one place.",
    valueProposition:
      "Daily reference and practice, presented with calm, uncluttered design.",
    features: [
      "Daily Panchang",
      "Muhurat and Rahu Kaal",
      "Mantra Sadhana",
      "Quiet contemplation tracker",
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
    category: "SAAS / DRIVING-INSTITUTE OPERATIONS",
    summary: "Smart CRM and ERP workflows for driving institutes.",
    overview:
      "DriveIQ is a software platform that brings the daily operations of a driving institute into one clear workflow.",
    audience:
      "For driving institutes that manage students, classes, payments, and reporting across several tools or by hand.",
    valueProposition:
      "One place to run students, schedules, payments, and reports, with a dashboard built for daily decisions.",
    features: [
      "Student management",
      "Classes and scheduling",
      "Payments and reports",
    ],
    cta: "Explore DriveIQ",
    theme: "driveiq",
    published: false, // STRICT NEGATIVE CONSTRAINT: Must NEVER be exposed via public listings, search, or active endpoints
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
