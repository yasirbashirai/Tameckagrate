import Image from "next/image";
import Link from "next/link";
import { Button, Eyebrow, WingDivider } from "@components/ui";
import SignupForm from "@components/signup-form";
import { book, leadMagnet, press, site, speakingTopics } from "@/lib/site";

/** The four visitors from the proposal, each with their own door. */
const doors = [
  {
    who: "The Survivor",
    want: "I'm looking for hope",
    action: "Read Life After",
    href: "/life-after",
  },
  {
    who: "The Planner",
    want: "I'm booking a speaker",
    action: "Book Tamecka",
    href: "/speaking",
  },
  {
    who: "The Donor",
    want: "I want to give",
    action: "Support the Mission",
    href: "/from-survival-to-soft",
  },
  {
    who: "The Partner",
    want: "I want to work together",
    action: "Start a Conversation",
    href: "/connect",
  },
];

/** The six-step arc her life (and the site) follows. From the proposal, page 6. */
const journey = [
  { step: "Survived", line: "This happened to me." },
  { step: "Softened", line: "Here's what I learned." },
  { step: "Spoke", line: "Now I say it out loud." },
  { step: "Served", line: "Now I lift others." },
  { step: "Shined", line: "And I get to be beautiful too." },
  { step: "Shared", line: "Come with me." },
];

