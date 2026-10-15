import { Metadata } from 'next'
import pages from '@/data/infoPages.json'
import { SiteLocale, sitePath, languageAlternates } from '@/lib/site-locales'
export type InfoSlug = keyof typeof pages.en
export const INFO_SLUGS = Object.keys(pages.en) as InfoSlug[]
export function infoMetadata(locale: SiteLocale, slug: InfoSlug): Metadata {
  const p = pages[locale][slug]
  return {
    title: p.title,
    description: p.description,
    alternates: {
      canonical: sitePath(locale, `/${slug}`),
      languages: languageAlternates(`/${slug}`),
    },
    openGraph: {
      title: p.title,
      description: p.description,
      url: sitePath(locale, `/${slug}`),
      type: 'website',
    },
  }
}
function Text({ text }: { text: string }) {
  return (
    <>
      {text.split(/([\w.+-]+@[\w.-]+\.[a-z]+)/gi).map((part, i) =>
        part.includes('@') ? (
          <a key={i} href={`mailto:${part}`} className="text-lav-500 underline">
            {part}
          </a>
        ) : (
          part
        )
      )}
    </>
  )
}
export default function InfoPage({ locale, slug }: { locale: SiteLocale; slug: InfoSlug }) {
  const p = pages[locale][slug]
  return (
    <article className="mx-auto max-w-[820px] px-5 py-20 md:px-8">
      <h1 className="t-h1 mb-10">{p.title}</h1>
      <div className="space-y-10">
        {p.sections.map(([title, body]) => (
          <section key={title}>
            <h2 className="t-h3 mb-4">{title}</h2>
            <p className="t-body-l">
              <Text text={body} />
            </p>
          </section>
        ))}
      </div>
    </article>
  )
}
