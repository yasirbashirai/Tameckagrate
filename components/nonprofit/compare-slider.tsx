"use client";

import { useRef, useState } from "react";

const rows = [
  ["Getting through the day", "Living, not just enduring"],
  ["Hiding what happened", "Telling your story, safely"],
  ["Strength as armor", "Strength as tenderness"],
  ["Carrying it alone", "Surrounded by sisters"],
  ["Waiting to feel normal", "Building a new normal you love"],
];

/**
 * Drag the handle to move from "Survivor" (night) to "Soft" (blush).
 * Both panels are stacked; the top one is clipped to the handle position.
 */
export default function CompareSlider() {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function update(clientX: number) {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  }

  const panel = (soft: boolean) => (
    <div className={`absolute inset-0 flex flex-col justify-center gap-5 px-6 sm:px-14 ${soft ? "items-end bg-blush text-right text-plum-ink" : "items-start bg-night text-white"}`}>
      <p className={`font-display text-xs font-bold uppercase tracking-[0.3em] ${soft ? "text-plum" : "text-gold"}`}>{soft ? "Soft" : "Survivor"}</p>
      {rows.map((r) => (
        <p key={r[0]} className={`max-w-[46%] text-lg leading-snug sm:text-2xl ${soft ? "font-script text-3xl text-plum sm:text-4xl" : "font-display font-bold"}`}>
          {soft ? r[1] : r[0]}
        </p>
      ))}
    </div>
  );

  return (
    <div
      ref={box}
      data-cursor="Drag"
      className="relative h-[520px] touch-pan-y select-none overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-40px_rgba(31,39,49,0.6)]"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {panel(true)}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {panel(false)}
      </div>

      {/* Handle */}
      <div className="absolute inset-y-0 w-[3px] -translate-x-1/2 bg-gold" style={{ left: `${pos}%` }}>
        <button
          type="button"
          aria-label="Drag to compare survivor and soft"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 5));
            if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 5));
          }}
          className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold font-bold text-white shadow-xl"
        >
          ⟷
        </button>
      </div>
    </div>
  );
}
