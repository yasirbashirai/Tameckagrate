"use client";

import { useState } from "react";
import { motion } from "motion/react";

/** What she stands for. Hovering (or tapping) a card expands it while the others shrink. */
const values = [
  { word: "Faith", line: "Chosen, not broken.", text: "She believes she survived for a reason, and that faith carried her through every stage of healing." },
  { word: "Softness", line: "Gentle is not weak.", text: "After surviving, she chose tenderness on purpose. Softness is the strength that didn't have to harden." },
  { word: "Purpose", line: "Pain with a path.", text: "Rather than let that night hinder her, she let it become the path that led to her purpose." },
  { word: "Lifting", line: "Aspire to inspire.", text: "Rising is only half of it. The other half is reaching back to lift the woman behind you." },
];

export default function Values() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 lg:h-[460px] lg:flex-row">
      {values.map((v, i) => {
        const on = active === i;
        return (
          <motion.button
            key={v.word}
            type="button"
            layout
            onPointerEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-expanded={on}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
            className={`relative overflow-hidden rounded-[2rem] p-8 text-left transition-colors duration-500 ${
              on ? "bg-plum-ink text-white lg:flex-[2.6]" : "bg-white text-plum-ink lg:flex-1"
            }`}
          >
            <span className="font-display text-sm font-bold text-gold">0{i + 1}</span>
            <p className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{v.word}</p>
            <p className={`mt-1 font-script text-3xl ${on ? "text-rose" : "text-plum"}`}>{v.line}</p>
            <motion.p
              animate={{ opacity: on ? 1 : 0, y: on ? 0 : 10 }}
              className={`mt-5 max-w-sm text-lg text-white/80 ${on ? "block" : "hidden lg:block"}`}
            >
              {v.text}
            </motion.p>
            <span
              className={`absolute -bottom-16 -right-16 h-48 w-48 rounded-full transition-all duration-700 ${
                on ? "scale-100 bg-plum/50" : "scale-50 bg-blush"
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
