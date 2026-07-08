import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: [
      "https://adventure-blog-flax.vercel.app/sitemap.xml",
      "https://dannylore.me/sitemap.xml",
    ],
  };
}
