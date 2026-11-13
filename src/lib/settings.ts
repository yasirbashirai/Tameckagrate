"use client";

import { useEffect, useState } from "react";
import { payments } from "@/lib/site";

/** Settings Tamecka controls from /admin, fetched once per page load. */
export type PublicSettings = { paypalEmail: string; monthlyGiving: boolean };

const fallback: PublicSettings = { paypalEmail: payments.paypalEmail, monthlyGiving: true };
let cache: Promise<PublicSettings> | null = null;

export function fetchSettings(fresh = false): Promise<PublicSettings> {
  if (!cache || fresh) {
    cache = fetch("/api/settings", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : fallback))
      .then((s) => ({ paypalEmail: s.paypalEmail || fallback.paypalEmail, monthlyGiving: s.monthlyGiving !== false }))
      .catch(() => fallback);
  }
  return cache;
}

export function usePublicSettings(): PublicSettings {
  const [settings, setSettings] = useState(fallback);
  useEffect(() => {
    let live = true;
    fetchSettings().then((s) => live && setSettings(s));
    return () => {
      live = false;
    };
  }, []);
  return settings;
}
