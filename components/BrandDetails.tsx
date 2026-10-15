import Link from 'next/link'
import { BlogLocale } from '@/lib/blog-locales'
import { siteCopy, sitePath } from '@/lib/site-locales'
import { APP_STORES } from '@/lib/brand'

export default function BrandDetails({
  locale,
  detailed = false,
}: {
  locale: BlogLocale
  detailed?: boolean
}) {
  const c = siteCopy(locale)
  return (
    <section
      aria-labelledby="demi-brand-title"
      className="mx-auto max-w-[1100px] px-5 py-12 md:px-8"
    >
      <h2 id="demi-brand-title" className="t-h2">
        {detailed ? c.brandFacts : c.brandTitle}
      </h2>
      {!detailed && <p className="t-body mt-5 max-w-[820px]">{c.brandBody}</p>}
      {detailed ? (
        <>
          <dl className="t-body mt-6 space-y-5">
            <div>
              <dt className="font-bold">{c.brandWebsite}</dt>
              <dd>
                <Link href={sitePath(locale)} className="text-lav-500 underline">
                  Demi · demimanifest.com
                </Link>
              </dd>
            </div>
            <div>
              <dt className="font-bold">App Store</dt>
              <dd>
                <a href={APP_STORES.apple} className="text-lav-500 underline">
                  Demi: Manifest and Affirm
                </a>{' '}
                · Sihan Cheng
              </dd>
            </div>
            <div>
              <dt className="font-bold">Google Play</dt>
              <dd>
                <a href={APP_STORES.google} className="text-lav-500 underline">
                  Demi: Manifest &amp; Affirm
                </a>{' '}
                · h&amp;h technology ltd
              </dd>
            </div>
          </dl>
          <div className="t-body mt-8 flex flex-col items-start gap-4">
            <a href="/brand/demi-facts.txt" download className="text-lav-500 underline">
              {c.brandKit}
            </a>
            <a href="/icon.svg" download="demi-website-logo.svg" className="text-lav-500 underline">
              {c.brandLogo}
            </a>
          </div>
        </>
      ) : (
        <div className="t-body mt-6 flex flex-wrap gap-x-8 gap-y-4">
          <Link href={sitePath(locale, '/about')} className="text-lav-500 underline">
            {c.brandAbout} →
          </Link>
          <a href="#download" className="text-lav-500 underline">
            {c.brandStores} →
          </a>
        </div>
      )}
    </section>
  )
}
