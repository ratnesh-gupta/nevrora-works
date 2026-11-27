import type { MetadataRoute } from "next";
import { getPublishedProducts } from "../lib/products-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://nevrora-works.com";
  const currentDate = new Date();

  // Static routes for Nevrora Works (STRICT: Zero inclusion of /services, /our-work, or /ventures)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/announcements`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Published product routes (STRICT: Excludes internal_draft products via getPublishedProducts())
  const productRoutes: MetadataRoute.Sitemap = getPublishedProducts().flatMap(
    (p) => [
      {
        url: `${baseUrl}/products/${p.slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}${p.legal.privacyUrl}`,
        lastModified: currentDate,
        changeFrequency: "yearly",
        priority: 0.4,
      },
      {
        url: `${baseUrl}${p.legal.termsUrl}`,
        lastModified: currentDate,
        changeFrequency: "yearly",
        priority: 0.4,
      },
    ],
  );

  return [...staticRoutes, ...productRoutes];
}
