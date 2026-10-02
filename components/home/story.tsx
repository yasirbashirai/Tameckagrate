"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { timeline } from "@/lib/site";

/**
 * Her story as scroll chapters. Left: sticky stage with the big year and
 * her portrait crossfading per chapter. Right: chapters scroll past while
 * a gold thread draws down the middle.
 */
export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const thread = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(timeline.length - 1, Math.max(0, Math.floor(v * timeline.length))));
  });

  const chapter = timeline[active];

  return (
    <section ref={ref} id="story" className="relative bg-cream">
      <div className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 lg:pt-36">
        <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">Her Story</p>
        <h2 className="mt-4 max-w-3xl text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-plum-ink sm:text-7xl">
          One night tried to end her story. <span className="font-script font-normal text-plum">She kept writing.</span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Sticky stage */}
        <div className="relative hidden lg:block">
          <div className="sticky top-0 flex h-screen items-center">
            <div
              className={`relative h-[78vh] w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-b transition-colors duration-700 ${
                "dark" in chapter ? "from-night to-night" : "from-blush to-rose"
              }`}
            >
              <AnimatePresence mode="popLayout">
                <motion.p
                  style={{ zIndex: 2 }}
                  key={chapter.year}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                  className="absolute left-8 top-6 font-display text-[7.5rem] font-black leading-none tracking-tighter text-white/80"
                >
                  {chapter.year}
                </motion.p>
              </AnimatePresence>
              <AnimatePresence>
                <motion.div
                  key={chapter.image + active}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`absolute inset-x-0 bottom-0 flex justify-center ${"dark" in chapter ? "h-full" : "h-[86%]"}`}
                >
                  <Image
                    src={chapter.image}
                    alt=""
                    width={800}
                    height={1200}
                    className={"dark" in chapter ? "h-full w-full object-cover" : "h-full w-auto object-contain object-bottom"}
                  />
                </motion.div>
              </AnimatePresence>
              {/* Chapter dots */}
              <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                {timeline.map((t, i) => (
                  <span key={t.year} className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-plum" : "w-2 bg-plum/30"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chapters */}
        <div className="relative">
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-line" />
          <motion.div style={{ scaleY: thread }} className="absolute bottom-0 left-[11px] top-0 w-[3px] origin-top -translate-x-px rounded-full bg-gradient-to-b from-gold to-plum" />

          {timeline.map((t, i) => (
            <div key={t.year + t.title} className="relative flex min-h-[70vh] items-center py-16 pl-12 lg:min-h-screen">
              <span
                className={`absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-4 transition-colors duration-500 ${
                  i <= active ? "border-plum bg-gold" : "border-line bg-cream"
                }`}
              />
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.5 }} transition={{ duration: 0.7 }}>
                <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-gold">
                  Chapter {i + 1} · {t.year}
                </p>
                <h3 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-plum-ink sm:text-5xl">{t.title}</h3>
                <p className="mt-5 max-w-lg text-xl leading-relaxed text-slate-deep/80">{t.text}</p>
                {/* Mobile: portrait per chapter */}
                <div className={`mt-8 flex h-72 justify-center overflow-hidden rounded-3xl lg:hidden ${"dark" in t ? "bg-night" : "bg-gradient-to-b from-blush to-rose"}`}>
                  <Image src={t.image} alt="" width={600} height={900} className={"dark" in t ? "h-full w-full object-cover object-top" : "h-full w-auto object-contain object-bottom"} />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
