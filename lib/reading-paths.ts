import readingPaths from '@/data/readingPaths.json'
import type { Post } from './blog'
import type { BlogLocale } from './blog-locales'
import { topicFor, type Topic } from './topics'

export function postTopic(post: Post): Topic {
  return topicFor(
    `${post.slug} ${post.frontmatter.title} ${(post.frontmatter.keywords || []).join(' ')}`,
    post.frontmatter.topic
  )
}

export function guidePosts(posts: Post[], locale: BlogLocale, topic?: Topic): Post[] {
  const paths = readingPaths[locale as keyof typeof readingPaths]
  if (!paths) return []
  const slugs: string[] = paths[topic || 'featured']
  return slugs.flatMap((slug) => {
    const post = posts.find((p) => p.locale === locale && p.slug === slug)
    return post && (!topic || postTopic(post) === topic) ? [post] : []
  })
}

export function relatedPosts(post: Post, posts: Post[], limit = 3): Post[] {
  const topic = postTopic(post)
  const candidates = posts.filter(
    (p) => p.locale === post.locale && p.slug !== post.slug && postTopic(p) === topic
  )
  const guides = guidePosts(candidates, post.locale, topic)
  return [...guides, ...candidates.filter((p) => !guides.includes(p))].slice(0, limit)
}

export const guideHeading = {
  en: 'Start with these guides',
  fr: 'Des guides pour commencer',
  de: 'Hier kannst du anfangen',
  it: 'Guide da cui iniziare',
  tr: 'Başlangıç rehberleri',
}
