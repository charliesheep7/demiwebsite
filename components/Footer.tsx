import Link from './Link'
import { AppStoreButton } from './AppStoreButton'

const COLUMNS = [
  {
    title: 'The App',
    links: [
      { href: '/#rituals', label: 'features' },
      { href: '/#', label: 'changelog' },
      { href: '/#', label: 'status' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { href: '/#manifesto', label: 'manifesto' },
      { href: '/#rituals', label: 'method' },
      { href: '/blog', label: 'blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'about' },
      { href: '/contact', label: 'contact' },
      { href: '/support', label: 'support' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'privacy' },
      { href: '/terms', label: 'terms' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative pt-32 md:pt-40">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="t-display text-ink font-serif leading-[0.9]">
            Dem<em className="text-lav-500 italic">i.</em>
          </h2>
          <AppStoreButton size="md" />
        </div>

        <div className="border-line-soft mt-20 grid grid-cols-2 gap-10 border-t pt-14 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="font-ui text-lav-500 mb-5 text-[10px] font-semibold tracking-[0.3em] uppercase">
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="t-meta text-ink-2 hover:text-lav-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span className="t-meta text-ink-faint">© demimanifest {year}</span>
          <span className="text-ink-dim font-serif text-sm italic">
            built with <span className="text-yel-300">✦</span> in san francisco
          </span>
        </div>

        <div className="mt-10 pb-16">
          <div className="via-lav-100 mb-10 h-px bg-gradient-to-r from-transparent to-transparent" />
          <div
            aria-hidden="true"
            className="text-yel-300 flex flex-wrap justify-center gap-10 text-xl opacity-30"
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i}>✦</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
