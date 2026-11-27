import type { Announcement } from "@nevrora/types";

export const ANNOUNCEMENTS_DATA: Announcement[] = [
  {
    id: "ann-nw-portfolio-preview",
    productId: "prod-sadhana-daily",
    productName: "Sadhana Daily",
    productSlug: "sadhana-daily",
    title: "Sadhana Daily Enters Coming Soon Preview Under Nevrora Works",
    slug: "sadhana-daily-coming-soon-preview",
    summary:
      "Our calm, offline-first daily Panchang and sadhana companion is now listed in Coming Soon preview.",
    content: [
      "Nevrora Works is pleased to introduce the official product preview for Sadhana Daily, our upcoming mobile companion for daily Vedic calendar reference and guided contemplative practice.",
      "Sadhana Daily focuses on accurate location-based Panchang calculations, auspicious muhurat windows, and distraction-free japa tracking with strict local-first privacy.",
      "Interested users can register via the Notify Me option on the Sadhana Daily product page to receive verified updates when Google Play availability opens.",
    ],
    date: "2026-11-16",
    status: "published",
  },
  {
    id: "ann-neermiti-preview",
    productId: "prod-neermiti-collections",
    productName: "Neermiti Collections",
    productSlug: "neermiti-collections",
    title: "Neermiti Collections Digital Storefront Preview Announced",
    slug: "neermiti-collections-storefront-preview",
    summary:
      "Explore the upcoming Neermiti Collections experience uniting heritage Indian handloom textiles with transparent provenance.",
    content: [
      "Neermiti Collections is preparing its digital commerce and provenance platform under Nevrora Works.",
      "Each collection highlights authentic natural fibers, weaving cluster attribution, and detailed garment care guidance across web and mobile.",
    ],
    date: "2026-11-16",
    status: "published",
  },
  {
    id: "ann-driveiq-preview",
    productId: "prod-driveiq",
    productName: "DriveIQ",
    productSlug: "driveiq",
    title: "DriveIQ Operations Platform Added to Coming Soon Portfolio",
    slug: "driveiq-operations-platform-preview",
    summary:
      "DriveIQ brings structured learner scheduling, instructor rosters, and daily operations to modern driving schools.",
    content: [
      "DriveIQ is now previewed in the Nevrora Works product directory as an upcoming Cloud SaaS and Android companion platform for driving institutes.",
      "Driving school operators can request early pilot updates through the Notify Me action on the DriveIQ page.",
    ],
    date: "2026-11-16",
    status: "published",
  },
];

export function getPublishedAnnouncements(productSlug?: string): Announcement[] {
  const published = ANNOUNCEMENTS_DATA.filter((a) => a.status === "published");
  if (!productSlug) return published;
  return published.filter((a) => a.productSlug === productSlug);
}
