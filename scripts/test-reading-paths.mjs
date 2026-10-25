import fs from 'node:fs'
import vm from 'node:vm'
import assert from 'node:assert/strict'
import ts from 'typescript'
import matter from 'gray-matter'
const paths = JSON.parse(fs.readFileSync('data/readingPaths.json', 'utf8'))
function load(file, dependencies = {}) {
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText
  const context = {
    exports: {},
    require: (name) => {
      assert.ok(name in dependencies, `Unexpected dependency ${name}`)
      return dependencies[name]
    },
  }
  vm.runInNewContext(source, context)
  return context.exports
}
const topics = load('lib/topics.ts')
assert.equal(topics.topicFor('meditation-for-personal-growth'), 'methods')
assert.equal(topics.topicFor('come-manifestare-una-persona'), 'love')
assert.equal(topics.topicFor('self-concept-and-self-esteem'), 'affirmations')
assert.equal(topics.topicFor('love letter method', 'methods'), 'methods')
const { guidePosts, relatedPosts, postTopic } = load('lib/reading-paths.ts', {
  '@/data/readingPaths.json': paths,
  './topics': topics,
})
const all = []
for (const locale of Object.keys(paths)) {
  const dir = `content/blog${locale === 'en' ? '' : `/${locale}`}`
  for (const name of fs.readdirSync(dir).filter((n) => /\.mdx?$/.test(n))) {
    const { data, content } = matter(fs.readFileSync(`${dir}/${name}`, 'utf8'))
    if (!data.draft)
      all.push({ locale, slug: name.replace(/\.mdx?$/, ''), frontmatter: data, content })
  }
}
for (const [locale, groups] of Object.entries(paths)) {
  for (const [group, slugs] of Object.entries(groups)) {
    const guides = guidePosts(all, locale, group === 'featured' ? undefined : group)
    assert.equal(guides.length, slugs.length, `${locale}/${group}: guides hidden by wrong topic`)
    assert.equal(guides.map((p) => p.slug).join(','), slugs.join(','))
  }
}
for (const post of all) {
  const related = relatedPosts(post, all)
  assert.ok(related.length <= 3)
  assert.equal(new Set(related.map((p) => p.slug)).size, related.length)
  for (const candidate of related) {
    assert.notEqual(candidate.slug, post.slug)
    assert.equal(candidate.locale, post.locale)
    assert.equal(postTopic(candidate), postTopic(post))
  }
}
assert.equal(guidePosts(all, 'tr').length, 0)
assert.equal(guidePosts([], 'fr').length, 0)
console.log(
  `Reading paths passed: all guides resolve to the intended topic; ${all.length} articles keep related links in their language and topic.`
)
