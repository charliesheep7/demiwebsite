import { JsonLd } from './JsonLd'
import siteMetadata from '@/data/siteMetadata'

type Crumb = { name: string; path: string }

export function BreadcrumbSchema({ crumbs }: { crumbs: Crumb[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.path ? `${siteMetadata.siteUrl}${c.path}` : siteMetadata.siteUrl,
    })),
  }
  return <JsonLd data={data} />
}
