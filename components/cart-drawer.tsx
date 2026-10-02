"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@components/cart";
import ProductArt from "@components/product-art";
import { money } from "@/lib/site";

/** Slide-in cart. Checkout posts the cart to /api/checkout (Stripe Checkout). */
export default function CartDrawer() {
  const { lines, subtotal, open, setOpen, setQty } = useCart();
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  async function checkout() {
    setBusy(true);
    setNote("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "shop", items: lines.map((l) => ({ id: l.id, qty: l.qty })) }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setNote(data.message ?? "Checkout is not available yet.");
    } catch {
      setNote("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-night/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed bottom-0 right-0 top-0 z-[81] flex w-full max-w-md flex-col bg-cream shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <p className="font-display text-2xl font-bold text-plum-ink">Your Bag</p>
              <button onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-blush" aria-label="Close cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4" data-lenis-prevent>
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-script text-4xl text-plum">Nothing here yet</p>
                  <p className="mt-2 text-slate">Every purchase supports From Survival to Soft.</p>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {lines.map((l) => (
                    <li key={l.id} className="flex gap-4 py-4">
                      <div className="h-24 w-20 shrink-0 rounded-xl bg-blush">
                        <ProductArt product={l.product} className="h-full w-full" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="font-semibold leading-snug text-plum-ink">{l.product.name}</p>
                        <p className="text-sm text-slate">{money(l.product.price)}</p>
                        <div className="mt-auto flex items-center gap-3">
                          <button onClick={() => setQty(l.id, l.qty - 1)} className="h-8 w-8 rounded-full border border-line hover:border-plum" aria-label="Decrease">
                            −
                          </button>
                          <span className="w-4 text-center font-semibold">{l.qty}</span>
                          <button onClick={() => setQty(l.id, l.qty + 1)} className="h-8 w-8 rounded-full border border-line hover:border-plum" aria-label="Increase">
                            +
                          </button>
                        </div>
                      </div>
                      <p className="font-semibold text-plum-ink">{money(l.qty * l.product.price)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-line bg-white px-6 py-6">
                <div className="flex items-center justify-between font-display text-xl font-bold text-plum-ink">
                  <span>Subtotal</span>
                  <span>{money(subtotal)}</span>
                </div>
                <p className="mt-1 text-sm text-slate">Shipping and tax calculated at checkout.</p>
                <button
                  onClick={checkout}
                  disabled={busy}
                  className="mt-5 w-full rounded-full bg-plum py-4 font-semibold text-white transition-colors hover:bg-plum-deep disabled:opacity-60"
                >
                  {busy ? "Opening secure checkout…" : "Checkout securely"}
                </button>
                {note && <p className="mt-3 rounded-xl bg-blush px-4 py-3 text-sm text-plum-ink">{note}</p>}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
