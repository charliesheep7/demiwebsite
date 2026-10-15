'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { BlogLocale } from '@/lib/blog-locales'
import { CONSENT_EVENT, hasConsent, track } from './adapter'
export function WebsiteAnalytics({ locale }: { locale: BlogLocale }) {
  const pathname = usePathname()
  useEffect(() => {
    const article = document.querySelector<HTMLElement>('[data-article-slug]')
    const context = {
      locale,
      page_path: pathname,
      page_type: article ? 'article' : pathname.endsWith('/blog') ? 'blog_index' : 'page',
      article_slug: article?.dataset.articleSlug || '',
      topic: article?.dataset.articleTopic || 'general',
    }
    let viewed = false,
      engaged = false,
      elapsed = 0,
      last = Date.now()
    const seen = new WeakSet<Element>()
    const visible = new Set<Element>()
    const view = () => {
      if (!viewed && track(article ? 'demi_web_article_view' : 'demi_web_page_view', context))
        viewed = true
    }
    const impression = (element: Element) => {
      if (seen.has(element)) return
      const d = (element as HTMLElement).dataset
      if (
        track('demi_web_cta_impression', {
          ...context,
          placement: d.ctaPlacement || 'unknown',
          cta_variant: d.ctaVariant || 'general',
        })
      )
        seen.add(element)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            visible.add(entry.target)
            impression(entry.target)
          } else visible.delete(entry.target)
        }
      },
      { threshold: 0.5 }
    )
    document.querySelectorAll('[data-cta-placement]').forEach((el) => observer.observe(el))
    const consent = () => {
      last = Date.now()
      view()
      visible.forEach(impression)
    }
    const click = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest<HTMLAnchorElement>('a[href]')
      if (!a) return
      let url: URL
      try {
        url = new URL(a.href)
      } catch {
        return
      }
      const store =
        url.hostname === 'apps.apple.com'
          ? 'app_store'
          : url.hostname === 'play.google.com'
            ? 'google_play'
            : null
      if (!store) return
      const box = a.closest<HTMLElement>('[data-cta-placement]')
      track('demi_web_store_click', {
        ...context,
        store,
        platform: store === 'app_store' ? 'ios' : 'android',
        placement: box?.dataset.ctaPlacement || 'inline',
        cta_variant: box?.dataset.ctaVariant || context.topic,
        destination_host: url.hostname,
      })
    }
    const timer = window.setInterval(() => {
      const now = Date.now()
      if (hasConsent() && document.visibilityState === 'visible')
        elapsed += Math.min(now - last, 1500)
      last = now
      if (article && !engaged && elapsed >= 30000) {
        const scroll =
          (window.scrollY + window.innerHeight) / Math.max(document.documentElement.scrollHeight, 1)
        if (
          scroll >= 0.5 &&
          track('demi_web_article_engaged', { ...context, engagement_seconds: 30 })
        )
          engaged = true
      }
    }, 1000)
    view()
    window.addEventListener(CONSENT_EVENT, consent)
    document.addEventListener('click', click)
    return () => {
      observer.disconnect()
      window.clearInterval(timer)
      window.removeEventListener(CONSENT_EVENT, consent)
      document.removeEventListener('click', click)
    }
  }, [locale, pathname])
  return null
}
