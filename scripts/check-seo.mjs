import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import assert from 'node:assert/strict'
const locales = ['en', 'de', 'fr', 'it'],
  posts = [],
  failures = [],
  warnings = []
const topics = ['love', 'affirmations', 'methods', 'money-career', 'signs']
for (const locale of locales) {
  const dir = `content/blog${locale === 'en' ? '' : `/${locale}`}`
  for (const name of fs.readdirSync(dir).filter((n) => /\.mdx?$/.test(n))) {
    const file = path.join(dir, name),
      { data, content } = matter(fs.readFileSync(file, 'utf8'))
    if (data.draft) continue
    const slug = name.replace(/\.mdx?$/, ''),
      url = `${locale === 'en' ? '' : `/${locale}`}/blog/${slug}`
    posts.push({ file, data, content, url, locale })
    for (const field of ['title', 'description', 'date', 'image'])
      if (!data[field]) failures.push(`${file}: missing ${field}`)
    if (data.image && !fs.existsSync(`public${data.image}`))
      failures.push(`${file}: missing image ${data.image}`)
    if (data.topic && !topics.includes(data.topic)) failures.push(`${file}: invalid topic`)
    if (/^# /m.test(content)) failures.push(`${file}: body H1 duplicates layout title`)
    if (data.updated && data.updated < data.date)
      failures.push(`${file}: updated before publication`)
    if (locale !== 'en' && !data.topic) failures.push(`${file}: native page needs explicit topic`)
    if (/\s[|·–—-]\s*Demi\s*$/i.test(data.seoTitle || ''))
      failures.push(`${file}: seoTitle must not repeat the layout's Demi suffix`)
    if (data.description?.length > 180)
      warnings.push(`${file}: long description (${data.description.length})`)
  }
}
const urls = new Set(posts.map((p) => p.url))
for (const locale of locales)
  for (const suffix of ['', '/blog', '/about', '/contact', '/privacy', '/terms', '/support'])
    urls.add(`${locale === 'en' ? '' : `/${locale}`}${suffix}` || '/')
for (const post of posts) {
  for (const m of post.content.matchAll(/\]\((\/(?!\/)[^\s)#]+)(?:#[^\s)]*)?\)/g)) {
    const target = decodeURI(m[1]).replace(/\/$/, '') || '/'
    if (!urls.has(target) && !fs.existsSync(`public${target}`))
      failures.push(`${post.file}: broken internal link ${target}`)
  }
}
const readingPaths = JSON.parse(fs.readFileSync('data/readingPaths.json'))
for (const [locale, groups] of Object.entries(readingPaths)) {
  for (const [group, slugs] of Object.entries(groups)) {
    if (new Set(slugs).size !== slugs.length) failures.push(`${locale}/${group}: duplicate guide`)
    for (const slug of slugs) {
      const url = `${locale === 'en' ? '' : `/${locale}`}/blog/${slug}`
      if (!urls.has(url)) failures.push(`${locale}/${group}: missing guide ${url}`)
    }
  }
}
const site = JSON.parse(fs.readFileSync('data/siteLocales.json')),
  info = JSON.parse(fs.readFileSync('data/infoPages.json')),
  ctas = JSON.parse(fs.readFileSync('data/ctaCopy.json'))
for (const locale of locales) {
  assert.deepEqual(
    Object.keys(site[locale]).sort(),
    Object.keys(site.en).sort(),
    `${locale} site dictionary incomplete`
  )
  assert.deepEqual(
    Object.keys(info[locale]).sort(),
    Object.keys(info.en).sort(),
    `${locale} info pages incomplete`
  )
  assert.deepEqual(
    Object.keys(ctas[locale]).sort(),
    topics.sort(),
    `${locale} CTA topics incomplete`
  )
}
if (new Set(posts.map((p) => p.url)).size !== posts.length)
  failures.push('Duplicate canonical paths')
console.log(
  `Checked ${posts.length} articles, all four site dictionaries, native topic coverage, local images and Markdown internal links.`
)
if (warnings.length)
  console.log(`${warnings.length} existing long descriptions noted; no automatic rewriting.`)
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('SEO source checks passed.')
