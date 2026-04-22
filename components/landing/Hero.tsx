import { AppStoreButton } from '../AppStoreButton'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-[180px] md:pb-32">
      <div
        aria-hidden="true"
        className="text-yel-300 animate-slow-spin pointer-events-none absolute top-20 right-4 text-[120px] leading-none opacity-60 md:top-24 md:right-16"
      >
        ✦
      </div>

      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="max-w-[1100px]">
          <h1 className="t-display text-ink">
            Manifest with Demi.
            <br />
            <span className="text-lav-500">Ask for more.</span>
            <br />
            The universe is not on budget.
          </h1>

          <div className="mt-12 flex flex-col items-start gap-4 md:mt-16 md:flex-row md:items-center md:gap-6">
            <AppStoreButton size="lg" className="w-full justify-center md:w-auto" />
            <a
              href="#manifesto"
              className="border-line hover:border-lav-300 font-ui text-ink-2 hover:text-lav-500 inline-flex h-14 items-center gap-2 rounded-full border bg-white/60 px-8 text-[11px] font-semibold tracking-[0.3em] uppercase backdrop-blur-md transition-all duration-200"
            >
              read the manifesto →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
