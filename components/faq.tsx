"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/** Animated FAQ accordion. Pair with faqSchema() for rich results. */
export default function Faq({ items, dark = false }: { items: readonly { q: string; a: string }[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={`divide-y ${dark ? "divide-white/10" : "divide-line"}`}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <h3 className={`font-display text-xl font-bold sm:text-2xl ${dark ? "text-white" : "text-plum-ink"}`}>{f.q}</h3>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl ${isOpen ? "bg-plum text-white" : dark ? "bg-white/10 text-white" : "bg-blush text-plum"}`}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <p className={`max-w-3xl pb-7 text-lg ${dark ? "text-white/70" : "text-slate-deep/80"}`}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
