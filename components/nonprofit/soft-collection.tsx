"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "@components/reveal";

/** Words on the hang tags: what every woman deserves to feel. */
const tags = ["Beautiful", "Valued", "Confident", "Worthy", "Becoming"];

/** Who we're inviting to partner (Tamecka's list). */
const partners = ["Boutique owners", "Fashion retailers", "Designers", "Accessory brands", "Style enthusiasts"];

/** DRAFT giving options. Tamecka to confirm what the boutique accepts. */
const ways = [
  {
    key: "donate",
    title: "Donate clothing & accessories",
    items: [
      "New or gently loved women's clothing, all sizes",
      "Shoes, handbags and jewelry",
      "Professional and interview wear",
      "Accessories and fashion essentials",
    ],
  },
  {
    key: "partner",
    title: "Partner as a boutique or brand",
    items: [
      "Donate inventory or end-of-season stock",
      "Host a clothing drive or pop-up",
      "Sponsor a styling and confidence day",
      "Be recognized as a Soft Collection partner",
    ],
  },
] as const;

/**
 * The Soft Collection: FS2S's boutique initiative. A clothing rail of hang tags,
 * Tamecka's story of the initiative, then the boutique partnership invitation.
 */
export default function SoftCollection() {
  return (
    <>
      <section id="soft-collection" className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#fbf8f4_0%,#f5e9f0_100%)] py-24 lg:py-32">
        <div className="absolute -right-48 top-20 h-[32rem] w-[32rem] rounded-full bg-gold/15 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-gold">A signature initiative of FS2S</p>
            <h2 className="mt-4 font-display text-6xl font-black leading-[0.9] tracking-tight text-plum-ink sm:text-8xl">
              The Soft <span className="font-script font-normal text-plum">Collection</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-balance font-serif text-2xl text-slate-deep sm:text-3xl">
              Where Fashion Meets Purpose, and Confidence Finds Its Way Home.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-deep/75">
              Because every woman deserves to feel beautiful, valued, and confident in the life she&apos;s rebuilding.
            </p>
          </Reveal>

          <ClothingRail />

          <div className="mt-20 grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="relative mx-auto max-w-md">
                <div className="overflow-hidden rounded-t-full border-[10px] border-white bg-night shadow-[0_40px_80px_-40px_rgba(91,52,85,0.6)]">
                  <Image
                    src="/images/photo-sequin.webp"
                    alt="Tamecka Grate in a sequin dress, The Soft Collection"
                    width={427}
                    height={640}
                    className="h-auto w-full"
                  />
                </div>
                <span className="absolute -right-3 top-16 rotate-6 rounded-xl bg-gold px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.25em] text-white shadow-lg sm:-right-8">
                  Boutique
                </span>
                <div className="absolute -bottom-6 -left-3 max-w-[15rem] -rotate-3 rounded-2xl bg-white p-5 shadow-xl sm:-left-8">
                  <p className="font-script text-3xl leading-none text-plum">The Soft Collection</p>
                  <p className="mt-2 text-sm text-slate-deep/70">Curated clothing, accessories and fashion essentials</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-slate-deep/85">
                The Soft Collection is a signature initiative of From Survivor to Soft (FS2S), created with one beautiful
                belief at its foundation:
              </p>
              <blockquote className="my-8 border-l-4 border-gold pl-6 font-display text-3xl font-extrabold leading-tight tracking-tight text-plum-ink sm:text-4xl">
                What a woman has survived should never define what she <span className="font-script font-normal text-plum">deserves.</span>
              </blockquote>
              <div className="space-y-5 text-lg leading-relaxed text-slate-deep/85">
                <p>
                  We believe that healing is not only about overcoming what happened to you. It&apos;s also about rediscovering
                  who you are, embracing who you&apos;re becoming, and giving yourself permission to experience life beyond
                  survival.
                </p>
                <p>
                  For many women navigating life after trauma, hardship, or significant personal transitions, rebuilding
                  confidence can be just as important as rebuilding stability. Sometimes, something as simple as slipping
                  into a beautiful outfit, seeing yourself differently in the mirror, or feeling comfortable in your own skin
                  can become a meaningful part of that journey.
                </p>
                <p className="font-semibold text-plum-ink">That&apos;s where The Soft Collection comes in.</p>
                <p>
                  Through thoughtfully curated clothing, accessories, and fashion essentials, The Soft Collection seeks to
                  provide women with more than a wardrobe. We want to offer an experience that celebrates their
                  individuality, honors their resilience, and reminds them that they are worthy of care, beauty, and new
                  beginnings.
                </p>
                <p>
                  Our mission is not to change who a woman is, but to help her reconnect with the woman she has always been
                  and embrace the woman she is becoming.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="mx-auto mt-24 max-w-4xl text-center">
            <p className="text-balance font-serif text-3xl leading-snug text-plum-ink sm:text-4xl">
              Because softness is not weakness. Softness is the freedom to live, grow, heal, and flourish without allowing
              yesterday&apos;s circumstances to dictate <span className="font-script text-5xl text-plum sm:text-6xl">tomorrow&apos;s possibilities.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <BoutiquePartners />
    </>
  );
}

