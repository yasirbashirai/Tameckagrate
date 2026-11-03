# Deploying tameckagrate.com (shared hosting: Hostinger / cPanel / SiteGround)

**Upload file:** `deploy/tameckagrate-site.zip` (rebuild any time with `./scripts/build-deploy.sh`)

## 1. Upload
1. Open the hosting **File Manager** → `public_html` (delete the host's default `index.html` / `default.php` if present).
2. Upload `tameckagrate-site.zip` into `public_html` and **Extract** it there.
   The files (`index.html`, `.htaccess`, `api/`, `_next/` …) must sit directly inside `public_html`, not in a subfolder.
3. Turn on **SSL** for the domain in the hosting panel (the site forces HTTPS).

The site is now live. Every page, the favicon, the old `/from-survival-to-soft` link redirect, and the 404 page work with no setup.

## 2. Settings: edit `public_html/api/config.php`
| Setting | What to put |
|---|---|
| `to_email` | Tamecka's inbox for speaking requests, volunteers, partners and sign-ups (default `hello@tameckagrate.com`, create this mailbox in the panel) |
| `from_email` | An address on the domain, e.g. `no-reply@tameckagrate.com` |
| `stripe_secret_key` | Her Stripe **live secret key** (`sk_live_…`). Empty = shop + donations stay in safe preview mode |
| `ebook_url` | Link to the Aspire to Inspire PDF (upload it to `public_html/downloads/`) so new subscribers get it by email |

## What runs where
- Pages: static HTML/JS (built from Next.js with `STATIC_EXPORT=1`)
- `/api/contact`, `/api/subscribe`: PHP, emails Tamecka via the host's mail; every submission is also saved to `api/data/submissions.log` (blocked from the web) so nothing is lost
- `/api/checkout`: PHP → Stripe Checkout (one-time + monthly gifts, shop cart with prices from `api/products.json`)
- Spam protection: per-visitor rate limit on all forms

## After changing prices or products
Edit `src/lib/site.ts`, run `./scripts/build-deploy.sh`, re-upload. (When re-uploading, keep the live `api/config.php` so the keys aren't wiped.)
