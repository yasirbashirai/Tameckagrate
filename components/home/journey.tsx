"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/** The six-step arc. Each card is a shade further from night toward soft blush. */
const steps = [
  { step: "Survived", line: "This happened to me.", body: "The night that should have ended everything became the first page.", bg: "#1f2731", fg: "#f5e9f0" },
  { step: "Softened", line: "Here's what I learned.", body: "Healing wasn't seamless, but it was always purposeful.", bg: "#333f4e", fg: "#f5e9f0" },
  { step: "Spoke", line: "Now I say it out loud.", body: "From boardrooms to sanctuaries, her story gives others permission to tell theirs.", bg: "#5b3455", fg: "#f5e9f0" },
  { step: "Served", line: "Now I lift others.", body: "From Survivor to Soft walks with women from surviving to living.", bg: "#7e4a76", fg: "#fbf8f4" },
  { step: "Shined", line: "And I get to be beautiful too.", body: "Softness, style and joy are not luxuries. They are restoration.", bg: "#e8cfe0", fg: "#5b3455" },
  { step: "Shared", line: "Come with me.", body: "Read the book. Join the circle. Bring her to your stage.", bg: "#fbf8f4", fg: "#5b3455" },
];

/** Pinned section: vertical scroll drives the cards sideways. */
export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // Measure how far the track must travel
  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDistance(track.current.scrollWidth - window.innerWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  return (
    <section ref={ref} className="relative h-[420vh] bg-sand">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 w-full max-w-7xl px-5 sm:px-8">
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">The Journey</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-plum-ink sm:text-6xl">
            Not a moment. <span className="font-script font-normal text-plum">A becoming.</span>
          </h2>
        </div>

        <motion.div ref={track} style={{ x }} className="flex gap-5 pl-5 pr-[10vw] sm:gap-7 sm:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {steps.map((s, i) => (
            <article
              key={s.step}
              style={{ backgroundColor: s.bg, color: s.fg }}
              className="relative flex h-[58vh] w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2.5rem] p-8 shadow-[0_30px_60px_-30px_rgba(31,39,49,0.5)] sm:w-[440px] sm:p-10"
            >
              <span className="text-outline absolute -right-4 -top-8 font-display text-[11rem] font-black leading-none opacity-25">
                {i + 1}
              </span>
              <p className="font-display text-xs font-bold uppercase tracking-[0.3em] opacity-70">Step {i + 1} of 6</p>
              <div>
                <h3 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">{s.step}</h3>
                <p className="mt-2 font-script text-4xl opacity-90">“{s.line}”</p>
                <p className="mt-6 max-w-xs text-lg opacity-80">{s.body}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
