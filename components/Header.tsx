'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClass = clsx(
    'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-500 ease-out',
    scrolled
      ? 'bg-white/80 dark:bg-gray-950/85 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-gray-200/50 dark:border-white/10'
      : 'bg-transparent'
  )

  return (
    <header className={headerClass} role="banner">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" aria-label="Infinique" className="group flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight text-gray-900 transition-opacity duration-200 group-hover:opacity-70 dark:text-white">
            Infinique
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="hidden items-center gap-1 sm:flex">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {link.title}
              </Link>
            ))}
          </nav>
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
