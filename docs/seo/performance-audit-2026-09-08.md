# Demi search-performance audit — 8 September 2026

Sources: authenticated Google Search Console domain property `demimanifest.com`, sem.3ue.com Domain Overview and Organic Rankings, and a read-only review of the local Demi website repository. No site code, sitemap submission, indexing requests, or production configuration was changed.

## Finding

Demi has low organic reach, but the measured three-month trend is improving. The clearest constraints are limited crawl/index coverage and very little non-brand traffic from the large article inventory. Specific-person content already shows traction and is a better immediate opportunity than adding hundreds of loosely related articles.

## Search Console evidence

[Performance report](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Ademimanifest.com), Web, all countries/devices, June 6–September 5, 2026, compared with March 6–June 5, 2026:

| Metric           | Latest 3 months | Previous 3 months |                    Change |
| ---------------- | --------------: | ----------------: | ------------------------: |
| Clicks           |             154 |                52 |                     +196% |
| Impressions      |           3,002 |               637 |                     +371% |
| CTR              |            5.1% |              8.2% |    −3.1 percentage points |
| Average position |             9.9 |              15.6 | Improved by 5.7 positions |

The earlier period includes the site's early life, so this is not a mature-site comparison. Lower aggregate CTR alongside many more impressions and improved average position does not by itself establish a snippet problem. Query mix matters.

### Traffic concentration

| Page (host as reported by GSC)                              | Clicks | Impressions |  CTR | Position |
| ----------------------------------------------------------- | -----: | ----------: | ---: | -------: |
| demimanifest.com/                                           |    127 |       1,564 | 8.1% |      5.9 |
| demimanifest.com/blog/manifesting-a-specific-person         |      7 |         334 | 2.1% |     19.5 |
| demimanifest.com/blog/single-word-affirmations              |      5 |         310 | 1.6% |      6.8 |
| www.demimanifest.com/blog/manifestation-for-perfectionists  |      4 |          83 | 4.8% |      9.3 |
| demimanifest.com/blog/law-of-attraction-app                 |      2 |          68 | 2.9% |     10.1 |
| www.demimanifest.com/blog/manifestation-app-without-the-woo |      2 |          41 | 4.9% |      8.3 |
| www.demimanifest.com/                                       |      1 |          40 | 2.5% |     14.1 |

The two homepage versions account for 128 of 154 clicks, about 83%. GSC displayed 64 page rows with impressions. This is a historical performance count, not the current indexed-page count.

Visible leading queries included `demi app` (63 clicks, 451 impressions), `demi manifestation app` (4, 14), `app demi` (1, 14), and `one word affirmations` (1, 82). At least 68 clicks came from those three visible branded queries. Query rows do not sum to all clicks because GSC omits some query data; do not label the remaining clicks as definitively non-brand.

Countries: US 49 clicks/1,164 impressions; France 22/80; Germany 14/145; UK 9/173; Italy 5/42. These country results do not prove language demand, but France and Germany already have some audience. Devices: mobile 123 clicks/1,689 impressions, desktop 31/1,290, tablet 0/23. About 80% of clicks are mobile.

### Indexing is the largest verified bottleneck

