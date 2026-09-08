import { Metadata } from 'next'
import { Em } from '@/components/Em'
import { Eyebrow } from '@/components/Eyebrow'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import { JsonLd } from '@/components/JsonLd'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the team behind Demi.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact · Demi',
    description: 'Get in touch with the team behind Demi.',
    url: '/contact',
    type: 'website',
  },
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${siteMetadata.siteUrl}/contact`,
  name: 'Contact · Demi',
  description: 'Get in touch with the team behind Demi.',
  isPartOf: { '@id': `${siteMetadata.siteUrl}#website` },
  about: { '@id': `${siteMetadata.siteUrl}#organization` },
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[720px] px-5 py-24 md:px-8 md:py-32">
      <JsonLd data={contactSchema} />
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', path: '' },
          { name: 'Contact', path: '/contact' },
        ]}
      />
      <Eyebrow>contact</Eyebrow>
      <h1 className="t-h1 mt-6 mb-10">
        Say hello — we <Em>read everything.</Em>
      </h1>

      <p className="t-lead mb-10">
        Press, feedback, collaboration, or a quiet note about how the ritual is going. Any of it is
        welcome.
      </p>

      <div className="space-y-6">
        <div>
          <div className="t-eyebrow mb-2">email</div>
          <a
            href="mailto:hello@demimanifest.com"
            className="text-ink hover:text-lav-500 font-serif text-2xl italic transition-colors"
          >
            hello@demimanifest.com
          </a>
        </div>
        <div>
          <div className="t-eyebrow mb-2">press</div>
          <a
            href="mailto:press@demimanifest.com"
            className="text-ink hover:text-lav-500 font-serif text-2xl italic transition-colors"
          >
            press@demimanifest.com
          </a>
        </div>
      </div>
    </div>
  )
}
