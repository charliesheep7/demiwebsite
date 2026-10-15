import siteMetadata from '@/data/siteMetadata'

const base = siteMetadata.siteUrl
export const WEBSITE_ID = `${base}#website`
export const APP_ID = `${base}#app`
export const APP_STORES = {
  apple: 'https://apps.apple.com/app/id6763245058',
  google: 'https://play.google.com/store/apps/details?id=com.demimanifest',
}

// Stable identities across languages. Store listings identify the application;
// they are not evidence that "Demimanifest" is a registered legal company name.
export const brandGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${base}#organization`,
      name: 'Demi',
      url: base,
      logo: {
        '@type': 'ImageObject',
        '@id': `${base}#logo`,
        url: `${base}/icon.svg`,
        caption: 'Demi website logo',
      },
      email: siteMetadata.email,
      description: siteMetadata.description,
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: 'Demi',
      alternateName: ['Demi Manifest', 'Demimanifest'],
      url: `${base}/`,
      description: siteMetadata.description,
      inLanguage: ['en', 'fr', 'de', 'it'],
      publisher: { '@id': `${base}#organization` },
      about: { '@id': APP_ID },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': APP_ID,
      name: 'Demi',
      alternateName: ['Demi: Manifest and Affirm', 'Demi: Manifest & Affirm'],
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'iOS, Android',
      url: `${base}/`,
      description: siteMetadata.description,
      sameAs: Object.values(APP_STORES),
      installUrl: Object.values(APP_STORES),
      mainEntityOfPage: `${base}/`,
      subjectOf: { '@id': WEBSITE_ID },
    },
  ],
}
