'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Copy, MessageCircle } from 'lucide-react';
import config from '@/lib/data';
import { guestUrl } from '@/lib/utils';

// Alat tuan rumah: tautan undangan pribadi (?to=Nama) + pesan WhatsApp per tamu.
// Semua diproses di perangkat ini dan disimpan di localStorage; tidak ada yang dikirim ke server.
const KUNCI = 'undangan.reuni.kirim';
const CONTOH = "Andi Pratama\nBunga Lestari\nGeng XII IPA 2";

function SalinTombol({ teks, label, className }) {
  const [ok, setOk] = useState(false);
  const salin = async () => {
    try {
      await navigator.clipboard.writeText(teks);
      setOk(true);
      setTimeout(() => setOk(false), 1800);
    } catch {
      /* clipboard tidak tersedia */
    }
  };
  return (
    <>
      <button type="button" onClick={salin} className={className}>
        {ok ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        {ok ? 'Tersalin' : label}
      </button>
      <span className="sr-only" aria-live="polite">{ok ? 'Tersalin ke papan klip' : ''}</span>
    </>
  );
}

export default function KirimUndangan() {
  const [daftar, setDaftar] = useState(CONTOH);
  const [pesan, setPesan] = useState(config.kirim.pesan);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    try {
      const simpan = JSON.parse(localStorage.getItem(KUNCI) || 'null');
      if (simpan?.daftar != null) setDaftar(simpan.daftar);
      if (simpan?.pesan) setPesan(simpan.pesan);
    } catch {
      /* localStorage tidak tersedia */
    }
    setSiap(true);
  }, []);

  useEffect(() => {
    if (!siap) return;
    try {
      localStorage.setItem(KUNCI, JSON.stringify({ daftar, pesan }));
    } catch {
      /* abaikan */
    }
  }, [daftar, pesan, siap]);

  const nama = [...new Set(daftar.split('\n').map((n) => n.trim()).filter(Boolean))].slice(0, 200);
  const isi = (n) => pesan.replaceAll('{nama}', n).replaceAll('{tautan}', guestUrl(n));
  const semua = nama.map((n) => `${n} — ${guestUrl(n)}`).join('\n');

  return (
    <main className="min-h-screen bg-cream px-5 py-14 text-ink">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 py-2.5 text-sm font-medium text-rose-deep underline-offset-4 hover:underline">
          <ArrowLeft size={16} aria-hidden="true" /> Kembali ke album
        </Link>

        <p className="mt-8 font-script text-3xl text-rose-deep">Panitia Reuni</p>
        <h1 className="mt-1 font-display text-4xl uppercase text-rose-deep sm:text-5xl">Ajak Teman Seangkatan</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">Ketik nama teman, satu per baris. Setiap orang mendapat tautan pribadi — namanya muncul di sampul album — plus pesan WhatsApp yang siap dikirim.</p>

        <div className="mt-8 space-y-5">
          <div className="polaroid bg-cream p-5 sm:p-6">
            <label htmlFor="daftar-tamu" className="text-sm font-semibold text-ink">Nama tamu</label>
            <p className="mt-1 text-xs text-muted">Satu nama per baris. Nama yang sama hanya dihitung sekali.</p>
            <textarea id="daftar-tamu" rows={6} value={daftar} onChange={(e) => setDaftar(e.target.value)} className="mt-2 w-full rounded-xl border border-rose/40 bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-rose-deep" />
          </div>

          <div className="polaroid bg-cream p-5 sm:p-6">
            <label htmlFor="isi-pesan" className="text-sm font-semibold text-ink">Isi pesan</label>
            <p className="mt-1 text-xs text-muted">Pakai {'{nama}'} untuk nama tamu dan {'{tautan}'} untuk tautan undangannya.</p>
            <textarea id="isi-pesan" rows={7} value={pesan} onChange={(e) => setPesan(e.target.value)} className="mt-2 w-full rounded-xl border border-rose/40 bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-rose-deep" />
            <button type="button" onClick={() => setPesan(config.kirim.pesan)} className="mt-2 py-2 text-xs font-medium underline underline-offset-4 opacity-80 hover:opacity-100">
              Kembalikan pesan bawaan
            </button>
          </div>
        </div>

        <section className="mt-10" aria-labelledby="judul-hasil">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="judul-hasil" className="text-sm font-semibold text-ink">{nama.length} tautan siap dikirim</h2>
            {siap && nama.length > 0 && <SalinTombol teks={semua} label="Salin semua tautan" className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-deep/50 px-4 py-2 text-xs font-semibold text-rose-deep transition hover:bg-rose-deep hover:text-cream" />}
          </div>

          {!siap ? (
            <p className="mt-1 text-xs text-muted">Menyiapkan tautan…</p>
          ) : nama.length === 0 ? (
            <p className="mt-3 text-xs text-muted">Belum ada nama. Ketik minimal satu nama tamu di atas.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {nama.map((n) => (
                <li key={n} className="rounded-lg bg-blush/60 p-4">
                  <p className="font-display text-xl font-semibold text-ink">{n}</p>
                  <a href={guestUrl(n)} target="_blank" rel="noopener noreferrer" className="mt-1 break-all text-xs text-rose-deep underline-offset-2 hover:underline">
                    {guestUrl(n)}
                  </a>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(isi(n))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-deep px-4 py-2 text-xs font-semibold text-cream transition hover:bg-ink"
                    >
                      <MessageCircle size={14} aria-hidden="true" /> Kirim lewat WhatsApp
                    </a>
                    <SalinTombol teks={isi(n)} label="Salin pesan" className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-deep/50 px-4 py-2 text-xs font-semibold text-rose-deep transition hover:bg-rose-deep hover:text-cream" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="mt-10 text-center text-xs text-muted">
          Daftar nama dan pesan hanya tersimpan di peramban ini. Tidak ada yang dikirim ke server.
        </p>
      </div>
    </main>
  );
}
