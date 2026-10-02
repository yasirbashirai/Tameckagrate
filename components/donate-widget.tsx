"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Butterfly from "@components/butterfly";
import { donationTiers, money } from "@/lib/site";

/**
 * Interactive giving: pick an amount (or type one), once or monthly.
 * The butterfly's wings open wider as the gift grows, and the impact line
 * updates live. Submits to /api/checkout (Stripe Checkout, supports monthly).
 */
export default function DonateWidget({ dark = false }: { dark?: boolean }) {
  const [amount, setAmount] = useState<number>(100);
  const [custom, setCustom] = useState("");
  const [monthly, setMonthly] = useState(true);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  const value = custom ? Math.max(0, Number(custom) || 0) : amount;
  // Nearest tier at or below the amount drives the impact line + wing span
  const tier = [...donationTiers].reverse().find((t) => value >= t.amount) ?? donationTiers[0];
  const wingOpen = value < donationTiers[0].amount ? 0.35 + (value / donationTiers[0].amount) * 0.2 : tier.wings;

  async function give() {
    if (value < 1) return setNote("Please enter an amount.");
    setBusy(true);
    setNote("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "donation", amount: value, monthly }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setNote(data.message ?? "Online giving is not switched on yet.");
    } catch {
      setNote("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const card = dark ? "bg-white/[0.07] border-white/10 text-white" : "bg-white border-line text-plum-ink";
  const muted = dark ? "text-white/60" : "text-slate";

  return (
    <div className={`grid overflow-hidden rounded-[2.5rem] border shadow-[0_40px_80px_-40px_rgba(91,52,85,0.55)] md:grid-cols-[0.9fr_1.1fr] ${card}`}>
      {/* Live impact visual */}
      <div className="relative flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-plum-ink via-plum-deep to-plum p-10 text-center text-white">
        <motion.div animate={{ scale: 0.75 + wingOpen * 0.35 }} transition={{ type: "spring", stiffness: 120, damping: 14 }} className="w-52 sm:w-64">
          <Butterfly open={wingOpen} className="w-full brightness-0 invert" />
        </motion.div>
        <div>
          <motion.p key={value + String(monthly)} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display text-6xl font-black">
            {money(value)}
            {monthly && <span className="text-2xl font-bold text-white/70">/mo</span>}
          </motion.p>
          <AnimatePresence mode="wait">
            <motion.p
              key={tier.amount}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto mt-3 max-w-xs text-lg text-white/85"
            >
              {value >= donationTiers[0].amount ? "provides" : "goes toward"} {tier.impact}
              {monthly ? ", every month." : "."}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="p-7 sm:p-10">
        {/* Once / monthly toggle */}
        <div className={`relative grid grid-cols-2 rounded-full p-1 ${dark ? "bg-white/10" : "bg-blush"}`}>
          {[
            { label: "Give monthly", v: true },
            { label: "Give once", v: false },
          ].map((o) => (
            <button key={o.label} onClick={() => setMonthly(o.v)} className="relative rounded-full py-3 font-semibold">
              {monthly === o.v && <motion.span layoutId="give-toggle" className="absolute inset-0 rounded-full bg-plum shadow" />}
              <span className={`relative ${monthly === o.v ? "text-white" : ""}`}>{o.label}</span>
            </button>
          ))}
        </div>
        {monthly && <p className={`mt-3 text-center text-sm ${muted}`}>Monthly donors give women steady support all year.</p>}

        <div className="mt-6 grid grid-cols-3 gap-3">
          {donationTiers.map((t) => {
            const on = !custom && amount === t.amount;
            return (
              <button
                key={t.amount}
                onClick={() => {
                  setAmount(t.amount);
                  setCustom("");
                }}
                className={`rounded-2xl border-2 py-4 font-display text-xl font-bold transition-all ${
                  on ? "border-plum bg-plum text-white shadow-lg shadow-plum/30" : dark ? "border-white/15 hover:border-white/50" : "border-line hover:border-plum/60"
                }`}
              >
                {money(t.amount)}
              </button>
            );
          })}
          <label className={`flex items-center rounded-2xl border-2 px-3 ${custom ? "border-plum" : dark ? "border-white/15" : "border-line"}`}>
            <span className="font-display text-xl font-bold opacity-60">$</span>
            <input
              inputMode="numeric"
              placeholder="Other"
              value={custom}
              onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full bg-transparent py-4 pl-1 font-display text-xl font-bold outline-none placeholder:font-sans placeholder:text-base placeholder:font-normal"
              aria-label="Custom amount"
            />
          </label>
        </div>

        <button
          onClick={give}
          disabled={busy}
          className="mt-7 w-full rounded-full bg-gold py-4 font-display text-lg font-bold text-white shadow-lg shadow-gold/30 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {busy ? "Opening secure checkout…" : `Give ${money(value)}${monthly ? " monthly" : ""}`}
        </button>
        {note && <p className="mt-3 rounded-xl bg-blush px-4 py-3 text-sm text-plum-ink">{note}</p>}

        <p className={`mt-5 flex items-center justify-center gap-2 text-sm ${muted}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          Secure checkout · Cards, Apple Pay &amp; Google Pay
        </p>
      </div>
    </div>
  );
}
