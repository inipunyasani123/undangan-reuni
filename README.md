# Undangan Reuni — Angkatan 2010 SMA Kencana Mulia

Scrapbook retro: sampul album dengan tumpukan polaroid, kilas balik angkatan, album kenangan, dinding “Sudah Hadir”, dan cerita lama dari teman-teman.

**Demo live:** https://undangan-reuni-livid.vercel.app

![Tangkapan layar](public/og.jpg)

> Contoh dengan data fiktif: nama, tempat, dan nomor rekening tidak sungguhan. Formulir hanya demo dan mengatakannya terus terang. Foto adalah placeholder berlabel yang siap diganti.

## Fitur

- Sampul album yang menyapa nama tamu (`?to=Nama`)
- Kilas balik & album polaroid dengan lightbox
- Dinding “Sudah Hadir” (contoh; nama baru hanya tampil di layar pengirim)
- Hitung mundur, peta, cerita kenangan — mode demo
- **`/kirim` — alat tuan rumah:** ketik daftar tamu, dapatkan tautan pribadi tiap tamu dan pesan WhatsApp siap kirim. Semua diproses di peramban (localStorage), tanpa server.
- Musik latar dengan tombol putar/jeda (judul lagu tampil di tombol dan footer)
- Halaman 404 bergaya sendiri

## Mengganti isi

Seluruh isi ada di satu file: `lib/data.js` (nama, tanggal, acara, galeri, musik, pesan untuk /kirim). Komponen tidak perlu disentuh.

- **Tanggal:** ubah teks tanggal *dan* nilai ISO (`mainDate`, `start`, `end`) — hitung mundur dan tombol kalender memakai nilai ISO.
- **Peta:** contoh menunjuk area kota; ganti `q=` di `location.mapEmbed` dan `mapLink` dengan nama tempat atau koordinat.
- **Foto:** timpa berkas di `public/images/` dengan nama yang sama (potret 3:4, atau persegi untuk berkas yang memang persegi).
- **Musik:** timpa `public/music/latar.mp3`, lalu ubah `music.title` dan `music.credit`. Pastikan Anda berhak memakai lagunya.

## Gambar & kredit

- `public/images/*.webp` — placeholder berlabel buatan sendiri (bukan foto stok), digambar ulang dari SVG agar tidak bergantung pada layanan luar.
- `public/music/latar.mp3` — *The Entertainer — Scott Joplin*, rekaman Adam Cuerden, domain publik — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:The_Entertainer_-_1902_-_By_Scott_Joplin.ogg). Diperkecil ke MP3 mono 80 kbps.

## Teknologi

- Next.js 15.5 (App Router) dan React 19
- Tailwind CSS v4 (token tema di `app/globals.css`)
- Framer Motion, lucide-react
- Font: Bungee, Gochi Hand, Karla (next/font)
- SEO: metadata, Open Graph, JSON-LD (WebSite), sitemap.xml, robots.txt

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000 — coba juga http://localhost:3000/?to=Nama+Tamu dan http://localhost:3000/kirim.

---

Bagian dari koleksi 8 undangan digital di [PortalUndangan](https://www.pintuweb.id/undangan-digital). Dibuat oleh [PintuWeb](https://www.pintuweb.id), jasa pembuatan website.
