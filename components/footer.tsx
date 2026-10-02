"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { nav, site } from "@/lib/site";
import Butterfly from "@components/butterfly";

const socialLinks = [
  { label: "Facebook", href: site.socials.facebook },
  { label: "Instagram", href: site.socials.instagram },
  { label: "X / Twitter", href: site.socials.twitter },
];

/** Dark footer with a giant name wordmark that rises into view. */
export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  return (
    <footer ref={ref} id="connect" className="relative overflow-hidden bg-night text-white/75">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-10 pt-20 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Butterfly className="w-24 opacity-90 invert" flap />
          <p className="mt-6 max-w-sm font-display text-3xl font-bold leading-tight text-white">
            Let&apos;s build your life after, together.
          </p>
          <p className="mt-4 max-w-sm text-base">
            Speaking, interviews, partnerships or just to say hello. Tamecka reads every message.
          </p>
          <a
            href="mailto:hello@tameckagrate.com"
            className="mt-6 inline-flex rounded-full bg-gold px-7 py-3.5 font-semibold text-white transition-colors hover:bg-gold-soft"
          >
            hello@tameckagrate.com
          </a>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gold">Explore</p>
          <ul className="mt-5 space-y-3 text-base">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/donate" className="transition-colors hover:text-white">
                Donate
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gold">Follow</p>
          <ul className="mt-5 space-y-3 text-base">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Giant wordmark */}
      <motion.p
        style={{ y }}
        className="pointer-events-none select-none whitespace-nowrap px-4 text-center font-display text-[12vw] font-black leading-[0.8] tracking-tighter text-white/[0.06]"
        aria-hidden="true"
      >
        {site.name}
      </motion.p>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-6 text-sm text-white/45 sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.nonprofit}
          </p>
          <p className="font-script text-xl text-white/60">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
