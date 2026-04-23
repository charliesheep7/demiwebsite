import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from '@/components/Link'
import { Em } from '@/components/Em'
import { Eyebrow } from '@/components/Eyebrow'
import { JsonLd } from '@/components/JsonLd'
import { getAllSlugs, getPostBySlug, renderPost } from '@/lib/blog'
import siteMetadata from '@/data/siteMetadata'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Not found' }
  const { title, description, date, updated, image, keywords } = post.frontmatter
  const url = `/blog/${slug}`
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · Demi`,
      description,
      type: 'article',
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const rendered = await renderPost(post)
  const url = `${siteMetadata.siteUrl}/blog/${slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
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

  return (
    <article className="mx-auto max-w-[760px] px-5 py-24 md:px-8 md:py-32">
      <JsonLd data={articleSchema} />

      <div className="mb-10">
        <Link
          href="/blog"
          className="text-ink-dim hover:text-lav-500 font-ui text-[11px] font-semibold tracking-[0.3em] uppercase transition-colors"
        >
          ← all essays
        </Link>
      </div>

      <Eyebrow>{post.frontmatter.tags?.[0] ?? 'the journal'}</Eyebrow>

      <h1 className="t-h1 mt-6 mb-8">{post.frontmatter.title}</h1>

      {post.frontmatter.image ? (
        <img
          src={post.frontmatter.image}
          alt={post.frontmatter.title}
          width={1200}
          height={630}
          className="border-line-soft mb-10 aspect-[1200/630] w-full rounded-[var(--radius-lg)] border object-cover"
        />
      ) : null}

      <p className="t-lead mb-10">{post.frontmatter.description}</p>

      <div className="border-line-soft text-ink-dim mb-14 flex flex-wrap items-center gap-4 border-t border-b py-4">
        <time dateTime={post.frontmatter.date} className="t-meta">
          {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <span aria-hidden="true">·</span>
        <span className="t-meta">{post.readingTime}</span>
        {post.frontmatter.updated && post.frontmatter.updated !== post.frontmatter.date ? (
          <>
            <span aria-hidden="true">·</span>
            <span className="t-meta">
              updated{' '}
              {new Date(post.frontmatter.updated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
              })}
            </span>
          </>
        ) : null}
      </div>

      <div className="prose-demi" dangerouslySetInnerHTML={{ __html: rendered.html }} />

      <div className="border-line-soft mt-20 border-t pt-10">
        <p className="t-body">
          Like this? <Em>Read more essays</Em> or{' '}
          <Link href="/" className="text-lav-500 decoration-lav-200 underline underline-offset-4">
            download Demi
          </Link>
          .
        </p>
      </div>
    </article>
  )
}
