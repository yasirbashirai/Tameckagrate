import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** /robots.txt: allow everything public (incl. AI search crawlers), hide API + thank-you. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
