import { BlogLocale } from './blog-locales'
import messages from '@/data/siteLocales.json'
export type SiteLocale = keyof typeof messages
export const SITE_LOCALES = Object.keys(messages) as SiteLocale[]
export const isSiteLocale = (locale: string): locale is SiteLocale =>
  Object.hasOwn(messages, locale)
export const siteCopy = (locale: BlogLocale) => messages[isSiteLocale(locale) ? locale : 'en']
export const sitePath = (locale: BlogLocale, path = '') =>
  `${locale === 'en' || locale === 'tr' ? '' : `/${locale}`}${path || '/'}`.replace(/\/$/, '') ||
  '/'
export function languageAlternates(path = '') {
  return Object.fromEntries([
    ...SITE_LOCALES.map((locale) => [locale, sitePath(locale, path)]),
    ['x-default', sitePath('en', path)],
  ])
}
