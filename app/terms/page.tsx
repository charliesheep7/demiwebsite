import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms and conditions governing your use of Infinique, Inc. products and services.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <div className="prose dark:prose-invert max-w-none">
        <h1>Terms of Service</h1>
        <p>
          <strong>Last updated: February 2026</strong>
        </p>
        <p>
          Welcome to Infinique. Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully.
          By accessing or using any websites, software products, or related services
          (&ldquo;Services&rdquo;) provided by Infinique, Inc. (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
          or &ldquo;our&rdquo;), you agree to be bound by these Terms. If you do not agree, please
          stop using the Services.
        </p>

        <h2>1. Eligibility</h2>
        <p>
          You must be at least 13 years old to use the Services. If you are using the Services on
          behalf of an organization, you represent that you have the authority to bind that
          organization to these Terms.
        </p>

        <h2>2. License to Use</h2>
        <p>
          We grant you a personal, limited, non-exclusive, non-transferable, revocable license to
          use the Services in accordance with these Terms. All rights not expressly granted are
          reserved by Infinique, Inc.
        </p>
        <p>You may not copy, modify, distribute, sell, or lease any part of the Services.</p>

        <h2>3. Prohibited Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Services for unlawful purposes</li>
          <li>Interfere with or disrupt system integrity or security</li>
          <li>Attempt to reverse engineer or extract source code</li>
          <li>Upload or transmit harmful, defamatory, or malicious content</li>
          <li>Impersonate any person or entity</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          Infinique, including its name, logo, design, software, and content, is owned by Infinique,
          Inc. or its licensors and protected by intellectual property laws.
        </p>
        <p>
          If you believe content infringes your rights, contact{' '}
          <a href="mailto:hello@infinique.org">hello@infinique.org</a> and we will review promptly.
        </p>

        <h2>5. Privacy</h2>
        <p>
          Your use of the Services is subject to our Privacy Policy, which explains how we collect,
          store, and use your data.
        </p>

        <h2>6. Third-Party Services</h2>
        <p>
          We rely on trusted providers for hosting, infrastructure, and other services. While we
          take care in selecting them, we do not control their actions and are not responsible for
          failures caused by third parties.
        </p>

        <h2>7. Disclaimers</h2>
        <p>
          The Services are provided &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; without any
          warranties, whether implied or express, including merchantability, fitness for a
          particular purpose, or non-infringement.
        </p>
        <p>Use of the Services is at your own risk.</p>

        <h2>8. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law:</p>
        <ul>
          <li>
            Infinique, Inc. is not liable for indirect, incidental, special, consequential, or
            punitive damages
          </li>
          <li>Infinique, Inc. is not liable for lost data, lost profits, or reputational damage</li>
          <li>
            Our total liability for any claim will not exceed the greater of $50 USD or the amount
            you paid us in the 12 months before the event
          </li>
        </ul>

        <h2>9. Indemnification</h2>
        <p>
          You agree to defend and indemnify Infinique, Inc. and its team from any claims, damages,
          or expenses arising from your use of the Services or your violation of these Terms.
        </p>

        <h2>10. Termination</h2>
        <p>
          We may suspend or terminate your access to the Services for violations of these Terms or
          for legal reasons. Sections such as disclaimers, limitations, and intellectual property
          survive termination.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of
          Delaware, United States, without regard to its conflict of law provisions.
        </p>

        <h2>12. Changes to the Terms</h2>
        <p>
          We may update these Terms from time to time. Updates become effective when posted.
          Continued use of the Services means you accept the revised Terms.
        </p>

        <h2>13. Contact Us</h2>
        <p>
          If you have questions or concerns, contact us at{' '}
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
