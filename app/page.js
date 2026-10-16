'use client';
import { Component, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import config from '@/lib/data';
import ScrapbookCover from '@/components/ScrapbookCover';
import MusicPlayer from '@/components/MusicPlayer';

// Isi undangan dimuat terpisah: halaman pertama cukup sampul (cepat tampil di ponsel),
// isi diunduh diam-diam sebelum sampul dibuka (lihat prefetch di bawah).
const muatIsi = () => import('@/components/Isi');
const Isi = dynamic(muatIsi, {
  ssr: false,
  loading: () => (
    <p role="status" className="flex min-h-svh items-center justify-center text-sm text-muted">
      Memuat undangan…
    </p>
  ),
});

// Bila potongan isi gagal diunduh (sinyal putus), tampilkan ajakan muat ulang, bukan halaman galat.
class PenahanGalat extends Component {
  state = { galat: false };
  static getDerivedStateFromError() {
    return { galat: true };
  }
  render() {
    if (!this.state.galat) return this.props.children;
    return (
      <div role="alert" className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center text-ink">
        <p>Isi undangan belum termuat. Periksa sinyal, lalu coba lagi.</p>
        <button type="button" onClick={() => window.location.reload()} className="min-h-11 rounded-full border border-current px-5 text-sm font-semibold">
          Muat ulang
        </button>
      </div>
    );
  }
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [sampulHilang, setSampulHilang] = useState(false);
  const [musik, setMusik] = useState(true);
  const audioRef = useRef(null);

  // Prefetch isi saat tamu mulai berinteraksi (sentuhan pertama biasanya menuju tombol Buka)
  // atau 2,5 detik setelah sampul tampil; tidak berebut jaringan dengan sampul saat dimuat.
  useEffect(() => {
    let sudah = false;
    const pra = () => {
      if (sudah) return;
      sudah = true;
      muatIsi().catch(() => {}); // gagal di sini tidak apa-apa; dicoba lagi saat sampul dibuka
    };
    const t = setTimeout(pra, 2500);
    window.addEventListener('pointerdown', pra, { once: true, passive: true });
    window.addEventListener('keydown', pra, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('pointerdown', pra);
      window.removeEventListener('keydown', pra);
    };
  }, []);

  // Cadangan: lepas sampul walau animationend tidak terpicu (mis. animasi dimatikan peramban).
  useEffect(() => {
    if (!opened) return undefined;
    const t = setTimeout(() => setSampulHilang(true), 1600);
    return () => clearTimeout(t);
  }, [opened]);

  // play() dipanggil langsung di dalam ketukan "Buka" (syarat Safari iOS), bukan menunggu isi termuat.
  const buka = () => {
    setOpened(true);
    if (musik && config.music.enabled) audioRef.current?.play().catch(() => {});
  };

  return (
    <main>
      {!sampulHilang && (
        <ScrapbookCover keluar={opened} onOpen={buka} onSelesai={() => setSampulHilang(true)} musik={musik} onMusik={setMusik} />
      )}

      {opened && (
        <PenahanGalat>
          <Isi />
        </PenahanGalat>
      )}
      <MusicPlayer audioRef={audioRef} tampil={opened} />
    </main>
  );
}
