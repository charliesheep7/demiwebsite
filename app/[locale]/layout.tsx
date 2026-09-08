import { notFound } from 'next/navigation'
import SiteLayout, { metadata as baseMetadata } from '@/components/SiteLayout'
import { blogCopy, isBlogLocale, NATIVE_BLOG_LOCALES } from '@/lib/blog-locales'
export { viewport } from '@/components/SiteLayout'
export const dynamicParams = false
export function generateStaticParams() {
  return NATIVE_BLOG_LOCALES.map((locale) => ({ locale }))
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isBlogLocale(locale) || locale === 'en') notFound()
  const copy = blogCopy(locale)
  return {
    ...baseMetadata,
    description: copy.description,
    openGraph: { ...baseMetadata.openGraph, locale: copy.ogLocale, description: copy.description },
    twitter: { ...baseMetadata.twitter, description: copy.description },
    alternates: { canonical: `/${locale}/blog` },
  }
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isBlogLocale(locale) || locale === 'en') notFound()
  return <SiteLayout locale={locale}>{children}</SiteLayout>
}
