import InfoPage, { infoMetadata } from '@/components/InfoPage'
export const metadata = infoMetadata('en', 'terms')
export default function Page() {
  return <InfoPage locale="en" slug="terms" />
}
