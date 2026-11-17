import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://nevrora-works.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/ventures",
        "/services",
        "/our-work",
        "/products/internal-draft-sandbox",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
