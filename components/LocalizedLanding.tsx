import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { BlogLocale, blogPath } from '@/lib/blog-locales'
import { siteCopy, sitePath, languageAlternates } from '@/lib/site-locales'
import { getAllPosts } from '@/lib/blog'
import { AppStoreButton } from './AppStoreButton'
import { PlayStoreButton } from './PlayStoreButton'
import { JsonLd } from './JsonLd'
import siteMetadata from '@/data/siteMetadata'
import { APP_ID, WEBSITE_ID } from '@/lib/brand'
import BrandDetails from './BrandDetails'
export function landingMetadata(locale: BlogLocale): Metadata {
  const c = siteCopy(locale),
    path = sitePath(locale)
  return {
    title: { absolute: c.title },
    description: c.description,
    alternates: { canonical: path, languages: languageAlternates() },
    openGraph: {
      title: c.title,
      description: c.description,
      url: path,
      type: 'website',
      siteName: 'Demi',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.title,
      description: c.description,
      images: ['/opengraph-image'],
    },
  }
}
export default function LocalizedLanding({ locale }: { locale: BlogLocale }) {
  const c = siteCopy(locale),
    allPosts = getAllPosts(locale)
  const featured: Partial<Record<BlogLocale, string[]>> = {
    en: ['manifesting-a-specific-person', 'how-to-manifest-love', 'manifestation-journal-prompts'],
    fr: [
      'manifester-une-personne',
      'affirmations-confiance-en-soi',
      'scripting-manifestation-exemples',
    ],
    de: ['bestimmte-person-manifestieren', 'affirmationen-selbstliebe', '369-methode'],
    it: ['come-manifestare-una-persona', 'affermazioni-positive', 'metodo-369'],
  }
  const selected = (featured[locale] || []).flatMap((slug) =>
    allPosts.filter((post) => post.slug === slug)
  )
  const posts = [...selected, ...allPosts.filter((post) => !selected.includes(post))].slice(0, 3)
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${siteMetadata.siteUrl}${sitePath(locale)}#webpage`,
          url: `${siteMetadata.siteUrl}${sitePath(locale)}`,
          name: c.title,
          description: c.description,
          inLanguage: locale,
          isPartOf: { '@id': WEBSITE_ID },
          mainEntity: { '@id': APP_ID },
        }}
      />
      <section className="relative mx-auto max-w-[1280px] px-5 pt-24 pb-20 md:px-8 md:pt-32">
        <p className="t-eyebrow text-lav-500 mb-8">{c.eyebrow}</p>
        <h1 className="max-w-[1050px] font-serif text-[clamp(48px,7.5vw,104px)] leading-[1.05] tracking-tight">
          {c.hero}
          <br />
          <em className="text-lav-500">{c.heroAccent}</em>
        </h1>
        <p className="t-lead mt-8 max-w-[720px]">{c.intro}</p>
        <div
          id="download"
          className="mt-10 flex scroll-mt-32 flex-wrap gap-4"
          data-cta-placement="hero"
        >
          <AppStoreButton label={c.download} kicker={c.downloadOn} />
          <PlayStoreButton label={c.download} kicker={c.downloadOn} />
        </div>
        <p className="t-meta mt-5">{c.platforms}</p>
        <Image
          src="/images/manifestation-journal.jpg"
          alt={c.heroImageAlt}
          width={1200}
          height={630}
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="mt-14 aspect-[1200/500] w-full rounded-3xl object-cover"
        />
      </section>
      <BrandDetails locale={locale} />
      <section id="rituals" className="bg-cream-2 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="t-h1 mb-12">{c.featuresTitle}</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {c.features.map(([title, body], i) => (
              <div key={title}>
                <span className="text-lav-500 font-serif text-3xl">0{i + 1}</span>
                <h3 className="t-h3 mt-4 mb-3">{title}</h3>
                <p className="t-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-5 py-20 md:px-8">
        <h2 className="t-h1 mb-12">{c.stepsTitle}</h2>
        <ol className="grid gap-10 md:grid-cols-3">
          {c.steps.map(([title, body], i) => (
            <li key={title}>
              <p className="t-meta text-lav-500">{i + 1}</p>
              <h3 className="t-h3 my-4">{title}</h3>
              <p className="t-body">{body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="mx-auto max-w-[1100px] px-5 py-14 md:px-8">
        <h2 className="t-h2">{c.readTitle}</h2>
        <p className="t-body my-6">{c.readBody}</p>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={blogPath(locale, post.slug)}
              className="border-line-soft hover:border-lav-500 rounded-2xl border p-6"
            >
              <h3 className="t-h3">{post.frontmatter.title}</h3>
              <p className="t-body-s mt-4">{post.frontmatter.description}</p>
            </Link>
          ))}
        </div>
        <Link
          href={blogPath(locale)}
          className="text-lav-500 mt-8 inline-block underline underline-offset-4"
        >
          {c.allPosts} →
        </Link>
      </section>
      <section className="mx-auto max-w-[820px] px-5 py-20 md:px-8">
        <h2 className="t-h1 mb-10">{c.faqTitle}</h2>
        {c.faqs.map(([q, a]) => (
          <details key={q} className="border-line-soft border-b py-5">
            <summary className="cursor-pointer font-serif text-2xl">{q}</summary>
            <p className="t-body mt-4">{a}</p>
          </details>
        ))}
        <div className="mt-10 flex flex-wrap gap-4" data-cta-placement="final">
          <AppStoreButton label={c.download} kicker={c.downloadOn} />
          <PlayStoreButton label={c.download} kicker={c.downloadOn} />
        </div>
      </section>
    </>
  )
}
