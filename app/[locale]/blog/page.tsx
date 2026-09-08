import { notFound } from 'next/navigation'
import BlogIndex, { blogIndexMetadata } from '@/components/blog/BlogIndex'
import { isBlogLocale } from '@/lib/blog-locales'
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isBlogLocale(locale) || locale === 'en') notFound()
  return blogIndexMetadata(locale)
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isBlogLocale(locale) || locale === 'en') notFound()
  return <BlogIndex locale={locale} />
}
