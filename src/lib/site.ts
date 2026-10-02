/**
 * Single source of truth for site-wide content.
 * Text marked "from old site" is Tamecka's own wording from tameckafrazier.com.
 * Text marked "DRAFT" is written by us and must be confirmed by Tamecka before launch.
 */

export const site = {
  name: "Tamecka Grate-Frazier",
  shortName: "Tamecka Frazier",
  url: "https://www.tameckafrazier.com",
  roles: ["Author", "Speaker", "Founder"],
  tagline: "I Aspire to Inspire", // from old site
  nonprofit: "From Survival to Soft",

  // from old site (About page)
  signatureQuote:
    "To aspire is to lift yourself up into a place of desired achievement. To inspire is to lift up others above your own desires, now think of what can happen when you combine the two.",

  socials: {
    facebook: "https://www.facebook.com/tameckafrazier",
    instagram: "https://www.instagram.com/tamecka_frazier",
    twitter: "https://twitter.com/TameckaF",
  },
} as const;

/** Main navigation. Pages that are not built yet still appear so the journey is visible. */
export const nav = [
  { label: "About", href: "/about" },
  { label: "From Survival to Soft", href: "/from-survival-to-soft" },
  { label: "Life After", href: "/life-after" },
  { label: "Speaking", href: "/speaking" },
  { label: "Soft Collection", href: "/soft-collection" },
  { label: "Impact", href: "/impact" },
] as const;

/** The memoir. Prices + subtitle verified on Amazon / B&N (Sept 2026). */
export const book = {
  title: "Life After",
  subtitle: "A Memoir of Inspiration Post Survival",
  isbn: "9780578724225",
  printPrice: "$19.99",
  ebookPrice: "$9.99",
  amazonPrint: "https://www.amazon.com/Life-After-Memoir-Inspiration-Survival/dp/0578724227",
  amazonKindle: "https://www.amazon.com/dp/B08DRMDSJ2",
  // from old site (Book page)
  blurb:
    "Life After is a true narrative of survival, triumph, and perseverance. This compelling testimony walks you through the journey of a woman rebuilding her strength, confidence, and faith after surviving one of the most traumatic attacks in history.",
  // from old site (Book page): "After reading Life After, you will have the desire to:"
  promises: [
    "Release your stronghold and embrace your blessings",
    "Find your courage and inspire others to do the same",
    "Acknowledge your past and welcome your future",
    "Build and nurture your relationship with God",
  ],
} as const;

/** The free lead magnet. From old site homepage signup + eBook cover. */
export const leadMagnet = {
  title: "Aspire to Inspire",
  subtitle: "30 Daily Affirmations to Keep You Inspired",
  pitch: "Sign up for Tamecka's monthly empowerment email and get the Aspire to Inspire eBook, free.",
} as const;

/** Press. Verified Sept 2026. */
export const press = [
  {
    outlet: "97.9 The Beat DFW",
    feature: "Femme Fridays",
    date: "October 2025",
    href: "https://thebeatdfw.com/3752337/femme-fridays-tamecka-frazier/",
  },
] as const;

/** DRAFT: speaking topics built from her story. Tamecka to confirm titles. */
export const speakingTopics = [
  {
    title: "Life After the Unthinkable",
    text: "Her signature story of survival, faith and choosing to live fully again.",
  },
  {
    title: "Seen, Not Looked At",
    text: "21 years in AT&T Employee Relations, on supporting survivors in the workplace.",
  },
  {
    title: "From Survival to Soft",
    text: "Why softness is strength, and how women can rebuild an identity they love.",
  },
] as const;
