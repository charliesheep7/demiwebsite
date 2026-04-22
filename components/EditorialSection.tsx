import { SectionLabel } from './Eyebrow'

export function EditorialSection({
  id,
  roman,
  label,
  children,
}: {
  id?: string
  roman: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="py-32 md:py-40">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr] md:gap-20">
          <div className="self-start md:sticky md:top-32">
            <SectionLabel roman={roman} title={label} />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  )
}
