import { NextResponse } from "next/server";

/**
 * Email signup endpoint.
 * TODO: forward to Tamecka's email provider (Mailchimp / Flodesk / MailerLite) once she picks one.
 * For now it validates and logs so the form works end to end.
 */
export async function POST(req: Request) {
  const { email, name } = await req.json().catch(() => ({}));

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  console.log("[subscribe]", { email, name });
  return NextResponse.json({ ok: true });
}
