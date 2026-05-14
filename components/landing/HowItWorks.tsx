import { EditorialSection } from '../EditorialSection'
import { FeatureCard } from '../FeatureCard'

const STEPS = [
  {
    numeral: 'i.',
    kicker: 'claim it',
    title: 'Whisper it to',
    emphasis: 'the orb.',
    body: 'Your SP, your dream career, the move, the money — anything, anyone. One claim, made daily. The orb holds it until it lands.',
  },
  {
    numeral: 'ii.',
    kicker: 'tune in',
    title: 'Read the day',
    emphasis: 'the universe sent.',
    body: 'Your lucky number, the signs to watch for, the dos and don’ts, the affirmation for today. A 30-second check-in that aligns your frequency before the world starts pulling at it.',
  },
  {
    numeral: 'iii.',
    kicker: 'do the work',
    title: 'Script it.',
    emphasis: 'see it. keep showing up.',
    body: 'Write the scene as if it’s already happened. Pin it to your vision board. Keep your streak. The longer you tune in, the louder the signs get.',
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
