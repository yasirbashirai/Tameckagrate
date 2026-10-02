# Tamecka Grate-Frazier: Website

New website for **Tamecka Grate-Frazier** (author of *Life After*, speaker, founder of
**From Survival to Soft**). Replaces the 2020 Wix site at tameckafrazier.com.

Package: **The Full Experience ($650)**. Scope and design rules are in the proposal:
`../tamecka-frazier-proposal/proposal.html`.

## Stack
- Next.js (App Router) + Tailwind CSS v4
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

## The 8 sections
| Route | Status |
|---|---|
| `/` Home | ✅ built |
| `/about` | ⏳ |
| `/from-survival-to-soft` | ⏳ |
| `/life-after` | ⏳ |
| `/speaking` | ⏳ |
| `/soft-collection` | ⏳ |
| `/impact` | ⏳ |
| `/connect` | ⏳ |

## Still needed from Tamecka
- Nonprofit mission, programs, donate link (copy marked DRAFT in code)
- Speaking topics confirmed, video link, testimonials
- Soft Collection photos/description
- Email provider for the eBook signup (`src/app/api/subscribe/route.ts`)
- Inbox address for contact form

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
```
Never run `npm run build` while `npm run dev` is running (they share `.next`).
