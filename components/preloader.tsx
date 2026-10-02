"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Butterfly from "@components/butterfly";

/**
 * Opening moment: the butterfly unfolds its wings, her name rises, then the
 * curtain lifts. Plays once per browser session so returning visitors aren't slowed.
 */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const [wings, setWings] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("tg-intro") === "1";
      sessionStorage.setItem("tg-intro", "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- skip intro on repeat visits
      setShow(false);
      return;
    }
    const open = setTimeout(() => setWings(1), 250);
    const done = setTimeout(() => setShow(false), 2300);
    return () => {
      clearTimeout(open);
      clearTimeout(done);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cream"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <Butterfly open={wings} className="w-44 sm:w-56" />
          <div className="mt-6 overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
              className="font-display text-3xl font-extrabold tracking-tight text-plum-ink sm:text-4xl"
            >
              Tamecka Grate
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-1 font-script text-3xl text-plum"
          >
            I Aspire to Inspire
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
