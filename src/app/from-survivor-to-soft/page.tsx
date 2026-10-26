import Image from "next/image";
import Link from "next/link";
import NpHero from "@components/nonprofit/np-hero";
import CompareSlider from "@components/nonprofit/compare-slider";
import SoftCollection from "@components/nonprofit/soft-collection";
import DonateWidget from "@components/donate-widget";
import Reveal from "@components/reveal";
import Faq from "@components/faq";
import JsonLd from "@components/json-ld";
import PageCta from "@components/page-cta";
import { site } from "@/lib/site";
import { abs, breadcrumb, faqSchema, pageMetadata, personRef } from "@/lib/seo";

const PATH = "/from-survivor-to-soft";

export const metadata = pageMetadata({
  path: PATH,
  title: "From Survivor to Soft | Nonprofit by Tamecka Grate",
  description:
    "From Survivor to Soft, founded by Tamecka Grate, helps women who survived trauma heal, restore their identity and rise. Donate, volunteer or partner today.",
  image: "/images/fsts-logo.webp",
  keywords: ["nonprofit for women survivors", "trauma survivor support Dallas", "women's healing nonprofit", "donate to survivors", "From Survivor to Soft"],
});

/** DRAFT programs. Tamecka to confirm names + details. */
const pillars = [
  {
    title: "Heal",
    line: "Safe places to put it down.",
    programs: ["Survivor Circles: peer support groups", "Faith & counsel referrals", "Soft Start care kits"],
  },
  {
    title: "Restore",
    line: "Getting yourself back.",
    programs: ["Restoration Days: styling & portraits", "Confidence workshops", "The Soft Collection boutique"],
  },
  {
    title: "Rise",
    line: "Then lifting someone else.",
    programs: ["Mentorship from women further along", "Speaking & storytelling training", "Leadership pathways"],
  },
];

const serve = [
  "Women living with the aftermath of violence",
  "Survivors who feel stuck in “just getting by”",
  "Women rebuilding identity, confidence and joy",
  "Families and communities walking beside them",
];

const faqs = [
  {
    q: "What is From Survivor to Soft?",
    a: "From Survivor to Soft is a nonprofit founded by author and speaker Tamecka Grate. It supports women who have survived trauma as they heal, restore their sense of self and rise to help others.",
  },
  {
    q: "Who founded From Survivor to Soft?",
    a: "Tamecka Grate founded the organization after surviving a violent attack in 1996 and writing about her recovery in her memoir, Life After.",
  },
  {
    q: "How can I support From Survivor to Soft?",
    a: "You can give once or monthly on this page, volunteer your time and skills, partner as a church, company or foundation, or shop: every purchase in the Soft Shop supports the mission.",
  },
  {
    q: "What is The Soft Collection?",
    a: "The Soft Collection is a signature initiative of From Survivor to Soft (FS2S): a boutique of thoughtfully curated clothing, accessories and fashion essentials that helps women rebuilding their lives reconnect with their confidence, individuality and sense of worth.",
  },
  {
    q: "Can I donate clothing or partner as a boutique?",
    a: "Yes. We welcome new or gently loved women's clothing, shoes, handbags, jewelry and accessories, and we invite boutique owners, fashion retailers, designers and accessory brands to partner with us. Use the Boutiques With a Purpose form on this page to arrange a donation or start a partnership.",
  },
  {
    q: "How are donations used?",
    a: "Gifts fund programs for women: care kits, support circles, restoration days, mentorship and community outreach. The donation selector shows what each amount provides.",
  },
];

