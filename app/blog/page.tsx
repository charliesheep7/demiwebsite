import { Metadata } from 'next'
import Link from '@/components/Link'
import { Em } from '@/components/Em'
import { Eyebrow } from '@/components/Eyebrow'
import { JsonLd } from '@/components/JsonLd'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import { getAllPosts } from '@/lib/blog'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Essays on half-belief, daily ritual, and the ordinary Tuesdays where manifestation actually happens.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog · Demi',
    description:
      'Essays on half-belief, daily ritual, and the ordinary Tuesdays where manifestation actually happens.',
    url: '/blog',
    type: 'website',
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteMetadata.siteUrl}/blog`,
    url: `${siteMetadata.siteUrl}/blog`,
    name: 'Demi blog',
    description: 'Essays on half-belief, daily ritual, and ordinary Tuesdays.',
    publisher: { '@id': `${siteMetadata.siteUrl}#organization` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.frontmatter.title,
      description: p.frontmatter.description,
      datePublished: p.frontmatter.date,
      dateModified: p.frontmatter.updated ?? p.frontmatter.date,
      url: `${siteMetadata.siteUrl}/blog/${p.slug}`,
    })),
  }

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-24 md:px-8 md:py-32">
      <JsonLd data={listSchema} />
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', path: '' },
          { name: 'Blog', path: '/blog' },
        ]}
      />

      <Eyebrow>the journal</Eyebrow>
      <h1 className="t-h1 mt-6 mb-6">
        Essays on <Em>ordinary Tuesdays.</Em>
      </h1>
      <p className="t-lead mb-20 max-w-[640px]">
        Notes on half-belief, daily ritual, and how the life you&rsquo;re after quietly finds you
        when you keep showing up.
      </p>

      {posts.length === 0 ? (
        <p className="t-body text-ink-dim">No posts yet. Something is on its way.</p>
      ) : (
        <ul className="border-line-soft divide-line-soft divide-y border-t border-b">
          {posts.map((post) => (
            <li key={post.slug} className="py-10">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-6 md:grid-cols-[160px_1fr]"
              >
                <time dateTime={post.frontmatter.date} className="t-meta text-ink-dim">
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <div>
                  <h2 className="group-hover:text-lav-500 font-serif text-[30px] leading-tight tracking-tight transition-colors md:text-[36px]">
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
