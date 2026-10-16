'use client';
import { useEffect, useRef } from 'react';
import { MotionConfig } from 'framer-motion';

import Hero from './Hero';
import EventNote from './EventNote';
import CountdownTimer from './CountdownTimer';
import Throwback from './Throwback';
import PolaroidGallery from './PolaroidGallery';
import Attendees from './Attendees';
import MapEmbed from './MapEmbed';
import Memories from './Memories';
import Footer from './Footer';

// Isi album setelah sampul dibuka. Dimuat terpisah (next/dynamic) supaya JavaScript halaman pertama
// hanya berisi sampul; framer-motion dan seluruh bagian isi ikut di potongan ini.
export default function Isi() {
  const ref = useRef(null);

  // Tombol pembuka sudah hilang; fokus pindah ke awal isi.
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref} tabIndex={-1} className="relative z-10 outline-none">
        <Hero />
        <EventNote />
        <CountdownTimer />
        <Throwback />
        <PolaroidGallery />
        <Attendees />
        <MapEmbed />
        <Memories />
        <Footer />
      </div>
    </MotionConfig>
  );
}
