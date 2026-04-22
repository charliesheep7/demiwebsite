import 'css/tailwind.css'

import { Instrument_Serif, Libre_Caslon_Text, Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PaperGrain } from '@/components/PaperGrain'
import { JsonLd } from '@/components/JsonLd'
import siteMetadata from '@/data/siteMetadata'
import { Metadata, Viewport } from 'next'

const serif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

const body = Libre_Caslon_Text({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const ui = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ui',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf4ea' },
    { media: '(prefers-color-scheme: dark)', color: '#faf4ea' },
  ],
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s · Demi`,
  },
  description: siteMetadata.description,
  applicationName: 'Demi',
  generator: 'Next.js',
  keywords: [
    'manifest',
    'manifestation',
    'daily ritual',
    'focus ritual',
    'intention setting',
    'journaling app',
    'mindfulness',
    'habit app',
    'future self',
    'demimanifest',
    'demi',
  ],
  authors: [{ name: siteMetadata.author, url: siteMetadata.siteUrl }],
  creator: siteMetadata.author,
  publisher: siteMetadata.author,
  category: 'lifestyle',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: 'Demi',
    description: 'A ritual for people who half-believe.',
    type: 'website',
    url: './',
    siteName: 'Demi',
    locale: 'en_US',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Demi',
    description: 'A ritual for people who half-believe.',
    card: 'summary_large_image',
    site: '@demimanifest',
    creator: '@demimanifest',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    shortcut: '/favicon.svg',
    apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#7a58c9',
      },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    // AI search / GEO hints — emerging 2026 practice for ChatGPT, Perplexity, Claude search.
    'ai-content-declaration': 'human-authored',
  },
  verification: {
    // Fill in once available from Search Console / Bing Webmaster:
    // google: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    // other: { 'msvalidate.01': 'xxx' },
  },
}

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteMetadata.siteUrl}#organization`,
      name: 'Demi',
      legalName: 'Demimanifest',
      url: siteMetadata.siteUrl,
      logo: {
        '@type': 'ImageObject',
        '@id': `${siteMetadata.siteUrl}#logo`,
        url: `${siteMetadata.siteUrl}/icon.svg`,
        width: 512,
        height: 512,
        caption: 'Demi',
      },
      image: { '@id': `${siteMetadata.siteUrl}#logo` },
      email: siteMetadata.email,
      description: siteMetadata.description,
      foundingDate: '2026',
      foundingLocation: {
        '@type': 'Place',
        name: 'San Francisco, California, United States',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          email: siteMetadata.email,
          contactType: 'customer support',
          availableLanguage: ['English'],
        },
      ],
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteMetadata.siteUrl}#website`,
      name: 'Demi',
      alternateName: 'Demimanifest',
      url: siteMetadata.siteUrl,
      description: siteMetadata.description,
      inLanguage: 'en-US',
      publisher: { '@id': `${siteMetadata.siteUrl}#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${body.variable} ${ui.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="text-ink font-body antialiased">
        <JsonLd data={graph} />
        <PaperGrain />
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-16 md:pt-[72px]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
