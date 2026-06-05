import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://cdovey.dev'),
  title: {
    template: '%s | Chase Dovey',
    default: 'Chase Dovey - AI Architect & Engineering Leader',
  },
  description: 'AI engineering leader specializing in agentic systems and AI security. I design and secure production agent runtimes, then build the guardrails and red-teaming that keep them reliable.',
  keywords: 'AI engineer, AI architect, agentic systems, AI security, prompt injection, red teaming, LLMs, agent orchestration, guardrails, AI engineering leader, Chase Dovey',
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
    title: 'Chase Dovey - AI Architect & Engineering Leader',
    description: 'AI engineering leader. I design and secure production agentic systems.',
    url: 'https://cdovey.dev',
    siteName: 'Chase Dovey',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Chase Dovey - AI Architect & Engineering Leader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chase Dovey - AI Architect & Engineering Leader',
    description: 'AI engineering leader. I design and secure production agentic systems.',
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
