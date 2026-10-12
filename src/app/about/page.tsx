import Image from "next/image";
import AboutHero from "@components/about/about-hero";
import Values from "@components/about/values";
import Reveal from "@components/reveal";
import Faq from "@components/faq";
import JsonLd from "@components/json-ld";
import PageCta from "@components/page-cta";
import { press, site } from "@/lib/site";
import { abs, breadcrumb, faqSchema, pageMetadata, personRef } from "@/lib/seo";

const PATH = "/about";

export const metadata = pageMetadata({
  path: PATH,
  title: "About Tamecka Grate | Survivor, Author & Speaker, Dallas",
  description:
    "Meet Tamecka Grate: Dallas survivor, author of the memoir Life After, 20+ year AT&T leader and founder of From Survival to Soft. Her story of faith and purpose.",
  image: "/images/photo-sequin.webp",
  keywords: ["Tamecka Grate biography", "survivor speaker Dallas", "Life After author", "trauma survivor author"],
});

/** Facts from her own (old site) bio. */
const facts = [
  { k: "Hometown", v: "Dallas, Texas" },
  { k: "Education", v: "B.A. Business Administration, Northwood University" },
  { k: "Career", v: "20+ years at AT&T · Employee Relations Manager" },
  { k: "Author", v: "Life After: A Memoir of Inspiration Post Survival (2020)" },
  { k: "Founder", v: "From Survival to Soft" },
  { k: "Family", v: "Mother of three · Grandmother" },
];

