import InfoPage, { infoMetadata } from '@/components/InfoPage'
export const metadata = infoMetadata('en', 'contact')
export default function Page() {
  return <InfoPage locale="en" slug="contact" />
}
