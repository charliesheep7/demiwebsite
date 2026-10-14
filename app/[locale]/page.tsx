import { notFound } from 'next/navigation'
import LocalizedLanding, { landingMetadata } from '@/components/LocalizedLanding'
import { isSiteLocale } from '@/lib/site-locales'
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isSiteLocale(locale)) notFound()
  return landingMetadata(locale)
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isSiteLocale(locale)) notFound()
  return <LocalizedLanding locale={locale} />
}
