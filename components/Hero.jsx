'use client';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import config from '@/lib/data';
import { tanggalWIB } from '@/lib/utils';

// Hero retro: banner reuni besar (Bungee), angkatan & sekolah.
export default function Hero() {
  const { reunion, mainDate } = config;
  const dateLabel = tanggalWIB(mainDate, { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section className="relative z-10 flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="font-script text-3xl text-rose-deep sm:text-4xl"
      >
        {reunion.tagline}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
        className="mt-4 break-words font-display text-5xl leading-none text-rose sm:text-6xl md:text-7xl"
      >
        {reunion.title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-6"
      >
        <p className="inline-block -rotate-1 bg-gold px-4 py-1.5 font-display text-lg text-ink">{reunion.angkatan}</p>
        <p className="mt-4 font-script text-2xl text-ink">{reunion.school}</p>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-muted">{dateLabel}</p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-rose-deep"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <ChevronDown size={30} />
      </motion.div>
    </section>
  );
}
