import StageHero from "@components/speaking/stage-hero";
import TalkTabs from "@components/speaking/talk-tabs";
import { BookingForm } from "@components/home/speaking";
import Reveal from "@components/reveal";
import Faq from "@components/faq";
import JsonLd from "@components/json-ld";
import PageCta from "@components/page-cta";
import { press, site, speakingTopics } from "@/lib/site";
import { abs, breadcrumb, faqSchema, pageMetadata, personRef } from "@/lib/seo";

const PATH = "/speaking";

export const metadata = pageMetadata({
  path: PATH,
  title: "Book Tamecka Grate | Keynote Speaker on Resilience & Faith",
  description:
    "Book Tamecka Grate, Dallas keynote speaker and author of Life After, for conferences, corporate wellness, churches and universities. Keynotes and workshops.",
  image: "/images/portrait-standing-grey.webp",
  keywords: ["keynote speaker Dallas", "survivor speaker", "resilience keynote", "women's conference speaker", "faith-based speaker", "workplace wellness speaker"],
});

const audiences = ["Corporate wellness", "Faith conferences", "Universities", "Women's events", "Awareness months", "HR leadership", "Nonprofit galas", "Podcasts"];

const reasons = [
  { title: "A story no one forgets", text: "A documented medical miracle, told with honesty and grace, never for shock." },
  { title: "Fluent in corporate", text: "Two decades in Employee Relations means she speaks the language of leaders and HR." },
  { title: "Grounded in faith", text: "A testimony that meets faith audiences where they are, and welcomes everyone else." },
  { title: "Hope, not heaviness", text: "Trauma-aware storytelling that leaves rooms lighter, not drained." },
];

/** DRAFT formats + lengths. Tamecka to confirm. */
const formats = [
  { name: "Keynote", time: "30–60 min", text: "Her signature story with a clear, practical message." },
  { name: "Workshop", time: "90 min – half day", text: "Interactive sessions for teams, leaders or women's groups." },
  { name: "Panel / Fireside", time: "Flexible", text: "Moderated conversations on resilience, healing and work." },
  { name: "Interview / Podcast", time: "Virtual", text: "Media, podcasts and livestreams, anywhere." },
];

const steps = [
  { title: "Share your event", text: "Send the date, audience and format using the form below." },
  { title: "Quick discovery call", text: "Her team confirms fit, goals and a custom quote." },
  { title: "Tamecka takes the stage", text: "A tailored talk, plus book signing on request." },
];

const faqs = [
  { q: "What are Tamecka Grate's speaking topics?", a: `Her signature talks are ${speakingTopics.map((t) => t.title).join(", ")}. Each can be tailored to your audience and goals.` },
  { q: "How much does it cost to book Tamecka Grate?", a: "Fees depend on the format, length, location and audience. Share your event details through the booking form and her team will send a custom quote." },
  { q: "Does Tamecka travel for events?", a: "Yes. She is based in the Dallas–Fort Worth area and speaks at events nationwide. Virtual keynotes and interviews are also available." },
  { q: "Can she sign books at our event?", a: "Yes. Book signings of Life After can be added to any in-person engagement, and bulk copies can be arranged for attendees." },
];

export default function SpeakingPage() {
  return (
    <>
      <JsonLd
        graph={[
          {
            "@type": "Service",
            "@id": abs(`${PATH}#service`),
            name: `${site.name}, keynote speaking`,
            serviceType: "Keynote and motivational speaking",
            provider: { ...personRef, "@type": "Person", name: site.name },
            areaServed: [{ "@type": "City", name: "Dallas" }, { "@type": "Country", name: "United States" }],
            audience: audiences.map((a) => ({ "@type": "Audience", audienceType: a })),
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Signature talks",
              itemListElement: speakingTopics.map((t) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: t.title, description: t.text } })),
            },
            url: abs(PATH),
          },
          breadcrumb("Speaking", PATH),
          faqSchema(faqs),
        ]}
      />

      <StageHero />

      {/* Audience ticker */}
      <section className="overflow-hidden border-y border-line bg-cream py-5" aria-label="Audiences">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
              {[...audiences, ...audiences].map((a, i) => (
                <span key={i} className="flex items-center gap-6 px-3 font-display text-xl font-bold uppercase tracking-tight text-plum-ink sm:text-2xl">
                  {a}
                  <span className="text-gold">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Talks */}
      <section id="talks" className="scroll-mt-20 bg-sand py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">Signature Talks</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-plum-ink sm:text-6xl">
              Three talks. <span className="font-script font-normal text-plum">Every room changed.</span>
            </h2>
          </Reveal>
          <div className="mt-12">
            <TalkTabs />
          </div>
        </div>
      </section>

      {/* Why planners book her */}
      <section className="bg-night py-24 text-white lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-gold">Why Planners Book Her</p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
              The rare speaker who moves the heart <span className="font-script font-normal text-rose">and the room.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2.5rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08} className="h-full">
                <div className="group h-full bg-night p-8 transition-colors duration-500 hover:bg-plum-ink">
                  <span className="font-display text-5xl font-black text-white/10 transition-colors group-hover:text-gold">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl font-bold">{r.title}</h3>
                  <p className="mt-3 text-base text-white/65">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-white/60">
            As heard on{" "}
            {press.map((p) => (
              <a key={p.outlet} href={p.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline-offset-4 hover:underline">
                {p.outlet} · {p.feature}
              </a>
            ))}
          </p>
        </div>
      </section>

      {/* Formats */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-5xl font-extrabold tracking-tight text-plum-ink sm:text-6xl">Ways to bring her in</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-[2rem] border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-plum/40 hover:shadow-[0_24px_50px_-28px_rgba(91,52,85,0.5)]">
                  <span className="w-fit rounded-full bg-blush px-4 py-1.5 text-sm font-bold text-plum">{f.time}</span>
                  <h3 className="mt-6 font-display text-3xl font-extrabold text-plum-ink">{f.name}</h3>
                  <p className="mt-3 text-base text-slate-deep/80">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* How it works */}
          <div className="relative mt-24 grid gap-10 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-gold via-plum to-gold md:block" />
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <div className="relative">
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-plum font-display text-xl font-black text-white ring-8 ring-cream">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-plum-ink">{s.title}</h3>
                  <p className="mt-2 text-lg text-slate-deep/80">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div id="book-tamecka" className="scroll-mt-24">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-plum-ink sm:text-5xl">Event planner FAQ</h2>
          <div className="mt-6">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <PageCta except={PATH} />
    </>
  );
}
