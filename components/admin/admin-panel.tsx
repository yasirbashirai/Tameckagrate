"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";

/**
 * /admin: password login, then a small form for the details Tamecka manages
 * herself. Talks to /api/admin (PHP on the live site, a Next route in dev).
 */
type Settings = { paypalEmail: string; monthlyGiving: boolean; inboxEmail: string; ebookUrl: string };
type Note = { ok: boolean; text: string } | null;

async function api(body?: object) {
  const res = await fetch("/api/admin", {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "same-origin",
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({ error: "The server did not answer. Please try again." }));
  return { status: res.status, data };
}

const input =
  "mt-2 w-full rounded-2xl border-2 border-line bg-white px-4 py-3.5 text-plum-ink outline-none transition-colors placeholder:text-slate/50 focus:border-plum";
const button = "rounded-full bg-plum px-8 py-3.5 font-semibold text-white transition-colors hover:bg-plum-deep disabled:opacity-60";

function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-[2rem] border border-line bg-white p-7 shadow-[0_40px_80px_-50px_rgba(91,52,85,0.55)] sm:p-9">{children}</div>;
}

function Message({ note }: { note: Note }) {
  if (!note) return null;
  return (
    <p role="status" className={`mt-4 rounded-xl px-4 py-3 text-sm ${note.ok ? "bg-emerald-50 text-emerald-800" : "bg-blush text-plum-ink"}`}>
      {note.text}
    </p>
  );
}

