'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import config from '@/lib/data';
import { useDialog } from '@/lib/hooks';
import Reveal from './ui/Reveal';
import Polaroid from './Polaroid';

const rots = ['-4deg', '3deg', '-2deg', '4deg', '-3deg', '2deg'];

// Galeri polaroid bertaburan + lightbox.
export default function PolaroidGallery() {
  const { gallery } = config;
  const [active, setActive] = useState(null);
  const tombolTutup = useDialog(active !== null, () => setActive(null));
  const foto = active !== null ? gallery[active] : null;

  return (
    <section className="relative z-10 bg-blush/40 px-6 py-20">
      <Reveal className="text-center">
        <p className="font-script text-3xl text-rose-deep sm:text-4xl">Album Foto</p>
        <h2 className="mt-1 font-display text-3xl text-rose">Kenangan Kita</h2>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
        {gallery.map((g, i) => (
          <Reveal key={g.src} delay={(i % 3) * 0.08} className="flex justify-center">
            <Polaroid
              src={g.src}
              caption={g.caption}
              rotate={rots[i % rots.length]}
              onClick={() => setActive(i)}
              className="w-full max-w-[180px]"
            />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {foto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)} role="dialog" aria-modal="true" aria-label={`Foto ${active + 1} dari ${gallery.length}: ${foto.caption}`}
          >
            <button ref={tombolTutup} type="button" className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-cream hover:bg-cream/10" onClick={() => setActive(null)} aria-label="Tutup foto">
              <X size={28} />
            </button>
            <motion.div
              className="relative w-full max-w-md"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="polaroid">
                <span className="relative block aspect-square w-full overflow-hidden bg-blush">
                  <Image src={foto.src} alt={foto.caption || ''} fill sizes="(max-width: 640px) 100vw, 448px" className="object-cover" />
                </span>
                <p className="absolute inset-x-0 bottom-3 text-center font-script text-2xl text-ink" aria-hidden="true">{foto.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
