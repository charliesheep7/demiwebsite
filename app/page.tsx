import Hero from '@/components/landing/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Infinique — Software that feels like magic',
  description:
    'Infinique, Inc. builds software and platforms that feel like magic. A Delaware C-Corporation crafting infinitely unique digital experiences.',
}

export default async function Page() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* What We Do section */}
      <section className="border-t border-gray-100 bg-white py-24 sm:py-32 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <div className="animate-fade-in text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              What we do
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Infinique, Inc. is a technology company that designs, develops, and operates software
              products and platforms. We focus on creating tools that are intuitive, reliable, and
              built to last.
            </p>
          </div>

          <div className="mt-16 grid gap-12 sm:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-sm font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                Design
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Thoughtful interfaces that put the user first. Every detail considered, nothing
                superfluous.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-sm font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                Engineering
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Robust systems built on solid foundations. Scalable architecture that grows with
                ambition.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-sm font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                Product
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                End-to-end product thinking from concept to launch. Strategy meets execution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
