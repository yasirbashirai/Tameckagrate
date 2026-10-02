const words = ["Author", "Speaker", "Founder", "Survivor", "Grandmother", "Leader", "Aspire to Inspire"];

function Row({ reverse = false, className = "" }: { reverse?: boolean; className?: string }) {
  const items = [...words, ...words];
  return (
    <div className={`flex w-max ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
      {[0, 1].map((half) => (
        <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
          {items.map((w, i) => (
            <span key={i} className={`flex items-center gap-8 px-4 font-display text-2xl font-extrabold uppercase tracking-tight sm:text-4xl ${className}`}>
              {w}
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Two crossing ribbons of her roles, scrolling in opposite directions. */
export default function Marquee() {
  return (
    <section className="relative z-10 -my-6 overflow-hidden py-14" aria-label="Author, speaker, founder, survivor">
      <div className="-rotate-2 bg-plum-ink py-4 text-white shadow-xl">
        <Row />
      </div>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-2 bg-blush/95 py-4 text-plum-ink">
        <Row reverse className="font-light" />
      </div>
    </section>
  );
}
