import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap'
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0d14'
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://company-profile.vercel.app');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SyauqiDev — Jasa Pembuatan Website Profesional (Owner: Syauqi Abduraffi)',
    template: '%s | SyauqiDev'
  },
  description:
    'SyauqiDev adalah penyedia jasa pembuatan website profesional & backend modern milik Syauqi Abduraffi (Owner & Full-Stack Developer, S1 Teknik Informatika). Melayani Company Profile, E-Commerce, Landing Page UMKM, dan Web App kustom.',
  keywords: [
    'Jasa Pembuatan Website',
    'Jasa Pembuatan Website Murah',
    'Jasa Bikin Web Profesional',
    'Web Developer Indonesia',
    'Fullstack Developer Jakarta',
    'Jasa Company Profile',
    'Jasa Toko Online E-Commerce',
    'Next.js Developer',
    'React Developer Indonesia',
    'SyauqiDev',
    'Syauqi Abduraffi',
    'Syauqi Web Developer',
    'Jasa Backend API',
    'Aplikasi Web Custom'
  ],
  authors: [{ name: 'Syauqi Abduraffi', url: 'https://github.com/Police746' }],
  creator: 'Syauqi Abduraffi',
  publisher: 'SyauqiDev',
  applicationName: 'SyauqiDev Portfolio',
  generator: 'Next.js 14',
  alternates: {
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    title: 'SyauqiDev — Jasa Pembuatan Website Profesional & Backend Developer',
    description:
      'Layanan pembuatan website modern & sistem backend handal. Company profile, e-commerce, dan sistem custom dengan performa tinggi & desain UI/UX eksklusif.',
    siteName: 'SyauqiDev',
    images: [
      {
        url: '/uploads/ecommerce-store-lavensa.jpg',
        width: 1200,
        height: 630,
        alt: 'SyauqiDev Portfolio & Website Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SyauqiDev — Jasa Pembuatan Website Profesional & Backend Developer',
    description:
      'Layanan pembuatan website modern & sistem backend handal. Company profile, e-commerce, dan sistem custom dengan performa tinggi.',
    images: ['/uploads/ecommerce-store-lavensa.jpg'],
    creator: '@syauqidev'
  },
  icons: {
    icon: [
      { url: '/uploads/syauqidev-logo.jpg', type: 'image/jpeg' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/uploads/syauqidev-logo.jpg',
    apple: '/uploads/syauqidev-logo.jpg'
  },
  verification: {
    google: 'CNaoHaof9uzdpLKvP9s0e07jyGmzGh-_VS6K2s-h3x0'
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'SyauqiDev — Jasa Pembuatan Website & Backend Developer',
  url: siteUrl,
  logo: `${siteUrl}/uploads/syauqidev-logo.jpg`,
  image: `${siteUrl}/uploads/syauqidev-logo.jpg`,
  description:
    'Layanan jasa pembuatan website profesional, sistem e-commerce, company profile perusahaan, dan arsitektur backend database modern oleh Syauqi Abduraffi.',
  founder: {
    '@type': 'Person',
    name: 'Syauqi Abduraffi',
    jobTitle: 'Owner & Lead Full-Stack Web Developer',
    knowsAbout: ['Next.js', 'React', 'Node.js', 'TypeScript', 'TailwindCSS', 'MySQL', 'PostgreSQL']
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jakarta',
    addressCountry: 'ID'
  },
  priceRange: 'Rp 1.000.000 - Rp 10.000.000',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Layanan Pembuatan Website',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Jasa Website Company Profile & Bisnis'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Jasa Website E-Commerce & Toko Online'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Jasa Custom Web App & Backend API'
        }
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${jakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" type="image/jpeg" href="/uploads/syauqidev-logo.jpg" />
        <link rel="apple-touch-icon" href="/uploads/syauqidev-logo.jpg" />
        <meta
          name="google-site-verification"
          content="CNaoHaof9uzdpLKvP9s0e07jyGmzGh-_VS6K2s-h3x0"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen selection:bg-[#ea7c00] selection:text-white">
        {children}
      </body>
    </html>
  );
}
