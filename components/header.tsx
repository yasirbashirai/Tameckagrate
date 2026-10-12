"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { nav, site } from "@/lib/site";
import { useCart } from "@components/cart";

/**
 * Floating glass header: transparent over the hero, frosted once you scroll.
 * Gold reading-progress thread along the bottom edge. Cart + Donate always visible.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, setOpen: openCart } = useCart();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  // Pages with dark heroes: use light text until the frosted bar kicks in
  const onDark = ["/", "/speaking"].includes(usePathname()) && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full px-4 transition-all duration-500 sm:px-6 ${
          scrolled || open
            ? "border border-white/60 bg-cream/75 shadow-[0_12px_40px_-18px_rgba(91,52,85,0.45)] backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <Link href="/" className="flex items-baseline gap-1.5" onClick={() => setOpen(false)}>
          <span className={`font-display text-xl font-extrabold tracking-tight transition-colors ${onDark ? "text-cream" : "text-plum-ink"}`}>{site.firstName}</span>
          <span className={`font-script text-3xl leading-none transition-colors ${onDark ? "text-gold-soft" : "text-plum"}`}>{site.lastName}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative text-[0.95rem] font-semibold transition-colors ${onDark ? "text-cream/90" : "text-slate-deep"}`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-plum transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openCart(true)}
            className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-colors ${onDark ? "text-cream hover:bg-white/10" : "text-plum-ink hover:bg-blush"}`}
            aria-label={`Open cart, ${count} items`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 7h12l-1 13H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <Link
            href="/donate"
            className="hidden rounded-full bg-plum px-5 py-2.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-plum-deep sm:inline-flex"
          >
            Donate
          </Link>
          <button
            type="button"
            className={`flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${onDark ? "text-cream" : "text-plum-ink"}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M8 16h12" />}
            </svg>
          </button>
        </div>

        {/* Reading progress thread */}
        <motion.span
          className="absolute inset-x-8 -bottom-px h-[2px] origin-left rounded-full bg-gradient-to-r from-gold via-plum to-gold"
          style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
        />
      </div>

      {/* Mobile menu: full-screen sheet */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-2 max-w-7xl rounded-[2rem] border border-white/60 bg-cream/95 p-6 shadow-xl backdrop-blur-xl lg:hidden"
            aria-label="Mobile"
          >
            {nav.map((item, i) => (
              <motion.div key={item.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line/60 py-4 font-display text-2xl font-bold text-plum-ink"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link href="/donate" onClick={() => setOpen(false)} className="rounded-full bg-plum py-3.5 text-center font-semibold text-white">
                Donate
              </Link>
              <Link href="/#connect" onClick={() => setOpen(false)} className="rounded-full border-2 border-plum py-3 text-center font-semibold text-plum">
                Connect
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
