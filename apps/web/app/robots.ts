import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nevrora.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/ventures", "/products/driveiq"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
