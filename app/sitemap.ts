import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { getAllPosts } from '@/lib/blog'
import { NATIVE_BLOG_LOCALES, blogPath } from '@/lib/blog-locales'

export const dynamic = 'force-static'

type Route = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}

const STATIC_ROUTES: Route[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: 'blog', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'about', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: 'support', priority: 0.6, changeFrequency: 'monthly' },
  { path: 'privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: 'terms', priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  // Static pages carry the date their copy last changed — bump this when it
  // does. They used to carry the build date, which re-dated every page on
  // every deploy; Google only trusts <lastmod> it can verify against the page.
  const STATIC_PAGES_UPDATED = '2026-09-06'

  const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: path ? `${siteUrl}/${path}` : siteUrl,
    lastModified: STATIC_PAGES_UPDATED,
    changeFrequency,
    priority,
  }))

  const postEntries = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.frontmatter.updated ?? post.frontmatter.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const localeEntries = NATIVE_BLOG_LOCALES.flatMap((locale) => {
    const posts = getAllPosts(locale)
    // Empty landing pages are usable but noindexed until native articles exist.
    if (!posts.length) return []
    const latest = posts
      .map((post) => post.frontmatter.updated ?? post.frontmatter.date)
      .sort()
      .at(-1)
    return [
      {
        url: `${siteUrl}${blogPath(locale)}`,
        lastModified: latest,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      ...posts.map((post) => ({
        url: `${siteUrl}${blogPath(locale, post.slug)}`,
        lastModified: post.frontmatter.updated ?? post.frontmatter.date,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ]
  })
  return [...staticEntries, ...postEntries, ...localeEntries]
}
