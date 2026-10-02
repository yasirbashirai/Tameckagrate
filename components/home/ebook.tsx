"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import SignupForm from "@components/signup-form";
import { leadMagnet } from "@/lib/site";

/** Free eBook signup. The eBook tilts toward the cursor like a real object. */
export default function Ebook() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 150, damping: 15 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 150, damping: 15 });

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-plum-ink via-plum-deep to-plum py-24 text-white lg:py-32"
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(217,189,133,0.25),transparent_40%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 md:grid-cols-[0.8fr_1.2fr]">
        <div className="[perspective:1200px]">
          <motion.div style={{ rotateX, rotateY }} className="mx-auto w-60 sm:w-80">
            <Image src="/images/ebook-aspire-to-inspire.webp" alt="Aspire to Inspire eBook" width={1091} height={1200} className="h-auto w-full drop-shadow-[0_40px_50px_rgba(0,0,0,0.45)]" />
          </motion.div>
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-gold-soft">Free eBook</p>
          <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">{leadMagnet.title}</h2>
          <p className="mt-1 font-script text-4xl text-rose sm:text-5xl">{leadMagnet.subtitle}</p>
          <p className="mt-5 max-w-lg text-lg text-white/80">{leadMagnet.pitch}</p>
          <div className="mt-8">
            <SignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}
