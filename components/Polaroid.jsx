import Image from 'next/image';

// Foto bergaya polaroid: bingkai putih, selotip di atas, caption tulisan tangan.
// Interaktif (button) hanya bila ada onClick; tanpa onClick = dekoratif (div).
export default function Polaroid({ src, caption, rotate = '0deg', tape = true, onClick, className = '', priority = false }) {
  const interactive = typeof onClick === 'function';
  const Tag = interactive ? 'button' : 'div';

  return (
    <Tag
      {...(interactive ? { type: 'button', onClick, 'aria-label': caption ? `Perbesar foto: ${caption}` : 'Perbesar foto' } : {})}
      style={{ rotate }}
      className={`polaroid relative block ${className}`}
    >
      {tape && <span className="tape" aria-hidden="true" />}
      <span className="relative block aspect-square w-full overflow-hidden bg-blush">
        {/* Caption tulisan tangan di bawah foto sudah menjadi teksnya; alt dikosongkan agar tidak dibaca dua kali. */}
        <Image src={src} alt="" fill priority={priority} fetchPriority={priority ? 'high' : undefined} sizes="(max-width:640px) 45vw, 240px" className="object-cover" />
      </span>
      {caption && (
        <span className="absolute inset-x-0 bottom-2 truncate px-3 text-center font-script text-xl text-ink">{caption}</span>
      )}
    </Tag>
  );
}
