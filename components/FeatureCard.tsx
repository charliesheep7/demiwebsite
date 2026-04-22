import { Em } from './Em'

export function FeatureCard({
  numeral,
  kicker,
  title,
  emphasis,
  body,
  className = '',
}: {
  numeral: string
  kicker: string
  title: string
  emphasis?: string
  body: string
  className?: string
}) {
  return (
    <article
      className={`group border-line-soft shadow-sd-2 hover:shadow-sd-lift rounded-lg border bg-white/70 p-7 backdrop-blur-md transition-all duration-300 ${className}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="bg-cream-2 text-lav-500 inline-flex h-9 w-9 items-center justify-center rounded-xs font-serif text-lg italic">
          {numeral}
        </span>
        <span className="font-ui text-ink-dim text-[10px] font-semibold tracking-[0.3em] uppercase">
          {kicker}
        </span>
      </div>
      <h3 className="mb-3 font-serif text-[28px] leading-[1.15] tracking-tight">
        {title}
        {emphasis ? (
          <>
            {' '}
            <Em>{emphasis}</Em>
          </>
        ) : null}
      </h3>
      <p className="t-body">{body}</p>
    </article>
  )
}
