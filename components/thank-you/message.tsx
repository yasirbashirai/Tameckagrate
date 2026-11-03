"use client";

import { useSearchParams } from "next/navigation";

/** Reads ?type= on the client so the thank-you page can be a static file. */
export default function ThankYouMessage() {
  const donation = useSearchParams().get("type") === "donation";

  return (
    <p className="mx-auto mt-5 max-w-lg text-xl text-slate-deep/80">
      {donation
        ? "Your gift is already on its way to a woman choosing life after. A receipt is in your inbox."
        : "Your order is confirmed and a receipt is in your inbox. Every piece helps fund From Survivor to Soft."}
    </p>
  );
}
