import Link from "next/link";

const doors = [
  { href: "/life-after", eyebrow: "The Memoir", title: "Read Life After", bg: "bg-plum-ink text-white" },
  { href: "/speaking", eyebrow: "Speaking", title: "Book Tamecka", bg: "bg-gold text-white" },
  { href: "/from-survivor-to-soft", eyebrow: "The Nonprofit", title: "Support the mission", bg: "bg-blush text-plum-ink" },
];

/** Closing "where next" doors, used at the end of inner pages. `except` hides the current page. */
export default function PageCta({ except }: { except?: string }) {
  const shown = doors.filter((d) => d.href !== except);

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center font-script text-5xl text-plum">Where to next?</p>
        <div className={`mt-10 grid gap-5 ${shown.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {shown.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className={`group relative flex h-56 flex-col justify-between overflow-hidden rounded-[2rem] p-8 transition-transform duration-500 hover:-translate-y-1.5 ${d.bg}`}
            >
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] opacity-70">{d.eyebrow}</span>
              <span className="flex items-end justify-between gap-4">
                <span className="font-display text-4xl font-extrabold leading-none tracking-tight">{d.title}</span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-current text-xl transition-transform duration-500 group-hover:rotate-[-45deg]">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
