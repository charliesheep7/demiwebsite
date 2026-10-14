import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from '@/components/Link'
import { Eyebrow } from '@/components/Eyebrow'
import { JsonLd } from '@/components/JsonLd'
import { ShareButtons } from '@/components/ShareButtons'
import { BlogCTA } from '@/components/BlogCTA'
import { getAllPosts, getPostBySlug, renderPost } from '@/lib/blog'
import siteMetadata from '@/data/siteMetadata'
import { topicFor, topicLabel } from '@/lib/topics'
import { siteCopy, sitePath } from '@/lib/site-locales'
import { BlogLocale, blogCopy, blogPath, formatBlogDate } from '@/lib/blog-locales'

export function blogArticleMetadata(slug: string, locale: BlogLocale = 'en'): Metadata {
  const post = getPostBySlug(slug, locale)
  if (!post) return { title: blogCopy(locale).notFound, robots: { index: false } }
  const { title, description, date, updated, image, keywords } = post.frontmatter
  const url = blogPath(locale, slug)
  return {
    title: post.frontmatter.seoTitle || title,
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

  const topic = topicFor(
    `${post.slug} ${post.frontmatter.title} ${(post.frontmatter.keywords || []).join(' ')}`,
    post.frontmatter.topic
  )
  const candidates = getAllPosts(locale).filter((p) => p.slug !== slug)
  const sameTopic = candidates.filter(
    (p) =>
      topicFor(
        `${p.slug} ${p.frontmatter.title} ${(p.frontmatter.keywords || []).join(' ')}`,
        p.frontmatter.topic
      ) === topic
  )
  const related = [...sameTopic, ...candidates.filter((p) => !sameTopic.includes(p))].slice(0, 3)
  const rendered = await renderPost(post)
  // Answer the reader's question before presenting the first app offer.
  const firstSection = rendered.html.search(/<h2\b/)
  const introHtml = firstSection > 0 ? rendered.html.slice(0, firstSection) : ''
  const bodyHtml = firstSection > 0 ? rendered.html.slice(firstSection) : rendered.html
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
      {
        '@type': 'ListItem',
        position: 1,
        name: copy.home,
        item: `${siteMetadata.siteUrl}${sitePath(locale)}`,
      },
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
    <article
      data-article-slug={slug}
      data-article-topic={topic}
      className="mx-auto max-w-[760px] px-5 py-24 md:px-8 md:py-32"
    >
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

      {introHtml && <div className="prose-demi" dangerouslySetInnerHTML={{ __html: introHtml }} />}
      <BlogCTA locale={locale} topic={topic} placement="article_intro" />

      <div className="prose-demi" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

      <BlogCTA locale={locale} topic={topic} />
      <section aria-label={siteCopy(locale).related} className="mt-10">
        <h2 className="t-h2 mb-6">{siteCopy(locale).related}</h2>
        <Link href={`${blogPath(locale)}/topics/${topic}`} className="text-lav-500 underline">
          {topicLabel(topic, locale)}
        </Link>
        <ul className="mt-6 space-y-4">
          {related.map((p) => (
            <li key={p.slug}>
              <Link
                href={blogPath(locale, p.slug)}
                className="hover:text-lav-500 font-serif text-2xl"
              >
                {p.frontmatter.title} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

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
