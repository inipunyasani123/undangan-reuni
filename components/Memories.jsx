'use client';
import { useState } from 'react';
import { Send } from 'lucide-react';
import Reveal from './ui/Reveal';

const initial = [
  { id: 1, name: 'Andi', message: 'Masih inget pas kita kabur jam kosong ke kantin? Wkwk, kangen!' },
  { id: 2, name: 'Bunga', message: 'Pensi 2009 the best sih. Gak sabar ketemu kalian semua lagi!' },
];
const noteRot = ['-2deg', '2deg', '-1.5deg', '1.5deg'];
const noteBg = ['bg-gold/40', 'bg-rose/15', 'bg-blush', 'bg-gold/25'];

// Kenangan / pesan nostalgia bergaya sticky note.
export default function Memories() {
  const [items, setItems] = useState(initial);
  const [form, setForm] = useState({ name: '', message: '' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setItems((p) => [{ id: Date.now(), name: form.name.trim(), message: form.message.trim() }, ...p]);
    setForm({ name: '', message: '' });
  };

  const field = 'w-full rounded-lg border-2 border-rose-deep/25 bg-cream px-4 py-3 text-sm font-semibold outline-none focus:border-rose';
  const lab = 'mb-1 block text-xs font-bold uppercase tracking-wide text-muted';

  return (
    <section className="relative z-10 bg-blush/40 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="font-script text-3xl text-rose-deep sm:text-4xl">Cerita Lama</p>
          <h2 className="mt-1 font-display text-3xl text-rose">Bagikan Kenangan</h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-8 max-w-md">
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label htmlFor="kenangan-nama" className={lab}>Nama</label>
              <input id="kenangan-nama" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Namamu" autoComplete="name" maxLength={60} className={field} required />
            </div>
            <div>
              <label htmlFor="kenangan-pesan" className={lab}>Kenangan paling berkesan</label>
              <textarea id="kenangan-pesan" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tulis kenangan paling berkesan…" rows={3} maxLength={500} className={`${field} resize-none`} required />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-bold text-cream transition hover:bg-rose-deep">
              <Send size={15} aria-hidden="true" /> Tempel Kenangan
            </button>
          </form>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2" aria-live="polite">
          {items.map((m, i) => (
            <div key={m.id} style={{ rotate: noteRot[i % noteRot.length] }} className={`p-5 shadow-sm ${noteBg[i % noteBg.length]}`}>
              <p className="font-script text-2xl text-rose-deep">{m.name}</p>
              <p className="mt-1 text-sm font-semibold leading-snug text-ink">{m.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
