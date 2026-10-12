/**
 * Single source of truth for site-wide content.
 *
 * NAME RULE (client request, Oct 2026): she is "Tamecka Grate" everywhere.
 * "Frazier" may only appear on the physical book itself (the cover image).
 *
 * Text marked "from old site" is Tamecka's own wording.
 * Text marked "DRAFT" is ours and must be confirmed by Tamecka before launch.
 */

export const site = {
  name: "Tamecka Grate",
  firstName: "Tamecka",
  lastName: "Grate",
  // Pending: register tameckagrate.com (available Oct 2026) and 301 the old domain to it
  url: "https://www.tameckagrate.com",
  roles: ["Author", "Speaker", "Founder"],
  tagline: "I Aspire to Inspire", // from old site
  nonprofit: "From Survival to Soft",

  // from old site (About page)
  signatureQuote:
    "To aspire is to lift yourself up into a place of desired achievement. To inspire is to lift up others above your own desires. Now think of what can happen when you combine the two.",

  // NOTE: current handles still contain the old surname. Swap when she renames them.
  socials: {
    facebook: "https://www.facebook.com/tameckafrazier",
    instagram: "https://www.instagram.com/tamecka_frazier",
    twitter: "https://twitter.com/TameckaF",
  },
} as const;

/** Main navigation. */
export const nav = [
  { label: "Her Story", href: "/about" },
  { label: "Life After", href: "/life-after" },
  { label: "Speaking", href: "/speaking" },
  { label: "The Nonprofit", href: "/from-survival-to-soft" },
  { label: "Shop", href: "/shop" },
] as const;

/** The memoir. Prices + subtitle verified on Amazon / B&N (Sept 2026). */
export const book = {
  title: "Life After",
  subtitle: "A Memoir of Inspiration Post Survival",
  isbn: "9780578724225",
  printPrice: 19.99,
  ebookPrice: 9.99,
  amazonPrint: "https://www.amazon.com/dp/0578724227",
  amazonKindle: "https://www.amazon.com/dp/B08DRMDSJ2",
  // from old site (Book page)
  blurb:
    "Life After is a true narrative of survival, triumph, and perseverance. This compelling testimony walks you through the journey of a woman rebuilding her strength, confidence, and faith after surviving one of the most traumatic attacks in history.",
  // from old site (Book page)
  backCover: [
    "After returning home from a New Year's Eve gathering, she was brutally attacked by her neighbor, who intended to leave her for dead. By the power and grace of God, Tamecka survived.",
    "Since that night, she's been gracefully living her best life, which hasn't always been an easy thing to do. The healing journey hasn't always been seamless, but it's always been purposeful.",
    "Rather than allow this experience to hinder her, Tamecka decided to use it as the path that led to her purpose: to show others what Life After looks like.",
  ],
  // from old site: "After reading Life After, you will have the desire to:"
  promises: [
    "Release your stronghold and embrace your blessings",
    "Find your courage and inspire others to do the same",
    "Acknowledge your past and welcome your future",
    "Build and nurture your relationship with God",
  ],
} as const;

/** Her story, told as chapters. Facts from old About/Book pages. Personal-life details deliberately omitted. */
export const timeline = [
  {
    year: "Dallas",
    title: "A Dallas daughter",
    text: "Raised in Dallas and educated in the Wilmer Hutchins school district, Tamecka went on to earn her degree in Business Administration from Northwood University.",
    image: "/images/cutout-smile.webp",
  },
  {
    year: "1996",
    title: "The night everything changed",
    text: "At 24, after a New Year's Eve gathering, she was attacked in her own neighborhood and left for dead. By the grace of God, she survived what doctors called a miracle.",
    image: "/images/photo-green.webp",
    // full dark studio photo (not a cut-out): the night chapter
    dark: true,
  },
  {
    year: "20+ yrs",
    title: "A leader for people",
    text: "Two decades at AT&T, rising to Employee Relations Manager. She learned how organizations care for people, and where they fall short.",
    image: "/images/cutout-chair.webp",
  },
  {
    year: "2020",
    title: "Life After is published",
    text: "She finally put the night, and everything after it, on paper. Her memoir became a survival guide for anyone who has lost their way back to normal.",
    image: "/images/cutout-sequin.webp",
  },
  {
    year: "Today",
    title: "From Survival to Soft",
    text: "Speaker, author, grandmother and founder. Her work now is helping women move beyond surviving, into a life that is soft, whole and fully theirs.",
    image: "/images/cutout-gown.webp",
  },
] as const;

