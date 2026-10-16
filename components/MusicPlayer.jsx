'use client';
import { useState } from 'react';
import { Music, Pause } from 'lucide-react';
import config from '@/lib/data';

// Musik latar + tombol putar/jeda mengambang. Elemen <audio> sudah ada sejak awal (preload
// "none", tidak mengunduh apa pun) supaya halaman bisa memanggil play() langsung di dalam
// ketukan "Buka". Tombol baru tampil setelah undangan dibuka.
export default function MusicPlayer({ audioRef, tampil }) {
  const [isPlaying, setIsPlaying] = useState(false);
  if (!config.music.enabled) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  return (
    <>
      <audio ref={audioRef} src={config.music.src} loop preload="none" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
      {tampil && (
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? `Jeda musik: ${config.music.title}` : `Putar musik: ${config.music.title}`}
          title={config.music.title}
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-rose-deep text-cream shadow-lg transition hover:bg-ink"
        >
          {isPlaying ? <Pause size={18} aria-hidden="true" /> : <Music size={18} className="motion-safe:animate-pulse" aria-hidden="true" />}
        </button>
      )}
    </>
  );
}
