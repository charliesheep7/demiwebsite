'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { blogCopy, blogPath, isBlogLocale } from '@/lib/blog-locales'
export default function NotFound() {
  const params = useParams()
  const locale =
    typeof params.locale === 'string' && isBlogLocale(params.locale) ? params.locale : 'en'
  const copy = blogCopy(locale)
  return (
    <div className="mx-auto max-w-[760px] px-5 py-32">
      <h1 className="t-h1 mb-8">{copy.notFound}</h1>
      <Link href={blogPath(locale)}>{copy.back}</Link>
    </div>
  )
}
