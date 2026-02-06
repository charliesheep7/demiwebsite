/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Infinique',
  author: 'Infinique, Inc.',
  authorSlug: 'infinique',
  headerTitle: 'Infinique',
  description:
    'Infinique, Inc. builds software and platforms that feel like magic. A Delaware C-Corporation crafting infinitely unique digital experiences.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://infinique.org',
  siteRepo: '',
  siteLogo: '',
  socialBanner: '',
  mastodon: '',
  email: 'hello@infinique.org',
  github: '',
  x: '',
  facebook: '',
  youtube: '',
  linkedin: '',
  threads: '',
  instagram: '',
  tiktok: '',
  medium: '',
  bluesky: '',
  locale: 'en-US',
  stickyNav: false,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: '',
  },
  comments: {
    provider: '',
  },
  search: {
    provider: '',
  },
}

module.exports = siteMetadata
