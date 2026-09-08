import Hero from '@/components/landing/Hero'
import { Marquee } from '@/components/Marquee'
import Manifesto from '@/components/landing/Manifesto'
import HowItWorks from '@/components/landing/HowItWorks'
import TenRituals from '@/components/landing/TenRituals'
import Testimonial from '@/components/landing/Testimonial'
import RareModule from '@/components/landing/RareModule'
import FAQ from '@/components/landing/FAQ'
import { JsonLd } from '@/components/JsonLd'
import { FAQ_ITEMS } from '@/data/faq'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Demi — manifest to make it come true.' },
  description: siteMetadata.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Demi — manifest to make it come true.',
    description: siteMetadata.description,
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Demi — manifest to make it come true.',
    description: siteMetadata.description,
  },
}

const homepageGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteMetadata.siteUrl}/#webpage`,
      url: siteMetadata.siteUrl,
      name: 'Demi — manifest to make it come true.',
      description: siteMetadata.description,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${siteMetadata.siteUrl}#website` },
      about: { '@id': `${siteMetadata.siteUrl}#organization` },
      primaryImageOfPage: { '@id': `${siteMetadata.siteUrl}#logo` },
      breadcrumb: { '@id': `${siteMetadata.siteUrl}/#breadcrumbs` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteMetadata.siteUrl}/#breadcrumbs`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteMetadata.siteUrl,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteMetadata.siteUrl}/#app`,
      name: 'Demi',
      alternateName: 'Demimanifest',
      applicationCategory: 'LifestyleApplication',
      applicationSubCategory: 'Daily Ritual',
      operatingSystem: 'iOS 16+',
      description: siteMetadata.description,
      url: siteMetadata.siteUrl,
      publisher: { '@id': `${siteMetadata.siteUrl}#organization` },
      creator: { '@id': `${siteMetadata.siteUrl}#organization` },
      inLanguage: 'en-US',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${siteMetadata.siteUrl}/#ritual`,
      name: 'The daily Demi manifestation ritual',
      description:
        'A daily manifestation practice: claim it on the orb, read your day, script the scene, build the vision board, keep the streak.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Claim it on the orb',
          text: 'Whisper your manifestation — SP, money, move, a version of you — and tap the orb to hold it.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Read your day at a glance',
          text: 'Check today’s lucky number, the signs to watch for, the dos and don’ts, and the affirmation for the day.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Script and visualize',
          text: 'Write the manifestation in the past tense — as if it already happened — and pin images to your vision board.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Keep the streak',
          text: 'Show up tomorrow. The longer you tune in, the louder the signs get.',
        },
      ],
    },
  ],
}

export default function Page() {
  return (
    <>
      <JsonLd data={homepageGraph} />
      <Hero />
      <Marquee />
      <Manifesto />
      <HowItWorks />
      <TenRituals />
      <Testimonial />
      <RareModule />
      <FAQ />
    </>
  )
}
