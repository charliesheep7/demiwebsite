import InfoPage, { infoMetadata } from '@/components/InfoPage'
export const metadata = infoMetadata('en', 'about')
export default function Page() {
  return <InfoPage locale="en" slug="about" />
}
