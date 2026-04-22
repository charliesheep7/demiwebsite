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
  description: 'Manifest to make it come true.',
  alternates: { canonical: '/' },
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
        availability: 'https://schema.org/PreOrder',
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${siteMetadata.siteUrl}/#ritual`,
      name: 'The 30-second Demi ritual',
      description: 'A 30-second daily focus ritual that holds your future self in view.',
      totalTime: 'PT30S',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Name your future self',
          text: 'Write one sentence about the Tuesday your future self lives inside.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Open Demi once a day',
          text: 'Open the app at a consistent moment — morning coffee, commute, before bed.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Tap through the ritual',
          text: 'Read, breathe, hold the image of your future self for thirty seconds.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Close the app and go live the day',
          text: 'Let the attention you placed carry into the ordinary Tuesday.',
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
