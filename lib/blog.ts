import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { BlogLocale, blogCopy, isBlogLocale } from './blog-locales'

export type PostFrontmatter = {
  title: string
  description: string
  date: string
  updated?: string
  author?: string
  tags?: string[]
  keywords?: string[]
  image?: string
  draft?: boolean
}

export type Post = {
  slug: string
  locale: BlogLocale
  frontmatter: PostFrontmatter
  content: string
  readingTime: string
}

export type RenderedPost = Post & { html: string }

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

function contentDir(locale: BlogLocale) {
  if (!isBlogLocale(locale)) throw new Error(`Unsupported blog locale: ${locale}`)
  return locale === 'en' ? CONTENT_DIR : path.join(CONTENT_DIR, locale)
}

export function getAllSlugs(locale: BlogLocale = 'en'): string[] {
  const directory = contentDir(locale)
  if (!fs.existsSync(directory)) return []
  return fs
    .readdirSync(directory)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''))
}

export function getPostBySlug(slug: string, locale: BlogLocale = 'en'): Post | null {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(slug)) return null
  const directory = contentDir(locale)
  const mdxPath = path.join(directory, `${slug}.mdx`)
  const mdPath = path.join(directory, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as PostFrontmatter
  if (fm.draft && process.env.NODE_ENV === 'production') return null

  return {
    slug,
    locale,
    frontmatter: fm,
    content,
    readingTime:
      locale === 'en'
        ? readingTime(content).text
        : `${Math.max(1, Math.ceil(readingTime(content).minutes))} ${blogCopy(locale).minutes}`,
  }
}

export function getAllPosts(locale: BlogLocale = 'en'): Post[] {
  return getAllSlugs(locale)
    .map((slug) => getPostBySlug(slug, locale))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
}

export async function renderPost(post: Post): Promise<RenderedPost> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(post.content)

  return { ...post, html: String(file) }
}
