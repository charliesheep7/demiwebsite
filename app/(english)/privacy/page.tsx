import InfoPage, { infoMetadata } from '@/components/InfoPage'
export const metadata = infoMetadata('en', 'privacy')
export default function Page() {
  return <InfoPage locale="en" slug="privacy" />
}
