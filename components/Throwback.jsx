import Reveal from './ui/Reveal';
import config from '@/lib/data';

// Kilas balik angkatan — timeline nostalgia berselang-seling.
export default function Throwback() {
  const { throwback } = config;
  return (
    <section className="relative z-10 px-6 py-20">
      <Reveal className="text-center">
        <p className="font-script text-3xl text-rose-deep sm:text-4xl">Ingat nggak?</p>
        <h2 className="mt-1 font-display text-3xl text-rose">Kilas Balik</h2>
      </Reveal>

      <div className="relative mx-auto mt-12 max-w-2xl">
        <span className="absolute left-4 top-0 h-full w-0.5 bg-rose-deep/20 md:left-1/2" aria-hidden="true" />
        {throwback.map((t, i) => (
          <Reveal key={t.year} delay={i * 0.08} className="relative mb-8 last:mb-0">
            <div className={`ml-12 w-auto md:w-[46%] ${i % 2 ? 'md:ml-auto' : 'md:mr-auto md:ml-0'}`}>
              <div className="relative -rotate-1 border-2 border-rose-deep/20 bg-cream p-5 shadow-sm">
                <span className="inline-block bg-gold px-2 py-0.5 font-display text-sm text-ink">{t.year}</span>
                <h3 className="mt-2 font-bold text-rose-deep">{t.title}</h3>
                <p className="mt-1 text-sm text-ink/80">{t.desc}</p>
              </div>
            </div>
            <span className="absolute left-4 top-2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-rose bg-cream md:left-1/2" aria-hidden="true" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
