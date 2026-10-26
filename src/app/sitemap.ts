import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** /sitemap.xml: every public page, most important first. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/about", priority: 0.9, freq: "monthly" },
    { path: "/life-after", priority: 0.9, freq: "monthly" },
    { path: "/speaking", priority: 0.9, freq: "monthly" },
    { path: "/from-survivor-to-soft", priority: 0.9, freq: "monthly" },
    { path: "/donate", priority: 0.8, freq: "monthly" },
    { path: "/shop", priority: 0.8, freq: "weekly" },
  ];

  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: new Date(),
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}
