import BookHero from "@components/life-after/book-hero";
import PageStack from "@components/life-after/page-stack";
import BookSection from "@components/home/book-section";
import Reveal from "@components/reveal";
import Faq from "@components/faq";
import JsonLd from "@components/json-ld";
import PageCta from "@components/page-cta";
import InterestForm from "@components/interest-form";
import { book, site } from "@/lib/site";
import { abs, breadcrumb, faqSchema, pageMetadata, personRef } from "@/lib/seo";

const PATH = "/life-after";

export const metadata = pageMetadata({
  path: PATH,
  title: "Life After by Tamecka Grate | A Memoir of Inspiration",
  description:
    "Life After by Tamecka Grate: the true story of surviving a brutal attack and rebuilding strength and faith. Signed copies, paperback ($19.99) and eBook ($9.99).",
  image: "/images/book-mockup-scene.webp",
  keywords: ["Life After memoir", "survivor memoir", "trauma recovery book", "inspirational memoir", "Christian memoir survival"],
});

const audiences = [
  { title: "Survivors rebuilding", text: "For anyone fighting to move forward after something they never should have lived through." },
  { title: "Those who love a survivor", text: "Understand what healing really looks like, and how to walk beside someone through it." },
  { title: "Readers of faith", text: "A testimony of grace, and of building a relationship with God through the hardest season." },
  { title: "Book clubs & women's groups", text: "A story that opens honest conversations about resilience, purpose and softness." },
];

const details = [
  { k: "Title", v: `${book.title}: ${book.subtitle}` },
  { k: "Author", v: site.name },
  { k: "Published", v: "2020" },
  { k: "ISBN-13", v: book.isbn },
  { k: "Formats", v: "Signed paperback · Paperback · Kindle eBook" },
  { k: "Genre", v: "Memoir · Inspiration · Faith" },
];

const faqs = [
  {
    q: "What is Life After about?",
    a: "Life After is Tamecka Grate's true account of surviving a violent attack after a New Year's Eve gathering in 1996, and of the long, purposeful journey of healing that followed. It shares the strategies and faith that helped her overcome her past.",
  },
  {
    q: "Where can I buy Life After?",
    a: "Signed copies are available only on this website. The paperback ($19.99) and Kindle eBook ($9.99) are available on Amazon.",
  },
  {
    q: "Is Life After a Christian book?",
    a: "Faith is central to Tamecka's story. The book speaks openly about God's grace and building a relationship with God, while being written for anyone looking for hope after trauma.",
  },
  {
    q: "Can I order copies for a book club or organization?",
    a: "Yes. Use the book club and bulk order form on this page and Tamecka's team will reply with options for group orders and author visits.",
  },
];

export default function LifeAfterPage() {
  return (
    <>
      <JsonLd
        graph={[
          {
            "@type": "Book",
            "@id": abs(`${PATH}#book`),
            name: book.title,
            alternativeHeadline: book.subtitle,
            description: book.blurb,
            author: { ...personRef, "@type": "Person", name: site.name },
            datePublished: "2020",
            genre: ["Memoir", "Inspirational", "Christian living"],
            image: abs("/images/book-cover.webp"),
            url: abs(PATH),
            workExample: [
              {
                "@type": "Book",
                bookFormat: "https://schema.org/Paperback",
                isbn: book.isbn,
                offers: { "@type": "Offer", price: book.printPrice, priceCurrency: "USD", availability: "https://schema.org/InStock", url: book.amazonPrint },
              },
              {
                "@type": "Book",
                bookFormat: "https://schema.org/EBook",
                offers: { "@type": "Offer", price: book.ebookPrice, priceCurrency: "USD", availability: "https://schema.org/InStock", url: book.amazonKindle },
              },
            ],
          },
          breadcrumb("Life After", PATH),
          faqSchema(faqs),
        ]}
      />

      <BookHero />

      {/* The story inside */}
      <section id="inside" className="scroll-mt-20 overflow-hidden bg-sand py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">From the Back Cover</p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-plum-ink sm:text-6xl">
              A true narrative of survival, triumph <span className="font-script font-normal text-plum">and perseverance.</span>
            </h2>
          </Reveal>
          <div className="mt-16">
            <PageStack />
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-center font-display text-4xl font-extrabold tracking-tight text-plum-ink sm:text-6xl">
              After reading, <span className="font-script font-normal text-plum">you will want to…</span>
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[2.5rem] bg-line md:grid-cols-2">
            {book.promises.map((p, i) => (
              <li key={p} className="group relative bg-white p-10 transition-colors duration-500 hover:bg-plum-ink">
                <span className="text-outline font-display text-7xl font-black text-plum/70 transition-colors group-hover:text-gold">0{i + 1}</span>
                <p className="mt-4 font-display text-2xl font-bold leading-snug text-plum-ink transition-colors group-hover:text-white sm:text-3xl">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-blush py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-plum">Who It&apos;s For</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-plum-ink sm:text-6xl">Written for whoever needs it.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <div className="h-full rounded-[2rem] bg-white p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush font-display font-bold text-plum">{i + 1}</span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-plum-ink">{a.title}</h3>
                  <p className="mt-3 text-base text-slate-deep/80">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3D book + buy (same interactive block as the homepage) */}
      <div id="buy" className="scroll-mt-16">
        <BookSection />
      </div>

      {/* Details + book clubs */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <div className="rounded-[2.5rem] bg-white p-8 sm:p-10">
            <h2 className="font-display text-3xl font-extrabold text-plum-ink">Book details</h2>
            <dl className="mt-6 divide-y divide-line">
              {details.map((d) => (
                <div key={d.k} className="grid grid-cols-[110px_1fr] gap-4 py-4">
                  <dt className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">{d.k}</dt>
                  <dd className="font-semibold text-plum-ink">{d.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-[2.5rem] bg-plum-ink p-8 text-white sm:p-10">
            <h2 className="font-display text-3xl font-extrabold">Book clubs &amp; bulk orders</h2>
            <p className="mt-3 text-lg text-white/75">
              Reading Life After with your church, women&apos;s group or organization? Ask about group pricing and a
              visit from Tamecka.
            </p>
            <InterestForm type="bookclub" dark />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-plum-ink sm:text-5xl">About the book</h2>
          <div className="mt-6">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <PageCta except={PATH} />
    </>
  );
}
