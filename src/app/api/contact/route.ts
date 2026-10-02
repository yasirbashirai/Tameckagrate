import { NextResponse } from "next/server";

/**
 * Speaking requests, volunteer + partner sign-ups.
 * TODO: email these to Tamecka (Resend/SMTP) once her inbox is confirmed.
 */
export async function POST(req: Request) {
  const data = await req.json().catch(() => ({}));

  if (typeof data.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  console.log("[contact]", data);
  return NextResponse.json({ ok: true });
}
