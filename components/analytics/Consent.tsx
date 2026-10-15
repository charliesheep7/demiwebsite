'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BlogLocale } from '@/lib/blog-locales'
import { siteCopy, sitePath } from '@/lib/site-locales'
import { CONSENT_KEY, setConsent, isAnalyticsConfigured } from './adapter'
const OPEN_EVENT = 'demi-open-analytics-preferences'
export function AnalyticsPreferences({ locale }: { locale: BlogLocale }) {
  if (!isAnalyticsConfigured()) return null
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className="text-left underline underline-offset-4"
    >
      {siteCopy(locale).preferences}
    </button>
  )
}
export function Consent({ locale }: { locale: BlogLocale }) {
  const [open, setOpen] = useState(false),
    c = siteCopy(locale)
  useEffect(() => {
    try {
      setOpen(!localStorage.getItem(CONSENT_KEY))
    } catch {
      setOpen(true)
    }
    const show = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, show)
    return () => window.removeEventListener(OPEN_EVENT, show)
  }, [])
  if (!open || !isAnalyticsConfigured()) return null
  return (
    <aside
      aria-label={c.consentTitle}
      className="border-line-soft bg-cream fixed right-3 bottom-3 left-3 z-[60] max-w-lg rounded-2xl border p-5 shadow-xl md:right-5 md:bottom-5 md:left-auto"
      style={{ background: '#faf4ea' }}
    >
      <h2 className="font-serif text-2xl">{c.consentTitle}</h2>
      <p className="font-ui mt-2 text-xs leading-relaxed">
        {c.consentBody}{' '}
        <Link href={sitePath(locale, '/privacy')} className="underline">
          {c.privacy}
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {[
          [false, c.reject],
          [true, c.accept],
        ].map(([allow, label]) => (
          <button
            type="button"
            key={String(allow)}
            onClick={() => {
              setConsent(Boolean(allow))
              setOpen(false)
            }}
            className="border-lav-500 font-ui text-lav-500 rounded-full border px-4 py-2 text-xs"
          >
            {label}
          </button>
        ))}
      </div>
    </aside>
  )
}
