"use client";

import { useState } from "react";

/** Compact volunteer / partner interest form. Posts to /api/contact. */
export default function InterestForm({ type, dark = false }: { type: "volunteer" | "partner"; dark?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, ...Object.fromEntries(new FormData(e.currentTarget)) }),
    }).catch(() => null);
    setStatus(res?.ok ? "done" : "error");
  }

  if (status === "done") return <p className="mt-6 font-script text-3xl">Thank you! We&apos;ll be in touch.</p>;

  const input = `h-13 w-full rounded-2xl border px-5 py-3.5 focus:outline-none ${
    dark ? "border-white/15 bg-white/10 placeholder:text-white/50 focus:border-white" : "border-line bg-cream focus:border-plum"
  }`;

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-3">
      <input name="name" required placeholder="Your name" className={input} />
      <input name="email" type="email" required placeholder="Email" className={input} />
      <textarea name="message" rows={3} placeholder={type === "partner" ? "Your organization and idea" : "How would you like to help?"} className={input} />
      <button disabled={status === "sending"} className={`rounded-full py-3.5 font-semibold transition-transform hover:-translate-y-0.5 ${dark ? "bg-gold text-white" : "bg-plum text-white"}`}>
        {status === "sending" ? "Sending…" : type === "partner" ? "Start a partnership" : "Sign me up"}
      </button>
      {status === "error" && <p className="text-sm">Something went wrong. Please try again.</p>}
    </form>
  );
}
