type Size = 'xl' | 'lg' | 'md' | 'sm'

const sizeClasses: Record<Size, string> = {
  xl: 'h-20 px-10 gap-4',
  lg: 'h-16 px-7 gap-3.5',
  md: 'h-12 px-5 gap-3',
  sm: 'h-10 px-4 gap-2.5',
}

const iconSize: Record<Size, string> = {
  xl: 'h-8 w-8',
  lg: 'h-6 w-6',
  md: 'h-5 w-5',
  sm: 'h-4 w-4',
}

const kickerSize: Record<Size, string> = {
  xl: 'text-[11px]',
  lg: 'text-[9px]',
  md: 'text-[8px]',
  sm: 'text-[7px]',
}

const labelSize: Record<Size, string> = {
  xl: 'text-[20px]',
  lg: 'text-[15px]',
  md: 'text-[13px]',
  sm: 'text-[11px]',
}

export function PlayStoreButton({
  size = 'lg',
  href = 'https://play.google.com/store/apps/details?id=com.demimanifest',
  className = '',
}: {
  size?: Size
  href?: string
  className?: string
}) {
  return (
    <a
      href={href}
      aria-label="Download Demi on Google Play"
      className={`group relative inline-flex items-center ${sizeClasses[size]} text-ink from-yel-200 to-yel-300 font-ui shadow-sd-glow rounded-full bg-gradient-to-br font-bold tracking-[0.18em] uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${className}`}
    >
      <svg viewBox="0 0 512 512" className={`${iconSize[size]} fill-ink`} aria-hidden="true">
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className={`${kickerSize[size]} mb-0.5 font-medium tracking-[0.2em] opacity-70`}>
          DOWNLOAD ON THE
        </span>
        <span className={`${labelSize[size]} font-bold tracking-tight normal-case`}>Play Store</span>
      </span>
    </a>
  )
}
