import { getAllPosts } from '@/lib/blog'
import siteMetadata from '@/data/siteMetadata'
export const dynamic = 'force-static'
const xml = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!
  )
export function GET() {
  const items = getAllPosts()
    .slice(0, 30)
    .map(
      (p) =>
        `<item><title>${xml(p.frontmatter.title)}</title><link>${siteMetadata.siteUrl}/blog/${p.slug}</link><guid>${siteMetadata.siteUrl}/blog/${p.slug}</guid><description>${xml(p.frontmatter.description)}</description><pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate></item>`
    )
    .join('')
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Demi Journal</title><link>${siteMetadata.siteUrl}/blog</link><description>SP, love, affirmations and manifestation practices.</description><language>en</language>${items}</channel></rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } }
  )
}
