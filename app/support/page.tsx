import { Metadata } from 'next'
import { Eyebrow } from '@/components/Eyebrow'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with Demi — the 30-second daily ritual app.',
  alternates: { canonical: '/support' },
  openGraph: {
    title: 'Support · Demi',
    description: 'Get help with Demi — the 30-second daily ritual app.',
    url: '/support',
    type: 'website',
  },
}

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-[760px] px-5 py-24 md:px-8 md:py-32">
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', path: '' },
          { name: 'Support', path: '/support' },
        ]}
      />
      <Eyebrow>support</Eyebrow>
      <h1 className="t-h1 mt-6 mb-10">Support</h1>

      <div className="prose-article space-y-6">
        <p className="t-body-l">
          Need help with Demi? We&rsquo;re here for you. Reach out and we&rsquo;ll get back to you
          within 1–2 business days.
        </p>

        <h2 className="t-h3 mt-10">Contact us</h2>
        <p className="t-body-l">
          Email us at{' '}
          <a href="mailto:hello@infinique.org" className="text-lav-500 italic">
            hello@infinique.org
          </a>{' '}
          and include a description of the issue and your device model if relevant.
        </p>

        <h2 className="t-h3 mt-10">Frequently asked questions</h2>

        <h3 className="t-h4 mt-8">How do I reset my streak?</h3>
        <p className="t-body-l">
          Go to <strong>Settings → Ritual</strong> inside the app. You&rsquo;ll find an option to
          reset your streak there.
        </p>

        <h3 className="t-h4 mt-8">How do I change my daily intention?</h3>
        <p className="t-body-l">
          Tap the edit icon on the home screen next to your current intention to update it any time.
        </p>

        <h3 className="t-h4 mt-8">Can I restore my data after reinstalling?</h3>
        <p className="t-body-l">
          Your data lives on your device. If you have iCloud Backup enabled, your app data may be
          restored when you reinstall and sign in with the same Apple ID. We do not store personal
          data on our servers.
        </p>

        <h3 className="t-h4 mt-8">How do I delete my account?</h3>
        <p className="t-body-l">
          Go to <strong>Settings → Account → Delete Account</strong> inside the app. This
          permanently erases all your data from the device. If you&rsquo;d prefer us to handle it
          manually, email us at{' '}
          <a href="mailto:hello@infinique.org" className="text-lav-500 italic">
            hello@infinique.org
          </a>
          .
        </p>

        <h3 className="t-h4 mt-8">How do I cancel my subscription?</h3>
        <p className="t-body-l">
          Subscriptions are managed through Apple. Go to{' '}
          <strong>iPhone Settings → Apple ID → Subscriptions</strong> and cancel Demi from there.
          You&rsquo;ll retain access until the end of the billing period.
        </p>

        <h3 className="t-h4 mt-8">I was charged but lost access — what do I do?</h3>
        <p className="t-body-l">
          Try restoring purchases inside the app via <strong>Settings → Restore Purchases</strong>.
          If that doesn&rsquo;t resolve it, email us with your Apple order number and we&rsquo;ll
          look into it right away.
        </p>

        <h2 className="t-h3 mt-10">Still need help?</h2>
        <p className="t-body-l">
          Email us at{' '}
          <a href="mailto:hello@infinique.org" className="text-lav-500 italic">
            hello@infinique.org
          </a>{' '}
          — we read every message.
        </p>
      </div>
    </div>
  )
}
