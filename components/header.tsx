"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { nav, site } from "@/lib/site";

/** Sticky site header: name wordmark + butterfly, desktop links, mobile drawer. */
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/images/fsts-mark.webp" alt="" width={44} height={31} priority />
          <span className="font-display text-lg font-bold tracking-tight text-plum-ink">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-semibold text-slate-deep transition-colors hover:text-plum"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/connect"
            className="rounded-full bg-plum px-5 py-2.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-plum-deep"
          >
            Connect
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-plum-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="border-t border-line bg-cream px-5 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 py-3.5 font-semibold text-slate-deep"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/connect"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-plum py-3.5 text-center font-semibold text-white"
          >
            Connect with Tamecka
          </Link>
        </nav>
      )}
    </header>
  );
}
