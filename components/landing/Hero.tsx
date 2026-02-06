import Link from '@/components/Link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(98,125,152,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-6 pt-32 pb-28 sm:pt-40 sm:pb-36 lg:pt-48 lg:pb-44">
        <div className="animate-fade-in text-center">
          {/* Company name — large, elegant */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
            Infinique
          </h1>

          {/* Tagline */}
          <p className="mb-4 text-xl font-light tracking-wide text-gray-500 sm:text-2xl dark:text-gray-400">
            Infinitely Unique
          </p>

          {/* Value proposition */}
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            We build software and platforms that feel like magic.
            <br className="hidden sm:block" />
            Crafting digital experiences with precision, elegance, and purpose.
          </p>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-gray-900 bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-gray-900 dark:hover:bg-transparent dark:hover:text-white"
          >
            Get in touch
          </Link>
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />
    </section>
  )
}
