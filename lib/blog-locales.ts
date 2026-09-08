import messages from '@/data/blogLocales.json'

export type BlogLocale = keyof typeof messages
export const BLOG_LOCALES = Object.keys(messages) as BlogLocale[]
export const NATIVE_BLOG_LOCALES = BLOG_LOCALES.filter((locale) => locale !== 'en')
export function isBlogLocale(value: string): value is BlogLocale {
  return Object.prototype.hasOwnProperty.call(messages, value)
}
export function blogCopy(locale: BlogLocale) {
  return messages[locale]
}
export function blogPath(locale: BlogLocale = 'en', slug?: string) {
  const base = locale === 'en' ? '/blog' : `/${locale}/blog`
  return slug ? `${base}/${slug}` : base
}
export function formatBlogDate(date: string, locale: BlogLocale, day = true) {
  return new Date(date).toLocaleDateString(messages[locale].dateLocale, {
    year: 'numeric',
    month: 'long',
    ...(day ? { day: 'numeric' as const } : {}),
    timeZone: 'UTC',
  })
}
