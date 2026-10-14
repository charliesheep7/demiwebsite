import Link from 'next/link'
import { BlogLocale } from '@/lib/blog-locales'
import { siteCopy, sitePath } from '@/lib/site-locales'
import SiteLanguageNav from './SiteLanguageNav'
import { AppStoreButton } from './AppStoreButton'
import { PlayStoreButton } from './PlayStoreButton'
import { AnalyticsPreferences } from './analytics/Consent'
export function SiteHeader({ locale }: { locale: BlogLocale }) {
  const c = siteCopy(locale)
  return (
    <header className="border-line/70 fixed inset-x-0 top-0 z-50 border-b bg-[rgb(250_244_234_/_0.96)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-5 gap-y-3 px-5 py-4 md:px-8">
        <Link href={sitePath(locale)} aria-label="Demi" className="font-serif text-3xl">
          Dem<em className="text-lav-500">i</em>
        </Link>
        <nav aria-label={c.guides} className="font-ui flex items-center gap-5 text-sm">
          <Link href={sitePath(locale, '/blog')}>{c.blog}</Link>
          <Link href={sitePath(locale, '/about')}>{c.about}</Link>
          <a href={`${sitePath(locale)}#download`} className="text-lav-500">
            {c.download}
          </a>
        </nav>
        <div className="w-full md:w-auto">
          <SiteLanguageNav locale={locale} />
        </div>
      </div>
    </header>
  )
}
export function SiteFooter({ locale }: { locale: BlogLocale }) {
  const c = siteCopy(locale)
  return (
    <footer className="border-line-soft mx-auto mt-20 w-full max-w-[1280px] border-t px-5 py-12 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-8">
        <Link href={sitePath(locale)} className="font-serif text-5xl">
          Dem<em className="text-lav-500">i.</em>
        </Link>
        <div className="flex flex-wrap gap-3" data-cta-placement="footer">
          <AppStoreButton size="md" label={c.download} kicker={c.downloadOn} />
          <PlayStoreButton size="md" label={c.download} kicker={c.downloadOn} />
        </div>
      </div>
      <nav className="font-ui my-9 flex flex-wrap gap-x-6 gap-y-4 text-sm">
        {(['blog', 'about', 'contact', 'support', 'privacy', 'terms'] as const).map((key) => (
          <Link key={key} href={sitePath(locale, `/${key}`)}>
            {c[key]}
          </Link>
        ))}
        <AnalyticsPreferences locale={locale} />
      </nav>
      <SiteLanguageNav locale={locale} />
      <p className="t-meta text-ink-dim mt-8">© Demi {new Date().getFullYear()}</p>
    </footer>
  )
}
