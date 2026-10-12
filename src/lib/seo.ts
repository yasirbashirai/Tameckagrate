import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Per-page metadata: unique title + description, canonical URL,
 * Open Graph + Twitter share cards with a page-specific image.
 */
export function pageMetadata({
  path,
  title,
  description,
  image = "/images/photo-front.webp",
  keywords = [],
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  return {
    // Absolute: these titles already include her name, so skip the "| Tamecka Grate" suffix
    title: { absolute: title },
    description,
    keywords: [site.name, site.nonprofit, "Dallas", ...keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title,
      description,
      images: [{ url: image, alt: `${title}, ${site.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** Absolute URL helper for structured data. */
export const abs = (path: string) => `${site.url}${path}`;

/** Reusable schema.org references. */
export const personRef = { "@id": abs("/#tamecka") };

/** BreadcrumbList schema for a page one level below home. */
export function breadcrumb(name: string, path: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
      { "@type": "ListItem", position: 2, name, item: abs(path) },
    ],
  };
}

/** FAQPage schema from question/answer pairs. */
export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
