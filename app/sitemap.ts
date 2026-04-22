import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { getAllPosts } from '@/lib/blog'

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
  { path: 'privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: 'terms', priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const today = new Date().toISOString().split('T')[0]

  const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: path ? `${siteUrl}/${path}` : siteUrl,
    lastModified: today,
    changeFrequency,
    priority,
  }))

  const postEntries = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.frontmatter.updated ?? post.frontmatter.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...postEntries]
}
