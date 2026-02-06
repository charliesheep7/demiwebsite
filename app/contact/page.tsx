import { Metadata } from 'next'
import Link from '@/components/Link'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Infinique, Inc.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <div className="animate-fade-in">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Contact
        </h1>

        <p className="mb-12 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          We&rsquo;d love to hear from you. Whether you have a question, a partnership inquiry, or
          just want to say hello — reach out anytime.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="mb-2 text-sm font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Email
            </h2>
            <Link
              href="mailto:hello@infinique.org"
              className="text-lg text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-gray-900 dark:text-white dark:decoration-gray-600 dark:hover:decoration-white"
            >
              hello@infinique.org
            </Link>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Location
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Wilmington, Delaware
              <br />
              United States
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
