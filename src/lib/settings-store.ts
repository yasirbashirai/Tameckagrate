import { promises as fs } from "fs";
import path from "path";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

/**
 * Local (next dev) twin of deploy/php/api: settings saved from /admin live in
 * .data/settings.json. On the live shared-hosting site the PHP files do this job.
 */
export type Settings = {
  paypalEmail: string;
  monthlyGiving: boolean;
  inboxEmail: string;
  ebookUrl: string;
  adminPasswordHash?: string;
};

const FILE = path.join(process.cwd(), ".data", "settings.json");
const DEFAULTS: Settings = { paypalEmail: "", monthlyGiving: true, inboxEmail: "", ebookUrl: "" };

export async function loadSettings(): Promise<Settings> {
  try {
    return { ...DEFAULTS, ...JSON.parse(await fs.readFile(FILE, "utf8")) };
  } catch {
    return { ...DEFAULTS };
  }
}

export async function saveSettings(settings: Settings) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(settings, null, 2));
}

/** The fields the admin form edits (never the password hash). */
export function editable({ paypalEmail, monthlyGiving, inboxEmail, ebookUrl }: Settings) {
  return { paypalEmail, monthlyGiving, inboxEmail, ebookUrl };
}

/** Login comes from ADMIN_USER / ADMIN_PASSWORD in .env.local (not committed). */
const initialPassword = () => process.env.ADMIN_PASSWORD ?? "";

export const checkUser = (given: string) => given.trim().toLowerCase() === (process.env.ADMIN_USER ?? "").toLowerCase();

export const adminEnabled = (s: Settings) => Boolean(s.adminPasswordHash || initialPassword());

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 32).toString("hex")}`;
}

export function checkPassword(s: Settings, given: string) {
  if (s.adminPasswordHash) {
    const [salt, hash] = s.adminPasswordHash.split(":");
    const a = Buffer.from(hash, "hex");
    const b = scryptSync(given, salt, 32);
    return a.length === b.length && timingSafeEqual(a, b);
  }
  const initial = initialPassword();
  return initial !== "" && given === initial;
}

/** Logged-in session tokens (kept in memory, cleared when the server restarts). */
const g = globalThis as { __tgAdminSessions?: Set<string> };
export const sessions = (g.__tgAdminSessions ??= new Set<string>());
