import type { MetadataRoute } from "next";

// Crawl directives for search engines and AI crawlers. Everything is public,
// so allow all and point crawlers at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://amarafrica.com/sitemap.xml",
    host: "https://amarafrica.com",
  };
}
