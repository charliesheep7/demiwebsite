import { Metadata } from 'next'
import { Eyebrow } from '@/components/Eyebrow'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Demi collects, uses, and protects your information.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy · Demi',
    description: 'How Demi collects, uses, and protects your information.',
    url: '/privacy',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[760px] px-5 py-24 md:px-8 md:py-32">
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', path: '' },
          { name: 'Privacy', path: '/privacy' },
        ]}
      />
      <Eyebrow>privacy</Eyebrow>
      <h1 className="t-h1 mt-6 mb-10">Privacy policy</h1>

      <div className="prose-article space-y-6">
        <p className="t-body-l">
          Demi is designed to keep as little of your data as possible. Your goal, your streak, and
          your taps live on your device. Nothing leaves unless you explicitly sync.
        </p>

        <h2 className="t-h3 mt-10">What we collect</h2>
        <p className="t-body-l">
          Anonymous, aggregated analytics (app opens, crash reports). No personal content, no goals,
          no journal entries.
        </p>

        <h2 className="t-h3 mt-10">What we don&rsquo;t do</h2>
        <p className="t-body-l">
          We don&rsquo;t sell your data. We don&rsquo;t share it with advertisers. We don&rsquo;t
          build a profile of you. We don&rsquo;t run any third-party tracking pixels on this site.
        </p>

        <h2 className="t-h3 mt-10">Your rights</h2>
        <p className="t-body-l">
          Delete your account any time from the app. All device data is erased immediately. Any
          backups purge within 30 days.
        </p>

        <h2 className="t-h3 mt-10">Contact</h2>
        <p className="t-body-l">
          Questions?{' '}
          <a href="mailto:privacy@demimanifest.com" className="text-lav-500 italic">
            privacy@demimanifest.com
          </a>
        </p>

        <p className="t-meta mt-12">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
        </p>
      </div>
    </div>
  )
}
