import { EditorialSection } from '../EditorialSection'
import { Em } from '../Em'

export default function Manifesto() {
  return (
    <EditorialSection id="manifesto" roman="I" label="the manifesto">
      <h2 className="t-h1 mb-10">
        You don&rsquo;t need to believe. <Em>You need to show up.</Em>
      </h2>

      <p className="t-lead mb-10">
        Most manifestation apps ask you to perform belief. Demi asks you to perform attention.
        Thirty seconds, once a day, placed on the life you actually want. That&rsquo;s it. The rest
        of the method takes care of itself.
      </p>

      <div className="text-yel-300 my-14 text-center text-xl" aria-hidden="true">
        — ✦ —
      </div>

      <blockquote className="border-lav-300 my-12 border-l pl-8">
        <p className="t-quote">
          Demi is for people who would roll their eyes at a manifestation app, and open it anyway.
        </p>
      </blockquote>

      <div className="space-y-6">
        <p className="t-body-l">
          Half-belief is the only honest posture. You know the science isn&rsquo;t quite there. You
          also know the Tuesdays you&rsquo;ve spent scrolling through someone else&rsquo;s life. You
          know which of those two you&rsquo;d like to end.
        </p>
        <p className="t-body-l">
          The app is small on purpose. There&rsquo;s no streak shame. No 12-step plan. No guru
          voice. Just a quiet place to put the thing you want, so it stops dissolving every time a
          Slack message lands.
        </p>
        <p className="t-body-l">
          Show up for thirty seconds. Hold the orb. Notice what arrives. The life you want is{' '}
          <Em>already underway</Em> — this ritual is how you start catching up to it.
        </p>
      </div>
    </EditorialSection>
  )
}
