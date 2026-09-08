import BlogIndex, { blogIndexMetadata } from '@/components/blog/BlogIndex'
export const metadata = blogIndexMetadata()
export default function Page() {
  return <BlogIndex />
}