export default function Home() {
  return (
    <>
      {/* ── 1 · Hero: her portrait and her line ───────────────────── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28 lg:pt-20">
          <div className="rise">
            <Eyebrow>Author · Speaker · Founder</Eyebrow>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-plum-ink sm:text-6xl xl:text-7xl">
              She survived the unthinkable.
            </h1>
            <p className="mt-3 font-script text-5xl leading-tight text-plum sm:text-6xl">
              Now she shows you life after.
            </p>
            <p className="mt-7 max-w-xl text-xl text-slate-deep/85">
              Tamecka Grate-Frazier is a Dallas author, speaker and the founder of{" "}
              <strong className="font-semibold text-plum-ink">{site.nonprofit}</strong>, helping women
              move from simply surviving to living softly, fully and on purpose.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/about">Read Her Story</Button>
              <Button href="/speaking" variant="outline">
                Book Tamecka to Speak
              </Button>
            </div>
          </div>

          {/* Portrait in a soft arch, the butterfly rising behind her */}
          <div className="rise rise-2 relative mx-auto w-full max-w-md lg:max-w-none">
            <Image
              src="/images/fsts-mark.webp"
              alt=""
              width={1000}
              height={700}
              className="pointer-events-none absolute left-1/2 top-[14%] w-[150%] max-w-none -translate-x-1/2 opacity-[0.18]"
              loading="eager"
            />
            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-3xl bg-slate shadow-[0_40px_80px_-30px_rgba(91,52,85,0.55)] ring-8 ring-white">
              <Image
                src="/images/portrait-hero.webp"
                alt="Portrait of Tamecka Grate-Frazier"
                width={889}
                height={1195}
                className="h-auto w-full"
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            </div>
            <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-6 py-3 font-script text-3xl text-plum shadow-lg">
              {site.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* ── 2 · Choose your door ─────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Welcome</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-plum-ink sm:text-5xl">
              Which part of this story is for you?
            </h2>
            <WingDivider className="mt-6 text-gold" />
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {doors.map((d) => (
              <Link
                key={d.who}
                href={d.href}
                className="group flex flex-col rounded-3xl border border-line bg-cream p-8 transition-all hover:-translate-y-1 hover:border-plum/40 hover:shadow-[0_24px_50px_-28px_rgba(91,52,85,0.5)]"
              >
                <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">{d.who}</p>
                <p className="mt-4 font-display text-2xl font-bold leading-snug text-plum-ink">“{d.want}”</p>
                <span className="mt-auto pt-8 font-semibold text-plum">
                  {d.action}{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Who she is ───────────────────────────────────────── */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="/images/portrait-profile.webp"
                alt="Tamecka Grate-Frazier in profile"
                width={1067}
                height={1600}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 38vw, 90vw"
              />
            </div>
          </div>

          <div>
            <Eyebrow>Who Is Tamecka?</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-plum-ink sm:text-5xl">
              Wife. Mother. Grandmother. Leader. Survivor.
            </h2>
            {/* Facts from her old About page */}
            <p className="mt-6 text-xl text-slate-deep/85">
              A Dallas native and Northwood University graduate, Tamecka has spent more than 21 years at AT&amp;T,
              where she is an Employee Relations Manager. She and her husband of 24 years own Exclusive Cutz
              Barbershop, and together they raised three children and now have a grandson.
            </p>
            <p className="mt-4 text-xl text-slate-deep/85">
              In 1996, one night changed everything. What she built after it is why she is here.
            </p>

            <blockquote className="mt-10 border-l-4 border-gold pl-6">
              <p className="font-display text-2xl font-medium leading-snug text-plum-ink">
                “To aspire is to lift yourself up. To inspire is to lift up others above your own desires.
                Now think of what can happen when you combine the two.”
              </p>
              <footer className="mt-3 font-script text-3xl text-plum">Tamecka Grate-Frazier</footer>
            </blockquote>

            <div className="mt-10">
              <Button href="/about" variant="outline">
                Read Her Full Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 · The journey ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-deep py-20 text-white lg:py-28">
        <Image
          src="/images/fsts-mark.webp"
          alt=""
          width={1000}
          height={700}
          className="pointer-events-none absolute -right-40 top-1/2 w-[760px] max-w-none -translate-y-1/2 opacity-[0.07] invert"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <Eyebrow light>Her Journey</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Not a moment. A becoming.
            </h2>
          </div>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-6">
            {journey.map((j, i) => (
              <li key={j.step} className="bg-slate-deep p-7 lg:p-6">
                <span className="font-display text-sm font-bold text-gold">0{i + 1}</span>
                <p className="mt-3 font-display text-2xl font-bold">{j.step}</p>
                <p className="mt-2 text-base text-white/70">“{j.line}”</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 5 · The memoir ───────────────────────────────────────── */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-[0_40px_80px_-40px_rgba(26,32,41,0.6)]">
            <Image
              src="/images/book-mockup-scene.webp"
              alt="Life After by Tamecka Grate-Frazier in print, eBook and on a phone"
              width={1600}
              height={1067}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 48vw, 92vw"
            />
          </div>

          <div>
            <Eyebrow>The Memoir</Eyebrow>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-plum-ink sm:text-6xl">
              {book.title}
            </h2>
            <p className="mt-2 font-display text-xl font-medium text-slate">{book.subtitle}</p>
            <p className="mt-6 text-xl text-slate-deep/85">{book.blurb}</p>

            <p className="mt-8 font-semibold text-plum-ink">After reading Life After, you will have the desire to:</p>
            <ul className="mt-4 space-y-3">
              {book.promises.map((p) => (
                <li key={p} className="flex gap-3 text-lg text-slate-deep/85">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={book.amazonPrint} external>
                Print · {book.printPrice}
              </Button>
              <Button href={book.amazonKindle} variant="outline" external>
                eBook · {book.ebookPrice}
              </Button>
              <Link href="/life-after" className="font-semibold text-plum underline-offset-4 hover:underline">
                Read more about the book
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 · From Survival to Soft (nonprofit) ────────────────── */}
      {/* DRAFT copy: Tamecka to confirm mission wording + programs */}
      <section className="bg-blush py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <Image
            src="/images/fsts-logo.webp"
            alt="From Survival to Soft logo"
            width={1000}
            height={1000}
            className="mx-auto h-auto w-64 sm:w-80"
          />
          <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-tight tracking-tight text-plum-ink sm:text-5xl">
            Surviving was never meant to be the end of the story.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-deep/85">
            {site.nonprofit} walks with women who have lived through the unthinkable, helping them heal,
            rebuild their confidence and rediscover the softness that trauma tried to take.
          </p>

          <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
            {[
              { title: "Donate", text: "Fund programs that help women heal and rebuild.", href: "/from-survival-to-soft#donate" },
              { title: "Volunteer", text: "Give your time, skills and presence.", href: "/from-survival-to-soft#volunteer" },
              { title: "Partner", text: "Bring the mission to your church, company or community.", href: "/from-survival-to-soft#partner" },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group rounded-3xl bg-white p-7 transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(91,52,85,0.55)]"
              >
                <p className="font-display text-2xl font-bold text-plum">{c.title}</p>
                <p className="mt-2 text-base text-slate-deep/80">{c.text}</p>
                <span className="mt-5 inline-block font-semibold text-plum-ink transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 · Speaking ─────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Eyebrow>Speaking</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-plum-ink sm:text-5xl">
              A survivor who speaks fluent corporate.
            </h2>
            <p className="mt-6 text-xl text-slate-deep/85">
              Tamecka is available for keynotes, workshops, panels and interviews: corporate wellness
              programs, faith conferences, universities and awareness events.
            </p>

            {/* DRAFT topics, see src/lib/site.ts */}
            <div className="mt-10 space-y-4">
              {speakingTopics.map((t, i) => (
                <div key={t.title} className="flex gap-5 rounded-2xl border border-line p-6">
                  <span className="font-display text-3xl font-extrabold text-gold/80">0{i + 1}</span>
                  <div>
                    <p className="font-display text-xl font-bold text-plum-ink">{t.title}</p>
                    <p className="mt-1 text-base text-slate-deep/80">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button href="/speaking">Book Tamecka</Button>
              {press.map((p) => (
                <a
                  key={p.outlet}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-slate hover:text-plum"
                >
                  As featured on <strong className="text-slate-deep">{p.outlet}</strong> · {p.feature}
                </a>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-t-[999px] rounded-b-3xl bg-slate">
              <Image
                src="/images/portrait-standing-grey.webp"
                alt="Tamecka Grate-Frazier standing, ready to speak"
                width={1067}
                height={1600}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 30vw, 90vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 · Email signup (free eBook) ────────────────────────── */}
      <section className="bg-gradient-to-br from-plum-ink to-plum-deep py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 md:grid-cols-[0.7fr_1.3fr]">
          <Image
            src="/images/ebook-aspire-to-inspire.webp"
            alt="Aspire to Inspire eBook cover"
            width={1091}
            height={1200}
            className="mx-auto h-auto w-56 -rotate-3 drop-shadow-2xl md:w-full md:max-w-xs"
          />
          <div>
            <Eyebrow light>Free eBook</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">{leadMagnet.title}</h2>
            <p className="mt-2 font-script text-4xl text-blush">{leadMagnet.subtitle}</p>
            <p className="mt-5 max-w-xl text-lg text-white/80">{leadMagnet.pitch}</p>
            <div className="mt-8">
              <SignupForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
