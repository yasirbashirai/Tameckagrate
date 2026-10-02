"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Butterfly from "@components/butterfly";
import Crumbs from "@components/crumbs";

/** Nonprofit hero: the butterfly unfolds on arrival, mission set beneath it. */
export default function NpHero() {
  const [open, setOpen] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setOpen(1), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(90%_70%_at_50%_35%,#ecd6e5_0%,#fbf8f4_70%)] pb-24 pt-28 text-center">
      <div className="absolute -left-40 top-40 h-[30rem] w-[30rem] animate-float rounded-full bg-plum/15 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-[26rem] w-[26rem] animate-float rounded-full bg-gold/20 blur-[120px] [animation-delay:-3s]" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex justify-center">
          <Crumbs name="From Survival to Soft" />
        </div>
        <Butterfly open={open} className="mx-auto mt-8 w-64 sm:w-96" />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-2 font-display text-6xl font-black leading-[0.9] tracking-tight text-plum-ink sm:text-8xl"
        >
          From Survival <span className="font-script font-normal text-plum">to Soft</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mx-auto mt-7 max-w-2xl text-xl text-slate-deep/85 sm:text-2xl"
        >
          A nonprofit founded by Tamecka Grate to walk with women who survived the unthinkable, from just getting through
          the day to a life that feels gentle, whole and theirs again.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#give" className="rounded-full bg-plum px-8 py-4 font-semibold text-white shadow-lg shadow-plum/30 transition-transform hover:-translate-y-0.5">
            Give today
          </a>
          <Link href="/donate#volunteer" className="rounded-full border-2 border-plum px-8 py-3.5 font-semibold text-plum transition-colors hover:bg-plum hover:text-white">
            Get involved
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
