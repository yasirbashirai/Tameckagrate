import type { Metadata } from "next";
import { Archivo, Source_Sans_3, Allura } from "next/font/google";
import Header from "@components/header";
import Footer from "@components/footer";
import { site, book } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"] });
const sourceSans = Source_Sans_3({ variable: "--font-source-sans", subsets: ["latin"] });
const script = Allura({ variable: "--font-script-face", subsets: ["latin"], weight: "400" });

// Real titles + descriptions (the old Wix site said "Home | Mysite" on every page)
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Author, Speaker & Founder of ${site.nonprofit}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Tamecka Grate-Frazier is a Dallas author, speaker and founder of From Survival to Soft. Read her memoir Life After, book her to speak, and support women rebuilding their lives.",
  openGraph: {
    type: "website",
    siteName: site.name,
    images: ["/images/portrait-hero.webp"],
  },
};

// Structured data so Google + AI search know who she is (old site had none)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#tamecka`,
      name: site.name,
      jobTitle: "Author, Speaker, Founder",
      url: site.url,
      image: `${site.url}/images/portrait-hero.webp`,
      homeLocation: { "@type": "Place", name: "Dallas, Texas" },
      alumniOf: "Northwood University",
      sameAs: Object.values(site.socials),
    },
    {
      "@type": "Book",
      name: `${book.title}: ${book.subtitle}`,
      isbn: book.isbn,
      author: { "@id": `${site.url}/#tamecka` },
    },
    {
      "@type": "Organization",
      name: site.nonprofit,
      founder: { "@id": `${site.url}/#tamecka` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${sourceSans.variable} ${script.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
