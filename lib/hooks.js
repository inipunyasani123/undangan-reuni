'use client';
import { useState, useEffect, useRef } from 'react';

// Hitung mundur menuju tanggal acara. `passed` bernilai true setelah waktunya lewat,
// supaya tampilan bisa berganti dari angka 00 menjadi ucapan terima kasih.
export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: false });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const tick = () => {
      const diff = target - Date.now();
      const d = Math.max(0, diff);
      setTimeLeft({
        days: Math.floor(d / (1000 * 60 * 60 * 24)),
        hours: Math.floor((d / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((d / (1000 * 60)) % 60),
        seconds: Math.floor((d / 1000) % 60),
        passed: diff <= 0,
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

// Ambil nama tamu dari query string: ?to=Nama+Tamu
// URLSearchParams sudah mengurai %xx dan "+" sendiri; jangan didekode ulang, karena nama
// yang memuat "%" (mis. ?to=50%25) akan melempar URIError dan merusak seluruh halaman.
export function useGuestName(fallback = 'Tamu Undangan') {
  const [name, setName] = useState(fallback);

  useEffect(() => {
    const to = new URLSearchParams(window.location.search).get('to');
    const bersih = (to || '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60);
    if (bersih) setName(bersih);
  }, [fallback]);

  return name;
}

// Perilaku dialog sederhana (lightbox galeri): fokus pindah ke tombol tutup, Esc menutup,
// Tab tetap di dalam dialog, gulir halaman dikunci, lalu fokus kembali ke pemicunya.
export function useDialog(terbuka, tutup) {
  const tombolTutup = useRef(null);
  const tutupRef = useRef(tutup);
  tutupRef.current = tutup;

  useEffect(() => {
    if (!terbuka) return undefined;
    const pemicu = document.activeElement;
    const overflowLama = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    tombolTutup.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        tutupRef.current();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        tombolTutup.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflowLama;
      if (pemicu instanceof HTMLElement) pemicu.focus({ preventScroll: true });
    };
  }, [terbuka]);

  return tombolTutup;
}
