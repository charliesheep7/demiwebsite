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
  frontmatter: PostFrontmatter
  content: string
  readingTime: string
}

export type RenderedPost = Post & { html: string }

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

function ensureDir() {
  if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true })
}

export function getAllSlugs(): string[] {
  ensureDir()
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''))
}

export function getPostBySlug(slug: string): Post | null {
  ensureDir()
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`)
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as PostFrontmatter
  if (fm.draft && process.env.NODE_ENV === 'production') return null

  return {
    slug,
    frontmatter: fm,
    content,
    readingTime: readingTime(content).text,
  }
}

export function getAllPosts(): Post[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
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
