import type { Metadata } from "next";
import DonateWidget from "@components/donate-widget";
import Butterfly from "@components/butterfly";
import InterestForm from "@components/interest-form";

export const metadata: Metadata = {
  title: "Donate to From Survival to Soft",
  description: "Give once or monthly to From Survival to Soft, the nonprofit founded by Tamecka Grate to help women move from surviving to living.",
};

/** DRAFT allocation. Replace with real figures once the nonprofit's budget is set. */
const uses = [
  { label: "Programs for women", pct: 80 },
  { label: "Community outreach", pct: 12 },
  { label: "Operations", pct: 8 },
];

export default function DonatePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-night pb-24 pt-40 text-white">
        <div className="absolute left-1/2 top-24 w-[900px] max-w-[160vw] -translate-x-1/2 opacity-10 invert">
          <Butterfly flap />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-gold">From Survival to Soft</p>
          <h1 className="mt-4 text-balance font-display text-6xl font-black leading-[0.95] tracking-tight sm:text-8xl">
            Help her go from surviving to <span className="font-script font-normal text-rose">soft.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/75">
            Your gift reaches a woman at the moment she decides to stop just surviving. Choose an amount and watch what it becomes.
          </p>
        </div>
        <div className="relative mx-auto mt-16 max-w-5xl px-5 sm:px-8">
          <DonateWidget dark />
        </div>
      </section>

      {/* Where it goes */}
      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">Where your gift goes</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-plum-ink">Straight to the women.</h2>
          </div>
          <div className="space-y-6">
            {uses.map((u) => (
              <div key={u.label}>
                <div className="flex justify-between font-semibold text-plum-ink">
                  <span>{u.label}</span>
                  <span>{u.pct}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-blush">
                  <div className="h-full rounded-full bg-gradient-to-r from-plum to-gold" style={{ width: `${u.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other ways to help */}
      <section className="bg-blush py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 md:grid-cols-2">
          <div id="volunteer" className="scroll-mt-28 rounded-[2rem] bg-white p-8 sm:p-10">
            <h2 className="font-display text-4xl font-extrabold text-plum-ink">Volunteer</h2>
            <p className="mt-3 text-lg text-slate-deep/80">Mentor, host a circle, style a restoration day, or lend your professional skills.</p>
            <InterestForm type="volunteer" />
          </div>
          <div id="partner" className="scroll-mt-28 rounded-[2rem] bg-plum-ink p-8 text-white sm:p-10">
            <h2 className="font-display text-4xl font-extrabold">Partner</h2>
            <p className="mt-3 text-lg text-white/75">Churches, companies, boutiques and foundations: let&apos;s bring the mission to your community.</p>
            <InterestForm type="partner" dark />
          </div>
        </div>
      </section>
    </>
  );
}
