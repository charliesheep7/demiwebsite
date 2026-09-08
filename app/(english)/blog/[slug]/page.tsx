import BlogArticle, { blogArticleMetadata } from '@/components/blog/BlogArticle'
import { getAllPosts } from '@/lib/blog'
export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return blogArticleMetadata(slug)
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <BlogArticle slug={slug} />
}