export default function NonprofitPage() {
  return (
    <>
      <JsonLd
        graph={[
          {
            "@type": "NGO",
            "@id": abs(`${PATH}#org`),
            name: site.nonprofit,
            url: abs(PATH),
            logo: abs("/images/fsts-logo.webp"),
            description: "A nonprofit helping women who survived trauma heal, restore their identity and rise.",
            founder: { ...personRef, "@type": "Person", name: site.name },
            areaServed: { "@type": "City", name: "Dallas" },
            potentialAction: { "@type": "DonateAction", target: abs("/donate"), recipient: { "@id": abs(`${PATH}#org`) } },
          },
          breadcrumb(site.nonprofit, PATH),
          faqSchema(faqs),
        ]}
      />

      <NpHero />

      {/* Founder's letter (DRAFT, Tamecka to approve wording) */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative mx-auto flex h-[520px] max-w-md items-end justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-blush to-rose">
              <Image src="/images/cutout-gown.webp" alt="Tamecka Grate, founder of From Survivor to Soft" width={282} height={554} className="h-[92%] w-auto object-contain" />
              <span className="absolute left-6 top-6 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-plum-ink backdrop-blur">Founder</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="relative rounded-md bg-[#fbf7ef] p-9 shadow-[0_30px_60px_-30px_rgba(26,32,41,0.4)] sm:p-12">
              <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-gold">A letter from our founder</p>
              <p className="mt-6 font-script text-5xl text-plum">Dear sister,</p>
              <div className="mt-5 space-y-4 font-serif text-lg leading-relaxed text-slate-deep">
                <p>
                  I know what it is to survive. In 1996 I was attacked and left for dead, and by the grace of God I lived.
                  But surviving was only the beginning. For a long time I was strong in the way you are strong when you
                  have no other choice.
                </p>
                <p>
                  Softness came later, on purpose. It came from faith, from the people who refused to leave me, and from
                  deciding that what happened to me would not decide who I became.
                </p>
                <p>From Survivor to Soft exists so that no woman has to find that road alone.</p>
              </div>
              <p className="mt-8 font-script text-5xl text-plum-ink">Tamecka</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Survivor vs Soft */}
      <section className="bg-sand py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="text-center font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">The Journey We Walk</p>
            <h2 className="mt-4 text-center font-display text-5xl font-extrabold tracking-tight text-plum-ink sm:text-6xl">
              Drag from survivor <span className="font-script font-normal text-plum">to soft.</span>
            </h2>
          </Reveal>
          <div className="mt-12">
            <CompareSlider />
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">What We Do</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-plum-ink sm:text-6xl">Heal. Restore. Rise.</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="h-full">
                <div
                  className={`relative h-full overflow-hidden rounded-[2.5rem] p-9 ${
                    ["bg-night text-white", "bg-plum-deep text-white", "bg-blush text-plum-ink"][i]
                  }`}
                >
                  <span className="text-outline absolute -right-3 -top-6 font-display text-[9rem] font-black leading-none opacity-20">{i + 1}</span>
                  <h3 className="font-display text-5xl font-extrabold">{p.title}</h3>
                  <p className={`mt-1 font-script text-3xl ${i === 2 ? "text-plum" : "text-rose"}`}>{p.line}</p>
                  <ul className="mt-8 space-y-3">
                    {p.programs.map((g) => (
                      <li key={g} className="flex gap-3 text-lg">
                        <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid gap-10 rounded-[2.5rem] bg-white p-9 sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-plum-ink">Who we serve</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {serve.map((s) => (
                <li key={s} className="rounded-2xl bg-cream p-5 font-semibold text-plum-ink">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SoftCollection />

      {/* Give */}
      <section id="give" className="scroll-mt-20 bg-night py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-center font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              Watch your gift <span className="font-script font-normal text-rose">take flight.</span>
            </h2>
          </Reveal>
          <div className="mt-12">
            <DonateWidget dark />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Volunteer", d: "Give your time and skills", h: "/donate#volunteer" },
              { t: "Partner", d: "Churches, companies, foundations", h: "/donate#partner" },
              { t: "Donate clothing", d: "Build The Soft Collection", h: "#boutique-partners" },
              { t: "Shop", d: "Every purchase gives back", h: "/shop" },
            ].map((c) => (
              <Link key={c.t} href={c.h} className="group rounded-[2rem] border border-white/10 bg-white/5 p-7 text-white transition-colors hover:bg-white/10">
                <p className="font-display text-2xl font-bold">{c.t} →</p>
                <p className="mt-1 text-white/60">{c.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-plum-ink sm:text-5xl">About the nonprofit</h2>
          <div className="mt-6">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <PageCta except={PATH} />
    </>
  );
}
