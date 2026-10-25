import type { BlogLocale } from './blog-locales'
export const TOPICS = ['love', 'affirmations', 'methods', 'money-career', 'signs'] as const
export type Topic = (typeof TOPICS)[number]
export function topicFor(text: string, explicit?: Topic): Topic {
  if (explicit && TOPICS.includes(explicit)) return explicit
  const t = text.toLowerCase()
  if (/angel.number|numerolog|synchronic|lucky.number|zeichen|heures.miroirs/.test(t))
    return 'signs'
  if (
    /money|career|job|wealth|raise|business|geld|beruf|argent|travail|soldi|lavoro|denaro/.test(t)
  )
    return 'money-career'
  if (
    /specific.person|\bsp\b|love|soulmate|relationship|ex.back|someone|liebe|person.manifest|amour|personne|amore|\bpersona\b/.test(
      t
    )
  )
    return 'love'
  if (/affirm|self.concept|confidence|selbstliebe|confiance|autostima/.test(t))
    return 'affirmations'
  return 'methods'
}
const labels = {
  en: [
    'SP & love',
    'Affirmations & self-concept',
    'Scripting & methods',
    'Money & career',
    'Signs & angel numbers',
  ],
  fr: [
    'SP et amour',
    'Affirmations et confiance',
    'Scripting et méthodes',
    'Argent et travail',
    'Signes et nombres',
  ],
  de: [
    'SP und Liebe',
    'Affirmationen und Selbstbild',
    'Scripting und Methoden',
    'Geld und Beruf',
    'Zeichen und Engelszahlen',
  ],
  it: [
    'SP e amore',
    'Affermazioni e fiducia',
    'Scripting e metodi',
    'Denaro e lavoro',
    'Segni e numeri',
  ],
  tr: ['SP ve aşk', 'Olumlamalar', 'Yazma ve yöntemler', 'Para ve kariyer', 'İşaretler ve sayılar'],
}
export const topicLabel = (topic: Topic, locale: BlogLocale) =>
  labels[locale][TOPICS.indexOf(topic)]
