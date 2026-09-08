# Demi keyword strategies — 8 September 2026

Completed in sem.3ue.com Keyword Strategy Builder through Chrome computer use. Scope: English (US), German (Germany), French (France), Turkish (Turkiye), Italian (Italy), plus a dedicated English specific-person strategy. The website currently has English routes only; the other four lists are research for future localized content.

| Strategy         | Keywords saved | Topics | Suggested pages | Saved list                                                                                 |
| ---------------- | -------------: | -----: | --------------: | ------------------------------------------------------------------------------------------ |
| English, broad   |          1,511 |     10 |             216 | [Open](https://sem.3ue.com/analytics/keywordmanager/list?listId=6710591%2F444444444&tab=0) |
| English, SP/love |            375 |      7 |              54 | [Open](https://sem.3ue.com/analytics/keywordmanager/list?listId=6710603%2F444444444&tab=0) |
| German           |            256 |      7 |              44 | [Open](https://sem.3ue.com/analytics/keywordmanager/list?listId=6710593%2F444444444&tab=0) |
| French           |            113 |      5 |              20 | [Open](https://sem.3ue.com/analytics/keywordmanager/list?listId=6710596%2F444444444&tab=0) |
| Turkish          |             79 |      5 |              15 | [Open](https://sem.3ue.com/analytics/keywordmanager/list?listId=6710599%2F444444444&tab=0) |
| Italian          |            143 |      8 |              21 | [Open](https://sem.3ue.com/analytics/keywordmanager/list?listId=6710601%2F444444444&tab=0) |
| **Raw total**    |      **2,477** | **42** |         **370** |                                                                                            |

Totals are not deduplicated across lists. In particular, English broad and SP overlap. Suggested pages are tool-generated clusters, not a recommendation to publish 370 new articles. Full keyword inventories remain in the saved lists; this document records the setup and selected priorities, not a complete CSV export. Existing `public/kw.csv` was not modified.

## Seeds used

| List          | Five seed keywords                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| English broad | manifestation techniques; positive affirmations; law of assumption; manifestation journal; vision board                        |
| English SP    | manifest sp; manifest a specific person; sp affirmations; law of assumption sp; manifest love                                  |
| German        | manifestieren lernen; positive affirmationen; gesetz der annahme; manifestation tagebuch; bestimmte person manifestieren       |
| French        | loi de l'attraction; affirmations positives; loi de l'assomption; scripting manifestation; manifester une personne spécifique  |
| Turkish       | manifest nasıl yapılır; olumlamalar; çekim yasası; varsayım yasası; belirli bir kişiyi manifest etmek                          |
| Italian       | legge di attrazione; affermazioni positive; legge dell'assunzione; scripting manifestazione; manifestare una persona specifica |

## Exact “manifest sp” research

[Keyword Overview, US](https://sem.3ue.com/analytics/keywordoverview/?q=manifest%20sp&db=us): 110 estimated monthly US searches, 380 global, KD 34%, informational intent, checked September 8. The exact term was also manually added to the SP list with tag `demi-sp-priority`; the saved count increased from 374 to 375. It was not sufficient to assume a seed would necessarily be retained among the generated keywords.

Related terms in the same live Keyword Overview:

| Keyword                  | US volume |          KD |
| ------------------------ | --------: | ----------: |
| manifesting sp           |       320 |          34 |
| manifested sp            |       140 |          32 |
| sp manifestation         |       140 |          28 |
| how to manifest sp       |        30 | unavailable |
| does manifesting sp work |        20 | unavailable |
| how to manifest an sp    |        20 | unavailable |

Use these as variants and sections of the existing `/blog/manifesting-a-specific-person` page where they share intent. That page already earns search impressions and ranks for specific-person queries. Consider a separate SP affirmations page only if it answers a distinct need. Do not create a separate near-identical article for every wording. Tool suggestions about guaranteed results are search queries, not substantiated product claims or recommended titles.

Keyword Overview and Strategy Builder sometimes returned different metrics for the same term (for example, `manifesting sp` KD 34 vs 26). Preserve the source/date distinction; use a refreshed keyword-level report before making a final production decision.

## Selected native priorities

The following are visible **page-cluster** metrics from Strategy Builder. Volume can aggregate several keyword variants and is rounded by the UI; it is not the exact single-keyword volume. KD is the displayed page value. Selection below favors fit to Demi over the tool's unedited ranking.

| Locale | Candidate cluster                          | Displayed volume |  KD | Suggested treatment                                                |
| ------ | ------------------------------------------ | ---------------: | --: | ------------------------------------------------------------------ |
| EN     | how to manifest love                       |             1.4K |  20 | Love/SP hub, map existing articles first                           |
| EN     | how to manifest your soulmate              |              150 |   3 | Distinct relationship intent if existing content does not cover it |
| EN     | how to manifest someone                    |               5K |  32 | Consolidate with existing SP content where intent overlaps         |
| EN     | manifesting sp success stories             |              140 |  20 | Only use genuine attributable stories                              |
| DE     | bestimmte person manifestieren erfahrungen |              500 |  17 | German SP experience/FAQ content                                   |
| DE     | affirmationen selbstliebe                  |             2.9K |  16 | Native self-love affirmation examples                              |
| DE     | 100 positive affirmationen                 |              900 |   6 | Useful examples, grouped by situation                              |
| DE     | geld manifestieren                         |             1.2K |  12 | Secondary intent, below SP/product needs                           |
| FR     | affirmation positive confiance en soi      |             2.1K |  15 | Native confidence affirmations                                     |
| FR     | attire le positif                          |              180 |  10 | Supporting practical guide                                         |
| FR     | pensées positives                          |            31.6K |  35 | Broad supporting hub; less direct app intent                       |
| TR     | varsayım yasası nedir                      |             1.3K |  22 | Explain law of assumption in Turkish                               |
| TR     | çekim yasası                               |             2.4K |  30 | Core Turkish guide                                                 |
| TR     | evrene enerji nasıl gönderilir             |              210 |  20 | Secondary spiritual intent, assess product fit                     |
| IT     | come manifestare qualcosa                  |             1.4K |  14 | Core Italian manifestation guide                                   |
| IT     | affermazioni positive                      |             2.4K |  18 | Native affirmation examples                                        |
| IT     | legge dell attrazione                      |               3K |  20 | Supporting pillar                                                  |
| IT     | come farlo tornare col pensiero            |              400 |   7 | Relationship intent; avoid unsupported guarantees                  |

The local SP seeds were researched in all four non-English lists, but a seed does not guarantee a dedicated cluster or measurable volume. Keep localized SP phrases as intent targets even where the beta database is sparse; do not invent volume for them.

Exclude irrelevant suggestions before writing. Turkish results drifted into political/dictionary `manifesto ne demek` and religious `sünnetullah yasaları`; Italian results included sports motivational quotes and broad dating advice. Large volume alone does not establish relevance. French broad positive-thought results also need careful prioritization.

## Recommended use

1. Improve the existing English SP, single-word affirmation, and app pages first, based on the [performance audit](./performance-audit-2026-09-08.md).
2. Assign one canonical target URL per distinct intent. Reuse existing articles where appropriate.
3. For locale rollout, start with a native product landing page, SP guide, and useful affirmation page per language. Implement actual language routes, self-canonicals, reciprocal hreflang and internal links before expecting multilingual search traffic.
4. Refresh exact keyword metrics for the final shortlist and review the live SERP intent. The saved lists are a research pool, not an automatically approved publishing queue.
