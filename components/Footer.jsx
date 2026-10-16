'use client';
import Link from 'next/link';
import { Share2 } from 'lucide-react';
import Reveal from './ui/Reveal';
import config from '@/lib/data';
import { invitationUrl, whatsappShareUrl } from '@/lib/utils';

// Penutup retro.
export default function Footer() {
  const { footer, reunion } = config;

  const share = () => {
    const text = `${reunion.title} ${reunion.angkatan} — ${reunion.school}`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: text, url: invitationUrl() }).catch(() => {});
    } else {
      window.open(whatsappShareUrl(text), '_blank', 'noopener');
    }
  };

  return (
    <footer className="relative z-10 bg-rose-deep px-6 py-20 text-center text-cream">
      <Reveal className="mx-auto max-w-xl">
        <p className="text-sm font-semibold leading-relaxed text-cream/85">{footer.closing}</p>
        <h2 className="my-6 break-words font-display text-4xl text-gold sm:text-5xl">{reunion.title}</h2>
        <p className="font-script text-2xl text-cream">{reunion.angkatan} &middot; {reunion.school}</p>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-[#e6af65]">{footer.hashtag}</p>

        <button
          onClick={share}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition hover:bg-cream"
        >
          <Share2 size={15} aria-hidden="true" /> Bagikan ke Teman
        </button>

        {config.music.enabled && (
          <p className="mt-10 text-xs font-semibold text-cream/80">
            Musik: {config.music.title} · {config.music.credit}
          </p>
        )}
        <p className="mt-2 text-xs font-semibold text-cream/80">
          <Link href="/kirim" className="inline-block py-2 underline underline-offset-4 hover:text-gold">Ajak teman seangkatan</Link>
        </p>
      </Reveal>
    </footer>
  );
}
