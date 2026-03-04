import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://cdovey.dev'),
  title: {
    template: '%s | Chase Dovey',
    default: 'Chase Dovey - AI & Cloud Engineer',
  },
  description: 'AI and cloud engineer. Builder of things that scale. Exploring AI engineering, cloud infrastructure, and modern development.',
  keywords: 'AI engineer, cloud engineer, AI engineering, cloud computing, Azure, AWS, DevOps, infrastructure as code, Chase Dovey',
  authors: [{ name: 'Chase Dovey' }],
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
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Chase Dovey - AI & Cloud Engineer',
    description: 'AI and cloud engineer. Builder of things that scale.',
    url: 'https://cdovey.dev',
    siteName: 'Chase Dovey',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Chase Dovey - AI & Cloud Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chase Dovey - AI & Cloud Engineer',
    description: 'AI and cloud engineer. Builder of things that scale.',
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-surface-900 text-gray-300">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
