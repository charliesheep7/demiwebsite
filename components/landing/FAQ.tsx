import { EditorialSection } from '../EditorialSection'
import { FAQ_ITEMS } from '@/data/faq'

export default function FAQ() {
  return (
    <EditorialSection roman="IV" label="the fine print">
      <h2 className="t-h1 mb-12">Questions, softly asked.</h2>
      <div className="border-line-soft divide-line-soft divide-y border-t border-b">
        {FAQ_ITEMS.map((item) => (
          <details key={item.q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
              <span className="font-serif text-[22px] leading-snug md:text-[26px]">{item.q}</span>
              <span
                aria-hidden="true"
                className="text-lav-500 font-serif text-2xl italic transition-transform duration-300 group-open:rotate-90"
              >
                ›
              </span>
            </summary>
            <p className="t-body-l text-ink-2 mt-4 max-w-[740px]">{item.a}</p>
          </details>
        ))}
      </div>
    </EditorialSection>
  )
}
