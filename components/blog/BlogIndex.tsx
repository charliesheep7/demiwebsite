import { Metadata } from 'next'
import Image from 'next/image'
import Link from '@/components/Link'
import { Em } from '@/components/Em'
import { Eyebrow } from '@/components/Eyebrow'
import { JsonLd } from '@/components/JsonLd'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import { getAllPosts } from '@/lib/blog'
import siteMetadata from '@/data/siteMetadata'
import { BlogLocale, blogCopy, blogPath, formatBlogDate } from '@/lib/blog-locales'
import { BlogLanguageNav } from './BlogLanguageNav'

export function blogIndexMetadata(locale: BlogLocale = 'en'): Metadata {
  const copy = blogCopy(locale)
  const url = blogPath(locale)
  return {
    title: copy.blog,
    description: copy.description,
    keywords: [],
    alternates: { canonical: url },
    robots: getAllPosts(locale).length
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: `${copy.blog} · Demi`,
      description: copy.description,
      url,
      type: 'website',
      locale: copy.ogLocale,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${copy.blog} · Demi`,
      description: copy.description,
    },
  }
}

export default function BlogIndex({ locale = 'en' }: { locale?: BlogLocale }) {
  const posts = getAllPosts(locale)
  const copy = blogCopy(locale)
  const base = blogPath(locale)

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteMetadata.siteUrl}${base}`,
    url: `${siteMetadata.siteUrl}${base}`,
    name: `${copy.blog} · Demi`,
    inLanguage: locale,
    description: copy.description,
    publisher: { '@id': `${siteMetadata.siteUrl}#organization` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.frontmatter.title,
      description: p.frontmatter.description,
      datePublished: p.frontmatter.date,
      dateModified: p.frontmatter.updated ?? p.frontmatter.date,
      url: `${siteMetadata.siteUrl}${blogPath(locale, p.slug)}`,
    })),
  }

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-24 md:px-8 md:py-32">
      <JsonLd data={listSchema} />
      <BreadcrumbSchema
        crumbs={[
          { name: copy.home, path: '' },
          { name: copy.blog, path: base },
        ]}
      />

      <div className="mb-12">
        <BlogLanguageNav locale={locale} />
      </div>
      <Eyebrow>{copy.journal}</Eyebrow>
      <h1 className="t-h1 mt-6 mb-6">
        {locale === 'en' ? (
          <>
            The <Em>manifestation</Em> journal.
          </>
        ) : (
          copy.title
        )}
      </h1>
      <p className="t-lead mb-20 max-w-[640px]">
        {locale === 'en' ? (
          <>
            Scripting, SP, vision boards, signs, and the daily practices that turn what you&rsquo;re
            calling in into what arrives.
          </>
        ) : (
          copy.description
        )}
      </p>

      {posts.length === 0 ? (
        <p className="t-body text-ink-dim">{copy.empty}</p>
      ) : (
        <ul className="border-line-soft divide-line-soft divide-y border-t border-b">
          {posts.map((post, index) => (
            <li key={post.slug} className="py-10">
              <Link
                href={blogPath(locale, post.slug)}
                className="group grid gap-6 md:grid-cols-[240px_1fr] md:gap-8"
              >
                {post.frontmatter.image ? (
                  <Image
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    width={1200}
                    height={630}
                    sizes="(min-width: 768px) 240px, calc(100vw - 40px)"
                    priority={index === 0}
                    className="border-line-soft aspect-[1200/630] w-full rounded-[var(--radius-md)] border object-cover"
                  />
                ) : (
                  <time dateTime={post.frontmatter.date} className="t-meta text-ink-dim">
                    {formatBlogDate(post.frontmatter.date, locale)}
                  </time>
                )}
                <div>
                  <time dateTime={post.frontmatter.date} className="t-meta text-ink-dim">
                    {formatBlogDate(post.frontmatter.date, locale)}
                  </time>
                  <h2 className="group-hover:text-lav-500 mt-2 font-serif text-[30px] leading-tight tracking-tight transition-colors md:text-[36px]">
                    {post.frontmatter.title}
                  </h2>
                  <p className="t-body mt-3 max-w-[680px]">{post.frontmatter.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="t-meta text-ink-dim">{post.readingTime}</span>
                    {post.frontmatter.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="border-line text-ink-2 font-ui rounded-full border px-2.5 py-0.5 text-[10px] tracking-[0.2em] uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
