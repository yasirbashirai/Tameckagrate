"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "@components/product-card";
import { products } from "@/lib/site";

const filters = ["All", "Books", "Apparel", "Gifts"] as const;

/** Filterable product grid with animated re-layout. */
export default function ShopGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = products.filter((p) => filter === "All" || p.category === filter);

  return (
    <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
      <div className="sticky top-24 z-20 mx-auto flex w-fit gap-1 rounded-full border border-white/70 bg-cream/80 p-1.5 shadow-lg backdrop-blur-xl">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className="relative rounded-full px-5 py-2.5 font-semibold sm:px-7">
            {filter === f && <motion.span layoutId="shop-filter" className="absolute inset-0 rounded-full bg-plum" />}
            <span className={`relative ${filter === f ? "text-white" : "text-slate-deep"}`}>{f}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