const faqs = [
  {
    q: "Who is Tamecka Grate?",
    a: "Tamecka Grate is a Dallas-based author, speaker and founder of the nonprofit From Survival to Soft. She survived a violent attack in 1996 and later wrote the memoir Life After to help others rebuild after trauma.",
  },
  {
    q: "What is Tamecka Grate's book about?",
    a: "Life After: A Memoir of Inspiration Post Survival tells the true story of her survival and recovery, and shares the faith, strategies and mindset she used to rebuild her strength, confidence and joy.",
  },
  {
    q: "What does Tamecka Grate do professionally?",
    a: "Alongside writing and speaking, she has spent more than two decades at AT&T, where she is an Employee Relations Manager in the Human Resources division.",
  },
  {
    q: "Is Tamecka Grate available to speak at events?",
    a: "Yes. She speaks at conferences, churches, corporate wellness programs, universities and awareness events, in person in the Dallas–Fort Worth area and nationwide, or virtually.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        graph={[
          {
            "@type": "ProfilePage",
            "@id": abs(PATH),
            url: abs(PATH),
            name: `About ${site.name}`,
            mainEntity: {
              ...personRef,
              "@type": "Person",
              name: site.name,
              description: "Author, speaker and founder of From Survival to Soft.",
              image: abs("/images/photo-front.webp"),
              jobTitle: ["Author", "Speaker", "Founder", "Employee Relations Manager"],
              worksFor: { "@type": "Organization", name: "AT&T" },
              alumniOf: { "@type": "CollegeOrUniversity", name: "Northwood University" },
              homeLocation: { "@type": "Place", name: "Dallas, Texas" },
              founder: { "@type": "NGO", name: site.nonprofit },
              knowsAbout: ["Trauma recovery", "Resilience", "Faith", "Employee relations", "Women's empowerment"],
            },
          },
          breadcrumb("About", PATH),
          faqSchema(faqs),
        ]}
      />

      <AboutHero />

      {/* Fact sheet */}
      <section className="bg-line">
        <dl className="mx-auto grid max-w-7xl grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div key={f.k} className="bg-white px-5 py-7 sm:px-8">
              <dt className="font-display text-xs font-bold uppercase tracking-[0.25em] text-gold">{f.k}</dt>
              <dd className="mt-2 font-display text-xl font-bold text-plum-ink">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Long-form story */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative hidden lg:block">
            <div className="sticky top-28 overflow-hidden rounded-[2.5rem]">
              <Image
                src="/images/photo-seated-smile.webp"
                alt="Tamecka Grate smiling, seated in a black sequined jacket"
                width={427}
                height={640}
                className="h-[78vh] w-full object-cover"
              />
              <p className="absolute bottom-6 left-6 right-6 font-script text-4xl text-white/90">“I was chosen.”</p>
            </div>
          </div>

          <article className="max-w-2xl text-xl leading-[1.8] text-slate-deep/85">
            <Reveal>
              <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">Her Story</p>
              <h2 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-plum-ink sm:text-6xl">
                Where it began
              </h2>
              <p className="mt-8 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-8xl first-letter:font-black first-letter:leading-[0.8] first-letter:text-plum">
                Tamecka Grate is a native of Dallas, Texas. She was educated in the Wilmer Hutchins Independent School
                District and went on to earn her bachelor&apos;s degree in Business Administration from Northwood
                University. She built a long career at AT&amp;T, where for more than twenty years she has worked with
                people at their most difficult moments, today as an Employee Relations Manager in the Human Resources
                division.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mt-16 font-display text-4xl font-extrabold tracking-tight text-plum-ink sm:text-5xl">The night</h2>
              <p className="mt-6">
                In 1996, at 24 years old, Tamecka came home from a New Year&apos;s Eve gathering and was attacked by
                her neighbor, who stabbed her repeatedly and intended to leave her for dead. By the power and grace of
                God, she survived, in what has been described as one of the most astounding medical miracles ever
                documented.
              </p>
            </Reveal>

            <Reveal>
              <blockquote className="my-14 rounded-[2rem] bg-plum-ink p-10 text-white">
                <p className="font-display text-3xl font-bold leading-snug">
                  She understands that she was chosen by faith to become an advocate, to show others how it can be done.
                </p>
              </blockquote>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-plum-ink sm:text-5xl">Choosing life after</h2>
              <p className="mt-6">
                Healing was not seamless. But it was always purposeful. Over the years that followed, Tamecka built a
                life she has grown to love, and in 2019 she decided to tell the whole story. Her memoir,{" "}
                <a href="/life-after" className="font-semibold text-plum underline-offset-4 hover:underline">
                  Life After
                </a>
                , was published in 2020 as a survival guide for anyone who has lost hope and can&apos;t find their way
                back to normal.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mt-16 font-display text-4xl font-extrabold tracking-tight text-plum-ink sm:text-5xl">Why soft</h2>
              <p className="mt-6">
                Surviving taught her strength. Living taught her softness. Today Tamecka speaks, writes and leads{" "}
                <a href="/from-survival-to-soft" className="font-semibold text-plum underline-offset-4 hover:underline">
                  From Survival to Soft
                </a>{" "}
                with one goal: to let every survivor know that you, too, can overcome anything, and that the life
                waiting on the other side can be gentle, beautiful and fully yours.
              </p>
            </Reveal>
          </article>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">What She Stands For</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-plum-ink sm:text-6xl">
              Four words. <span className="font-script font-normal text-plum">One life.</span>
            </h2>
          </Reveal>
          <div className="mt-12">
            <Values />
          </div>
        </div>
      </section>

      {/* Signature quote */}
      <section className="relative overflow-hidden bg-night py-28 text-center text-white">
        <p className="mx-auto max-w-4xl px-5 font-display text-3xl font-bold leading-snug sm:text-5xl">
          “To aspire is to lift yourself up. To inspire is to lift up others. Now think of what can happen when you{" "}
          <span className="font-script font-normal text-rose">combine the two.</span>”
        </p>
        <p className="mt-8 font-script text-4xl text-gold-soft">{site.name}</p>
      </section>

      {/* Press + FAQ */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">In the Media</p>
            {press.map((p) => (
              <a
                key={p.outlet}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 block rounded-[2rem] bg-white p-8 transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(91,52,85,0.5)]"
              >
                <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gold">{p.date}</p>
                <p className="mt-3 font-display text-3xl font-extrabold text-plum-ink">{p.outlet}</p>
                <p className="mt-1 font-script text-3xl text-plum">{p.feature}</p>
                <p className="mt-6 font-semibold text-plum-ink">Listen to the feature ↗</p>
              </a>
            ))}
          </div>
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-plum-ink sm:text-5xl">Questions about Tamecka</h2>
            <div className="mt-6">
              <Faq items={faqs} />
            </div>
          </div>
        </div>
      </section>

      <PageCta />
    </>
  );
}
