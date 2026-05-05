import { AppStoreButton } from './AppStoreButton'
import { Em } from './Em'

export function BlogCTA() {
  return (
    <aside
      aria-label="Download Demi"
      className="not-prose relative mt-20 overflow-hidden rounded-[var(--radius-lg)]"
    >
      <div
        aria-hidden="true"
        className="from-lav-100 via-cream-2 to-yel-50 absolute inset-0 bg-gradient-to-br"
      />
      <div
        aria-hidden="true"
        className="text-lav-500/60 absolute -top-6 -right-4 text-[110px] leading-none select-none"
        style={{ textShadow: '0 0 50px rgba(255,223,122,0.55)' }}
      >
        ✦
      </div>

      <div className="relative px-7 py-12 md:px-12 md:py-14">
        <p className="font-ui text-ink-dim mb-4 text-[10px] font-semibold tracking-[0.3em] uppercase">
          a 30-second ritual
        </p>
        <h2 className="t-h2 mb-4">
          Try it on one <Em>ordinary Tuesday.</Em>
        </h2>
        <p className="t-body-l text-ink-2 mb-8 max-w-[520px]">
          Demi is a manifestation app for skeptics. No affirmations to perform. No vision boards.
          Open it once, hold your future self in view for thirty seconds, close it, go live the day.
        </p>
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
          <AppStoreButton size="lg" />
          <span className="font-ui text-ink-dim text-[10px] tracking-[0.25em] uppercase">
            free · iOS
          </span>
        </div>
      </div>
    </aside>
  )
}
