import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from '@/components/Link'
import { Eyebrow } from '@/components/Eyebrow'
import { JsonLd } from '@/components/JsonLd'
import { ShareButtons } from '@/components/ShareButtons'
import { BlogCTA } from '@/components/BlogCTA'
import { getPostBySlug, renderPost } from '@/lib/blog'
import siteMetadata from '@/data/siteMetadata'
import { BlogLocale, blogCopy, blogPath, formatBlogDate } from '@/lib/blog-locales'

export function blogArticleMetadata(slug: string, locale: BlogLocale = 'en'): Metadata {
  const post = getPostBySlug(slug, locale)
  if (!post) return { title: blogCopy(locale).notFound, robots: { index: false } }
  const { title, description, date, updated, image, keywords } = post.frontmatter
  const url = blogPath(locale, slug)
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · Demi`,
      description,
      type: 'article',
      locale: blogCopy(locale).ogLocale,
      url,
      publishedTime: date,
      modifiedTime: updated ?? date,
      authors: ['Demi'],
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function BlogArticle({
  slug,
  locale = 'en',
}: {
  slug: string
  locale?: BlogLocale
}) {
  const post = getPostBySlug(slug, locale)
  const copy = blogCopy(locale)
  if (!post) notFound()

  const rendered = await renderPost(post)
  const url = `${siteMetadata.siteUrl}${blogPath(locale, slug)}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    inLanguage: locale,
    '@id': url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updated ?? post.frontmatter.date,
    author: { '@type': 'Organization', name: 'Demi', url: siteMetadata.siteUrl },
    publisher: { '@id': `${siteMetadata.siteUrl}#organization` },
    image: post.frontmatter.image
      ? [`${siteMetadata.siteUrl}${post.frontmatter.image}`]
      : undefined,
    keywords: post.frontmatter.keywords?.join(', '),
    url,
  }

  // Breadcrumbs are one of the few structured-data types that still earn a
  // visible search result. The homepage had one; posts did not.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: copy.home, item: siteMetadata.siteUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: copy.blog,
        item: `${siteMetadata.siteUrl}${blogPath(locale)}`,
      },
      { '@type': 'ListItem', position: 3, name: post.frontmatter.title, item: url },
    ],
  }

  return (
    <article className="mx-auto max-w-[760px] px-5 py-24 md:px-8 md:py-32">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="mb-10">
        <Link
          href={blogPath(locale)}
          className="text-ink-dim hover:text-lav-500 font-ui text-[11px] font-semibold tracking-[0.3em] uppercase transition-colors"
        >
          ← {copy.back}
        </Link>
      </div>

      <Eyebrow>{post.frontmatter.tags?.[0] ?? copy.journal}</Eyebrow>

      <h1 className="t-h1 mt-6 mb-8">{post.frontmatter.title}</h1>

      {post.frontmatter.image ? (
        <Image
          src={post.frontmatter.image}
          alt={post.frontmatter.title}
          width={1200}
          height={630}
          sizes="(min-width: 808px) 760px, calc(100vw - 40px)"
          priority
          className="border-line-soft mb-10 aspect-[1200/630] w-full rounded-[var(--radius-lg)] border object-cover"
        />
      ) : null}

      <p className="t-lead mb-10">{post.frontmatter.description}</p>

      <div className="mb-10">
        <ShareButtons url={url} title={post.frontmatter.title} labels={copy} />
      </div>

      <div className="border-line-soft text-ink-dim mb-14 flex flex-wrap items-center gap-4 border-t border-b py-4">
        <time dateTime={post.frontmatter.date} className="t-meta">
          {formatBlogDate(post.frontmatter.date, locale)}
        </time>
        <span aria-hidden="true">·</span>
        <span className="t-meta">{post.readingTime}</span>
        {post.frontmatter.updated && post.frontmatter.updated !== post.frontmatter.date ? (
          <>
            <span aria-hidden="true">·</span>
            <span className="t-meta">
              {copy.updated} {formatBlogDate(post.frontmatter.updated, locale, false)}
            </span>
          </>
        ) : null}
      </div>

      <div className="prose-demi" dangerouslySetInnerHTML={{ __html: rendered.html }} />

      <BlogCTA locale={locale} />

      <div className="border-line-soft mt-12 border-t pt-8">
        <p className="t-body-s text-ink-dim">
          <Link
            href={blogPath(locale)}
            className="text-lav-500 decoration-lav-200 underline underline-offset-4"
          >
            {copy.more}
          </Link>
        </p>
      </div>
    </article>
  )
}
