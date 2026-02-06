import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Infinique, Inc. is a Delaware C-Corporation building software and platforms that feel like magic.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <div className="animate-fade-in">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          About Infinique
        </h1>

        <div className="space-y-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          <p>
            Infinique, Inc. is a technology company incorporated in the State of Delaware as a
            C-Corporation. We design, develop, and operate software products and digital platforms.
          </p>

          <p>
            Our name comes from the combination of "infinite" and "unique" — reflecting our belief
            that great software should feel boundless in possibility yet singular in experience.
            Every product we build is crafted with intention, precision, and a relentless focus on
            the people who use it.
          </p>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Our approach
          </h2>

          <p>
            We believe the best technology disappears into the experience. It doesn't demand
            attention — it earns trust. Our work sits at the intersection of design, engineering,
            and product strategy, where thoughtful decisions compound into exceptional outcomes.
          </p>

          <h2 className="pt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Company details
          </h2>

          <ul className="space-y-2 text-base text-gray-500 dark:text-gray-400">
            <li>
              <span className="font-medium text-gray-700 dark:text-gray-200">Legal name:</span>{' '}
              Infinique, Inc.
            </li>
            <li>
              <span className="font-medium text-gray-700 dark:text-gray-200">Entity type:</span>{' '}
              Delaware C-Corporation
            </li>
            <li>
              <span className="font-medium text-gray-700 dark:text-gray-200">Industry:</span>{' '}
              Technology / Software Development
            </li>
            <li>
              <span className="font-medium text-gray-700 dark:text-gray-200">Headquarters:</span>{' '}
              Wilmington, Delaware, United States
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
