"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Soft custom cursor (desktop only): a plum dot plus a trailing ring
 * that swells over links and buttons. Elements can set data-cursor="Label"
 * to show a word inside the ring (e.g. "Open", "Drag").
 */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- enable only after we know it's a mouse device
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    function move(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor], input, label");
      setHover(!!t);
      setLabel(t?.dataset.cursor ?? "");
    }
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-plum"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-plum/60 font-display text-[11px] font-bold uppercase tracking-widest text-white transition-[width,height,background-color] duration-300"
        style={{
          x: rx,
          y: ry,
          width: label ? 86 : hover ? 54 : 34,
          height: label ? 86 : hover ? 54 : 34,
          backgroundColor: label ? "rgba(155,91,142,0.92)" : hover ? "rgba(155,91,142,0.12)" : "transparent",
        }}
      >
        {label}
      </motion.div>
    </>
  );
}