/** A gold rail of hangers. Each tag sways gently and swings when touched. */
function ClothingRail() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto mt-16 max-w-5xl" aria-label="Every woman deserves to feel beautiful, valued, confident, worthy and becoming">
      <div className="h-2 rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-soft shadow-[0_6px_14px_-6px_rgba(181,143,69,0.8)]" />
      <div className="-mt-1 flex justify-around gap-1">
        {tags.map((t, i) => (
          <motion.div
            key={t}
            className="flex origin-top cursor-grab flex-col items-center"
            animate={reduce ? undefined : { rotate: [-2.5, 2.5, -2.5] }}
            transition={{ duration: 3.4 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            whileHover={reduce ? undefined : { rotate: [0, 14, -10, 6, 0], transition: { duration: 1.1 } }}
          >
            <svg viewBox="0 0 60 40" className="w-8 sm:w-16" aria-hidden="true">
              <path d="M30 2 C24 2 24 10 30 12 L30 16 L4 36 L56 36 L30 16" fill="none" stroke="#5b6878" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
            <div className="-mt-1 h-4 w-px bg-gold sm:h-6" />
            <div
              className={`relative rounded-b-xl rounded-t-sm px-1.5 pb-4 pt-5 text-center shadow-lg sm:px-5 sm:pb-5 sm:pt-6 ${
                ["bg-plum text-white", "bg-white text-plum-ink", "bg-night text-white", "bg-blush text-plum-ink", "bg-gold text-white"][i]
              }`}
            >
              <span className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-cream ring-1 ring-black/10" />
              <p className="font-display text-[0.45rem] font-bold uppercase tracking-[0.2em] opacity-70 sm:text-[0.6rem]">She is</p>
              <p className="mt-1 font-script text-base leading-none sm:text-3xl">{t}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** "Boutiques With a Purpose": clothing donations + partnership requests. */
function BoutiquePartners() {
  const [mode, setMode] = useState<"donate" | "partner">("donate");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: mode === "donate" ? "soft-collection-donation" : "soft-collection-partner",
        ...Object.fromEntries(new FormData(e.currentTarget)),
      }),
    }).catch(() => null);
    setStatus(res?.ok ? "done" : "error");
  }

  const input = "w-full rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 placeholder:text-white/50 focus:border-white focus:outline-none";

  return (
    <section id="boutique-partners" className="scroll-mt-20 bg-plum-ink py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-gold-soft">Boutiques With a Purpose</p>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
            Help us build <span className="font-script font-normal text-rose">The Soft Collection.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {["Your Inventory.", "Her Confidence.", "Our Collective Impact."].map((line, i) => (
            <Reveal key={line} delay={i * 0.1}>
              <div className={`h-full rounded-[2rem] p-8 ${["bg-white/10", "bg-plum", "bg-gold"][i]}`}>
                <span className="font-display text-sm font-bold text-white/60">0{i + 1}</span>
                <p className="mt-6 font-display text-3xl font-extrabold leading-tight">{line}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 max-w-3xl text-xl text-white/80">
            We are extending a heartfelt invitation to boutique owners, fashion retailers, designers, accessory brands, and
            style enthusiasts to partner with us.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {partners.map((p) => (
              <li key={p} className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/90">
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-4">
            {ways.map((w) => (
              <button
                key={w.key}
                type="button"
                onClick={() => setMode(w.key)}
                aria-pressed={mode === w.key}
                className={`rounded-[2rem] p-8 text-left transition-colors ${
                  mode === w.key ? "bg-cream text-plum-ink" : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                <p className="font-display text-2xl font-bold">{w.title} →</p>
                <ul className="mt-4 space-y-2">
                  {w.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {it}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 sm:p-10">
            {status === "done" ? (
              <div className="flex h-full flex-col justify-center">
                <p className="font-script text-5xl text-rose">Thank you!</p>
                <p className="mt-3 text-lg text-white/80">We&apos;ll be in touch to arrange the next steps.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-3">
                <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-gold-soft">
                  {mode === "donate" ? "Donate items" : "Become a partner"}
                </p>
                <h3 className="mb-2 font-display text-3xl font-extrabold">
                  {mode === "donate" ? "Fill her closet." : "Bring your boutique."}
                </h3>
                <input name="name" required placeholder="Your name" className={input} />
                <input name="email" type="email" required placeholder="Email" className={input} />
                <input name="business" placeholder={mode === "donate" ? "Business or brand (optional)" : "Boutique, store or brand name"} className={input} />
                <textarea
                  name="message"
                  rows={3}
                  placeholder={mode === "donate" ? "What would you like to donate? (items, sizes, quantity)" : "Tell us about your business and how you'd like to partner"}
                  className={input}
                />
                <button
                  disabled={status === "sending"}
                  className="mt-1 rounded-full bg-gold py-4 font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  {status === "sending" ? "Sending…" : mode === "donate" ? "Arrange a donation" : "Start a partnership"}
                </button>
                {status === "error" && <p className="text-sm">Something went wrong. Please try again.</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
