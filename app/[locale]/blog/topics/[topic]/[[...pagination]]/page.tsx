import { notFound } from 'next/navigation'
import BlogIndex, { blogIndexMetadata, filteredPosts, PAGE_SIZE } from '@/components/blog/BlogIndex'
import { BlogLocale, isBlogLocale } from '@/lib/blog-locales'
import { TOPICS, Topic } from '@/lib/topics'
type Params = { locale: string; topic: string; pagination?: string[] }
export const dynamicParams = false
export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = params.locale as BlogLocale
  return TOPICS.flatMap((topic) =>
    Array.from({ length: Math.ceil(filteredPosts(locale, topic).length / PAGE_SIZE) }, (_, i) => ({
      topic,
      pagination: i === 0 ? [] : ['page', String(i + 1)],
    }))
  )
}
async function resolve(params: Promise<Params>) {
  const p = await params
  const locale = p.locale
  if (!isBlogLocale(locale) || locale === 'en') notFound()
  const topic = p.topic as Topic
  if (!TOPICS.includes(topic)) notFound()
  if (
    p.pagination &&
    (p.pagination.length !== 2 ||
      p.pagination[0] !== 'page' ||
      !/^[1-9][0-9]*$/.test(p.pagination[1]))
  )
    notFound()
  const page = p.pagination ? Number(p.pagination[1]) : 1
  return { locale, page, topic }
}
export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale, page, topic } = await resolve(params)
  return blogIndexMetadata(locale, page, topic)
}
export default async function Page({ params }: { params: Promise<Params> }) {
  return <BlogIndex {...await resolve(params)} />
}
