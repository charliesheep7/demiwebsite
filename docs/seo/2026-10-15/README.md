# Demi SEO transformation — 15 October 2026

Demi's largest constraint is search reach and content coverage, not a uniquely poor aggregate CTR. The implementation builds useful native-language entry points, connects articles into topic hubs, and aligns every article's download offer with its subject. Ranking improvements must be measured after crawling; this release cannot guarantee them.

## Evidence and diagnosis

Search Console, Web search, 12 July–11 October 2026 (same three-month window for both sites):

| Metric           |   Demi |                     DeenUp |
| ---------------- | -----: | -------------------------: |
| Clicks           |    303 |       approximately 51,100 |
| Impressions      | 29,109 | approximately 12.1 million |
| CTR              |  1.04% |                       0.4% |
| Average position |    8.4 |                        7.5 |

DeenUp has about 416 times the impressions and 169 times the clicks. Average position is impression-weighted over different query mixes, so the similar averages do not mean the sites have equal rankings or opportunity. GSC does not prove installation or purchase conversion. The user's description of DeenUp as a strong converter is a useful reference, not a newly measured conversion result in this audit.

Demi's exported page rows show 48 angel-number URLs contributing 21,047 impressions and 114 clicks. That is roughly 72% of the property impression total, with aggregation differences possible between page rows and property totals. The two homepage host variants contributed 105 clicks. The other 144 blog rows produced only 84 clicks. Search reach is concentrated in loosely related number interpretations and brand searches rather than the app's main SP/love use case.

The existing SP page had 16 clicks / 609 impressions / average position 16.0; the one-word affirmations page had 18 / 864 / position 5.0. Refreshing the existing SP URL is preferable to splitting its intent across competing new pages. One-word affirmations already had an improved answer-first article in the latest remote branch and was preserved.

The page-indexing report last updated 9 October showed 154 indexed and 289 not indexed: 196 discovered but not indexed, 40 crawled but not indexed, 32 alternate canonical, 14 redirects, 4 not found, 2 duplicates and 1 redirect error. These are GSC's reporting snapshot, not 289 errors that can all be fixed by changing robots.txt. Excluded redirects and canonical alternatives can be expected; discovered/crawled exclusions warrant better distinctiveness, internal discovery and time to recrawl. The previously reported redirect-error URL now responds successfully.

A live crawl covered all 437 pre-release sitemap entries. Robots allowed crawling, canonical host redirects worked, and fetched pages had one H1 and one canonical. Two SSL fetch failures were transient observations, not confirmed website errors. Found defects included a nonexistent internal destination used by two posts, a missing advertised RSS feed, four missing article-image references (source checks), empty native blog inventories, and no localized product homepage. The new implementation repairs these and adds native site pages.

## Country-specific keyword decisions

`keyword-research.csv` and `keyword-evidence.json` retain 39 exact observations from Semrush Keyword Overview/Bulk Analysis on 15 October, with country database, volume, KD and intended URL. Volumes are third-party estimates, not guaranteed traffic; missing KD/volume remains unavailable and is never changed to zero. These are individual keyword estimates, separate from older saved page-cluster estimates.

| Market  | Representative opportunity            | Monthly volume / KD |
| ------- | ------------------------------------- | ------------------: |
| US      | manifestation journal prompts         |             320 / 6 |
| US      | sp affirmations                       |            210 / 25 |
| US      | manifest sp                           |            140 / 39 |
| US      | manifesting money                     |          1,300 / 29 |
| Germany | manifestieren                         |         12,100 / 35 |
| Germany | affirmationen selbstliebe             |            720 / 15 |
| Germany | geld manifestieren                    |            260 / 11 |
| Germany | bestimmte person manifestieren        |             70 / 15 |
| France  | affirmation positive confiance en soi |             260 / 7 |
| France  | manifester une personne               |    30 / unavailable |
| France  | manifester l'amour                    |    20 / unavailable |
| Italy   | affermazioni positive                 |            720 / 15 |
| Italy   | come manifestare una persona          |            260 / 24 |
| Italy   | metodo 369                            |            170 / 27 |

French “manifestation” returned 27,100 / KD34 but has substantial protest/event ambiguity and is excluded as a primary target. Italian broad results also included events and posters; “manifestare una persona” is the useful narrower intent. Native spelling and phrasing matter more than translating “manifest SP” literally. French scripting is an editorial support guide; an exact fresh volume was not established and none is invented.

