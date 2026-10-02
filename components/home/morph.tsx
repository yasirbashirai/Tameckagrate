"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, type MotionValue } from "motion/react";
import Butterfly from "@components/butterfly";

/**
 * Signature moment: "SURVIVAL" set heavy, condensed and hard. As you scroll
 * it literally softens (variable font weight + width), the room turns from
 * night to blush, and it dissolves into "Soft". Her whole brand in one scroll.
 */
export default function Morph() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // SURVIVAL: 900 weight / 62 width → 200 weight / 125 width, then fades out
  const wght = useTransform(p, [0.05, 0.5], [900, 200]);
  const wdth = useTransform(p, [0.05, 0.5], [62, 125]);
  const settings = useMotionTemplate`"wght" ${wght}, "wdth" ${wdth}`;
  const survivalOpacity = useTransform(p, [0.42, 0.55], [1, 0]);
  const survivalBlur = useTransform(p, [0.4, 0.55], [0, 14]);
  const blur = useMotionTemplate`blur(${survivalBlur}px)`;
  const tracking = useTransform(p, [0.05, 0.5], ["-0.04em", "0.06em"]);

  // Soft fades in as script
  const softOpacity = useTransform(p, [0.52, 0.66], [0, 1]);
  const softScale = useTransform(p, [0.52, 0.8], [0.85, 1]);

  // Room colour: night → blush; text colour follows
  const bg = useTransform(p, [0.15, 0.6], ["#1f2731", "#f5e9f0"]);
  const ink = useTransform(p, [0.15, 0.5], ["#f5e9f0", "#5b6878"]);
  const wings = useTransform(p, [0.5, 0.85], [0, 1]);

  const line1 = useTransform(p, [0.05, 0.15, 0.35, 0.45], [0, 1, 1, 0]);
  const line2 = useTransform(p, [0.62, 0.75], [0, 1]);

  return (
    <motion.section ref={ref} style={{ backgroundColor: bg }} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <motion.p style={{ opacity: line1, color: ink }} className="absolute top-[22%] px-6 text-center font-display text-sm font-bold uppercase tracking-[0.3em] sm:text-base">
          Survival is what happened to me
        </motion.p>

        <div className="relative flex w-full items-center justify-center">
          <motion.p
            style={{ fontVariationSettings: settings, opacity: survivalOpacity, filter: blur, color: ink, letterSpacing: tracking }}
            className="whitespace-nowrap font-display text-[16vw] leading-none sm:text-[13vw]"
            aria-hidden="true"
          >
            SURVIVAL
          </motion.p>

          <motion.div style={{ opacity: softOpacity, scale: softScale }} className="absolute flex flex-col items-center">
            <BoundButterfly progress={wings} />
            <p className="-mt-6 font-script text-[30vw] leading-[0.9] text-plum sm:-mt-12 sm:text-[17vw]">Soft</p>
          </motion.div>
        </div>

        <motion.div style={{ opacity: line2 }} className="absolute bottom-[14%] px-6 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-slate">Soft is what I chose</p>
          <p className="mx-auto mt-4 max-w-md text-lg text-slate-deep/80">
            From Survival to Soft is more than a name. It&apos;s the journey every woman deserves to finish.
          </p>
        </motion.div>

        <h2 className="sr-only">From survival to soft</h2>
      </div>
    </motion.section>
  );
}

/** Butterfly whose wings open as the user scrolls. */
function BoundButterfly({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 1], [0.15, 1]);
  return (
    <motion.div style={{ scaleX }} className="w-40 sm:w-64">
      <Butterfly />
    </motion.div>
  );
}
