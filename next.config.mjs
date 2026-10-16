/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gambar di public/images sudah WebP kecil (± 5–45 KB) dengan ukuran pas. Disajikan apa adanya,
  // tanpa /_next/image: kuota Image Optimization Vercel (paket Hobby) dipakai bersama puluhan
  // proyek, dan saat habis setiap gambar yang belum tersimpan di cache dijawab 402 (gambar rusak).
  images: { unoptimized: true },
};

export default nextConfig;
