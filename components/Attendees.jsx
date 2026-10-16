'use client';
import { useState } from 'react';
import { UserPlus, Check } from 'lucide-react';
import Reveal from './ui/Reveal';
import config from '@/lib/data';

const badgeRot = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '1deg'];

// Dinding "Sudah Hadir": daftar yang konfirmasi + form RSVP yang menambah nama.
export default function Attendees() {
  const { attendees: initial } = config;
  const [list, setList] = useState(initial);
  const [name, setName] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    // Undangan contoh: nama hanya ditempel di layar pengunjung, tidak disimpan.
    setList((prev) => [n, ...prev]);
    setName('');
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="font-script text-3xl text-rose-deep sm:text-4xl">Sampai jumpa!</p>
          <h2 className="mt-1 font-display text-3xl text-rose">Sudah Hadir</h2>
          <p className="mt-3 text-sm font-semibold text-muted">{list.length} sahabat sudah konfirmasi hadir</p>
          <p className="mt-1 text-xs text-muted">Daftar contoh — nama yang kamu tambahkan hanya tampil di layar ini.</p>
        </Reveal>

        {/* Form RSVP */}
        <Reveal delay={0.1} className="mx-auto mt-8 max-w-md">
          <label htmlFor="hadir-nama" className="mb-2 block text-center text-xs font-bold uppercase tracking-wide text-muted">Konfirmasi hadir</label>
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
            <input
              id="hadir-nama"
              autoComplete="name"
              maxLength={60}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tulis namamu..."
              className="w-full rounded-full border-2 border-rose-deep/30 bg-cream px-5 py-3 text-sm font-semibold outline-none focus:border-rose"
              required
            />
            <button type="submit" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-bold text-cream transition hover:bg-rose-deep">
              <UserPlus size={16} aria-hidden="true" /> Saya Hadir!
            </button>
          </form>
          <p className="mt-3 flex min-h-5 items-center justify-center gap-1.5 text-sm font-semibold text-rose" role="status">
            {justAdded && (<><Check size={15} aria-hidden="true" /> Asik, namamu sudah ditempel di dinding!</>)}
          </p>
          {list.length > initial.length && (
            <p className="mt-2 text-xs font-semibold text-muted">
              Ini undangan contoh, jadi namamu hanya tampil di layarmu sendiri.
            </p>
          )}
        </Reveal>

        {/* Dinding nama */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {list.map((n, i) => (
            <span
              key={`${n}-${i}`}
              style={{ rotate: badgeRot[i % badgeRot.length] }}
              className="border border-rose-deep/20 bg-cream px-4 py-2 text-sm font-bold text-ink shadow-sm"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
