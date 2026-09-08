import { Metadata } from 'next'
import { Eyebrow } from '@/components/Eyebrow'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of service for Demi.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms · Demi',
    description: 'Terms of service for Demi.',
    url: '/terms',
    type: 'website',
  },
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[760px] px-5 py-24 md:px-8 md:py-32">
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', path: '' },
          { name: 'Terms', path: '/terms' },
        ]}
      />
      <Eyebrow>terms</Eyebrow>
      <h1 className="t-h1 mt-6 mb-10">Terms of service</h1>

      <div className="space-y-6">
        <p className="t-body-l">
          By using Demi you agree to the terms below. They&rsquo;re written to be easy to read. If
          something isn&rsquo;t clear, write to us.
        </p>

        <h2 className="t-h3 mt-10">The ritual is not medical advice</h2>
        <p className="t-body-l">
          Demi is a daily focus ritual. It is not therapy. It is not medicine. It is not a
          substitute for professional care. If you&rsquo;re in crisis, please reach a qualified
          human.
        </p>

        <h2 className="t-h3 mt-10">Your account</h2>
        <p className="t-body-l">
          You&rsquo;re responsible for the content you create in the app. Don&rsquo;t share your
          login. Don&rsquo;t use Demi to harass or harm anyone. Common sense applies.
        </p>

        <h2 className="t-h3 mt-10">Changes</h2>
        <p className="t-body-l">
          These terms may change as the product grows. We&rsquo;ll notify you in-app if they do.
        </p>

        <h2 className="t-h3 mt-10">Contact</h2>
        <p className="t-body-l">
          Questions?{' '}
          <a href="mailto:hello@demimanifest.com" className="text-lav-500 italic">
            hello@demimanifest.com
          </a>
        </p>

        <p className="t-meta mt-12">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
        </p>
      </div>
    </div>
  )
}
