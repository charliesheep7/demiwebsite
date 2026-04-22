export function PaperGrain() {
  return (
    <svg
      aria-hidden="true"
      role="presentation"
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.28] mix-blend-multiply"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="demi-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="1"
          stitchTiles="stitch"
        />
        <feColorMatrix
          values="0 0 0 0 0.4
                  0 0 0 0 0.3
                  0 0 0 0 0.5
                  0 0 0 0.5 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#demi-grain)" />
    </svg>
  )
}
