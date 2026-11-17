import type { MetadataRoute } from "next";
import { getPublishedServices } from "../lib/services-data";
import { getPublishedProducts } from "../lib/products-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nevrora.com";
  const currentDate = new Date();

  // Static routes (STRICT: Zero inclusion of /ventures)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/our-work`,
      lastModified: currentDate,
      changeFrequency: "monthly",
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

  // 6 Services routes
  const serviceRoutes: MetadataRoute.Sitemap = getPublishedServices().map(
    (s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  // Launch Products routes (STRICT: Excludes driveiq because getPublishedProducts() only returns published === true)
  const productRoutes: MetadataRoute.Sitemap = getPublishedProducts().flatMap(
    (p) => {
      const entries: MetadataRoute.Sitemap = [
        {
          url: `${baseUrl}/products/${p.slug}`,
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: 0.85,
        },
      ];
      if (p.privacySlug) {
        entries.push({
          url: `${baseUrl}${p.privacySlug}`,
          lastModified: currentDate,
          changeFrequency: "yearly",
          priority: 0.4,
        });
      }
      return entries;
    },
  );

  return [...staticRoutes, ...serviceRoutes, ...productRoutes];
}
