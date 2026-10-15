import fs from 'node:fs'
import vm from 'node:vm'
import assert from 'node:assert/strict'
import ts from 'typescript'
import { webcrypto } from 'node:crypto'
const source = ts.transpileModule(fs.readFileSync('components/analytics/adapter.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText
const data = new Map(),
  requests = [],
  events = []
const env = { NEXT_PUBLIC_MIXPANEL_TOKEN: 'test-token', NEXT_PUBLIC_VERCEL_ENV: 'production' }
const context = {
  exports: {},
  process: { env },
  localStorage: {
    getItem: (k) => data.get(k) || null,
    setItem: (k, v) => data.set(k, v),
    removeItem: (k) => data.delete(k),
  },
  window: { dispatchEvent: (e) => events.push(e.type) },
  Event,
  crypto: webcrypto,
  fetch: (url, options) => {
    requests.push({ url, ...options })
    return Promise.resolve({ ok: true })
  },
}
vm.runInNewContext(source, context)
const { track, setConsent, hasConsent } = context.exports
assert.equal(track('demi_web_store_click', { store: 'app_store' }), false)
assert.equal(requests.length, 0)
assert.equal(data.size, 0)
setConsent(false)
assert.equal(hasConsent(), false)
assert.equal(track('demi_web_store_click', {}), false)
setConsent(true)
assert.equal(track('demi_web_store_click', { store: 'app_store', locale: 'fr' }), true)
assert.equal(requests.length, 1)
assert.equal(requests[0].url, 'https://api-eu.mixpanel.com/track?ip=0')
assert.equal(requests[0].keepalive, true)
const payload = JSON.parse(requests[0].body)[0]
assert.equal(payload.event, 'demi_web_store_click')
assert.equal(payload.properties.locale, 'fr')
assert.equal(payload.properties.source, 'demimanifest_website')
assert.equal(payload.properties.analytics_env, 'production')
assert.match(payload.properties.distinct_id, /^demi_web_/)
assert.equal(payload.properties.$current_url, undefined)
assert.equal(payload.properties.email, undefined)
setConsent(false)
assert.equal(data.has('demi_web_anonymous_id_v1'), false)
assert.equal(track('demi_web_page_view', {}), false)
setConsent(true)
env.NEXT_PUBLIC_VERCEL_ENV = 'preview'
assert.equal(track('demi_web_page_view', {}), false)
env.NEXT_PUBLIC_MIXPANEL_ALLOW_NON_PRODUCTION = 'true'
assert.equal(track('demi_web_page_view', {}), true)
assert.equal(JSON.parse(requests[1].body)[0].properties.analytics_env, 'test')
env.NEXT_PUBLIC_MIXPANEL_TOKEN = ''
assert.equal(track('demi_web_page_view', {}), false)
context.localStorage.getItem = () => {
  throw new Error('Storage blocked')
}
assert.equal(track('demi_web_page_view', {}), false)
console.log(
  'Analytics checks passed: consent, withdrawal, EU destination, navigation delivery, anonymous schema, preview exclusion, missing configuration and storage restrictions.'
)
