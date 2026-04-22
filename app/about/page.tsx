import { Metadata } from 'next'
import { Em } from '@/components/Em'
import { Eyebrow } from '@/components/Eyebrow'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import { JsonLd } from '@/components/JsonLd'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Demi is a small, independent studio in San Francisco building a ritual for people who half-believe.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About · Demi',
    description:
      'Demi is a small, independent studio in San Francisco building a ritual for people who half-believe.',
    url: '/about',
    type: 'website',
  },
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${siteMetadata.siteUrl}/about`,
  name: 'About · Demi',
  description:
    'Demi is a small, independent studio in San Francisco building a ritual for people who half-believe.',
  isPartOf: { '@id': `${siteMetadata.siteUrl}#website` },
  about: { '@id': `${siteMetadata.siteUrl}#organization` },
  mainEntity: { '@id': `${siteMetadata.siteUrl}#organization` },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[760px] px-5 py-24 md:px-8 md:py-32">
      <JsonLd data={aboutSchema} />
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', path: '' },
          { name: 'About', path: '/about' },
        ]}
      />
      <Eyebrow>about</Eyebrow>
      <h1 className="t-h1 mt-6 mb-12">
        A small studio, making one <Em>small thing.</Em>
      </h1>

      <div className="space-y-6">
        <p className="t-body-l">
          Demi is built by a small, independent team in San Francisco. We make one product, very
          carefully, on a long timeline.
        </p>
        <p className="t-body-l">
          We&rsquo;re former designers and engineers who got tired of the gap between the Tuesday we
          had and the Tuesday we wanted. We built the ritual for ourselves first. We&rsquo;re
          sharing it because enough friends asked.
        </p>
        <p className="t-body-l">
          No venture capital. No investors waiting for a return. We sell a gentle subscription so
          the company can stay small and weird for as long as it wants.
        </p>
      </div>
    </div>
  )
}
