import type { CSSProperties } from "react";

type Props = {
  className?: string;
  /** Continuous gentle wing flap */
  flap?: boolean;
  /** 0 = wings folded shut, 1 = fully open. Used by the preloader + donation widget. */
  open?: number;
  style?: CSSProperties;
};

/**
 * Her butterfly mark, split down the body into two wings that rotate in 3D
 * so it can flap, fold and open. Built from the real logo PNG (no redraw).
 */
export default function Butterfly({ className = "", flap = false, open = 1, style }: Props) {
  const angle = (1 - open) * 82; // degrees each wing is folded toward the viewer
  const wing = "absolute top-0 h-full w-1/2 overflow-hidden transition-transform duration-700 ease-out";

  return (
    <div
      className={`relative aspect-[10/7] [perspective:900px] ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Left wing: hinged on its right edge (the body) */}
      <div className={`${wing} left-0 origin-right`} style={{ transform: `rotateY(${angle}deg)` }}>
        <div className={`h-full w-full origin-right ${flap ? "animate-flap" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- plain img inside 3D-transformed wing */}
          <img src="/images/fsts-mark.webp" alt="" className="h-full w-[200%] max-w-none object-contain" />
        </div>
      </div>
      {/* Right wing: hinged on its left edge, mirrored flap */}
      <div className={`${wing} right-0 origin-left`} style={{ transform: `rotateY(${-angle}deg)` }}>
        <div className={`h-full w-full origin-left ${flap ? "animate-flap-r" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- plain img inside 3D-transformed wing */}
          <img src="/images/fsts-mark.webp" alt="" className="h-full w-[200%] max-w-none -translate-x-1/2 object-contain" />
        </div>
      </div>
    </div>
  );
}
