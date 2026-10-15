import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { getAllPosts } from '@/lib/blog'
import { BLOG_LOCALES, blogPath } from '@/lib/blog-locales'
import { SITE_LOCALES, sitePath, languageAlternates } from '@/lib/site-locales'
import { TOPICS } from '@/lib/topics'
import { filteredPosts, indexPath, PAGE_SIZE } from '@/components/blog/BlogIndex'
export const dynamic = 'force-static'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteMetadata.siteUrl
  const result: MetadataRoute.Sitemap = []
  for (const locale of SITE_LOCALES)
    for (const path of ['', '/about', '/contact', '/support', '/privacy', '/terms'])
      result.push({
        url: base + sitePath(locale, path),
        lastModified: '2026-10-15',
        alternates: {
          languages: Object.fromEntries(
            Object.entries(languageAlternates(path)).map(([k, v]) => [k, base + v])
          ),
        },
      })
  for (const locale of BLOG_LOCALES) {
    const posts = getAllPosts(locale)
    if (!posts.length) continue
    const latest = posts
      .map((p) => p.frontmatter.updated || p.frontmatter.date)
      .sort()
      .at(-1)
    for (let p = 1; p <= Math.ceil(posts.length / PAGE_SIZE); p++)
      result.push({ url: base + indexPath(locale, p), lastModified: latest })
    for (const topic of TOPICS) {
      const count = filteredPosts(locale, topic).length
      for (let p = 1; p <= Math.ceil(count / PAGE_SIZE); p++)
        result.push({ url: base + indexPath(locale, p, topic), lastModified: latest })
    }
    for (const post of posts)
      result.push({
        url: base + blogPath(locale, post.slug),
        lastModified: post.frontmatter.updated || post.frontmatter.date,
      })
  }
  return result
}
