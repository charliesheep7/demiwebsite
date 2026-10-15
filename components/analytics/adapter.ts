'use client'
export const CONSENT_KEY = 'demi_analytics_consent_v1'
const ID_KEY = 'demi_web_anonymous_id_v1'
export const CONSENT_EVENT = 'demi-analytics-consent'
export function hasConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'granted'
  } catch {
    return false
  }
}
export function setConsent(granted: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied')
    if (!granted) localStorage.removeItem(ID_KEY)
  } catch {
    /* Storage restrictions must not block the site. */
  }
  window.dispatchEvent(new Event(CONSENT_EVENT))
}
export function isAnalyticsConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN)
}
export function track(event: string, properties: Record<string, string | number | boolean>) {
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
  const production = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
  if (
    !token ||
    (!production && process.env.NEXT_PUBLIC_MIXPANEL_ALLOW_NON_PRODUCTION !== 'true') ||
    !hasConsent()
  )
    return false
  try {
    let id = localStorage.getItem(ID_KEY)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(ID_KEY, id)
    }
    const payload = [
      {
        event,
        properties: {
          ...properties,
          token,
          distinct_id: `demi_web_${id}`,
          $insert_id: crypto.randomUUID(),
          time: Math.floor(Date.now() / 1000),
          source: 'demimanifest_website',
          schema_version: 1,
          analytics_env: production ? 'production' : 'test',
          release_sha: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'local',
        },
      },
    ]
    // keepalive lets store navigation continue immediately. No automatic page capture,
    // identity profiles, IP geolocation, query strings, or personal intentions.
    void fetch('https://api-eu.mixpanel.com/track?ip=0', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
    return true
  } catch {
    return false
  }
}
