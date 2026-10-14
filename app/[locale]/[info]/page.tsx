import { notFound } from 'next/navigation'
import InfoPage, { INFO_SLUGS, InfoSlug, infoMetadata } from '@/components/InfoPage'
import { isSiteLocale } from '@/lib/site-locales'
export function generateStaticParams() {
  return INFO_SLUGS.map((info) => ({ info }))
}
export const dynamicParams = false
async function resolve(params: Promise<{ locale: string; info: string }>) {
  const { locale, info } = await params
  if (!isSiteLocale(locale) || !INFO_SLUGS.includes(info as InfoSlug)) notFound()
  return { locale, info: info as InfoSlug }
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; info: string }>
}) {
  const { locale, info } = await resolve(params)
  return infoMetadata(locale, info)
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; info: string }>
}) {
  const { locale, info } = await resolve(params)
  return <InfoPage locale={locale} slug={info} />
}
