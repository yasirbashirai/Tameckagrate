"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Crumbs from "@components/crumbs";
import Butterfly from "@components/butterfly";

/** About hero: outlined surname set huge behind her full-length portrait. */
export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordX = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const herY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-[radial-gradient(110%_80%_at_80%_100%,#ecd6e5_0%,#fbf8f4_60%)] pt-28">
      <motion.p
        style={{ x: wordX }}
        aria-hidden="true"
        className="text-outline pointer-events-none absolute bottom-[6%] left-0 select-none whitespace-nowrap font-display text-[34vw] font-black leading-none text-plum/25"
      >
        GRATE GRATE
      </motion.p>

      <div className="relative mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl items-center gap-6 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10 pb-10 lg:pb-24">
          <Crumbs name="About" />
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-6 font-display text-6xl font-black leading-[0.9] tracking-tight text-plum-ink sm:text-8xl"
          >
            Meet Tamecka Grate.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-3 font-script text-5xl text-plum sm:text-6xl"
          >
            Survivor. Author. Founder.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-7 max-w-xl text-xl leading-relaxed text-slate-deep/85"
          >
            A Dallas native, a corporate leader of more than two decades, the author of <em>Life After</em> and the
            founder of From Survival to Soft. Tamecka survived what should have ended her life, and turned it into
            a purpose: showing others what life after looks like.
          </motion.p>
        </div>

        <motion.div
          style={{ y: herY }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative mx-auto flex h-[60vh] items-end self-end lg:h-[86vh]"
        >
          <div className="absolute left-1/2 top-[6%] w-[150%] -translate-x-1/2 opacity-25">
            <Butterfly flap />
          </div>
          <Image
            src="/images/cutout-sequin.webp"
            alt="Tamecka Grate standing in a rose-gold sequined dress"
            width={151}
            height={535}
            priority
            className="relative h-full w-auto object-contain drop-shadow-[0_30px_50px_rgba(91,52,85,0.35)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
