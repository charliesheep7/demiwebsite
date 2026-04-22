import { EditorialSection } from '../EditorialSection'
import { FeatureCard } from '../FeatureCard'
import { Em } from '../Em'

const RITUALS = [
  {
    numeral: 'i.',
    kicker: 'goal setup',
    title: 'Name the',
    emphasis: 'life.',
    body: 'One sentence. The thing you won’t say out loud. Write it once; we’ll hold it for you for as long as you need.',
  },
  {
    numeral: 'ii.',
    kicker: 'the tune-in',
    title: 'A 30-second',
    emphasis: 'daily ceremony.',
    body: 'Hold the orb. Charge it with your attention. The universe is listening — but only after you’ve tuned your own frequency.',
  },
  {
    numeral: 'iii.',
    kicker: 'daily scene',
    title: 'One frame of',
    emphasis: 'your future.',
    body: 'Every morning, a tiny vignette from the life on the other side of this. A sentence, an image, a line she might say.',
  },
  {
    numeral: 'iv.',
    kicker: 'the mirror',
    title: 'Catch yourself',
    emphasis: 'becoming her.',
    body: 'Reflection prompts that surface what you already know. No journaling guilt — three taps and done.',
  },
  {
    numeral: 'v.',
    kicker: 'frequency',
    title: 'Your signal,',
    emphasis: 'tuned.',
    body: 'A soundscape that matches the channel of the life you’re calling in. Play it on your commute or under the desk.',
  },
  {
    numeral: 'vi.',
    kicker: 'magnet mode',
    title: 'Pull, don’t',
    emphasis: 'push.',
    body: 'A timed focus window where the orb grows warmer the longer you stay. No push notifications. No pressure.',
  },
  {
    numeral: 'vii.',
    kicker: 'signs radar',
    title: 'Notice the',
    emphasis: 'coincidences.',
    body: 'Log the winks from the universe in two taps. The pattern becomes impossible to ignore by week three.',
  },
  {
    numeral: 'viii.',
    kicker: 'moon + streak',
    title: 'Ride the',
    emphasis: 'cycle.',
    body: 'Lunar phase woven into your streak. Miss a day? It forgives you on the new moon. No shame — only rhythm.',
  },
  {
    numeral: 'ix.',
    kicker: 'evidence wall',
    title: 'Proof, on the',
    emphasis: 'record.',
    body: 'A private timeline of every small thing that came true. You’ll be stunned at 30 days. Shaken at 90.',
  },
]

export default function TenRituals() {
  return (
    <EditorialSection id="rituals" roman="III" label="inside the app">
      <h2 className="t-h1 mb-14">
        Ten small <Em>rituals.</Em>
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {RITUALS.map((r) => (
          <FeatureCard
            key={r.numeral}
            numeral={r.numeral}
            kicker={r.kicker}
            title={r.title}
            emphasis={r.emphasis}
            body={r.body}
          />
        ))}
      </div>

      <article className="shadow-sd-lift from-yel-50 via-cream-2 to-lav-50 mt-5 overflow-hidden rounded-lg border border-[rgb(255,201,74,0.35)] bg-gradient-to-br p-10">
        <div className="mb-5 flex items-center gap-3">
          <span className="bg-yel-200 text-ink inline-flex h-9 w-9 items-center justify-center rounded-xs font-serif text-lg italic">
            x.
          </span>
          <span className="font-ui text-lav-500 text-[10px] font-semibold tracking-[0.3em] uppercase">
            variable rewards · rare drop
          </span>
          <span className="text-yel-300 ml-auto text-lg" aria-hidden="true">
            ✦
          </span>
        </div>
        <h3 className="mb-4 max-w-[720px] font-serif text-[32px] leading-[1.1] tracking-tight md:text-[40px]">
          Sometimes, a signal arrives — <Em>unprompted.</Em>
        </h3>
        <p className="t-body-l max-w-[680px]">
          Once in a while, between ordinary Tuesdays, the app pushes a rare card: a line from your
          future self, a symbol, a dare, a coincidence worth writing down. You can&rsquo;t predict
          when. That&rsquo;s the point.
        </p>
      </article>
    </EditorialSection>
  )
}
