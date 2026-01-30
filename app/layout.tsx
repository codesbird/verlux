import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://verluxstands.com'),
  title: {
    default: 'Verlux Stands | Premium Exhibition Stand Design & Build Company',
    template: '%s | Verlux Stands'
  },
  description: 'Award-winning exhibition stand design and build company. Custom trade show booths, modular displays & bespoke exhibition solutions worldwide. 15+ years experience, 500+ projects delivered.',
  keywords: ['exhibition stands', 'trade show booths', 'exhibition stand design', 'custom exhibition stands', 'modular exhibition stands', 'trade show displays', 'exhibition stand builders', 'booth design', 'stand rental', 'exhibition contractors'],
  authors: [{ name: 'Verlux Stands' }],
  creator: 'Verlux Stands',
  publisher: 'Verlux Stands',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://verluxstands.com',
    siteName: 'Verlux Stands',
    title: 'Verlux Stands | Premium Exhibition Stand Design & Build Company',
    description: 'Award-winning exhibition stand design and build company. Custom trade show booths, modular displays & bespoke exhibition solutions worldwide.',
    images: [
      {
        url: '/images/hero-stand.jpg',
        width: 1200,
        height: 630,
        alt: 'Verlux Stands - Premium Exhibition Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verlux Stands | Premium Exhibition Stand Design & Build',
    description: 'Award-winning exhibition stand design and build company. Custom trade show booths & bespoke exhibition solutions worldwide.',
    images: ['/images/hero-stand.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#d4af37' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
