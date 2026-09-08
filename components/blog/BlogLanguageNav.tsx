import Link from 'next/link'
import { BLOG_LOCALES, BlogLocale, blogCopy, blogPath } from '@/lib/blog-locales'
export function BlogLanguageNav({ locale }: { locale: BlogLocale }) {
  return (
    <nav aria-label={blogCopy(locale).languages} className="t-meta flex flex-wrap gap-x-5 gap-y-3">
      {BLOG_LOCALES.map((lang) => (
        <Link
          key={lang}
          href={blogPath(lang)}
          lang={lang}
          hrefLang={lang}
          aria-current={lang === locale ? 'page' : undefined}
          className={
            lang === locale
              ? 'text-lav-500 underline underline-offset-4'
              : 'text-ink-dim hover:text-lav-500'
          }
        >
          {blogCopy(lang).label}
        </Link>
      ))}
    </nav>
  )
}
