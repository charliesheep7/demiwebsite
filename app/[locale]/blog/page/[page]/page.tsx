import { notFound } from 'next/navigation'
import BlogIndex, { blogIndexMetadata, filteredPosts, PAGE_SIZE } from '@/components/blog/BlogIndex'
import { BlogLocale, isBlogLocale } from '@/lib/blog-locales'
import { TOPICS, Topic } from '@/lib/topics'
type Params = { locale: string; page: string }
export const dynamicParams = false
export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = params.locale as BlogLocale
  const pages = Array.from(
    { length: Math.max(0, Math.ceil(filteredPosts(locale).length / PAGE_SIZE) - 1) },
    (_, i) => ({ page: String(i + 2) })
  )
  // A static export rejects a route with no params, so locales without a second
  // page get /page/1, which next.config redirects to the locale's blog index
  return pages.length || !process.env.EXPORT ? pages : [{ page: '1' }]
}
async function resolve(params: Promise<Params>) {
  const p = await params
  const locale = p.locale
  if (!isBlogLocale(locale) || locale === 'en') notFound()
  const topic = undefined
  if (!/^[1-9][0-9]*$/.test(p.page)) notFound()
  const page = Number(p.page)
  return { locale, page, topic }
}
export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale, page, topic } = await resolve(params)
  return blogIndexMetadata(locale, page, topic)
}
export default async function Page({ params }: { params: Promise<Params> }) {
  return <BlogIndex {...await resolve(params)} />
}