export default function AdminPanel() {
  const [state, setState] = useState<"loading" | "off" | "login" | "in">("loading");
  const [settings, setSettings] = useState<Settings>({ paypalEmail: "", monthlyGiving: true, inboxEmail: "", ebookUrl: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<Note>(null);
  const [pw, setPw] = useState({ current: "", next: "" });
  const [pwNote, setPwNote] = useState<Note>(null);

  // Already logged in? (session cookie)
  useEffect(() => {
    api().then(({ data }) => {
      if (data.settings) setSettings(data.settings);
      setState(data.authed ? "in" : data.enabled === false ? "off" : "login");
    });
  }, []);

  async function login(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNote(null);
    const { data } = await api({ action: "login", username, password });
    setBusy(false);
    if (!data.ok) return setNote({ ok: false, text: data.error ?? "Could not log in." });
    setSettings(data.settings);
    setPassword("");
    setState("in");
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNote(null);
    const { status, data } = await api({ action: "save", settings });
    setBusy(false);
    if (status === 401) return setState("login");
    if (!data.ok) return setNote({ ok: false, text: data.error ?? "Could not save." });
    setSettings(data.settings);
    setNote({ ok: true, text: "Saved. The website is using these details now." });
  }

  async function changePassword(e: FormEvent) {
    e.preventDefault();
    setPwNote(null);
    const { status, data } = await api({ action: "password", ...pw });
    if (status === 401) return setState("login");
    if (!data.ok) return setPwNote({ ok: false, text: data.error ?? "Could not change the password." });
    setPw({ current: "", next: "" });
    setPwNote({ ok: true, text: "Password changed." });
  }

  async function logout() {
    await api({ action: "logout" });
    setNote(null);
    setState("login");
  }

  if (state === "loading") return <p className="text-center text-slate">Loading…</p>;

  if (state === "off")
    return (
      <div className="mx-auto max-w-md">
        <Card>
          <h1 className="font-display text-3xl font-black text-plum-ink">Site settings</h1>
          <p className="mt-3 text-slate">This page is not switched on yet. Please contact your web developer.</p>
        </Card>
      </div>
    );

  if (state === "login")
    return (
      <div className="mx-auto max-w-md">
        <Card>
          <h1 className="font-display text-3xl font-black text-plum-ink">Site settings</h1>
          <p className="mt-2 text-slate">Log in to manage your payment and contact details.</p>
          <form onSubmit={login} className="mt-6">
            <label className="block font-semibold text-plum-ink">
              Username
              <input type="text" autoComplete="username" autoCapitalize="none" required autoFocus value={username} onChange={(e) => setUsername(e.target.value)} className={input} />
            </label>
            <label className="mt-4 block font-semibold text-plum-ink">
              Password
              <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
            </label>
            <button disabled={busy} className={`${button} mt-6 w-full`}>
              {busy ? "Checking…" : "Log in"}
            </button>
            <Message note={note} />
          </form>
        </Card>
      </div>
    );

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-script text-3xl text-plum">Welcome back</p>
          <h1 className="font-display text-4xl font-black tracking-tight text-plum-ink">Site settings</h1>
        </div>
        <button onClick={logout} className="rounded-full border-2 border-line px-5 py-2.5 font-semibold text-plum-ink hover:border-plum">
          Log out
        </button>
      </div>

      <form onSubmit={save} className="space-y-6">
        <Card>
          <h2 className="font-display text-2xl font-bold text-plum-ink">PayPal</h2>
          <p className="mt-1 text-slate">Book orders and donations are paid into this PayPal account.</p>
          <label className="mt-5 block font-semibold text-plum-ink">
            PayPal email
            <input
              type="email"
              placeholder="you@example.com"
              value={settings.paypalEmail}
              onChange={(e) => setSettings({ ...settings, paypalEmail: e.target.value })}
              className={input}
            />
          </label>
          <p className="mt-2 text-sm text-slate">
            Use the email you log in to PayPal with, and make sure it is confirmed in PayPal. Leave empty to pause online payments.
          </p>
          <label className="mt-5 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={settings.monthlyGiving}
              onChange={(e) => setSettings({ ...settings, monthlyGiving: e.target.checked })}
              className="mt-1 h-5 w-5 accent-[#9B5B8E]"
            />
            <span>
              <span className="font-semibold text-plum-ink">Offer monthly donations</span>
              <span className="block text-sm text-slate">Needs a PayPal Business account. Untick this if yours is a Personal account.</span>
            </span>
          </label>
        </Card>

        <Card>
          <h2 className="font-display text-2xl font-bold text-plum-ink">Contact</h2>
          <label className="mt-5 block font-semibold text-plum-ink">
            Inbox email
            <input
              type="email"
              placeholder="hello@tameckagrate.com"
              value={settings.inboxEmail}
              onChange={(e) => setSettings({ ...settings, inboxEmail: e.target.value })}
              className={input}
            />
          </label>
          <p className="mt-2 text-sm text-slate">Speaking requests, volunteer and partner forms and new sign-ups are emailed here.</p>
          <label className="mt-5 block font-semibold text-plum-ink">
            Free eBook link
            <input
              type="url"
              placeholder="https://…"
              value={settings.ebookUrl}
              onChange={(e) => setSettings({ ...settings, ebookUrl: e.target.value })}
              className={input}
            />
          </label>
          <p className="mt-2 text-sm text-slate">Link to the Aspire to Inspire PDF, sent to new subscribers in their welcome email.</p>
        </Card>

        <div>
          <button disabled={busy} className={button}>
            {busy ? "Saving…" : "Save changes"}
          </button>
          <Message note={note} />
        </div>
      </form>

      <Card>
        <h2 className="font-display text-2xl font-bold text-plum-ink">Change password</h2>
        <form onSubmit={changePassword} className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block font-semibold text-plum-ink">
            Current password
            <input type="password" autoComplete="current-password" required value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} className={input} />
          </label>
          <label className="block font-semibold text-plum-ink">
            New password
            <input type="password" autoComplete="new-password" required minLength={8} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} className={input} />
          </label>
          <div className="sm:col-span-2">
            <button className="rounded-full border-2 border-plum px-8 py-3 font-semibold text-plum transition-colors hover:bg-plum hover:text-white">Update password</button>
            <Message note={pwNote} />
          </div>
        </form>
      </Card>
    </div>
  );
}
