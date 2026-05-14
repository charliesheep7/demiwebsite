import { AppStoreButton } from '../AppStoreButton'
import { Em } from '../Em'
import { Stardust } from '../Stardust'

export default function RareModule() {
  return (
    <section id="signal" className="relative overflow-hidden py-32 md:py-40">
      <div
        className="from-lav-100 via-cream-2 to-yel-50 absolute inset-0 bg-gradient-to-b"
        aria-hidden="true"
      />
      <Stardust className="opacity-70" />

      <div className="relative mx-auto max-w-[900px] px-5 text-center md:px-8">
        <div
          aria-hidden="true"
          className="text-lav-500 animate-float-gentle mx-auto mb-10 text-[100px] leading-none"
          style={{ textShadow: '0 0 40px rgba(255,223,122,0.6)' }}
        >
          ✦
        </div>

        <h2 className="t-h1 mb-6">
          The signal you&rsquo;ve been waiting for is <Em>already here.</Em>
        </h2>
        <p className="t-lead mx-auto max-w-[560px]">
          Open Demi. Claim it. Tomorrow you do it again.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
          <AppStoreButton size="lg" />
        </div>

        <p className="font-ui text-ink-dim mt-8 text-[10px] tracking-[0.25em] uppercase">
          free to download · iOS · made in San Francisco
        </p>
      </div>
    </section>
  )
}
