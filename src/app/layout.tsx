import type { Metadata } from "next";
import { Archivo, Source_Sans_3, Allura } from "next/font/google";
import Header from "@components/header";
import Footer from "@components/footer";
import { CartProvider } from "@components/cart";
import CartDrawer from "@components/cart-drawer";
import SmoothScroll from "@components/smooth-scroll";
import Cursor from "@components/cursor";
import Preloader from "@components/preloader";
import { site, book } from "@/lib/site";
import "./globals.css";

// Archivo loaded as a variable font WITH the width axis: powers the Survival → Soft morph
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const sourceSans = Source_Sans_3({ variable: "--font-source-sans", subsets: ["latin"] });
const script = Allura({ variable: "--font-script-face", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Author, Speaker & Founder of ${site.nonprofit}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Tamecka Grate is a Dallas author, speaker and founder of From Survival to Soft. Read her memoir Life After, book her to speak, shop, and support women rebuilding their lives.",
  openGraph: {
    type: "website",
    siteName: site.name,
    images: ["/images/portrait-hero.webp"],
  },
  twitter: { card: "summary_large_image", images: ["/images/portrait-hero.webp"] },
  robots: { index: true, follow: true },
};

// Structured data so Google + AI search know who she is
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
      "@type": "NGO",
      name: site.nonprofit,
      founder: { "@id": `${site.url}/#tamecka` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${sourceSans.variable} ${script.variable}`}>
      <body className="grain flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <CartProvider>
          <Preloader />
          <SmoothScroll />
          <Cursor />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
