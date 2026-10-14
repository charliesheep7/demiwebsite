import LocalizedLanding, { landingMetadata } from '@/components/LocalizedLanding'
export const metadata = landingMetadata('en')
export default function Page() {
  return <LocalizedLanding locale="en" />
}
