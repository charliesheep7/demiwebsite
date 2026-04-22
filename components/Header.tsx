'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import MobileNav from './MobileNav'
import { AppStoreButton } from './AppStoreButton'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      role="banner"
      className={clsx(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-line shadow-sd-1 border-b bg-[rgb(250_244_234_/_0.9)] backdrop-blur-xl'
          : 'border-b border-transparent bg-[rgb(250_244_234_/_0.75)] backdrop-blur-md'
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-5 md:h-[72px] md:px-8">
        <Link href="/" aria-label="Demi" className="group flex items-center gap-2">
          <span className="bg-lav-500 inline-block h-1.5 w-1.5 rounded-full" aria-hidden="true" />
          <span className="text-ink font-serif text-2xl tracking-tight">
            Dem<em className="text-lav-500 italic">i</em>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="font-ui text-ink-2 hover:text-lav-500 text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-200"
            >
              {link.title}
            </Link>
          ))}
          <AppStoreButton size="sm" />
        </nav>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
