"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { press, speakingTopics } from "@/lib/site";

/** Real proof points (no invented numbers). */
const proof = [
  { big: "20+", small: "years leading people in Employee Relations at AT&T" },
  { big: "1996", small: "survived an attack doctors called a miracle" },
  { big: "2020", small: "published author of Life After" },
  { big: "DFW", small: "featured on 97.9 The Beat · Femme Fridays" },
];

/**
 * Speaking: big hover rows. On desktop her portrait floats after the cursor
 * over whichever talk you're reading. Booking request form below.
 */
export default function Speaking() {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });

  return (
    <section id="speaking" className="relative bg-cream py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">Speaking</p>
            <h2 className="mt-4 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-plum-ink sm:text-7xl">
              A survivor who speaks <span className="font-script font-normal text-plum">fluent corporate.</span>
            </h2>
          </div>
          <p className="text-xl text-slate-deep/80">
            Keynotes, workshops, panels and interviews for corporate wellness, faith conferences, universities and
            awareness months.
          </p>
        </div>

        {/* Proof strip */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line lg:grid-cols-4">
          {proof.map((p) => (
            <div key={p.big} className="bg-cream p-6 sm:p-8">
              <p className="font-display text-4xl font-black text-plum sm:text-5xl">{p.big}</p>
              <p className="mt-2 text-sm text-slate sm:text-base">{p.small}</p>
            </div>
          ))}
        </div>

        {/* Talk rows */}
        <div
          className="relative mt-16"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
          }}
          onPointerLeave={() => setHovered(null)}
        >
          {speakingTopics.map((t, i) => (
            <div
              key={t.title}
              onPointerEnter={() => setHovered(i)}
              className="group relative grid gap-3 border-t border-line py-9 transition-colors last:border-b sm:grid-cols-[80px_1fr_1fr] sm:items-center"
            >
              <span className="font-display text-xl font-bold text-gold">0{i + 1}</span>
              <h3 className="font-display text-3xl font-extrabold tracking-tight text-plum-ink transition-transform duration-500 group-hover:translate-x-3 sm:text-5xl">
                {t.title}
              </h3>
              <div className="sm:pl-10">
                <p className="text-lg text-slate-deep/80">{t.text}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-plum">{t.audience}</p>
              </div>
            </div>
          ))}

          {/* Cursor-following portrait (desktop) */}
          <motion.div style={{ x: sx, y: sy }} className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block">
            <AnimatePresence>
              {hovered !== null && (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="absolute -left-28 -top-44 h-80 w-56 overflow-hidden rounded-[2rem] bg-gradient-to-b from-blush to-rose shadow-2xl"
                >
                  <Image src={speakingTopics[hovered].image} alt="" width={500} height={800} className="absolute bottom-0 left-1/2 h-[95%] w-auto max-w-none -translate-x-1/2" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Booking request */}
        <BookingForm />

        <p className="mt-8 text-center text-base text-slate">
          As heard on{" "}
          {press.map((p) => (
            <a key={p.outlet} href={p.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-plum-ink underline-offset-4 hover:underline">
              {p.outlet} · {p.feature}
            </a>
          ))}
        </p>
      </div>
    </section>
  );
}

/** Short booking request. Posts to /api/contact. */
function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "speaking", ...data }),
    }).catch(() => null);
    setStatus(res?.ok ? "done" : "error");
  }

  const input = "h-14 w-full rounded-2xl border border-white/15 bg-white/10 px-5 text-white placeholder:text-white/50 focus:border-white focus:outline-none";

  return (
    <div className="relative mt-20 overflow-hidden rounded-[2.5rem] bg-plum-ink p-8 text-white sm:p-12">
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-plum blur-3xl" />
      <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-gold">Book Tamecka</p>
          <p className="mt-3 font-display text-4xl font-extrabold leading-tight">Bring her story to your stage.</p>
          <p className="mt-3 text-white/70">Tell us about your event. You&apos;ll hear back within two business days.</p>
        </div>
        {status === "done" ? (
          <p className="self-center rounded-2xl bg-white/10 p-6 text-xl">Thank you! Your request is in. Tamecka&apos;s team will be in touch soon.</p>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
            <input name="name" required placeholder="Your name" className={input} />
            <input name="email" type="email" required placeholder="Email" className={input} />
            <input name="event" placeholder="Event or organization" className={input} />
            <input name="date" placeholder="Date (approx.)" className={input} />
            <select name="format" className={`${input} appearance-none`} defaultValue="">
              <option value="" disabled className="text-ink">Format</option>
              {["Keynote", "Workshop", "Panel", "Interview / Podcast"].map((f) => (
                <option key={f} className="text-ink">{f}</option>
              ))}
            </select>
            <input name="audience" placeholder="Audience size" className={input} />
            <button disabled={status === "sending"} className="h-14 rounded-2xl bg-gold font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:col-span-2">
              {status === "sending" ? "Sending…" : "Request availability"}
            </button>
            {status === "error" && <p className="text-sm text-rose sm:col-span-2">Something went wrong. Please try again.</p>}
          </form>
        )}
      </div>
    </div>
  );
}
