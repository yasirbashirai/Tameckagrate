"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { book, money } from "@/lib/site";
import { useCart } from "@components/cart";

const formats = [
  { id: "signed", label: "Signed Copy", price: 29.99, note: "Only on this site. Personally signed by Tamecka.", productId: "life-after-signed" },
  { id: "print", label: "Paperback", price: book.printPrice, note: "Ships from Amazon.", href: book.amazonPrint },
  { id: "ebook", label: "eBook", price: book.ebookPrice, note: "Read instantly on Kindle.", href: book.amazonKindle },
] as const;

/**
 * The memoir as a real 3D object: tilts toward the mouse, opens on click
 * to reveal the back-cover story inside. Buy panel beside it.
 */
export default function BookSection() {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<(typeof formats)[number]["id"]>("signed");
  const { add } = useCart();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-38, 8]), { stiffness: 120, damping: 16 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 16 });

  const current = formats.find((f) => f.id === format)!;

  return (
    <section id="book" className="relative overflow-hidden bg-night py-28 text-white lg:py-36">
      {/* Spotlight */}
      <div className="absolute left-1/4 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-plum/30 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        {/* 3D book stage */}
        <div
          className="flex h-[520px] items-center justify-center [perspective:1800px] sm:h-[600px]"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          <motion.button
            type="button"
            onClick={() => setOpen(!open)}
            data-cursor={open ? "Close" : "Open"}
            aria-label={open ? "Close the book" : "Open the book"}
            style={{ rotateY: rotY, rotateX: rotX, transformStyle: "preserve-3d" }}
            animate={{ x: open ? 120 : 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 16 }}
            className="relative h-[390px] w-[260px] sm:h-[450px] sm:w-[300px]"
          >
            {/* Back cover */}
            <div className="absolute inset-0 rounded-r-md bg-[#1d4d33]" style={{ transform: "translateZ(-34px)" }} />
            {/* Page edges (right side) */}
            <div
              className="absolute right-0 top-[4px] h-[calc(100%-8px)] w-[32px] origin-right bg-[repeating-linear-gradient(90deg,#f6f1e8_0px,#f6f1e8_2px,#e2d9ca_3px)]"
              style={{ transform: "rotateY(90deg) translateX(1px)" }}
            />
            {/* Spine (left side) */}
            <div
              className="absolute left-0 top-0 flex h-full w-[34px] origin-left items-center justify-center bg-gradient-to-r from-[#1d4d33] to-[#2f7a50]"
              style={{ transform: "rotateY(90deg) translateX(-34px)" }}
            >
              <span className="rotate-90 whitespace-nowrap font-display text-sm font-bold tracking-[0.3em] text-white">LIFE AFTER</span>
            </div>
            {/* Inside page (revealed when open) */}
            <div className="absolute inset-[3px] flex flex-col justify-center rounded-r-sm bg-[#fbf7ef] p-7 text-left text-slate-deep" style={{ transform: "translateZ(-2px)" }}>
              <p className="font-script text-3xl text-plum">Life After</p>
              <p className="mt-3 text-[0.82rem] leading-relaxed">{book.backCover[0]}</p>
              <p className="mt-3 text-[0.82rem] leading-relaxed">{book.backCover[2]}</p>
            </div>
            {/* Front cover: swings open on its spine */}
            <motion.div
              className="absolute inset-0 origin-left"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: open ? -165 : 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 14 }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-r-md shadow-[inset_4px_0_8px_rgba(0,0,0,0.35)] [backface-visibility:hidden]">
                {/* eslint-disable-next-line @next/next/no-img-element -- needs to sit inside a 3D context */}
                <img src="/images/book-cover.webp" alt="Life After book cover" className="h-full w-full object-cover" />
                <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/30 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-l-md bg-blush p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="font-script text-4xl text-plum">For you,</p>
                <p className="mt-3 text-sm text-plum-ink">who is still finding the way back. There is a life after this.</p>
                <p className="mt-6 font-script text-3xl text-plum">Tamecka</p>
              </div>
            </motion.div>
          </motion.button>
        </div>

        {/* Buy panel */}
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-gold">The Memoir</p>
          <h2 className="mt-4 font-display text-6xl font-black tracking-tight sm:text-8xl">{book.title}</h2>
          <p className="mt-2 font-script text-4xl text-rose">{book.subtitle}</p>
          <p className="mt-6 max-w-lg text-lg text-white/75">{book.blurb}</p>
          <p className="mt-2 text-sm text-white/45">Tap the book to open it.</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {book.promises.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-base text-white/85"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-night">✓</span>
                {p}
              </motion.li>
            ))}
          </ul>

          {/* Format picker */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] p-2 backdrop-blur">
            <div className="grid grid-cols-3 gap-1" role="tablist">
              {formats.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={format === f.id}
                  onClick={() => setFormat(f.id)}
                  className="relative rounded-2xl px-3 py-3 text-sm font-semibold sm:text-base"
                >
                  {format === f.id && (
                    <motion.span layoutId="format-pill" className="absolute inset-0 rounded-2xl bg-white" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                  )}
                  <span className={`relative ${format === f.id ? "text-plum-ink" : "text-white/70"}`}>{f.label}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-4xl font-black">{money(current.price)}</p>
                <p className="text-sm text-white/60">{current.note}</p>
              </div>
              {"productId" in current ? (
                <button onClick={() => add(current.productId)} className="rounded-full bg-gold px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5">
                  Add to bag
                </button>
              ) : (
                <a href={current.href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-8 py-4 text-center font-semibold text-plum-ink transition-transform hover:-translate-y-0.5">
                  Buy on Amazon ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
