# Saved keyword research wired — 8 September 2026

The user stopped research after Semrush exhausted its daily quota and requested wiring the usable research already captured. The local canonical writers now read separate researched queues for all ten site/locale combinations. No article was published and no schedule changed during this integration. Repository changes are local and have not been pushed to remote cloud routines.

| Site     | Locale | Researched rows saved | Researched rows available now | Legacy rows also available | Publishing routes ready |
| -------- | ------ | --------------------: | ----------------------------: | -------------------------: | ----------------------- |
| Coursium | en     |                   237 |                           237 |                        488 | Yes                     |
| Coursium | de     |                   124 |                           124 |                          4 | Yes                     |
| Coursium | fr     |                   108 |                           108 |                          4 | Yes                     |
| Coursium | ja     |                   170 |                           170 |                          4 | Yes                     |
| Coursium | ko     |                    76 |                            76 |                          4 | Yes                     |
| Demi     | en     |                   210 |                           194 |                         92 | Yes                     |
| Demi     | de     |                   104 |                           104 |                          0 | Needs native routes     |
| Demi     | fr     |                   140 |                           140 |                          0 | Needs native routes     |
| Demi     | tr     |                    92 |                            92 |                          0 | Needs native routes     |
| Demi     | it     |                    99 |                            99 |                          0 | Needs native routes     |

“Available” is a current picker snapshot after checking published posts, written ledgers and duplicates. Coursium has 715 added researched assignments available. Demi has 629 available from 645 saved researched assignments; 16 English rows are skipped by the runtime coverage and near-duplicate checks. Legacy counts are separate and include unmeasured programmatic or older keywords. These counts do not certify the former 5x/90-day target. Shared-intent editorial review remains part of the writing workflow.

Each new row preserves its native keyword, explicit ASCII slug, article angle, source file/list, contributing keyword variants and source-specific volume/KD. Rounded Strategy Builder cluster estimates are labeled separately from Keyword Magic individual keyword estimates; variants and source occurrences must not be summed. Broad-search drift remains in raw research files, outside approved assignments.

The saved sources cover all 29 original and expanded structured lists (2,680 raw cluster occurrences, including overlaps), plus captured Keyword Magic subsets. Japanese AI Magic contains 579 unique observed keywords, not the 1,000 repeated UI row captures. No complete keyword export is claimed.

## Canonical picker commands

Run from the relevant repository:

```bash
# Coursium: en, de, fr, ja, ko
python3 .claude/skills/coursium-blog-writer/tracker.py next 1 --locale ja

# Demi: en, de, fr, tr, it
python3 .claude/skills/demimanifest-blog-writer/tracker.py next 1 --locale en
python3 .claude/skills/demimanifest-blog-writer/tracker.py stats --locale fr
python3 .claude/skills/demimanifest-blog-writer/tracker.py refresh --locale en
```

Demi's four native queues explicitly return `publish_ready: false`. They must remain separate until locale blog routes are implemented and verified. English must never be used as their fallback destination.

The exact keyword **manifest sp** is assigned to the existing `/blog/manifesting-a-specific-person` refresh brief, with US volume 110 and KD 34. This avoids creating a competing SP article. The existing article has not yet been edited by this wiring task.

The repository writer instructions and installed local Demi/Coursium writer instructions point at the canonical pickers. Demi reads both repository and existing local written ledgers during migration; future writes use the repository ledger. Coursium keeps its existing SEO, profession and comparison queues and adds the saved research.

## Verification

All ten locale CLI pickers passed. Fixture checks simulated new posts covering a queued secondary keyword under a different URL; both writers skipped them in all five of their languages. Japanese dakuten and Korean Hangul remain intact during normalization. Every researched row has a valid source file and explicit unique ASCII slug. Coursium has no collisions across its combined queues. The SP refresh mapping and native Demi readiness flags passed.
