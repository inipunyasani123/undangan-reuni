'use client';
import { Music } from 'lucide-react';

// Sakelar musik di sampul: tamu memilih sebelum membuka undangan apakah musik latar ikut
// diputar. Musik tidak pernah berbunyi saat halaman dimuat; baru diputar setelah tamu
// mengetuk "Buka Undangan" (bila sakelar menyala) dan bisa dijeda lewat tombol mengambang.
// Warna mengikuti `currentColor`, jadi tiap tema cukup memberi kelas teks.
export default function SakelarMusik({ nyala, onUbah, className = '' }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={nyala}
      onClick={() => onUbah(!nyala)}
      className={`inline-flex min-h-11 items-center gap-2.5 ${className}`}
    >
      <Music size={15} aria-hidden="true" />
      Musik latar
      <span
        aria-hidden="true"
        className={`relative h-[18px] w-8 rounded-full border-[1.5px] border-current transition-colors ${nyala ? 'bg-current/25' : ''}`}
      >
        <span className={`absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-current transition-[left] ${nyala ? 'left-[15px]' : 'left-[3px] opacity-60'}`} />
      </span>
    </button>
  );
}
