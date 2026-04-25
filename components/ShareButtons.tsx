'use client'

import { useState } from 'react'

type Props = {
  url: string
  title: string
}

type Toast = 'link' | 'instagram' | null

export function ShareButtons({ url, title }: Props) {
  const [toast, setToast] = useState<Toast>(null)

  const showToast = (kind: Exclude<Toast, null>) => {
    setToast(kind)
    window.setTimeout(() => setToast(null), 2200)
  }

  const copy = async (kind: Exclude<Toast, null>) => {
    try {
      await navigator.clipboard.writeText(url)
      showToast(kind)
    } catch {
      window.prompt('Copy this link:', url)
    }
  }

  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const redditHref = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`

  const buttonClass =
    'border-line-soft text-ink-dim hover:text-lav-500 hover:border-lav-300 font-ui inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-[13px] font-semibold tracking-[0.18em] uppercase transition-colors'

  return (
    <div className="flex flex-col items-start gap-3">
      <span className="text-ink-dim font-ui text-[12px] font-semibold tracking-[0.3em] uppercase">
        share
      </span>
      <div className="flex flex-wrap items-center gap-2.5">
        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Share on X"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
            <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-6.99L4.6 22H1.34l8.02-9.166L1 2h7.02l4.84 6.4L18.244 2Zm-2.4 18h1.9L7.25 4H5.27l10.574 16Z" />
          </svg>
          X
        </a>
        <button
          type="button"
          onClick={() => copy('instagram')}
          className={buttonClass}
          aria-label="Copy link to share on Instagram"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          Instagram
        </button>
        <a
          href={redditHref}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Share on Reddit"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
            <path d="M22 12.07a2.18 2.18 0 0 0-3.69-1.57 10.8 10.8 0 0 0-5.84-1.84l1-4.7 3.27.7a1.56 1.56 0 1 0 .16-.94l-3.65-.78a.47.47 0 0 0-.55.36l-1.12 5.36a10.8 10.8 0 0 0-5.92 1.84A2.18 2.18 0 1 0 3.2 14.4a4.27 4.27 0 0 0-.05.67c0 3.4 3.95 6.16 8.83 6.16s8.83-2.76 8.83-6.16a4.27 4.27 0 0 0-.05-.66A2.18 2.18 0 0 0 22 12.07Zm-14.83 1.5a1.46 1.46 0 1 1 1.46 1.46 1.46 1.46 0 0 1-1.46-1.46Zm8.21 3.85a5.18 5.18 0 0 1-2.85.83h-.01a5.18 5.18 0 0 1-2.85-.83.4.4 0 1 1 .44-.66 4.42 4.42 0 0 0 2.41.69h.01a4.42 4.42 0 0 0 2.41-.69.4.4 0 1 1 .44.66Zm-.18-2.39a1.46 1.46 0 1 1 1.46-1.46 1.46 1.46 0 0 1-1.46 1.46Z" />
          </svg>
          Reddit
        </a>
        <button
          type="button"
          onClick={() => copy('link')}
          className={buttonClass}
          aria-label="Copy link"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1" />
            <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1" />
          </svg>
          Copy link
        </button>
      </div>
      <span
        aria-live="polite"
        className={`text-lav-500 font-ui text-[12px] font-semibold tracking-[0.2em] uppercase transition-opacity duration-200 ${
          toast ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {toast === 'instagram'
          ? 'link copied — paste in your story'
          : toast === 'link'
            ? 'link copied'
            : ' '}
      </span>
    </div>
  )
}
