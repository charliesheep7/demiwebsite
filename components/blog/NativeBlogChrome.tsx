import Link from 'next/link'
import { BlogLocale, blogCopy, blogPath } from '@/lib/blog-locales'
import { AppStoreButton } from '@/components/AppStoreButton'
import { BlogLanguageNav } from './BlogLanguageNav'
export function NativeBlogHeader({ locale }: { locale: BlogLocale }) {
  const copy = blogCopy(locale)
  return (
    <header className="border-line/70 fixed top-0 right-0 left-0 z-50 border-b bg-[rgb(250_244_234_/_0.95)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-5 md:h-[72px] md:px-8">
        <Link href="/" aria-label="Demi" className="font-serif text-2xl">
          Dem<em className="text-lav-500">i</em>
        </Link>
        <Link href={blogPath(locale)} className="t-meta text-ink-2">
          {copy.blog}
        </Link>
        <AppStoreButton size="sm" label={copy.download} kicker={copy.downloadOn} />
      </div>
    </header>
  )
}
export function NativeBlogFooter({ locale }: { locale: BlogLocale }) {
  const copy = blogCopy(locale)
  return (
    <footer className="border-line-soft mx-auto w-full max-w-[1100px] border-t px-5 py-12 md:px-8">
      <BlogLanguageNav locale={locale} />
      <div className="t-meta text-ink-dim mt-8 flex flex-wrap justify-between gap-4">
        <span>© Demi {new Date().getFullYear()}</span>
        <Link href="/">{copy.home} · Demi</Link>
      </div>
    </footer>
  )
}
