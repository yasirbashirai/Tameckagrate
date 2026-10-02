"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Crumbs from "@components/crumbs";

const formats = ["Keynote", "Workshop", "Panel", "Podcast"];

/** Stage hero: a spotlight falls on her as the lights come up. */
export default function StageHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-night pt-28 text-white">
      {/* Spotlight cone */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        className="pointer-events-none absolute right-[8%] top-0 h-full w-[60vw] max-w-[760px] bg-[conic-gradient(from_180deg_at_50%_0%,transparent_160deg,rgba(245,233,240,0.22)_175deg,rgba(245,233,240,0.32)_180deg,rgba(245,233,240,0.22)_185deg,transparent_200deg)] blur-md lg:right-[6%]"
      />
      {/* Floor pool of light */}
      <div className="pointer-events-none absolute bottom-0 right-[10%] h-40 w-[50vw] max-w-[640px] rounded-[100%] bg-rose/25 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative z-10 pb-16">
          <Crumbs name="Speaking" light />
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-6 font-display text-6xl font-black leading-[0.9] tracking-tight sm:text-8xl"
          >
            Book Tamecka Grate <span className="font-script font-normal text-rose">to speak.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-7 max-w-xl text-xl text-white/75"
          >
            A survivor&apos;s testimony, delivered with the polish of a 20-year corporate leader. Audiences leave moved,
            and leave with something they can use the very next day.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 flex flex-wrap gap-2">
            {formats.map((f, i) => (
              <motion.span
                key={f}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold backdrop-blur"
              >
                {f}
              </motion.span>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-10 flex flex-wrap gap-3">
            <a href="#book-tamecka" className="rounded-full bg-gold px-8 py-4 font-semibold text-white shadow-lg shadow-gold/30 transition-transform hover:-translate-y-0.5">
              Check availability
            </a>
            <a href="#talks" className="rounded-full border-2 border-white/30 px-8 py-3.5 font-semibold transition-colors hover:border-white">
              See her talks
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, filter: "brightness(0.2)" }}
          animate={{ opacity: 1, filter: "brightness(1)" }}
          transition={{ duration: 1.8, delay: 0.3 }}
          className="relative mx-auto flex h-[62vh] items-end self-end lg:h-[84vh]"
        >
          <Image
            src="/images/cutout-standing-grey.webp"
            alt="Tamecka Grate on stage in a green blouse and cream suit"
            width={387}
            height={1321}
            priority
            className="h-full w-auto object-contain drop-shadow-[0_0_60px_rgba(245,233,240,0.25)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
