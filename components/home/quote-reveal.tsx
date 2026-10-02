"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { site } from "@/lib/site";

/** Her signature quote, lighting up word by word as you scroll through it. */
export default function QuoteReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.45"] });
  const words = site.signatureQuote.split(" ");

  return (
    <section className="bg-cream py-28 lg:py-40">
      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="font-script text-6xl text-gold">“</p>
        <blockquote>
          <p className="flex flex-wrap font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} highlight={/aspire|inspire/i.test(w)}>
                {w}
              </Word>
            ))}
          </p>
          <footer className="mt-10 flex items-center gap-4">
            <span className="h-px w-16 bg-gold" />
            <span className="font-script text-4xl text-plum">{site.name}</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

function Word({ children, progress, range, highlight }: { children: string; progress: MotionValue<number>; range: [number, number]; highlight: boolean }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] ${highlight ? "font-script font-normal text-plum" : "text-plum-ink"}`}>
      {children}
    </motion.span>
  );
}
