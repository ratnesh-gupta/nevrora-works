import type { Product } from "@nevrora/types";
import { OFFICIAL_SUPPORT_EMAIL } from "@nevrora/config";

export const productsData: Product[] = [
  {
    id: "prod-sadhana-daily",
    slug: "sadhana-daily",
    number: "01",
    name: "Sadhana Daily",
    title: "Sadhana Daily",
    tagline: "Vedic wisdom and mindful daily practice in one quiet companion.",
    summary:
      "A calm, offline-first daily companion for Panchang reference, auspicious muhurats, and guided sadhana practice.",
    description:
      "Sadhana Daily brings authentic Vedic calendar calculations, daily sankalpa routines, and distraction-free japa tracking into a serene mobile experience.",
    overview:
      "Built for seekers and everyday practitioners who want accurate daily Panchang reference and structured spiritual practice without advertisements, dark patterns, or noisy social feeds.",
    category: "Mobile & Daily Practice",
    lifecycle_status: "coming_soon",
    featured: true,
    published: true,
    icon: "/brand/icon-gradient.svg",
    heroMedia: {
      url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
      altText:
        "Sadhana Daily calm sunrise meditation and daily spiritual practice preview",
      caption:
        "Calm, uncluttered daily Panchang and guided sadhana interface preview.",
    },
    audience:
      "Individuals, families, and practitioners seeking an authentic, distraction-free daily Vedic calendar and sadhana tracker.",
    problemSolved:
      "Most traditional calendar and spiritual reference apps are cluttered with intrusive ads, inconsistent calculations, and confusing layouts.",
    valueProposition:
      "High-precision location-aware Panchang and daily practice tools presented with calm typography, offline reliability, and strict privacy.",
    statusNotice:
      "Coming Soon — Sadhana Daily is an approved product preview currently in pre-release preparation. No launch date has been confirmed yet; join the notification list for verified release updates.",
    platforms: [
      {
        productId: "prod-sadhana-daily",
        platformType: "android",
        label: "Android (Google Play)",
        availability: "coming_soon",
        minimumRequirements: "Android 10.0 or higher",
        status: "coming_soon",
      },
      {
        productId: "prod-sadhana-daily",
        platformType: "ios",
        label: "iOS",
        availability: "coming_soon",
        minimumRequirements: "iOS 16.0 or higher",
        status: "coming_soon",
      },
    ],
    structuredFeatures: [
      {
        id: "feat-sadhana-1",
        productId: "prod-sadhana-daily",
        title: "Location-Aware Daily Panchang",
        description:
          "Accurate daily Tithi, Nakshatra, Yoga, Karana, sunrise, and moonrise calculations tailored to your coordinates.",
        displayOrder: 1,
      },
      {
        id: "feat-sadhana-2",
        productId: "prod-sadhana-daily",
        title: "Auspicious Muhurat & Rahu Kaal Alerts",
        description:
          "Clear daily windows for Abhijit Muhurat, Amrit Kaal, and Rahu Kaal with optional quiet reminders.",
        displayOrder: 2,
      },
      {
        id: "feat-sadhana-3",
        productId: "prod-sadhana-daily",
        title: "Guided Mantra Japa & Contemplation Tracker",
        description:
          "Haptic-assisted mala counter and daily practice streak log stored locally on your device.",
        displayOrder: 3,
      },
      {
        id: "feat-sadhana-4",
        productId: "prod-sadhana-daily",
        title: "Offline-First & Zero Third-Party Ad Trackers",
        description:
          "Works reliably without continuous internet connectivity and never sells personal practice data.",
        displayOrder: 4,
      },
    ],
    features: [
      "Location-Aware Daily Panchang",
      "Auspicious Muhurat & Rahu Kaal Alerts",
      "Guided Mantra Japa & Contemplation Tracker",
      "Offline-First & Zero Third-Party Ad Trackers",
    ],
    mediaGallery: [
      {
        id: "media-sadhana-1",
        productId: "prod-sadhana-daily",
        assetType: "screenshot",
        url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
        altText: "Sadhana Daily home screen showing sunrise and daily Tithi",
        caption: "Daily Panchang overview with sunrise, tithi, and nakshatra.",
        displayOrder: 1,
      },
      {
        id: "media-sadhana-2",
        productId: "prod-sadhana-daily",
        assetType: "screenshot",
        url: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1000&q=80",
        altText: "Sadhana Daily mantra japa counter and mindful timer view",
        caption: "Focused japa counter and daily contemplation log.",
        displayOrder: 2,
      },
    ],
    faqs: [
      {
        id: "faq-sadhana-1",
        productId: "prod-sadhana-daily",
        question: "What is the current availability of Sadhana Daily?",
        answer:
          "Sadhana Daily is currently in Coming Soon preview. You can register via the Notify Me button to receive an email as soon as the Google Play listing opens.",
        displayOrder: 1,
        status: "published",
      },
      {
        id: "faq-sadhana-2",
        productId: "prod-sadhana-daily",
        question: "Does Sadhana Daily require an internet connection?",
        answer:
          "Core Panchang calculations and daily practice logs are designed to work offline on your device after setup.",
        displayOrder: 2,
        status: "published",
      },
    ],
    support: {
      productId: "prod-sadhana-daily",
      supportEmail: OFFICIAL_SUPPORT_EMAIL,
      supportUrl: "/support#sadhana-daily",
      helpCentreUrl: "/support#sadhana-daily",
      responseInfo:
        "Product enquiries and preview questions are answered within 1–2 business days.",
    },
    legal: {
      productId: "prod-sadhana-daily",
      privacyUrl: "/products/sadhana-daily/privacy",
      termsUrl: "/products/sadhana-daily/terms",
      effectiveDate: "2026-11-16",
      version: "1.0",
    },
    seo: {
      pageTitle: "Sadhana Daily — Vedic Wisdom & Daily Practice | Nevrora Works",
      metaDescription:
        "Sadhana Daily by Nevrora Works is a calm, offline-first daily Panchang, muhurat, and sadhana companion app.",
      canonicalPath: "/products/sadhana-daily",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Android, iOS",
    },
    cta: "Notify Me",
    ctaHref:
      "/contact?type=Product+early+access+%2F+Notify+me&product=sadhana-daily",
    theme: "sadhana",
    privacySlug: "/products/sadhana-daily/privacy",
    termsSlug: "/products/sadhana-daily/terms",
    techBadges: ["Android", "iOS", "Offline-First", "Privacy-First"],
  },
  {
    id: "prod-neermiti-collections",
    slug: "neermiti-collections",
    number: "02",
    name: "Neermiti Collections",
    title: "Neermiti Collections",
    tagline: "Thoughtful handloom clothing and artisanal lifestyle commerce.",
    summary:
      "A digital storefront and provenance experience celebrating heritage Indian textiles, natural materials, and everyday comfort.",
    description:
      "Neermiti Collections connects discerning customers with authentic handloom apparel and lifestyle essentials backed by transparent weave-cluster provenance.",
    overview:
      "Designed as a dedicated consumer product brand under Nevrora Works, Neermiti Collections pairs tactile natural fabrics with a clean web and mobile shopping experience.",
    category: "Commerce & Lifestyle",
    lifecycle_status: "coming_soon",
    featured: true,
    published: true,
    icon: "/brand/icon-light.svg",
    heroMedia: {
      url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80",
      altText:
        "Neermiti Collections artisanal handloom textiles and curated apparel preview",
      caption:
        "Curated handloom collections with verified cluster provenance.",
    },
    audience:
      "Consumers and patrons looking for authentic, comfortable everyday clothing crafted with natural fibers and transparent provenance.",
    problemSolved:
      "Shoppers struggle to verify fabric authenticity, weave origin, and care guidance when buying artisanal apparel online.",
    valueProposition:
      "Thoughtfully curated apparel with transparent craft origin details, fabric care guides, and a streamlined digital storefront.",
    statusNotice:
      "Coming Soon — Neermiti Collections is in approved preview ahead of its public storefront launch. Register via Notify Me for early collection access.",
    platforms: [
      {
        productId: "prod-neermiti-collections",
        platformType: "web",
        label: "Web Application",
        availability: "coming_soon",
        minimumRequirements: "Modern desktop or mobile browser",
        status: "coming_soon",
      },
      {
        productId: "prod-neermiti-collections",
        platformType: "android",
        label: "Android (Google Play)",
        availability: "coming_soon",
        minimumRequirements: "Android 10.0 or higher",
        status: "coming_soon",
      },
    ],
    structuredFeatures: [
      {
        id: "feat-neermiti-1",
        productId: "prod-neermiti-collections",
        title: "Artisan & Weave Cluster Provenance",
        description:
          "Every garment includes clear origin information detailing the textile craft, fiber composition, and weaving region.",
        displayOrder: 1,
      },
      {
        id: "feat-neermiti-2",
        productId: "prod-neermiti-collections",
        title: "Tactile Fabric & Fit Lookbooks",
        description:
          "High-resolution drape previews, breathable fabric notes, and accurate sizing guidance for everyday wear.",
        displayOrder: 2,
      },
      {
        id: "feat-neermiti-3",
        productId: "prod-neermiti-collections",
        title: "Small-Batch Release Notifications",
        description:
          "Opt-in alerts for limited seasonal handloom drops and restocks.",
        displayOrder: 3,
      },
      {
        id: "feat-neermiti-4",
        productId: "prod-neermiti-collections",
        title: "Dedicated Order & Care Support",
        description:
          "Direct customer care for sizing help, garment care instructions, and returns.",
        displayOrder: 4,
      },
    ],
    features: [
      "Artisan & Weave Cluster Provenance",
      "Tactile Fabric & Fit Lookbooks",
      "Small-Batch Release Notifications",
      "Dedicated Order & Care Support",
    ],
    mediaGallery: [
      {
        id: "media-neermiti-1",
        productId: "prod-neermiti-collections",
        assetType: "screenshot",
        url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80",
        altText: "Neermiti Collections editorial lookbook and fabric detail view",
        caption: "Seasonal lookbook and natural fabric detail view.",
        displayOrder: 1,
      },
      {
        id: "media-neermiti-2",
        productId: "prod-neermiti-collections",
        assetType: "screenshot",
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
        altText: "Neermiti Collections garment provenance and care guide card",
        caption: "Provenance card with weave origin and garment care guide.",
        displayOrder: 2,
      },
    ],
    faqs: [
      {
        id: "faq-neermiti-1",
        productId: "prod-neermiti-collections",
        question: "When will the Neermiti Collections online store open?",
        answer:
          "Neermiti Collections is currently in Coming Soon preview. Use the Notify Me option to receive an invitation when our inaugural collection goes live.",
        displayOrder: 1,
        status: "published",
      },
      {
        id: "faq-neermiti-2",
        productId: "prod-neermiti-collections",
        question: "Where can I get help with product sizing or partnerships?",
        answer: `You can reach the Neermiti support team anytime at ${OFFICIAL_SUPPORT_EMAIL} or through our Support Directory.`,
        displayOrder: 2,
        status: "published",
      },
    ],
    support: {
      productId: "prod-neermiti-collections",
      supportEmail: OFFICIAL_SUPPORT_EMAIL,
      supportUrl: "/support#neermiti-collections",
      helpCentreUrl: "/support#neermiti-collections",
      responseInfo:
        "Customer and partnership enquiries are answered within 1–2 business days.",
    },
    legal: {
      productId: "prod-neermiti-collections",
      privacyUrl: "/products/neermiti-collections/privacy",
      termsUrl: "/products/neermiti-collections/terms",
      effectiveDate: "2026-11-16",
      version: "1.0",
    },
    seo: {
      pageTitle:
        "Neermiti Collections — Handloom Apparel & Lifestyle | Nevrora Works",
      metaDescription:
        "Discover Neermiti Collections by Nevrora Works: thoughtful handloom clothing and artisanal lifestyle pieces.",
      canonicalPath: "/products/neermiti-collections",
      applicationCategory: "ShoppingApplication",
      operatingSystem: "Web, Android",
    },
    cta: "Notify Me",
    ctaHref:
      "/contact?type=Product+early+access+%2F+Notify+me&product=neermiti-collections",
    theme: "neermiti",
    privacySlug: "/products/neermiti-collections/privacy",
    termsSlug: "/products/neermiti-collections/terms",
    techBadges: ["Web App", "Android", "Provenance Verified", "D2C Commerce"],
  },
  {
    id: "prod-driveiq",
    slug: "driveiq",
    number: "03",
    name: "DriveIQ",
    title: "DriveIQ",
    tagline: "Smart operations, scheduling, and learner workflows for driving schools.",
    summary:
      "A SaaS operations platform bringing student enrollment, instructor scheduling, vehicle rosters, and progress tracking into one clear workspace.",
    description:
      "DriveIQ helps modern driving institutes replace paper registers and fragmented spreadsheets with structured scheduling, attendance tracking, and learner progress records.",
    overview:
      "Built for driving schools, instructors, and learners, DriveIQ streamlines daily training calendars, batch management, and fee receipts across web and mobile.",
    category: "SaaS & Operations",
    lifecycle_status: "coming_soon",
    featured: true,
    published: true,
    icon: "/brand/icon-dark.svg",
    heroMedia: {
      url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=80",
      altText:
        "DriveIQ driving institute operations and instructor scheduling preview",
      caption:
        "Unified student scheduling, instructor rosters, and training session logs.",
    },
    audience:
      "Driving school owners, operations managers, instructors, and enrolled learners.",
    problemSolved:
      "Driving institutes often coordinate lessons, vehicle availability, student attendance, and fee installments across disconnected paper logs and chat messages.",
    valueProposition:
      "One straightforward SaaS workspace to manage students, vehicle slots, instructor schedules, and training completion milestones.",
    statusNotice:
      "Coming Soon — DriveIQ is in approved preview. Register via Notify Me to request early pilot notification when onboarding opens.",
    platforms: [
      {
        productId: "prod-driveiq",
        platformType: "saas",
        label: "Cloud SaaS (Web)",
        availability: "coming_soon",
        minimumRequirements: "Modern web browser",
        status: "coming_soon",
      },
      {
        productId: "prod-driveiq",
        platformType: "android",
        label: "Android (Google Play)",
        availability: "coming_soon",
        minimumRequirements: "Android 10.0 or higher",
        status: "coming_soon",
      },
    ],
    structuredFeatures: [
      {
        id: "feat-driveiq-1",
        productId: "prod-driveiq",
        title: "Student Enrollment & Curriculum Tracking",
        description:
          "Maintain digital learner profiles, license categories, and completed practical session counts.",
        displayOrder: 1,
      },
      {
        id: "feat-driveiq-2",
        productId: "prod-driveiq",
        title: "Instructor & Vehicle Slot Scheduling",
        description:
          "Conflict-free daily calendar for assigning instructors and training vehicles across time slots.",
        displayOrder: 2,
      },
      {
        id: "feat-driveiq-3",
        productId: "prod-driveiq",
        title: "Attendance & Session Check-Ins",
        description:
          "Simple mobile check-ins for practical and classroom sessions with learner sign-off.",
        displayOrder: 3,
      },
      {
        id: "feat-driveiq-4",
        productId: "prod-driveiq",
        title: "Billing & Operational Summaries",
        description:
          "Track fee installments, payment receipts, and daily utilization reports in one place.",
        displayOrder: 4,
      },
    ],
    features: [
      "Student Enrollment & Curriculum Tracking",
      "Instructor & Vehicle Slot Scheduling",
      "Attendance & Session Check-Ins",
      "Billing & Operational Summaries",
    ],
    mediaGallery: [
      {
        id: "media-driveiq-1",
        productId: "prod-driveiq",
        assetType: "screenshot",
        url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=80",
        altText: "DriveIQ daily instructor and vehicle schedule dashboard",
        caption: "Daily session roster and vehicle allocation view.",
        displayOrder: 1,
      },
      {
        id: "media-driveiq-2",
        productId: "prod-driveiq",
        assetType: "screenshot",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
        altText: "DriveIQ student progress and operational metrics view",
        caption: "Student milestone completion and school operations overview.",
        displayOrder: 2,
      },
    ],
    faqs: [
      {
        id: "faq-driveiq-1",
        productId: "prod-driveiq",
        question: "Is DriveIQ available for driving school signups today?",
        answer:
          "DriveIQ is currently in Coming Soon status. Driving institutes can register via Notify Me to be contacted when early access opens.",
        displayOrder: 1,
        status: "published",
      },
      {
        id: "faq-driveiq-2",
        productId: "prod-driveiq",
        question: "What platforms will DriveIQ support?",
        answer:
          "DriveIQ is being built as a Cloud SaaS web dashboard for institute administrators alongside an Android companion app for instructors and learners.",
        displayOrder: 2,
        status: "published",
      },
    ],
    support: {
      productId: "prod-driveiq",
      supportEmail: OFFICIAL_SUPPORT_EMAIL,
      supportUrl: "/support#driveiq",
      helpCentreUrl: "/support#driveiq",
      responseInfo:
        "Product and pilot enquiries are answered within 1–2 business days.",
    },
    legal: {
      productId: "prod-driveiq",
      privacyUrl: "/products/driveiq/privacy",
      termsUrl: "/products/driveiq/terms",
      effectiveDate: "2026-11-16",
      version: "1.0",
    },
    seo: {
      pageTitle:
        "DriveIQ — Driving School Operations & Scheduling SaaS | Nevrora Works",
      metaDescription:
        "DriveIQ by Nevrora Works streamlines student enrollment, instructor scheduling, and daily operations for driving schools.",
      canonicalPath: "/products/driveiq",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android",
    },
    cta: "Notify Me",
    ctaHref:
      "/contact?type=Product+early+access+%2F+Notify+me&product=driveiq",
    theme: "driveiq",
    privacySlug: "/products/driveiq/privacy",
    termsSlug: "/products/driveiq/terms",
    techBadges: ["Cloud SaaS", "Android", "Operations CRM", "Scheduling"],
  },
  {
    id: "prod-internal-sandbox",
    slug: "internal-draft-sandbox",
    number: "04",
    name: "Internal Draft Sandbox",
    title: "Internal Draft Sandbox",
    tagline: "Unpublished internal concept under evaluation.",
    summary: "Internal draft product used to verify NW-FR-03 and NW-FR-11 concealment.",
    description: "Strictly internal draft entry that must never appear in public routes.",
    overview: "Internal R&D concept.",
    category: "AI & Productivity",
    lifecycle_status: "internal_draft",
    featured: false,
    published: false,
    heroMedia: {
      url: "/brand/logo-primary-light.svg",
      altText: "Internal draft placeholder",
    },
    audience: "Internal team only",
    problemSolved: "Internal validation",
    valueProposition: "Internal draft validation",
    statusNotice: "Internal Draft — Not for public distribution.",
    platforms: [],
    structuredFeatures: [],
    features: [],
    mediaGallery: [],
    faqs: [],
    support: {
      productId: "prod-internal-sandbox",
      supportEmail: OFFICIAL_SUPPORT_EMAIL,
      supportUrl: "/support",
      responseInfo: "Internal only",
    },
    legal: {
      productId: "prod-internal-sandbox",
      privacyUrl: "/privacy-policy",
      termsUrl: "/terms",
      effectiveDate: "2026-11-16",
      version: "1.0",
    },
    seo: {
      pageTitle: "Internal Draft",
      metaDescription: "Internal Draft",
      canonicalPath: "/products/internal-draft-sandbox",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
    },
    cta: "Internal Only",
    ctaHref: "/products",
    theme: "default",
  },
];

/**
 * Returns only publicly visible products (NW-FR-01, NW-FR-03, NW-FR-11).
 * Strictly excludes any product with lifecycle_status === "internal_draft" or published !== true.
 */
export function getPublishedProductsData(): Product[] {
  return productsData.filter(
    (product) =>
      product.published === true &&
      product.lifecycle_status !== "internal_draft",
  );
}
