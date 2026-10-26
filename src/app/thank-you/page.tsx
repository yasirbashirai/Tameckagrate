import Link from "next/link";
import Butterfly from "@components/butterfly";

export const metadata = { title: "Thank you" };

/** Stripe redirects here after a successful order or gift. */
export default async function ThankYou({ searchParams }: PageProps<"/thank-you">) {
  const { type } = await searchParams;
  const donation = type === "donation";

  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center bg-[radial-gradient(100%_80%_at_50%_30%,#f0dde9_0%,#fbf8f4_65%)] px-5 pt-28 text-center">
      <Butterfly flap className="w-48" />
      <h1 className="mt-8 font-display text-5xl font-black tracking-tight text-plum-ink sm:text-7xl">
        Thank you<span className="font-script font-normal text-plum">, truly.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-lg text-xl text-slate-deep/80">
        {donation
          ? "Your gift is already on its way to a woman choosing life after. A receipt is in your inbox."
          : "Your order is confirmed and a receipt is in your inbox. Every piece helps fund From Survivor to Soft."}
      </p>
      <Link href="/" className="mt-10 rounded-full bg-plum px-8 py-4 font-semibold text-white">
        Back home
      </Link>
    </section>
  );
}
