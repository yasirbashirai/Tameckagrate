import type { Metadata } from "next";
import ShopGrid from "@components/shop-grid";

export const metadata: Metadata = {
  title: "The Soft Shop",
  description: "Signed copies of Life After, the Aspire to Inspire journal and From Survival to Soft merchandise. Every purchase supports the mission.",
};

export default function ShopPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,#f0dde9_0%,#fbf8f4_60%)] pb-10 pt-40 text-center">
        <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">The Soft Shop</p>
        <h1 className="mt-4 font-display text-6xl font-black tracking-tight text-plum-ink sm:text-8xl">
          Wear the <span className="font-script font-normal text-plum">mission.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl px-5 text-xl text-slate-deep/80">
          Signed books, daily affirmations and pieces that say softness is strength. Every purchase funds From Survival to Soft.
        </p>
      </section>
      <ShopGrid />
    </>
  );
}
