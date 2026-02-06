import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="mb-4 text-6xl font-bold tracking-tight text-gray-900 sm:text-8xl dark:text-white">
        404
      </h1>
      <p className="mb-2 text-xl font-medium text-gray-600 dark:text-gray-300">Page not found</p>
      <p className="mb-8 text-gray-500 dark:text-gray-400">
        The page you&rsquo;re looking for doesn&rsquo;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-full border border-gray-900 bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-gray-900 dark:hover:bg-transparent dark:hover:text-white"
      >
        Back to home
      </Link>
    </div>
  )
}
