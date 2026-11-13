import { NextResponse } from "next/server";
import { loadSettings } from "@/lib/settings-store";

export const dynamic = "force-dynamic";

/** Public settings the pages need at runtime. No secrets here. (Live site: deploy/php/api/settings.php) */
export async function GET() {
  const s = await loadSettings();
  return NextResponse.json({ paypalEmail: s.paypalEmail, monthlyGiving: s.monthlyGiving }, { headers: { "Cache-Control": "no-store" } });
}
