import { AppStoreButton } from './AppStoreButton'
import { PlayStoreButton } from './PlayStoreButton'
import { BlogLocale, blogCopy } from '@/lib/blog-locales'
import { Topic } from '@/lib/topics'
import { siteCopy, isSiteLocale } from '@/lib/site-locales'
import ctaCopy from '@/data/ctaCopy.json'
export function BlogCTA({
  locale = 'en',
  topic = 'methods',
  placement = 'article_end',
}: {
  locale?: BlogLocale
  topic?: Topic
  placement?: string
}) {
  const copy = siteCopy(locale),
    [title, body] = isSiteLocale(locale)
      ? ctaCopy[locale][topic]
      : [blogCopy(locale).ctaTitle, blogCopy(locale).ctaBody]
  return (
    <aside
      aria-label={copy.download}
      data-cta-placement={placement}
      data-cta-variant={topic}
      className="not-prose border-lav-200 from-lav-100 via-cream-2 to-yel-50 relative my-12 overflow-hidden rounded-3xl border bg-gradient-to-br px-6 py-9 md:px-10"
    >
      <p className="t-eyebrow text-lav-500 mb-4">Demi</p>
      <h2 className="t-h2 mb-4">{title}</h2>
      <p className="t-body mb-6 max-w-[580px]">{body}</p>
      <div className="flex flex-wrap gap-3">
        <AppStoreButton size="md" label={copy.download} kicker={copy.downloadOn} />
        <PlayStoreButton size="md" label={copy.download} kicker={copy.downloadOn} />
      </div>
      <p className="t-meta mt-4">{copy.platforms}</p>
    </aside>
  )
}
