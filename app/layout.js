import './globals.css';
import { Bungee, Gochi_Hand, Karla } from 'next/font/google';
import config from '@/lib/data';

const display = Bungee({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bungee',
  display: 'swap',
});
const script = Gochi_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-gochi',
  display: 'swap',
});
const body = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-karla',
  display: 'swap',
});

const __jsonld = {"@context":"https://schema.org","@type":"WebSite","name":"Undangan Reuni Digital — Angkatan 2010 SMA Kencana Mulia","description":"Contoh undangan reuni digital bergaya scrapbook: kilas balik, album polaroid, dinding sudah hadir, cerita kenangan, dan musik latar.","inLanguage":"id"};

export const metadata = {
  metadataBase: new URL("https://undangan-reuni.pintuweb.id"),
  title: "Undangan Reuni Digital — Angkatan 2010 SMA Kencana Mulia",
  description: "Undangan reuni akbar digital yang nostalgik. Kumpul kembali, kenang masa sekolah, dan konfirmasi kehadiran dalam satu tautan.",
  applicationName: "Undangan Digital",
  keywords: ["undangan reuni", "undangan reuni digital", "reuni sekolah", "undangan alumni"],
  authors: [{ name: "Undangan Digital" }],
  creator: "Undangan Digital",
  publisher: "Undangan Digital",
  alternates: { canonical: "https://undangan-reuni.pintuweb.id" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://undangan-reuni.pintuweb.id",
    siteName: "Undangan Digital",
    title: "Undangan Reuni Digital — Angkatan 2010 SMA Kencana Mulia",
    description: "Undangan reuni akbar digital yang nostalgik. Kumpul kembali, kenang masa sekolah, dan konfirmasi kehadiran dalam satu tautan.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Undangan Reuni Digital — Angkatan 2010 SMA Kencana Mulia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Undangan Reuni Digital — Angkatan 2010 SMA Kencana Mulia",
    description: "Undangan reuni akbar digital yang nostalgik. Kumpul kembali, kenang masa sekolah, dan konfirmasi kehadiran dalam satu tautan.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport = {
  themeColor: '#c8553d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${display.variable} ${script.variable} ${body.variable}`}>
      <body className="antialiased">{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
