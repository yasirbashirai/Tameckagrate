"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import DonateWidget from "@components/donate-widget";

/** DRAFT program pillars. Tamecka to confirm. */
const pillars = [
  { title: "Heal", text: "Safe circles, faith and counsel for women carrying what happened to them." },
  { title: "Restore", text: "Confidence, style and identity: the softness trauma tried to take." },
  { title: "Rise", text: "Mentorship and opportunity so survivors can lead, and lift the next woman." },
];

/** From Survivor to Soft: mission, three pillars, and live giving. */
export default function Nonprofit() {
  return (
    <section id="nonprofit" className="relative overflow-hidden bg-blush py-28 lg:py-36">
      <div className="absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-white/50 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <Image src="/images/fsts-logo.webp" alt="From Survivor to Soft" width={1000} height={1000} className="-ml-6 h-auto w-56 sm:w-72" />
            <h2 className="mt-2 max-w-3xl text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-plum-ink sm:text-7xl">
              Surviving was never meant to be <span className="font-script font-normal text-plum">the end.</span>
            </h2>
          </div>
          <p className="max-w-sm text-xl text-slate-deep/80">
            The nonprofit Tamecka founded walks with women who lived through the unthinkable, all the way to a life
            that feels like theirs again.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="group relative overflow-hidden rounded-[2rem] bg-white/70 p-8 backdrop-blur transition-colors hover:bg-white"
            >
              <span className="font-display text-sm font-bold text-gold">0{i + 1}</span>
              <h3 className="mt-3 font-display text-4xl font-extrabold text-plum-ink">{p.title}</h3>
              <p className="mt-3 text-lg text-slate-deep/80">{p.text}</p>
              <span className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-plum/10 transition-transform duration-500 group-hover:scale-[2.5]" />
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <DonateWidget />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-base font-semibold">
          <Link href="/donate#volunteer" className="text-plum hover:underline">Volunteer your time →</Link>
          <Link href="/donate#partner" className="text-plum hover:underline">Partner with us →</Link>
          <Link href="/shop" className="text-plum hover:underline">Shop to give back →</Link>
        </div>
      </div>
    </section>
  );
}
