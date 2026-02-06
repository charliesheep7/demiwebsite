import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Infinique, Inc. collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <div className="prose dark:prose-invert max-w-none">
        <h1>Privacy Policy</h1>
        <p>
          <strong>Last updated: February 2026</strong>
        </p>
        <p>
          Infinique, Inc. (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to
          protecting your privacy. This Privacy Policy explains how we collect, use, and protect
          your information when you use our websites, software products, or related services
          (&ldquo;Services&rdquo;).
        </p>
        <p>
          <strong>
            If you do not agree with this Privacy Policy, please do not use our Services.
          </strong>
        </p>

        <h2>Information We Collect</h2>
        <p>We may collect the following types of information:</p>

        <h3>1. Information You Provide</h3>
        <ul>
          <li>Name and email address when you contact us</li>
          <li>Account information if you register for any of our products</li>
          <li>Any other information you choose to provide</li>
        </ul>

        <h3>2. Automatically Collected Information</h3>
        <ul>
          <li>Device type, browser, and operating system</li>
          <li>IP address and general location data</li>
          <li>Usage data and interaction patterns with our Services</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide, maintain, and improve our Services</li>
          <li>Respond to inquiries and provide support</li>
          <li>Ensure security and prevent abuse</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>We do not sell your personal data to third parties.</p>

        <h2>Data Sharing</h2>
        <p>We may share data only with:</p>
        <ul>
          <li>Service providers who support our operations (e.g., hosting, analytics)</li>
          <li>Authorities if required for legal compliance or safety</li>
        </ul>

        <h2>Data Retention</h2>
        <p>
          We retain your information only as long as necessary to provide our Services or as
          required by law. You may request deletion of your data at any time by contacting us.
        </p>

        <h2>Security</h2>
        <p>We use industry-standard safeguards, including:</p>
        <ul>
          <li>Encryption in transit (HTTPS/TLS)</li>
          <li>Encryption at rest via our service providers</li>
          <li>Regular security reviews and access controls</li>
        </ul>

        <h2>Your Rights</h2>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>Access, correct, or delete your personal data</li>
          <li>Object to or restrict certain processing</li>
          <li>Data portability</li>
        </ul>
        <p>
          To exercise these rights, contact us at{' '}
          <a href="mailto:hello@infinique.org">hello@infinique.org</a>.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy as needed. Continued use of our Services means you
          accept the updated policy.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, contact us at{' '}
          <a href="mailto:hello@infinique.org">hello@infinique.org</a>.
        </p>
        <p>
          Infinique, Inc.
          <br />
          Wilmington, Delaware, United States
        </p>
      </div>
    </div>
  )
}
