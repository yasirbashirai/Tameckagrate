import Image from "next/image";
import Reveal from "@components/reveal";
import { tvFeatures } from "@/lib/site";

/**
 * "As featured on" band straight under the black hero:
 * the 1997 Oprah still in a vintage TV frame, both shows set big beside it.
 */
export default function AsSeenOn() {
  const [oprah, survived] = tvFeatures;
  return (
    <section className="relative overflow-hidden bg-[#0b0a0c] pb-28 pt-16 text-cream" aria-label="As featured on television">
      <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        {/* Vintage TV still */}
        <Reveal>
          <figure className="relative mx-auto max-w-xl -rotate-2">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#2b2228] to-[#141114] p-4 shadow-[0_40px_80px_-30px_rgba(155,91,142,0.55)] ring-1 ring-white/10">
              <div className="relative overflow-hidden rounded-[1.4rem]">
                <Image src={oprah.image} alt="Tamecka Grate as a guest on The Oprah Winfrey Show in 1997" width={640} height={553} className="h-auto w-full" />
                {/* Scanlines + glass glare */}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.18)_0px,rgba(0,0,0,0.18)_1px,transparent_1px,transparent_3px)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_10%,rgba(255,255,255,0.14),transparent_55%)]" />
              </div>
            </div>
            <figcaption className="absolute -bottom-5 right-6 rotate-3 rounded-full bg-gold px-5 py-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-ink shadow-lg">
              On air · 1997
            </figcaption>
          </figure>
        </Reveal>

        {/* The two shows */}
        <div>
          <Reveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-gold-soft">As featured on</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">{oprah.show}</h2>
            <p className="mt-2 font-script text-4xl text-rose">{oprah.detail}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="my-8 flex items-center gap-4 text-gold-soft">
              <span className="h-px flex-1 bg-white/15" />✦<span className="h-px flex-1 bg-white/15" />
            </div>
            <h3 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">{survived.show}</h3>
            <p className="mt-2 font-script text-4xl text-rose">{survived.detail}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md text-cream/70">
              Long before the book, Tamecka was telling her story on national television, so other women would know survival is only the beginning.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
