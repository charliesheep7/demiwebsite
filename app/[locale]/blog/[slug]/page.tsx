import { notFound } from 'next/navigation'
import BlogArticle, { blogArticleMetadata } from '@/components/blog/BlogArticle'
import { getAllPosts } from '@/lib/blog'
import { isBlogLocale } from '@/lib/blog-locales'
export const dynamicParams = false
export function generateStaticParams({ params }: { params: { locale: string } }) {
  return isBlogLocale(params.locale) ? getAllPosts(params.locale).map(({ slug }) => ({ slug })) : []
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isBlogLocale(locale) || locale === 'en') notFound()
  return blogArticleMetadata(slug, locale)
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isBlogLocale(locale) || locale === 'en') notFound()
  return <BlogArticle slug={slug} locale={locale} />
}
