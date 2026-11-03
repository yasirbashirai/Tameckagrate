import { Suspense } from "react";
import Link from "next/link";
import Butterfly from "@components/butterfly";
import ThankYouMessage from "@components/thank-you/message";

export const metadata = { title: "Thank you" };

/** Stripe redirects here after a successful order or gift. */
export default function ThankYou() {
  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center bg-[radial-gradient(100%_80%_at_50%_30%,#f0dde9_0%,#fbf8f4_65%)] px-5 pt-28 text-center">
      <Butterfly flap className="w-48" />
      <h1 className="mt-8 font-display text-5xl font-black tracking-tight text-plum-ink sm:text-7xl">
        Thank you<span className="font-script font-normal text-plum">, truly.</span>
      </h1>
      <Suspense>
        <ThankYouMessage />
      </Suspense>
      <Link href="/" className="mt-10 rounded-full bg-plum px-8 py-4 font-semibold text-white">
        Back home
      </Link>
    </section>
  );
}
