# Tamecka Grate: Website

New website for **Tamecka Grate** (author of *Life After*, speaker, founder of
**From Survivor to Soft**). Replaces the 2020 Wix site at tameckafrazier.com.

Package: **The Full Experience ($650)**. Scope and design rules are in the proposal:
`../tamecka-frazier-proposal/proposal.html`.

## Name rule
She is **Tamecka Grate** everywhere. "Frazier" appears only on the physical book cover image.
Target domain: **tameckagrate.com** (available Oct 2026), 301 the old tameckafrazier.com to it.

## Stack
- Next.js (App Router) + Tailwind CSS v4 + Motion (animation) + Lenis (smooth scroll)
- Hosting: Vercel
- Fonts: Archivo (headlines), Source Sans 3 (body), Allura (script accents)
- Palette: plum / slate / cream / gold, from the butterfly logo (tokens in `src/app/globals.css`)

## Structure
```
src/app/            pages + API routes
src/lib/site.ts     ALL site content (book, links, topics, press). Edit text here.
components/         header, footer, buttons, signup form
public/images/      web-optimised photos + logos
content-source/     original files from client + old Wix site (not deployed)
```

## Pages
| Route | What |
|---|---|
| `/` | v2 homepage: intro, magazine hero, Survivor→Soft morph, story chapters, journey, 3D book, quote, nonprofit + giving, speaking + booking form, shop rail, eBook |
| `/about` | her full story, fact sheet, values, press, FAQ |
| `/life-after` | book page: tunnel-light hero, back-cover pages, buy (3D book), book clubs, FAQ |
| `/speaking` | stage hero, signature talks, formats, booking process + form, planner FAQ |
| `/from-survivor-to-soft` | nonprofit: founder letter, survivor↔soft slider, programs, giving, FAQ |
| `/shop` | filterable shop + cart drawer |
| `/donate` | giving widget, allocation, volunteer + partner forms |
| `/thank-you` | Stripe success page |

## SEO
- Per-page title, description, canonical, Open Graph + Twitter cards (`src/lib/seo.ts`)
- Structured data: Person, Book (with offers), NGO + DonateAction, Service, ProfilePage, BreadcrumbList, FAQPage
- `/sitemap.xml` + `/robots.txt` generated from `src/app/sitemap.ts` + `robots.ts`
- Set the final domain in `site.url` (`src/lib/site.ts`) before launch

## Payments
`src/app/api/checkout/route.ts` creates Stripe Checkout sessions (shop orders + one-time/monthly donations).
Set `STRIPE_SECRET_KEY` in Vercel to go live. Without it the site runs in preview mode (nothing charged).

## Still needed from Tamecka
- Nonprofit mission, programs, donate link (copy marked DRAFT in code)
- Speaking topics confirmed, video link, testimonials
- Soft Collection photos/description
- Email provider for the eBook signup (`src/app/api/subscribe/route.ts`)
- Inbox address for contact form (footer shows placeholder hello@tameckagrate.com)
- Stripe account (or nonprofit 501(c)(3) status if using Zeffy/Givebutter instead)
- Real merch photos + prices; renamed social handles

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
```
Never run `npm run build` while `npm run dev` is running (they share `.next`).
