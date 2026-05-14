import { EditorialSection } from '../EditorialSection'
import { Em } from '../Em'

export default function Manifesto() {
  return (
    <EditorialSection id="manifesto" roman="I" label="the manifesto">
      <h2 className="t-h1 mb-10">
        Manifestation isn&rsquo;t magic. <Em>It&rsquo;s frequency.</Em>
      </h2>

      <p className="t-lead mb-10">
        You&rsquo;ve felt it. The song that plays twice. The name you wrote down before they texted.
        The Tuesday that arrived exactly the way you scripted it. Demi is the daily practice that
        turns those moments from coincidence into method.
      </p>

      <div className="text-yel-300 my-14 text-center text-xl" aria-hidden="true">
        — ✦ —
      </div>

      <blockquote className="border-lav-300 my-12 border-l pl-8">
        <p className="t-quote">
          What you place attention on, you call in. Demi is the place you put it.
        </p>
      </blockquote>

      <div className="space-y-6">
        <p className="t-body-l">
          Claim it on the orb. Script the scene. Pin it to your vision board. Read the signs the
          universe is already sending — the lucky number, the dos and don&rsquo;ts, the affirmation
          for the day. Six small practices, one quiet app, every morning.
        </p>
        <p className="t-body-l">
          Whether it&rsquo;s your SP, the money, the move, the version of you on the other side of
          this — Demi holds it for you. Daily. Without losing the thread. Without letting the world
          dissolve it the second a Slack message lands.
        </p>
        <p className="t-body-l">
          Your streak is your signal. The longer you tune in, the closer it gets. The life you want
          is <Em>already on its way</Em> — Demi is how you meet it halfway.
        </p>
      </div>
    </EditorialSection>
  )
}
