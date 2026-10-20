// ============================================================
//  KONFIGURASI UNDANGAN — Reuni (Yearbook / Scrapbook retro)
//  Ubah seluruh isi undangan dari satu tempat ini saja.
//
//  Ini undangan CONTOH: sekolah, nama, dan tempat fiktif. Gambar di
//  /public/images adalah ilustrasi bergaya cetak risograf buatan
//  sendiri (tokoh fiktif) — ganti dengan foto kenangan asli
//  (persegi 1:1) dan perbarui `alt`-nya.
// ============================================================

const config = {
  // -- Meta / SEO --
  meta: {
    title: 'Reuni Akbar Angkatan 2010 — SMA Kencana Mulia',
    description: 'Kumpul lagi, kenang masa-masa sekolah di reuni akbar angkatan 2010.',
  },

  // -- Identitas reuni --
  reunion: {
    title: 'Reuni Akbar',
    angkatan: 'Angkatan 2010',
    school: 'SMA Kencana Mulia',
    tagline: 'Selamat datang lagi, Sahabat!',
    cover: 'Album Kenangan',
  },

  // -- Tanggal acara (ISO) untuk countdown --
  mainDate: '2027-12-26T17:00:00+07:00',

  // -- Detail acara --
  event: {
    name: 'Reuni Akbar Angkatan 2010',
    date: 'Minggu, 26 Desember 2027',
    time: '17.00 WIB - selesai',
    venue: 'Aula SMA Kencana Mulia',
    address: 'Coblong, Bandung',
    dresscode: 'Retro / Old School',
    start: '2027-12-26T17:00:00+07:00',
    end: '2027-12-26T22:00:00+07:00',
  },

  // -- Kilas balik (timeline nostalgia) --
  throwback: [
    { year: '2007', title: 'Awal Masuk', desc: 'Pertama kali menginjak SMA, MOS, dan kenalan baru.' },
    { year: '2009', title: 'Masa Jaya', desc: 'Pensi, classmeeting, dan kenangan paling seru sepanjang masa.' },
    { year: '2010', title: 'Kelulusan', desc: 'Coret-coret seragam, perpisahan, dan janji untuk reuni.' },
    { year: '2027', title: 'Kumpul Lagi', desc: '17 tahun berlalu — saatnya bernostalgia bareng!' },
  ],

  // -- Album kenangan (persegi 1:1) --
  gallery: [
    { src: '/images/kenangan-1.webp', alt: 'Foto kelas angkatan 2010 berseragam putih abu-abu di depan gedung sekolah, dengan spanduk XII IPA 2', caption: 'Angkatan 2010' },
    { src: '/images/kenangan-2.webp', alt: 'Empat siswa berpose di depan bus wisata dan stupa saat study tour', caption: 'Study tour!' },
    { src: '/images/kenangan-3.webp', alt: 'Band sekolah tampil di panggung pensi diterangi lampu sorot', caption: 'Pensi legendaris' },
    { src: '/images/kenangan-4.webp', alt: 'Lima sahabat berpose di depan papan tulis bertuliskan XII IPA 2', caption: 'Geng kelas XII' },
    { src: '/images/kenangan-5.webp', alt: 'Dua siswa bersorak dengan seragam penuh coretan LULUS! dan tanda tangan', caption: 'Wisuda SMA' },
    { src: '/images/kenangan-6.webp', alt: 'Dua sahabat duduk di bangku kantin berbagi earphone dan es teh', caption: 'Sahabat sejati' },
  ],

  // -- Contoh daftar yang sudah konfirmasi hadir --
  attendees: [
    'Andi Pratama', 'Bunga Lestari', 'Citra Dewi', 'Doni Saputra',
    'Eka Putri', 'Fajar Nugroho', 'Gita Rahma', 'Hadi Wijaya',
  ],

  // Contoh ini menunjuk area Coblong. Ganti `q=` dengan nama/koordinat tempat acara.
  location: {
    label: 'Aula SMA Kencana Mulia, Coblong, Bandung',
    note: 'Peta contoh menunjukkan area Coblong.',
    mapEmbed: 'https://www.google.com/maps?q=Coblong,+Bandung&output=embed',
    mapLink: 'https://maps.google.com/?q=Coblong,+Bandung',
  },

  // -- Musik latar (file di /public/music/) --
  music: {
    enabled: true,
    src: '/music/latar.mp3',
    title: 'The Entertainer — Scott Joplin',
    credit: 'rekaman Adam Cuerden, domain publik',
  },

  // -- Footer --
  footer: {
    closing: 'Ayo kumpul, lengkapi cerita lama dengan kenangan baru. Sampai jumpa di reuni!',
    hashtag: '#Reuni2010',
  },

  // -- Halaman /kirim (tautan undangan per teman) --
  kirim: {
    pesan:
      'Halo {nama}! 📸\n\nUdah 17 tahun sejak kelulusan. Yuk kumpul lagi di Reuni Akbar Angkatan 2010 SMA Kencana Mulia, Minggu, 26 Desember 2027, pukul 17.00 WIB. Dresscode: retro!\n\nBuka album undangannya: {tautan}\n\nJangan lupa konfirmasi hadir ya, biar namamu masuk dinding "Sudah Hadir".',
  },
};

export default config;
