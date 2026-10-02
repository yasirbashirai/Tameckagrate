"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import Crumbs from "@components/crumbs";
import { book, money } from "@/lib/site";

/**
 * "Light at the end of the tunnel" hero, echoing the cover art: rings of a
 * tunnel recede toward a glowing centre where the book floats.
 */
export default function BookHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glow = useTransform(scrollYProgress, [0, 1], [1, 2.2]);
  const mx = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 16 });

  return (
    <section
      ref={ref}
      onPointerMove={(e) => mx.set(e.clientX / window.innerWidth - 0.5)}
      className="relative overflow-hidden bg-night pb-24 pt-32 text-white lg:min-h-[100svh] lg:pb-0"
    >
      {/* Tunnel rings */}
      <motion.div style={{ scale: glow }} className="pointer-events-none absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 lg:left-[70%]">
        {[1100, 820, 580, 380].map((s, i) => (
          <span
            key={s}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={{ width: s, height: s * 1.1, opacity: 0.3 + i * 0.15 }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,233,240,0.55)_0%,rgba(155,91,142,0.25)_40%,transparent_70%)] blur-2xl" />
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-2">
        <div>
          <Crumbs name="Life After" light />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 font-display text-sm font-bold uppercase tracking-[0.3em] text-gold">
            The Memoir · by Tamecka Grate
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-4 font-display text-7xl font-black leading-[0.85] tracking-tight sm:text-9xl"
          >
            Life After
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-3 font-script text-4xl text-rose sm:text-5xl">
            {book.subtitle}
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-7 max-w-lg text-xl text-white/75">
            One New Year&apos;s Eve, she was attacked and left for dead. This is the true story of how she survived, and
            everything she learned about living fully again.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="mt-9 flex flex-wrap gap-3">
            <a href="#buy" className="rounded-full bg-gold px-8 py-4 font-semibold text-white shadow-lg shadow-gold/30 transition-transform hover:-translate-y-0.5">
              Get the book · from {money(book.ebookPrice)}
            </a>
            <a href="#inside" className="rounded-full border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition-colors hover:border-white">
              Read the story
            </a>
          </motion.div>
        </div>

        <div className="flex justify-center [perspective:1400px]">
          <motion.div
            style={{ rotateY: rotY }}
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="animate-float"
          >
            <Image
              src="/images/book-cover.webp"
              alt="Life After: A Memoir of Inspiration Post Survival, book cover"
              width={907}
              height={1360}
              priority
              className="h-auto w-64 rounded-r-lg shadow-[30px_40px_80px_-20px_rgba(0,0,0,0.7)] sm:w-80"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
