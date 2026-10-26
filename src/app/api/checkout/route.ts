import { NextResponse } from "next/server";
import { products } from "@/lib/site";

/**
 * Creates a Stripe Checkout session for either:
 *  - kind "shop":     cart items (prices looked up server-side, never trusted from the browser)
 *  - kind "donation": one-time or monthly gift
 *
 * Needs STRIPE_SECRET_KEY in the environment. Without it the site runs in
 * demo mode and returns a friendly message instead of a checkout URL.
 * Uses Stripe's REST API directly, so no SDK dependency.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const key = process.env.STRIPE_SECRET_KEY;
  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const params = new URLSearchParams();
  params.set("success_url", `${origin}/thank-you?type=${body.kind === "donation" ? "donation" : "order"}`);
  params.set("cancel_url", `${origin}${body.kind === "donation" ? "/donate" : "/shop"}`);

  if (body.kind === "donation") {
    const amount = Math.round(Number(body.amount) * 100);
    if (!Number.isFinite(amount) || amount < 100 || amount > 5_000_000) {
      return NextResponse.json({ message: "Please choose an amount between $1 and $50,000." }, { status: 400 });
    }
    const monthly = Boolean(body.monthly);
    params.set("mode", monthly ? "subscription" : "payment");
    params.set("line_items[0][quantity]", "1");
    params.set("line_items[0][price_data][currency]", "usd");
    params.set("line_items[0][price_data][unit_amount]", String(amount));
    params.set("line_items[0][price_data][product_data][name]", `${monthly ? "Monthly gift" : "Gift"} to From Survivor to Soft`);
    if (monthly) params.set("line_items[0][price_data][recurring][interval]", "month");
    else params.set("submit_type", "donate");
  } else {
    const items: { id: string; qty: number }[] = Array.isArray(body.items) ? body.items : [];
    const lines = items
      .map((i) => ({ product: products.find((p) => p.id === i.id), qty: Math.min(20, Math.max(1, Math.floor(Number(i.qty) || 0))) }))
      .filter((l) => l.product);
    if (!lines.length) return NextResponse.json({ message: "Your bag is empty." }, { status: 400 });

    params.set("mode", "payment");
    params.set("shipping_address_collection[allowed_countries][0]", "US");
    lines.forEach((l, n) => {
      params.set(`line_items[${n}][quantity]`, String(l.qty));
      params.set(`line_items[${n}][price_data][currency]`, "usd");
      params.set(`line_items[${n}][price_data][unit_amount]`, String(Math.round(l.product!.price * 100)));
      params.set(`line_items[${n}][price_data][product_data][name]`, l.product!.name);
    });
  }

  if (!key) {
    return NextResponse.json({
      message: "Preview mode: secure checkout switches on once Tamecka's Stripe account is connected. Nothing was charged.",
    });
  }

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  const session = await res.json();
  if (!res.ok) {
    console.error("[checkout] stripe error", session?.error?.message);
    return NextResponse.json({ message: "Checkout is unavailable right now. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ url: session.url });
}
