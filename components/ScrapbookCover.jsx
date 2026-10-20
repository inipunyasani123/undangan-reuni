'use client';
import { BookOpen } from 'lucide-react';
import config from '@/lib/data';
import { useGuestName } from '@/lib/hooks';
import Polaroid from './Polaroid';
import SakelarMusik from './SakelarMusik';

// Sampul scrapbook "Nostalgic Scrapbook": doodle, stempel angkatan, tumpukan polaroid +
// caption tulisan tangan. Judul tampil sejak cat pertama; gerak masuknya lewat CSS.
export default function ScrapbookCover({ keluar, onOpen, onSelesai, musik, onMusik }) {
  const guest = useGuestName();
  const { reunion, gallery, event } = config;
  const year = (reunion.angkatan.match(/\d{4}/) || [''])[0];

  return (
    <section
      data-sampul
      aria-label="Sampul undangan"
      className={`fixed inset-0 z-50 overflow-y-auto bg-blush ${keluar ? 'sampul-keluar' : ''}`}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && e.animationName === 'sampul-keluar') onSelesai();
      }}
    >
      {/* Doodle melayang */}
      <div className="pointer-events-none absolute inset-0 select-none font-script text-3xl text-gold/70" aria-hidden="true">
        <span className="animate-floaty absolute left-8 top-12">✦</span>
        <span className="animate-floaty absolute right-10 top-24 [animation-delay:1s]">★</span>
        <span className="animate-floaty absolute bottom-28 left-10 text-4xl [animation-delay:2s]">~</span>
        <span className="animate-floaty absolute bottom-16 right-10 [animation-delay:1.5s]">✿</span>
      </div>

      <div className="relative flex min-h-full flex-col items-center justify-center px-6 py-12 text-center">
        <p className="masuk text-xs font-bold uppercase tracking-[0.25em] text-rose-deep">
          Reuni &amp; Temu Kangen
        </p>

        {/* Tumpukan polaroid + stempel angkatan */}
        <div className="masuk-skala relative mx-auto my-8 h-60 w-64">
          {year && (
            <div className="absolute -right-1 -top-3 z-20 flex h-20 w-20 rotate-12 flex-col items-center justify-center rounded-full border-2 border-rose-deep bg-gold text-center text-ink shadow-md">
              <span className="text-[10px] font-bold uppercase leading-tight">Angkatan</span>
              <span className="font-display text-base leading-tight">{year}</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-6 w-32"><Polaroid src={gallery[1].src} rotate="-8deg" className="w-full" /></div>
            <div className="absolute right-2 top-3 w-32"><Polaroid src={gallery[2].src} rotate="7deg" className="w-full" /></div>
            <div className="absolute left-1/2 top-0 w-40 -translate-x-1/2"><Polaroid src={gallery[0].src} caption="Masa SMA…" rotate="-1deg" className="w-full" priority /></div>
          </div>
        </div>

        <h1 className="masuk-skala break-words font-display text-4xl text-rose sm:text-5xl">
          {reunion.title}
        </h1>
        <p className="mt-2 font-script text-2xl text-ink">{reunion.school}</p>
        <p className="masuk mt-3 text-xs font-bold uppercase tracking-[0.18em] text-rose-deep" style={{ '--tunda': '0.15s' }}>
          {event.date} · {event.time.split(' ')[0]} WIB
        </p>

        <div className="masuk mt-6 -rotate-1 rounded-lg border-2 border-dashed border-rose-deep/40 bg-cream px-5 py-3" style={{ '--tunda': '0.25s' }}>
          <p className="text-xs font-bold uppercase tracking-wide text-muted">Halo,</p>
          <p className="break-words text-base font-bold text-ink">{guest}</p>
        </div>

        <div className="masuk mt-7 flex flex-col items-center gap-2" style={{ '--tunda': '0.35s' }}>
          <button
            type="button"
            onClick={onOpen}
            disabled={keluar}
            className="inline-flex min-h-12 items-center gap-2 rounded-md border-2 border-ink bg-rose px-8 text-sm font-bold text-cream shadow-[4px_4px_0_var(--color-ink)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--color-ink)]"
          >
            <BookOpen size={16} aria-hidden="true" /> Buka Album
          </button>
          <SakelarMusik nyala={musik} onUbah={onMusik} className="rounded-md px-3 text-xs font-bold text-rose-deep hover:bg-cream/60" />
        </div>
      </div>
    </section>
  );
}
