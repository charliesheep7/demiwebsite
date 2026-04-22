import { EditorialSection } from '../EditorialSection'
import { FeatureCard } from '../FeatureCard'

const STEPS = [
  {
    numeral: 'i.',
    kicker: 'set a goal',
    title: 'You pick the',
    emphasis: 'life.',
    body: 'Love, money, body, career, or something you don’t have words for yet. One goal. Short or long. We’ll hold it for you.',
  },
  {
    numeral: 'ii.',
    kicker: 'tune in daily',
    title: 'Thirty seconds.',
    emphasis: 'hold the orb.',
    body: 'Charge it with your attention. The universe is listening — but only after you’ve tuned your own frequency.',
  },
  {
    numeral: 'iii.',
    kicker: 'watch for signs',
    title: 'Scenes arrive.',
    emphasis: 'so do signs.',
    body: 'You start noticing what was always already here. The ordinary Tuesday your future self lives inside begins to meet you halfway.',
  },
]

export default function HowItWorks() {
  return (
    <EditorialSection id="how-it-works" roman="II" label="the ritual">
      <h2 className="t-h1 mb-14">How it works.</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {STEPS.map((s) => (
          <FeatureCard
            key={s.numeral}
            numeral={s.numeral}
            kicker={s.kicker}
            title={s.title}
            emphasis={s.emphasis}
            body={s.body}
          />
        ))}
      </div>
    </EditorialSection>
  )
}
