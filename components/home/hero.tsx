"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import Butterfly from "@components/butterfly";
import { site } from "@/lib/site";

/** Floating glass chips around her portrait. */
const chips = [
  { text: "Author of Life After", className: "left-[4%] top-[34%] lg:left-[10%]", depth: 28 },
  { text: "Keynote Speaker", className: "right-[3%] top-[26%] lg:right-[12%]", depth: -22 },
  { text: "Founder · From Survival to Soft", className: "right-[2%] top-[58%] lg:right-[7%]", depth: 36 },
];

/**
 * Name font candidates (client, Oct 2026: "bold block, but a little more soft").
 * Preview with ?font=a | b | c. Once she picks, keep one and delete the switch.
 */
const nameFonts = {
  a: { label: "Soft serif", className: "font-[family-name:var(--font-fraunces)] font-black tracking-[-0.03em] [font-variation-settings:'SOFT'_100,'opsz'_144]" },
  b: { label: "Rounded block", className: "font-[family-name:var(--font-nunito)] font-black tracking-[-0.035em]" },
  c: { label: "Elegant serif", className: "font-[family-name:var(--font-dm-serif)] font-normal tracking-[-0.02em]" },
} as const;
type FontKey = keyof typeof nameFonts;

/**
 * Magazine-cover hero: her name set huge BEHIND her cut-out portrait,
 * the butterfly flapping behind her shoulders, layers drifting with the mouse.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [font, setFont] = useState<FontKey>("a");
  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get("font");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- temporary font preview switch
    if (f && f in nameFonts) setFont(f as FontKey);
  }, []);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  // Parallax per layer (further back = moves less)
  const nameX = useTransform(sx, (v) => v * -18);
  const nameY = useTransform(sy, (v) => v * -10);
  const wingX = useTransform(sx, (v) => v * 10);
  const wingY = useTransform(sy, (v) => v * 8);
  const herX = useTransform(sx, (v) => v * 22);

  // Scroll: portrait rises + scales, name drifts up and fades
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const herScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const nameScrollY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  function onMove(e: React.PointerEvent) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative h-[100svh] min-h-[680px] overflow-hidden bg-[radial-gradient(90%_70%_at_50%_95%,#2a1a28_0%,#0b0a0c_60%)]"
    >
      {/* Drifting colour orbs */}
      <div className="absolute -left-32 top-24 h-[28rem] w-[28rem] animate-float rounded-full bg-plum/35 blur-[120px]" />
      <div className="absolute -right-24 bottom-10 h-[26rem] w-[26rem] animate-float rounded-full bg-gold/20 blur-[130px] [animation-delay:-3s]" />

      {/* Giant first name, behind her */}
      <motion.div style={{ x: nameX, y: nameY }} className="absolute inset-x-0 top-[17%] sm:top-[14%]">
        <motion.h1
          style={{ y: nameScrollY, opacity: fade }}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          className={`select-none text-center text-[18.5vw] leading-[0.8] text-transparent bg-gradient-to-b from-cream via-rose to-plum bg-clip-text ${nameFonts[font].className}`}
        >
          <span className="sr-only">{site.name}, author, speaker and founder</span>
          <span aria-hidden="true">TAMECKA</span>
        </motion.h1>
      </motion.div>

      {/* Butterfly rising behind her shoulders */}
      <motion.div
        style={{ x: wingX, y: wingY }}
        className="absolute left-1/2 top-[30%] w-[140vw] max-w-[1100px] -translate-x-1/2 opacity-30 [filter:invert(1)_sepia(1)_saturate(2.5)_hue-rotate(255deg)] sm:top-[24%] sm:w-[80vw]"
      >
        <Butterfly flap className="w-full" />
      </motion.div>

      {/* Her portrait, cut out */}
      <motion.div
        style={{ x: herX, scale: herScale }}
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.3, delay: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        className="absolute bottom-0 left-1/2 h-[62%] w-auto -translate-x-1/2 origin-bottom sm:h-[80%]"
      >
        <Image
          src="/images/cutout-front.webp"
          alt="Tamecka Grate in a black sequined jacket"
          width={381}
          height={639}
          priority
          className="h-full w-auto max-w-none object-contain drop-shadow-[0_0_50px_rgba(155,91,142,0.45)]"
        />
      </motion.div>

      {/* Script surname crossing in front */}
      <motion.p
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.9 }}
        style={{ opacity: fade }}
        className="pointer-events-none absolute right-[6%] top-[33%] z-20 font-script text-[19vw] leading-none text-gold-soft drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] sm:right-[9%] sm:top-[36%] sm:text-[11vw]"
        aria-hidden="true"
      >
        Grate
      </motion.p>

      {/* Floating chips (desktop) */}
      {chips.map((c, i) => (
        <Chip key={c.text} {...c} index={i} sx={sx} sy={sy} />
      ))}

      {/* Bottom bar: line + CTAs */}
      <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[#0b0a0c] via-[#0b0a0c]/85 to-transparent pb-6 pt-24 sm:pb-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 text-center sm:px-8 md:flex-row md:items-end md:justify-between md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="max-w-md text-lg font-medium leading-snug text-cream/85"
          >
            She survived the unthinkable. <br className="hidden sm:block" />
            Now she shows women what <span className="font-script text-3xl text-gold-soft">life after</span> looks like.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link href="/#story" className="rounded-full bg-plum px-7 py-3.5 font-semibold text-white shadow-lg shadow-plum/30 transition-transform hover:-translate-y-0.5">
              Read Her Story
            </Link>
            <Link href="/#speaking" className="rounded-full border-2 border-cream/70 bg-white/5 px-7 py-3 font-semibold text-cream backdrop-blur transition-colors hover:bg-cream hover:text-ink">
              Book Tamecka
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type Spring = ReturnType<typeof useSpring>;

/** One floating chip, drifting with the mouse at its own depth. */
function Chip({ text, className, depth, index, sx, sy }: (typeof chips)[number] & { index: number; sx: Spring; sy: Spring }) {
  const x = useTransform(sx, (n) => n * depth);
  const y = useTransform(sy, (n) => n * depth * 0.6);
  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 + index * 0.15, type: "spring" }}
      className={`absolute z-20 hidden md:block ${className}`}
    >
      <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-cream shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-gold" />
        {text}
      </span>
    </motion.div>
  );
}
