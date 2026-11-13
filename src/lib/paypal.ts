import { products } from "@/lib/site";

/**
 * PayPal checkout without API keys (PayPal Payments Standard).
 * We build a hidden form and post it to PayPal, which is how the previous
 * site took book payments. Money lands in the PayPal account whose email is
 * saved in /admin (see src/lib/settings.ts). With no email saved, checkout
 * falls back to /api/checkout (Stripe, preview mode until a key is added).
 */
function send(business: string, fields: Record<string, string>) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://www.paypal.com/cgi-bin/webscr";
  const all = { business, currency_code: "USD", charset: "utf-8", ...fields };
  for (const [name, value] of Object.entries(all)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

/** Shop bag → PayPal cart. Prices come from site.ts, coming-soon items are skipped. */
export function paypalCart(business: string, items: { id: string; qty: number }[]) {
  const fields: Record<string, string> = {
    cmd: "_cart",
    upload: "1",
    no_shipping: "2", // shipping address required
    return: `${location.origin}/thank-you?type=order`,
    cancel_return: `${location.origin}/shop`,
  };
  let n = 0;
  for (const item of items) {
    const product = products.find((p) => p.id === item.id);
    if (!product || product.comingSoon) continue;
    n += 1;
    fields[`item_name_${n}`] = product.name;
    fields[`amount_${n}`] = product.price.toFixed(2);
    fields[`quantity_${n}`] = String(Math.min(20, Math.max(1, Math.floor(item.qty))));
  }
  if (n === 0) return false;
  send(business, fields);
  return true;
}

/** One-time or monthly gift → PayPal donation / subscription. */
export function paypalDonate(business: string, amount: number, monthly: boolean) {
  const common = {
    no_shipping: "1",
    no_note: "1",
    return: `${location.origin}/thank-you?type=donation`,
    cancel_return: `${location.origin}/donate`,
  };
  if (monthly) {
    // Recurring gifts need a PayPal Business account
    send(business, { ...common, cmd: "_xclick-subscriptions", item_name: "Monthly gift to From Survivor to Soft", a3: amount.toFixed(2), p3: "1", t3: "M", src: "1" });
  } else {
    send(business, { ...common, cmd: "_donations", item_name: "Gift to From Survivor to Soft", amount: amount.toFixed(2) });
  }
}
