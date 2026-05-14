import { ImageResponse } from 'next/og'

export const alt = 'Demi — manifest to make it come true.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: 'radial-gradient(ellipse at top left, #f3e8d6 0%, #faf4ea 45%, #efe6d0 100%)',
          fontFamily: 'serif',
          color: '#1a1612',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#6b5f4e',
          }}
        >
          Demi · est. 2026
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 104,
              lineHeight: 1.05,
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: -2,
              maxWidth: 980,
              marginBottom: 28,
            }}
          >
            Manifest to make it come true.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              lineHeight: 1.4,
              color: '#4a3f30',
              maxWidth: 880,
            }}
          >
            Claim your SP. Script the scene. Build your vision board. Demi is the daily practice
            that holds your manifestation until it lands.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#6b5f4e',
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex' }}>demimanifest.com</div>
          <div style={{ display: 'flex' }}>a small studio, San Francisco</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
