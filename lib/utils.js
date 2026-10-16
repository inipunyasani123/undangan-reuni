// Helper murni (tanpa state) yang dipakai beberapa komponen.

// Acara berlangsung di WIB. Tanggal selalu ditulis dalam zona Asia/Jakarta, supaya tamu
// yang membuka undangan dari luar negeri tidak melihat tanggal bergeser sehari.
const ZONA = 'Asia/Jakarta';

// Contoh: tanggalWIB(iso, { day: 'numeric', month: 'long', year: 'numeric' }) -> "14 Agustus 2027"
export function tanggalWIB(iso, opsi) {
  return new Date(iso).toLocaleDateString('id-ID', { timeZone: ZONA, ...opsi });
}

// Pecahan tanggal dalam WIB: { hari: 'Sabtu', hariPendek: 'Sab', tgl: 14, bulan: 8, namaBulan: 'Agustus', bulanPendek: 'Agu', tahun: 2027 }
export function bagianWIB(iso) {
  const ambil = (opsi) => new Date(iso).toLocaleDateString('id-ID', { timeZone: ZONA, ...opsi });
  return {
    hari: ambil({ weekday: 'long' }),
    hariPendek: ambil({ weekday: 'short' }),
    tgl: Number(ambil({ day: 'numeric' })),
    bulan: Number(ambil({ month: 'numeric' })),
    namaBulan: ambil({ month: 'long' }),
    bulanPendek: ambil({ month: 'short' }),
    tahun: Number(ambil({ year: 'numeric' })),
  };
}

// Format Date -> string UTC untuk Google Calendar: YYYYMMDDTHHmmssZ
function toCalDate(iso) {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

// Bangun URL "Tambah ke Google Calendar" dari satu event.
export function googleCalendarUrl(event, { title, location } = {}) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title ? `${title} — ${event.name}` : event.name,
    dates: `${toCalDate(event.start)}/${toCalDate(event.end)}`,
    details: `${event.name} • ${event.date} • ${event.time}`,
    location: location || `${event.venue}, ${event.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Alamat undangan tanpa query (?to=...), supaya nama tamu tidak ikut terbagikan.
export function invitationUrl() {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}/`;
}

// Tautan undangan pribadi untuk satu tamu: https://.../?to=Nama+Tamu
export function guestUrl(name) {
  return `${invitationUrl()}?to=${encodeURIComponent(name.trim()).replace(/%20/g, '+')}`;
}

// URL share ke WhatsApp. `url` opsional (default: alamat undangan tanpa nama tamu).
export function whatsappShareUrl(text, url) {
  const link = url ?? invitationUrl();
  return `https://wa.me/?text=${encodeURIComponent(link ? `${text}\n${link}` : text)}`;
}
