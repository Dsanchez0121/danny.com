import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Update this when you buy dannylore.me — for now points to vercel.app
  // Once custom domain is live, change to https://dannylore.me/sitemap.xml
  const baseUrl = "https://dannylore.me";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
