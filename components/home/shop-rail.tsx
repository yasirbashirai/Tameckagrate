"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import ProductCard from "@components/product-card";
import { products } from "@/lib/site";

/** Draggable rail of shop products. */
export default function ShopRail() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (viewport.current && track.current) setLimit(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="overflow-hidden bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">The Soft Shop</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-plum-ink sm:text-7xl">
              Wear the <span className="font-script font-normal text-plum">mission.</span>
            </h2>
            <p className="mt-4 max-w-md text-lg text-slate-deep/80">Every purchase helps fund From Survival to Soft.</p>
          </div>
          <Link href="/shop" className="rounded-full border-2 border-plum px-7 py-3 font-semibold text-plum transition-colors hover:bg-plum hover:text-white">
            Visit the shop →
          </Link>
        </div>

        <div ref={viewport} className="mt-14" data-cursor="Drag">
          <motion.div
            ref={track}
            drag="x"
            dragConstraints={{ left: -limit, right: 0 }}
            dragElastic={0.12}
            className="flex w-max cursor-grab gap-6 active:cursor-grabbing"
          >
            {products.map((p) => (
              <ProductCard key={p.id} product={p} className="w-[75vw] shrink-0 sm:w-[320px]" />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
