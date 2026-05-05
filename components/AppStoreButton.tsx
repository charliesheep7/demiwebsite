type Size = 'lg' | 'md' | 'sm'

const sizeClasses: Record<Size, string> = {
  lg: 'h-16 px-7 gap-3.5',
  md: 'h-12 px-5 gap-3',
  sm: 'h-10 px-4 gap-2.5',
}

const iconSize: Record<Size, string> = {
  lg: 'h-6 w-6',
  md: 'h-5 w-5',
  sm: 'h-4 w-4',
}

const kickerSize: Record<Size, string> = {
  lg: 'text-[9px]',
  md: 'text-[8px]',
  sm: 'text-[7px]',
}

const labelSize: Record<Size, string> = {
  lg: 'text-[15px]',
  md: 'text-[13px]',
  sm: 'text-[11px]',
}

export function AppStoreButton({
  size = 'lg',
  href = 'https://apps.apple.com/vn/app/demi-manifest-affirm/id6763245058',
  className = '',
}: {
  size?: Size
  href?: string
  className?: string
}) {
  return (
    <a
      href={href}
      aria-label="Download Demi on the App Store"
      className={`group relative inline-flex items-center ${sizeClasses[size]} text-ink from-yel-200 to-yel-300 font-ui shadow-sd-glow rounded-full bg-gradient-to-br font-bold tracking-[0.18em] uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${className}`}
    >
      <svg viewBox="0 0 384 512" className={`${iconSize[size]} fill-ink`} aria-hidden="true">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className={`${kickerSize[size]} mb-0.5 font-medium tracking-[0.2em] opacity-70`}>
          DOWNLOAD ON THE
        </span>
        <span className={`${labelSize[size]} font-bold tracking-tight normal-case`}>App Store</span>
      </span>
    </a>
  )
}
