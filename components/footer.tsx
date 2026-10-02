import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";

const socialLinks = [
  { label: "Facebook", href: site.socials.facebook },
  { label: "Instagram", href: site.socials.instagram },
  { label: "X / Twitter", href: site.socials.twitter },
];

/** Site footer: mission line, page links, socials. */
export default function Footer() {
  return (
    <footer className="bg-slate-deep text-white/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/images/fsts-mark.webp"
            alt="From Survival to Soft butterfly"
            width={90}
            height={63}
            className="opacity-90"
          />
          <p className="mt-5 font-display text-2xl font-bold text-white">{site.name}</p>
          <p className="mt-1 font-script text-3xl text-blush">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-base">
            Author of <em>Life After</em>, speaker, and founder of {site.nonprofit}. Dallas, Texas.
          </p>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-gold">Explore</p>
          <ul className="mt-4 space-y-2.5 text-base">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/connect" className="hover:text-white">
                Connect
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-gold">Follow</p>
          <ul className="mt-4 space-y-2.5 text-base">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-sm text-white/55 sm:px-8">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
