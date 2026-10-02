"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { speakingTopics } from "@/lib/site";

/** DRAFT takeaways per talk. Tamecka to confirm. */
const takeaways: Record<string, string[]> = {
  "Life After the Unthinkable": [
    "Why the worst day does not get the final word",
    "The daily choices that rebuild strength and confidence",
    "How faith becomes a practice, not just a belief",
  ],
  "Seen, Not Looked At": [
    "What survivors need from managers and HR, and what harms them",
    "Building a workplace culture of dignity and safety",
    "Practical language for difficult conversations",
  ],
  "Softness Is Strength": [
    "Reclaiming identity, style and joy after trauma",
    "Why softness is a choice made from strength",
    "Lifting the next woman as you rise",
  ],
};

/** Signature talks as tabs: pick a talk, see what audiences take home. */
export default function TalkTabs() {
  const [active, setActive] = useState(0);
  const talk = speakingTopics[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col gap-3" role="tablist" aria-label="Signature talks">
        {speakingTopics.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.title}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              onPointerEnter={() => setActive(i)}
              className="relative overflow-hidden rounded-[1.75rem] p-7 text-left"
            >
              {on && <motion.span layoutId="talk-bg" className="absolute inset-0 rounded-[1.75rem] bg-plum-ink" transition={{ type: "spring", stiffness: 260, damping: 30 }} />}
              {!on && <span className="absolute inset-0 rounded-[1.75rem] bg-white" />}
              <span className="relative flex items-center gap-5">
                <span className={`font-display text-4xl font-black ${on ? "text-gold" : "text-plum/30"}`}>0{i + 1}</span>
                <span>
                  <span className={`block font-display text-2xl font-extrabold tracking-tight sm:text-3xl ${on ? "text-white" : "text-plum-ink"}`}>{t.title}</span>
                  <span className={`mt-1 block text-sm font-semibold uppercase tracking-wider ${on ? "text-rose" : "text-plum"}`}>{t.audience}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[460px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blush to-rose p-8 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={talk.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-[60%] sm:max-w-[52%]"
          >
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-plum">Signature Talk</p>
            <h3 className="mt-3 font-display text-3xl font-extrabold leading-tight text-plum-ink sm:text-4xl">{talk.title}</h3>
            <p className="mt-4 text-lg text-slate-deep/85">{talk.text}</p>
            <p className="mt-7 font-display text-xs font-bold uppercase tracking-[0.25em] text-gold">Audiences leave with</p>
            <ul className="mt-3 space-y-3">
              {takeaways[talk.title]?.map((t) => (
                <li key={t} className="flex gap-3 text-base text-plum-ink">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-plum text-[10px] text-white">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={talk.image}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 right-0 h-[92%]"
          >
            <Image src={talk.image} alt="" width={600} height={1200} className="h-full w-auto object-contain object-bottom" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