/** The free lead magnet. From old site homepage signup + eBook cover. */
export const leadMagnet = {
  title: "Aspire to Inspire",
  subtitle: "30 Daily Affirmations to Keep You Inspired",
  pitch: "Join Tamecka's monthly empowerment email and get the Aspire to Inspire eBook, free.",
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

/** Television appearances. Supplied by Tamecka, Oct 2026. */
export const tvFeatures = [
  {
    show: "The Oprah Winfrey Show",
    detail: "Guest, 1997",
    image: "/images/oprah-1997.webp",
  },
  {
    show: "I Survived…",
    detail: "Season 4, Episode 3",
  },
] as const;

/** DRAFT: speaking topics built from her story. Tamecka to confirm titles. */
export const speakingTopics = [
  {
    title: "Life After the Unthinkable",
    text: "Her signature keynote on survival, faith and choosing to live fully again.",
    audience: "Conferences · Churches · Women's events",
    image: "/images/cutout-dance.webp",
  },
  {
    title: "Seen, Not Looked At",
    text: "Two decades in Employee Relations, on supporting survivors in the workplace.",
    audience: "Corporate · HR · Wellness programs",
    image: "/images/cutout-chair.webp",
  },
  {
    title: "Softness Is Strength",
    text: "How women rebuild an identity they love after trauma, and why softness is power.",
    audience: "Universities · Awareness months · Retreats",
    image: "/images/cutout-gown.webp",
  },
] as const;

/** DRAFT: donation tiers + what each one does. Tamecka to confirm real program costs. */
export const donationTiers = [
  { amount: 25, impact: "a Soft Start care kit for a woman beginning her healing journey", wings: 0.55 },
  { amount: 50, impact: "a signed copy of Life After and a journal for a survivor in our program", wings: 0.7 },
  { amount: 100, impact: "a full month of peer support circle sessions for one woman", wings: 0.82 },
  { amount: 250, impact: "a restoration day: styling, portraits and a new-season wardrobe", wings: 0.92 },
  { amount: 500, impact: "a seat for one woman at the From Survival to Soft retreat", wings: 1 },
] as const;

export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Books" | "Apparel" | "Gifts";
  blurb: string;
  image?: string;
  art?: "tee" | "tote" | "mug" | "candle";
  badge?: string;
};

/** DRAFT shop catalogue. Prices + merch designs to be confirmed. */
export const products: Product[] = [
  {
    id: "life-after-signed",
    name: "Life After · Signed Copy",
    price: 29.99,
    category: "Books",
    blurb: "Paperback, personally signed by Tamecka with a note of encouragement.",
    image: "/images/book-cover.webp",
    badge: "Only here",
  },
  {
    id: "life-after-paperback",
    name: "Life After · Paperback",
    price: 19.99,
    category: "Books",
    blurb: "The memoir of inspiration post survival.",
    image: "/images/book-cover.webp",
  },
  {
    id: "aspire-journal",
    name: "Aspire to Inspire Journal",
    price: 18,
    category: "Books",
    blurb: "30 daily affirmations with space to write your own life after.",
    image: "/images/ebook-aspire-to-inspire.webp",
    badge: "New",
  },
  {
    id: "soft-is-strength-tee",
    name: "Soft Is Strength Tee",
    price: 34,
    category: "Apparel",
    blurb: "Heavyweight cotton in cream, butterfly on the back.",
    art: "tee",
  },
  {
    id: "butterfly-tote",
    name: "Butterfly Canvas Tote",
    price: 26,
    category: "Gifts",
    blurb: "Carry the mission. Every tote funds a Soft Start care kit.",
    art: "tote",
    badge: "Gives back",
  },
  {
    id: "aspire-mug",
    name: "Aspire to Inspire Mug",
    price: 18,
    category: "Gifts",
    blurb: "Your morning affirmation, in plum and gold.",
    art: "mug",
  },
];

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: n % 1 ? 2 : 0 });
