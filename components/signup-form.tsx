"use client";

import { useState } from "react";

/**
 * Email signup for the free Aspire to Inspire eBook.
 * Posts to /api/subscribe. TODO: connect that route to her email provider.
 */
export default function SignupForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="rounded-2xl bg-white/10 px-6 py-5 text-lg text-white">
        Thank you! Check your inbox for your copy of <strong>Aspire to Inspire</strong>.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="signup-name">First name</label>
      <input
        id="signup-name"
        name="name"
        placeholder="First name"
        autoComplete="given-name"
        className="h-14 rounded-full border border-white/25 bg-white/10 px-6 text-white placeholder:text-white/60 focus:border-white focus:outline-none sm:w-44"
      />
      <label className="sr-only" htmlFor="signup-email">Email</label>
      <input
        id="signup-email"
        name="email"
        type="email"
        required
        placeholder="Your email"
        autoComplete="email"
        className="h-14 flex-1 rounded-full border border-white/25 bg-white/10 px-6 text-white placeholder:text-white/60 focus:border-white focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="h-14 rounded-full bg-gold px-8 font-semibold text-white transition-colors hover:bg-[#a07c38] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send My eBook"}
      </button>
      </div>
      {status === "error" && (
        <p className="mt-3 text-sm text-blush">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
