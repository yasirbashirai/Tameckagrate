import Hero from "@components/home/hero";
import AsSeenOn from "@components/home/as-seen-on";
import Marquee from "@components/home/marquee";
import Morph from "@components/home/morph";
import Story from "@components/home/story";
import Journey from "@components/home/journey";
import BookSection from "@components/home/book-section";
import QuoteReveal from "@components/home/quote-reveal";
import Nonprofit from "@components/home/nonprofit";
import Speaking from "@components/home/speaking";
import ShopRail from "@components/home/shop-rail";
import Ebook from "@components/home/ebook";

export const metadata = { alternates: { canonical: "/" } };

/** Homepage: one continuous journey, Survived → Shared. */
export default function Home() {
  return (
    <>
      <Hero />
      <AsSeenOn />
      <Marquee />
      <Morph />
      <Story />
      <Journey />
      <BookSection />
      <QuoteReveal />
      <Nonprofit />
      <Speaking />
      <ShopRail />
      <Ebook />
    </>
  );
}
