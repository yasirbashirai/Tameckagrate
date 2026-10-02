"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { book } from "@/lib/site";

const titles = ["The night", "The healing", "The purpose"];

/**
 * The back-cover story as three paper pages. As you scroll, each page
 * lifts off the stack and settles beside the last, like turning pages.
 */
export default function PageStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });

  return (
    <div ref={ref} className="grid gap-6 md:grid-cols-3">
      {book.backCover.map((text, i) => (
        <Page key={i} index={i} progress={scrollYProgress} title={titles[i]} text={text} />
      ))}
    </div>
  );
}

function Page({ index, progress, title, text }: { index: number; progress: MotionValue<number>; title: string; text: string }) {
  const start = index * 0.25;
  const y = useTransform(progress, [start, start + 0.4], [120, 0]);
  const rotate = useTransform(progress, [start, start + 0.4], [index % 2 ? 6 : -6, index % 2 ? 1.5 : -1.5]);
  const opacity = useTransform(progress, [start, start + 0.25], [0, 1]);

  return (
    <motion.article
      style={{ y, rotate, opacity }}
      className="relative rounded-md bg-[#fbf7ef] p-9 shadow-[0_30px_60px_-30px_rgba(26,32,41,0.45)] before:absolute before:inset-y-0 before:left-0 before:w-6 before:bg-gradient-to-r before:from-black/[0.06] before:to-transparent"
    >
      <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-gold">Page {index + 1}</p>
      <h3 className="mt-3 font-script text-5xl text-plum">{title}</h3>
      <p className="mt-5 font-serif text-lg leading-relaxed text-slate-deep">{text}</p>
      <p className="mt-8 text-right font-display text-sm text-slate/60">{index + 1}</p>
    </motion.article>
  );
}
