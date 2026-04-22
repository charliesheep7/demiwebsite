export function Stardust({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="stardust" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="30" r="1" fill="#7a58c9" opacity="0.35" />
          <circle cx="80" cy="60" r="1.4" fill="#ffc94a" opacity="0.4" />
          <circle cx="120" cy="20" r="0.8" fill="#b29cf5" opacity="0.5" />
          <circle cx="50" cy="100" r="1" fill="#7a58c9" opacity="0.25" />
          <circle cx="100" cy="120" r="1.2" fill="#ffc94a" opacity="0.3" />
          <circle cx="10" cy="110" r="0.8" fill="#b29cf5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#stardust)" />
    </svg>
  )
}
