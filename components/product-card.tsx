"use client";

import { motion } from "motion/react";
import ProductArt from "@components/product-art";
import { useCart } from "@components/cart";
import { money, type Product } from "@/lib/site";

/** Shop card with hover lift and quick add-to-bag. */
export default function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  const { add } = useCart();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group flex flex-col ${className}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-b from-blush to-rose transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-30px_rgba(91,52,85,0.6)]">
        {product.badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-plum-ink backdrop-blur">
            {product.badge}
          </span>
        )}
        <ProductArt product={product} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        <button
          onClick={() => add(product.id)}
          className="absolute inset-x-4 bottom-4 translate-y-0 rounded-full bg-plum-ink py-3.5 font-semibold text-white opacity-100 transition-all duration-300 hover:bg-plum lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
        >
          Add to bag · {money(product.price)}
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div>
          <h3 className="font-display text-lg font-bold leading-snug text-plum-ink">{product.name}</h3>
          <p className="mt-1 text-sm text-slate">{product.blurb}</p>
        </div>
        <p className="font-display text-lg font-bold text-plum">{money(product.price)}</p>
      </div>
    </motion.article>
  );
}
