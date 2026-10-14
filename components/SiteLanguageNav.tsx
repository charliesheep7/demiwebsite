'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SITE_LOCALES, siteCopy, sitePath } from '@/lib/site-locales'
import { BlogLocale } from '@/lib/blog-locales'
export default function SiteLanguageNav({ locale }: { locale: BlogLocale }) {
  const path = usePathname().replace(/^\/(fr|de|it|tr)(?=\/|$)/, '') || '/'
  // Independently authored articles are not translations. Switch to the target journal.
  const target = path.startsWith('/blog/') ? '/blog' : path
  return (
    <nav aria-label={siteCopy(locale).language} className="font-ui flex flex-wrap gap-3 text-xs">
      {SITE_LOCALES.map((lang) => (
        <Link
          key={lang}
          href={sitePath(lang, target)}
          hrefLang={lang}
          lang={lang}
          aria-current={lang === locale ? 'page' : undefined}
          className={
            lang === locale ? 'text-lav-500 underline underline-offset-4' : 'hover:text-lav-500'
          }
        >
          {siteCopy(lang).name}
        </Link>
      ))}
    </nav>
  )
}
