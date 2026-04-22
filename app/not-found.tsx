import Link from '@/components/Link'
import { Em } from '@/components/Em'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you followed points to nothing.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-start px-5 py-32 md:px-8 md:py-40">
      <div
        aria-hidden="true"
        className="text-yel-300 animate-slow-spin mb-10 text-6xl leading-none opacity-60"
      >
        ✦
      </div>
      <h1 className="t-display mb-6">
        A page <Em>that isn&rsquo;t here.</Em>
      </h1>
      <p className="t-lead mb-10 max-w-[520px]">
        The link you followed points to nothing — which is, admittedly, on-brand. Let&rsquo;s get
        you back to the ritual.
      </p>
      <Link
        href="/"
        className="border-line hover:border-lav-300 font-ui text-ink-2 hover:text-lav-500 inline-flex h-14 items-center rounded-full border bg-white/60 px-8 text-[11px] font-semibold tracking-[0.3em] uppercase backdrop-blur-md transition-all duration-200"
      >
        ← back to home
      </Link>
    </div>
  )
}
