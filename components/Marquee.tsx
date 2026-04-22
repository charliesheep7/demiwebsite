const AFFIRMATIONS = [
  'Something shifted.',
  "You're already on your way.",
  'The one you asked for is coming.',
  "You've been chosen.",
  "It's closer than it looks.",
  'The universe is listening now.',
  'Your timeline is bending toward you.',
  'Already on its way.',
]

export function Marquee() {
  const items = [...AFFIRMATIONS, ...AFFIRMATIONS]
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <ul className="sr-only">
        {AFFIRMATIONS.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap"
      >
        {items.map((line, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-ink font-serif text-[clamp(24px,3.2vw,40px)] italic">{line}</span>
            <span className="text-yel-300 text-xl">✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}
