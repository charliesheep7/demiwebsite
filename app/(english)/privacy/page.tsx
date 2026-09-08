import { Metadata } from 'next'
import { Eyebrow } from '@/components/Eyebrow'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Demi collects, uses, and protects your information.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy · Demi',
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
          { name: 'Privacy Policy', path: '/privacy' },
        ]}
      />
      <Eyebrow>privacy</Eyebrow>
      <h1 className="t-h1 mt-6 mb-10">Privacy policy</h1>

      <div className="prose-article space-y-6">
        <p className="t-body-l">
          This Privacy Policy describes how Infinique (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;) handles your information when you use the Demi app (&ldquo;the
          App&rdquo;). We take your privacy seriously and collect as little data as possible.
        </p>

        <h2 className="t-h3 mt-10">Information we collect</h2>
        <p className="t-body-l">
          <strong>Data stored on your device:</strong> Your goals, daily rituals, streaks, and any
          personal content you create stay on your device. This data is never transmitted to our
          servers.
        </p>
        <p className="t-body-l">
          <strong>Anonymous analytics:</strong> We collect aggregated, anonymous usage data (such as
          app opens and crash reports) to improve the app. This data cannot be used to identify you
          personally.
        </p>

        <h2 className="t-h3 mt-10">Information we do not collect</h2>
        <p className="t-body-l">
          We do not collect your name, email address, or any contact information unless you
          voluntarily reach out to us for support. We do not access your goals, journal entries, or
          any content you create in the app. We do not collect your location, contacts, or any
          sensitive personal data.
        </p>

        <h2 className="t-h3 mt-10">How we use information</h2>
        <p className="t-body-l">
          The anonymous analytics we collect are used solely to understand how the app is performing
          and to fix bugs. We do not sell your data, share it with advertisers, or use it to build a
          profile of you.
        </p>

        <h2 className="t-h3 mt-10">Third-party services</h2>
        <p className="t-body-l">
          The App may use third-party services (such as Apple&rsquo;s crash reporting) that collect
          anonymous diagnostic data under their own privacy policies. No third-party advertising
          SDKs or tracking pixels are used.
        </p>

        <h2 className="t-h3 mt-10">Data retention and deletion</h2>
        <p className="t-body-l">
          All personal content lives on your device and is deleted when you uninstall the app. If
          you contact us for support, we retain only the information necessary to resolve your issue
          and delete it within 90 days after resolution. You may request deletion of any data we
          hold by emailing us.
        </p>

        <h2 className="t-h3 mt-10">Children&rsquo;s privacy</h2>
        <p className="t-body-l">
          Demi is not directed to children under 13. We do not knowingly collect personal
          information from children under 13. If you believe we have inadvertently collected such
          information, please contact us immediately.
        </p>

        <h2 className="t-h3 mt-10">Changes to this policy</h2>
        <p className="t-body-l">
          We may update this Privacy Policy from time to time. We will notify you of significant
          changes via an in-app notice. Continued use of the App after changes constitutes
          acceptance of the updated policy.
        </p>

        <h2 className="t-h3 mt-10">Contact us</h2>
        <p className="t-body-l">
          For privacy questions or data deletion requests, contact us at{' '}
          <a href="mailto:hello@infinique.org" className="text-lav-500 italic">
            hello@infinique.org
          </a>
        </p>

        <p className="t-meta mt-12">Last updated: April 2025</p>
      </div>
    </div>
  )
}