Competitor architecture informed the implementation: [Attraya's French SP guide](https://attraya.app/fr/blog/how-to-manifest-a-specific-person/) has native copy, related methods and an app offer specific to the topic. [It's Yours Already's SP hub](https://itsyoursalready.com/specific-person) groups related SP questions and methods. [To Manifest's SP guide](https://www.tomanifest.org/articles/manifest-a-specific-person/) targets the same practical informational need. These observations support hubs and contextual offers; they do not establish competitor conversion rates. Semrush's Attraya overview included inconsistent unrelated topic cards, so those estimates were not used to claim competitive traffic or authority.

DeenUp's strongest observed pages answer a concrete need: a newborn dua (3,026 clicks), a new-job dua (918), loneliness (756), and specific prayer wording. The reusable lesson is to answer a clear situation immediately, offer a useful next action, and connect it naturally to the product. Demi should copy that structure, not unrelated Islamic keywords.

## Editorial plan and execution

Start with an editorial allocation of 45% SP/love, 30% affirmations and methods, 15% money/career and 10% signs. This is a starting hypothesis, not a mathematically optimized mix. Money and career broaden reach; SP/love remains the conversion core. Avoid uncontrolled publication of near-identical angel-number pages.

Shipped content: refresh the existing English SP guide in place; publish three original starter guides each in German, French and Italian, covering SP plus confidence/affirmations and a practical method. Keep all existing English article URLs. Nine native articles are a starter library, not a translated copy of all 430 English posts. Language switching on an independent article goes to the destination-language journal, with no false translation hreflang.

Next editorial batches should prioritize: German love affirmations, love manifestation, money and work; French love affirmations, attraction/love and practical work goals; Italian love, attraction and money. The focused tracker returns only uncovered intents. English refreshed opportunities are already covered by existing URLs; an empty new-article queue means research or refresh, not automatic fallback to a legacy bulk list.

Cadence recommendation: one carefully reviewed article per locale per week, plus two English refreshes, for the first four weeks. Check discovery and impressions before increasing volume. The pipeline is available on demand; this task did not create a recurring publishing automation.

## Technical and conversion implementation

- Full EN/FR/DE/IT landing page, navigation, about, support, contact, privacy and terms, with native metadata and reciprocal canonical/hreflang URLs.
- Topic hubs, server-rendered 24-item pagination, related articles, stable canonical URLs and automatic sitemap inclusion. Empty Turkish infrastructure remains available but is not promoted as a populated library.
- Removed 407 deprecated closing product pitches and corrected 16 embedded descriptions that misrepresented the current app. The shared contextual offer replaces these old promotional paragraphs without deleting the articles or changing their URLs.
- Every article gets a topic-specific offer (SP/love, affirmations, methods, money/career or signs), with both direct Apple and Google Play links at the introduction and end. Header/footer and landing offers use localized labels. Store navigation is never blocked by tracking.
- RSS feed, repaired links and image references, and clean robots rules that permit content while excluding API paths.
- Text-free generated journal hero suitable across all three new languages. Generated with the built-in image tool. Prompt: “Editorial still life of an open blank ivory journal and dark pencil on a cream table, lavender glass orb, morning window shadows, subtle white flowers; calm tactile photography, cream/lavender palette; no writing, logos, numbers or watermark.” Production asset: `public/images/manifestation-journal.jpg`; native copies live under their article directories.
- Repo and installed writer instructions now use the current SP/love product, country-specific research, four supported site languages and duplicate prevention. Legacy English auto-fallback is disabled unless explicitly requested.

## Analytics and measurement

Dedicated Mixpanel project: [demimanifest_website, project 4073625](https://eu.mixpanel.com/project/4073625/view/4570155/app/home), EU residency, Asia/Shanghai reporting time. Never reuse the DeenUp token or mix these events into Demi app analytics.

Events: `demi_web_page_view`, `demi_web_article_view`, `demi_web_article_engaged`, `demi_web_cta_impression`, `demi_web_store_click`. Properties include locale, clean page path, article slug, topic, placement, CTA variant, platform/store, environment and release. Engaged means at least 30 seconds visible with consent plus reaching 50% of document height. Impression means at least 50% of the CTA block is visible. An outbound click is not an install or a purchase.

The adapter requires explicit analytics consent, uses an anonymous website ID, sends to the EU endpoint with IP geolocation disabled, and excludes preview traffic by default. It does not send personal intentions, journal text, query strings, replay recordings or identity profiles. Withdrawal deletes the local analytics ID. The banner stays hidden when tracking is unconfigured.

Production environment setting still required: `NEXT_PUBLIC_MIXPANEL_TOKEN` from this exact project. Vercel settings require a two-factor sign-in; the existing local Vercel credential returns “Not authorized.” No credentials or access protections were changed. Code and local behavior tests can pass while event ingestion remains unverified; do not call the funnel operational until a real production browser click appears in this project. The configured Mixpanel connector is US-region only and cannot query the new EU project.

Once connected, create a board with: weekly GSC nonbrand clicks/impressions by cluster/locale (separate GSC report), unique article viewers, engaged-view rate, unique CTA-viewers-to-store-clickers within a session, clicks by store/placement/topic/locale, and a seven-day click trend. Filter `analytics_env=production`. Compare only consented traffic and show the sample size; this will undercount total visitors. App installation/purchase attribution needs a separate attribution design.

Review gates: day 7 confirm sitemap fetch and native URLs discovered; day 14 review impressions and indexed-page trends; day 28 compare nonbrand reach, query diversity, positions and consented store-click rate by locale/cluster. Do not judge success from average position or raw article count alone. Retain existing number pages unless individual evidence supports consolidation; this release does not mass-delete historical traffic.

## Validation and release

Run `npm run check:seo`, `npm run test:analytics`, `npm run build`, followed by a crawl of the generated sitemap and browser checks at mobile and desktop sizes. The source checker covers all published articles, four dictionaries, images and Markdown internal links. The rendered crawl checks HTTP status, language, one H1, one self canonical, description, indexability, CTA stores and reciprocal hreflang.

Release and GSC submission results are recorded in `release-status.md` after production verification. GSC submission is a discovery signal and cannot force indexing.

Technical references: [Google's localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions) and [Mixpanel's regional endpoint documentation](https://docs.mixpanel.com/docs/tracking-methods/sdks/javascript).
