import assert from 'node:assert/strict'
import fs from 'node:fs'
import matter from 'gray-matter'

const base = process.argv[2] || 'http://localhost:3217'
const siteUrl = fs.readFileSync('data/siteMetadata.js', 'utf8').match(/siteUrl:\s*['"]([^'"]+)/)[1]
const fixtures = process.argv.includes('--fixtures')
const messages = JSON.parse(fs.readFileSync('data/blogLocales.json', 'utf8'))
const slugs = {
  de: 'Deutscher Routentest',
  fr: 'Test des routes françaises',
  tr: 'Türkçe rota testi',
  it: 'Test delle pagine italiane',
}
async function page(path, status = 200) {
  const response = await fetch(new URL(path, base), { redirect: 'manual' })
  assert.equal(response.status, status, path)
  return response.text()
}
function canonical(html, path) {
  assert.equal(html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1], `${siteUrl}${path}`)
}
const sitemap = await page('/sitemap.xml')
for (const [locale, title] of Object.entries(slugs)) {
  const path = `/${locale}/blog`
  const html = await page(path)
  assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`))
  canonical(html, path)
  assert.ok(html.includes(messages[locale].title), `${locale} heading`)
  assert.ok(html.includes(`content="${messages[locale].ogLocale}"`), `${locale} Open Graph locale`)
  if (fixtures) {
    assert.ok(html.includes(title))
    const articlePath = `${path}/locale-route-smoke-test`
    const article = await page(articlePath)
    canonical(article, articlePath)
    assert.match(article, new RegExp(`<html[^>]*lang="${locale}"`))
    assert.ok(article.includes(`"inLanguage":"${locale}"`))
    assert.ok(article.includes(`locale-route-smoke-${locale}`))
    assert.ok(article.includes(messages[locale].minutes))
    for (const other of Object.keys(slugs).filter((value) => value !== locale)) {
      assert.ok(
        !article.includes(`locale-route-smoke-${other}`),
        `${locale} leaked ${other} content`
      )
    }
    assert.ok(sitemap.includes(`${siteUrl}${articlePath}`))
  } else if (
    !fs
      .readdirSync(`content/blog/${locale}`)
      .some(
        (name) =>
          /\.mdx?$/.test(name) &&
          !matter(fs.readFileSync(`content/blog/${locale}/${name}`, 'utf8')).data.draft
      )
  ) {
    assert.ok(html.includes(messages[locale].empty))
    assert.match(html, /name="robots" content="noindex, follow"/)
    assert.ok(!sitemap.includes(`${siteUrl}${path}`))
  }
  await page(`${path}/manifesting-a-specific-person`, 404)
  await page(`${path}/missing-article`, 404)
}
await page('/tr/blog/locale-draft-smoke-test', 404)
assert.ok(!sitemap.includes('locale-draft-smoke-test'))
await page('/blog/locale-route-smoke-test', 404)
await page('/es/blog', 404)
await page('/en/blog', 404)
await page('/missing/deep/path', 404)
const english = await page('/blog')
canonical(english, '/blog')
assert.match(english, /<html[^>]*lang="en"/)
assert.ok(!english.includes('Deutscher Routentest'))
await page('/blog/manifesting-a-specific-person')
await page('/')
await page('/about')
console.log(
  `PASS: four native indexes, ${fixtures ? 'four native fixture articles' : 'empty-state noindex'}, canonicals, languages, sitemap, draft/missing/unsupported 404s, English routes and locale isolation.`
)
