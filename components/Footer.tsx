import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Infinique, Inc. All rights reserved.
          </div>
          <nav className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="/privacy"
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