[Page indexing](https://search.google.com/search-console/index?resource_id=sc-domain%3Ademimanifest.com), report updated September 4:

| Status                                    | URLs |
| ----------------------------------------- | ---: |
| Indexed                                   |   48 |
| Discovered — currently not indexed        |  170 |
| Crawled — currently not indexed           |   22 |
| Alternate page with proper canonical      |   45 |
| Page with redirect                        |    2 |
| Redirect error                            |    1 |
| Not found (404)                           |    1 |
| Duplicate without user-selected canonical |    1 |

There are 242 not-indexed URLs in total, but **242 is not a count of broken articles**. The report includes duplicate hosts, redirects, and even a font file among crawled/unindexed examples. Google explains that alternate/canonical exclusions can be expected; the objective is indexing important canonical pages, not every known URL. [Google indexing documentation](https://support.google.com/webmasters/answer/7440203).

Discovered/unindexed examples included `/blog/369-manifestation-method`, `/blog/3-6-9-manifestation`, `/blog/369-method-examples`, `/blog/55x5-manifestation-method`, and `/blog/affirmation-apps`, with no last crawl. Inspection of **https://www.demimanifest.com/blog/369-manifestation-method** also reported discovered/currently not indexed, no crawl, no referring page, and no referring sitemap detected. This verifies that at least one important canonical-host article is genuinely missing, rather than merely an excluded duplicate host.

Crawled/unindexed examples included `/blog/manifestation-and-money` (www, August 23), `/blog/positive-affirmations-for-the-day` (July 21), `/blog/manifestation-without-vision-boards` (June 28), `/blog/i-am-worthy-affirmations` (June 10), and `/blog/manifest-writing-examples` (June 1). These statuses establish lack of indexing, not Google's undisclosed reason or a quality penalty.

### Canonical history needs reconciliation, not a premature diagnosis

The September 4 aggregate report lists the www homepage and several www blog pages as alternates, while much historical traffic is attributed to non-www. Two sitemaps are submitted, one per host.

However, URL Inspection of **https://www.demimanifest.com/** showed a successful September 6 crawl, indexing allowed, URL on Google, user-declared canonical www, and Google-selected canonical the inspected www URL. The newer inspection supersedes the older aggregate status for that URL. The local source also currently specifies www. This suggests a host-canonical transition or stale reporting; it does not prove a currently broken homepage.

Both submitted sitemaps show **Success and 221 discovered pages**. The www sitemap was last read September 4; non-www September 6. This is not a missing-sitemap problem. The homepage inspection separately displayed “Temporary processing error” for its sitemap association, while the sitemap report itself was successful; treat that as an inspection-report limitation to revisit, not evidence the XML fetch failed.

The one redirect-error example was non-www `/blog/manifestation-for-skeptics`, last crawled April 23. Retest that exact URL before treating an old error as active.

For consistent canonical signals, keep one intended host and align permanent redirects, canonical tags, internal links, and sitemap URLs. Google documents redirects and canonical tags as stronger signals than sitemap inclusion. [Canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

### Other checks

- [Manual actions](https://search.google.com/search-console/manual-actions?resource_id=sc-domain%3Ademimanifest.com): no issues detected.
- [Security issues](https://search.google.com/search-console/security-issues?resource_id=sc-domain%3Ademimanifest.com): no issues detected.
- Core Web Vitals overview: no mobile or desktop data. There is insufficient field evidence here to blame speed, or to declare performance good.

## sem.3ue.com corroboration

[Organic Rankings](https://sem.3ue.com/analytics/organic/positions/?db=us&device=desktop&q=demimanifest.com&searchType=domain), US desktop, September 6: **12 tracked ranking keywords, estimated traffic 1**. All 12 listed positions were outside the top 10. Selected rows:

| Keyword                     | Position | US volume |  KD | Ranking page                  |
| --------------------------- | -------: | --------: | --: | ----------------------------- |
| specific person             |       18 |       720 |  25 | manifesting-a-specific-person |
| manifested him              |       18 |        50 |  14 | manifesting-a-specific-person |
| manifest specific person    |       25 |       170 |  21 | manifesting-a-specific-person |
| manifest a person           |       27 |        50 |  29 | manifesting-a-specific-person |
| manifesting someone meaning |       44 |       110 |  40 | manifesting-a-specific-person |
| single words of affirmation |       20 |        90 |  12 | single-word-affirmations      |
| single word mantras         |       33 |        70 |   5 | single-word-affirmations      |
| one word affirmations       |       48 |       320 |  14 | single-word-affirmations      |

These sampled US desktop positions are not directly comparable to GSC's all-country/all-device period averages. The SP page consistently emerges as a useful starting point in both tools.

[Domain Overview](https://sem.3ue.com/analytics/overview/?q=demimanifest.com&searchType=domain) displayed September 7, worldwide selected: 20 organic keywords, estimated organic traffic 8, Authority Score 2, 81 referring domains, 866 backlinks. Treat these as tool estimates, not GSC totals or Google ranking scores. The overview also displayed irrelevant topic cards (shoe sizing/clothing); those were excluded from the diagnosis as unreliable for this domain. Backlink quality was not audited, so neither link penalties nor a disavow action is justified by this review.

## Local content findings and likely contributors

The local repository contains 217 blog MDX files. A preliminary Markdown in-body link scan found 118 with no incoming links from other article bodies. These are **not proven orphan pages**: the blog index/navigation can still link to them, and this scan is not a full live crawl. It does indicate an opportunity for relevant contextual links and stronger topic hubs.

Many URLs address overlapping needs: multiple daily ritual/practice articles; `how-to-write-manifestations`, `how-to-write-manifestation-examples`, and paper-manifestation articles; several “does manifestation work” variants; several skeptical/without-believing articles; and overlapping SP/someone/back-into-your-life guides. This is a candidate consolidation map, not proven keyword cannibalization. Review page-query overlap and actual content before merging or redirecting anything.

The current product description emphasizes SP, scripting, vision boards, and signs. Older article/skill positioning emphasizes skeptics, a tiny ritual, and avoiding vision boards. That mismatch can weaken the path from article to app. Correct product claims and examples in retained articles; it is not established as the cause of Google's indexing decisions.

Source review found index/follow metadata, permissive robots, and a generated sitemap. Homepage inspection confirms successful crawling. There is no evidence here of a universal robots/noindex block. Local source and uncommitted changes are not proof of what every live URL currently serves.

## Prioritized next actions

1. **Resolve coverage for a small set of valuable canonical pages.** Start with the SP guide, single-word affirmations, law-of-attraction app, 369 method, and one product landing page. Verify their live URL, canonical, discoverability, and content; make the chosen canonical URLs consistent throughout navigation and sitemap. Recheck the old redirect-error URL. Do not try to index alternate hosts or assets.
2. **Improve the SP page that already ranks.** Cover `manifest sp`, `manifesting sp`, `sp manifestation`, what SP means, methods, and realistic FAQs in one coherent page where intents overlap. Add current Demi screenshots/examples and useful contextual links from relevant existing articles. Exact `manifest sp` has US volume 110/global 380/KD 34 in current Keyword Overview.
3. **Improve the single-word affirmation page.** Its 310 impressions, position 6.8, and 1.6% CTR make it worth query-level review of title/snippet and a better immediately useful answer. Do not assume every impression is the same query or promise a CTR increase.
4. **Consolidate repeated content and strengthen internal links.** Choose the best article per shared intent, preserve valuable distinct sections, and only redirect after reviewing evidence. Use topic hubs and relevant links from indexed pages. More word count or more articles alone is not the remedy.
5. **Roll out the requested locales in small, coherent sets.** Research is complete in all five languages. Native landing pages and a few strong SP/affirmation guides should precede mass translation. Verify locale routes and language annotations before scaling.

Measure progress through indexed status of these priority canonical pages, non-brand impressions/clicks, SP query positions, and app conversion events if analytics access is added. GSC measures search acquisition, not app installs or revenue; conversion performance was outside the available evidence.
