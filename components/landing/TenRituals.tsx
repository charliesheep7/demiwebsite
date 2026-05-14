import { EditorialSection } from '../EditorialSection'
import { FeatureCard } from '../FeatureCard'
import { Em } from '../Em'

const RITUALS = [
  {
    numeral: 'i.',
    kicker: 'the claiming orb',
    title: 'Whisper it.',
    emphasis: 'tap the orb.',
    body: 'Manifest your SP, manifest anyone, manifest anything. Each claim is a small ceremony — a breath, a tap, a moment of stillness. The orb holds it until it comes through.',
  },
  {
    numeral: 'ii.',
    kicker: 'your day, at a glance',
    title: 'The universe',
    emphasis: 'left you a note.',
    body: 'Open Demi in the morning for your lucky number, the signs to watch for, today’s dos and don’ts. A 30-second read that tunes your day before the day touches you.',
  },
  {
    numeral: 'iii.',
    kicker: 'daily affirmation',
    title: 'Speak it',
    emphasis: 'into being.',
    body: 'One affirmation, made for today. Read it. Say it out loud. Let it sit. Words are the first form a manifestation takes — Demi gives you the right ones, every morning.',
  },
  {
    numeral: 'iv.',
    kicker: 'vision board',
    title: 'Pin the life',
    emphasis: 'you’re calling in.',
    body: 'Images, words, the apartment, the ring, her face. Build the board your future self already lives inside. Look at it daily. Watch the world start matching it.',
  },
  {
    numeral: 'v.',
    kicker: 'scripting',
    title: 'Write it as if',
    emphasis: 'it already happened.',
    body: 'Scripting is the practice of writing your manifestation in the past tense — the day it landed, how it felt, what she said. The page becomes the rehearsal. Reality follows the rehearsal.',
  },
  {
    numeral: 'vi.',
    kicker: 'streaks',
    title: 'Your signal,',
    emphasis: 'getting louder.',
    body: 'Every day you tune in, the streak grows. Miss a day and Demi welcomes you back — no shame, only rhythm. Consistency is the loudest signal you can send.',
  },
]

export default function TenRituals() {
  return (
    <EditorialSection id="rituals" roman="III" label="inside the app">
      <h2 className="t-h1 mb-14">
        Six daily <Em>rituals.</Em>
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
    </EditorialSection>
  )
}
