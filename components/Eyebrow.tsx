export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-lav-500 font-ui inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] uppercase">
      <span aria-hidden="true" className="text-yel-300 text-sm leading-none">
        ✦
      </span>
      {children}
    </span>
  )
}

export function SectionLabel({ roman, title }: { roman: string; title: string }) {
  return (
    <div>
      <div className="bg-lav-500 mb-4 h-px w-10" />
      <span className="text-lav-500 font-ui text-[11px] font-semibold tracking-[0.3em] uppercase">
        {roman} — {title}
      </span>
    </div>
  )
}
