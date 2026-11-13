import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminEnabled, checkPassword, checkUser, editable, hashPassword, loadSettings, saveSettings, sessions } from "@/lib/settings-store";

export const dynamic = "force-dynamic";

/**
 * Backend for the /admin page: password login + saving site settings.
 * Same contract as the live PHP version (deploy/php/api/admin.php).
 */
const COOKIE = "tg_admin";
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

async function isAuthed() {
  const token = (await cookies()).get(COOKIE)?.value;
  return Boolean(token && sessions.has(token));
}

export async function GET() {
  const s = await loadSettings();
  const authed = adminEnabled(s) && (await isAuthed());
  return NextResponse.json({ enabled: adminEnabled(s), authed, ...(authed ? { settings: editable(s) } : {}) });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const s = await loadSettings();
  if (!adminEnabled(s)) return fail("Admin is switched off. Set ADMIN_PASSWORD first.", 403);

  if (body.action === "login") {
    if (!checkUser(String(body.username ?? "")) || !checkPassword(s, String(body.password ?? ""))) return fail("Wrong username or password.", 401);
    const token = randomBytes(24).toString("hex");
    sessions.add(token);
    const res = NextResponse.json({ ok: true, settings: editable(s) });
    res.cookies.set(COOKIE, token, { httpOnly: true, sameSite: "strict", path: "/" });
    return res;
  }

  if (body.action === "logout") {
    const token = (await cookies()).get(COOKIE)?.value;
    if (token) sessions.delete(token);
    const res = NextResponse.json({ ok: true });
    res.cookies.delete(COOKIE);
    return res;
  }

  if (!(await isAuthed())) return fail("Please log in again.", 401);

  if (body.action === "save") {
    const paypalEmail = String(body.settings?.paypalEmail ?? "").trim();
    const inboxEmail = String(body.settings?.inboxEmail ?? "").trim();
    const ebookUrl = String(body.settings?.ebookUrl ?? "").trim();
    if (paypalEmail && !isEmail(paypalEmail)) return fail("The PayPal email does not look right.", 400);
    if (inboxEmail && !isEmail(inboxEmail)) return fail("The inbox email does not look right.", 400);
    if (ebookUrl && !/^https?:\/\/\S+$/i.test(ebookUrl)) return fail("The eBook link must start with https://", 400);
    const next = { ...s, paypalEmail, inboxEmail, ebookUrl, monthlyGiving: Boolean(body.settings?.monthlyGiving) };
    await saveSettings(next);
    return NextResponse.json({ ok: true, settings: editable(next) });
  }

  if (body.action === "password") {
    const next = String(body.next ?? "");
    if (!checkPassword(s, String(body.current ?? ""))) return fail("Current password is wrong.", 400);
    if (next.length < 8) return fail("New password needs at least 8 characters.", 400);
    await saveSettings({ ...s, adminPasswordHash: hashPassword(next) });
    return NextResponse.json({ ok: true });
  }

  return fail("Unknown action.", 400);
}
