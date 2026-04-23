---
name: demimanifest-blog-writer
description: 'Write SEO-optimized blog posts for demimanifest.com. Use when asked to write a blog about a topic or create blog content for Demi. Handles the full workflow: keyword pick, research, writing, proofreading, link validation, internal linking, and hero image.'
---

# Demi Blog Writer

End-to-end pipeline for publishing an SEO-optimized blog post for **demimanifest.com**.

**Default behavior**: Automatically reads the local keyword CSV, finds the next unwritten keyword, and runs the full pipeline. No arguments needed.

**Input**: `$ARGUMENTS` is optional:

- Empty (default) → auto-pick the next unwritten keyword, generate 1 article
- A number (e.g., `5`) → auto-pick and generate that many articles in sequence
- A specific keyword (e.g., `manifestation for skeptics`) → use that keyword, generate 1 article

## Batch Mode

When `$ARGUMENTS` is a number N, run the **entire pipeline (Steps 1-9) N times in a loop**. Each iteration auto-picks the next unwritten keyword. Between iterations, re-scan `written.csv` so the next keyword is correctly identified.

Show a progress header before each iteration:

```
========================================
ARTICLE [X/N] — Starting...
========================================
```

After all iterations, show a final batch summary listing every published slug + title.

---

## About Demi

**One-liner**: A 30-second daily ritual for people who half-believe in manifestation.

Demi is a **manifestation app for skeptics**. No affirmations you have to perform. No vision boards. No forty-five-minute morning pages. You open the app, hold your future self in view for thirty seconds, close it, and go live your ordinary Tuesday. Key ideas that run through everything Demi publishes:

- **Half-belief is enough.** You don't need to believe. You need to show up.
- **Attention, not faith.** Manifestation — honestly — is paying attention, on purpose, to what you actually want. The woo is aesthetic; the practice is attention.
- **Ordinary Tuesdays.** The life you want lives inside ordinary Tuesdays, not mountaintop moments. A 30-second ritual survives every week.
- **Deliberately unambitious.** A workout works whether or not you believe in it. So does thirty seconds of attention.

**Pricing / distribution**: iOS app. Free to download. (Price tiers may change — don't invent specifics unless the host repo's pricing page confirms them.)

**Audience**: smart, slightly skeptical women (and men) in their late 20s–40s who would roll their eyes at most manifestation content and open Demi anyway. Therapy-literate, burned out by hustle content, tired of routines that don't survive a normal week.

**Voice**: literary-direct. Short sentences. Dry warmth. Anti-hype, anti-guru, anti-performative-belief. Concrete images ("oat milk on the keyboard") over abstractions ("manifest abundance"). Permission, not pressure.

---

## CTA Guidelines

Every article ends with a moderate, natural CTA (2-3 sentences) that ties the topic back to Demi. Rules:

- Mention "Demi" by name once or twice — never more
- Tie to the article's topic (half-belief, attention, ordinary Tuesdays, 30 seconds, the life you're after quietly finding you)
- Soft call to action: "[Download Demi](https://demimanifest.com)" or "Try it on one ordinary Tuesday at [demimanifest.com](https://demimanifest.com)"
- Never pressure, never promise outcomes
- Never use: "manifest your best life", "abundance mindset", "high-vibe", "the universe has your back", "unlock", "10x", "revolutionize", "game-changer", "unleash"

**Examples (use as seeds, never copy verbatim):**

- _"If you've tried the forty-five-minute morning routines and quietly stopped, [Demi](https://demimanifest.com) is thirty seconds. Small enough to survive a normal Tuesday. Honest enough to start with half-belief."_
- _"Most manifestation apps ask you to perform belief. [Demi](https://demimanifest.com) asks you to show up for thirty seconds. That's the whole deal."_
- _"The life you're after tends to find you when you keep showing up. [Demi](https://demimanifest.com) is the smallest ritual we could build that still does that."_

---

## Writing Guidelines (inline)

### Tone & voice

- Literary-direct. Short sentences. Active voice. Concrete images.
- Dry warmth. A little wry. Never cold, never saccharine.
- Drop: "It's worth noting", "In today's world", "Remember,", "Keep in mind,", "Don't forget,", "In conclusion", "Imagine this:", "Let's be honest,".
- No manifestation-guru vocabulary: "high-vibe", "abundance", "the universe", "align", "vibration", "quantum", "frequency" — avoid entirely unless quoting someone to critique.
- No therapy-app vocabulary either: "journey", "unpack", "hold space", "showing up for yourself" (except where genuinely apt).
- Use real nouns: "commute", "inbox", "Tuesday", "oat milk", "the walk to the car" — not abstractions.
- Retain real terms where relevant (reticular activating system, confirmation bias, scripting, affirmation) — define briefly if used.

### Structure

- Clear, descriptive H2 headers. **Never** use generic headers like "Introduction", "Conclusion", "Overview", "What is X", "Tips for X", "Final Thoughts".
- Good header examples: "You don't need to believe. You need to show up.", "The case for small.", "Ordinary Tuesdays."
- Up to ~5 main sections. Each main section: 0–2 subsections max.
- Short paragraphs (1–4 sentences). White space is a feature, not a bug.
- Bold for emphasis sparingly. No bold phrases in every paragraph.
- Tables only when comparison genuinely helps (app vs. app, method vs. method). Not forced in every article.

### Introduction (inverted pyramid — but literary)

1. **Hook** (1–2 sentences): a concrete scene or a bold honest claim. Not a question. Not a "Imagine if…".
2. **Value summary** (2–3 sentences): the key insight upfront. No teasing, no "in this article we'll explore".
3. **Optional bullets**: only if genuinely useful at a glance — not obligatory.
4. **Bridge** (1 sentence): transition into the body.

The intro must deliver value on its own — someone who reads only the intro should walk away with the honest answer.

### Sections

- Each section gives **new** information or a new angle — no recap openers.
- Start sections with the concrete claim, not "In this section we'll…".
- Real examples only. **Never** use "Person A", "Example 1", "hypothetical reader" — either use a specific named example (actual person, actual app) or write the sentence concretely enough that a placeholder isn't needed.
- No fabricated statistics, no made-up quotes, no invented studies. If you cite research (e.g., RAS, confirmation bias), link to a primary source (university page, APA, peer-reviewed paper).
- It's okay — and often good — to admit uncertainty. "We don't know whether the universe is listening. We do know that attention changes what you notice."

### Metadata

**SEO Title** (30-60 chars):

- Front-load the primary keyword
- Differs from the H1 while preserving meaning (the H1 can be literary; the SEO title should be searchable)
- Match real search intent
- Ends with ` | Demi`

**Meta Description** (50-160 chars):

- Summarize the article, don't repeat the title
- Plain language, no hype, ends with period or question mark
- Should make a skeptical reader click

**Keywords** (5-10): primary keyword + variants + 2-3 related terms. Stored as a YAML list.

**Tags** (2-4): broad topical buckets — e.g. `manifestation`, `daily ritual`, `half-belief`, `attention`, `skeptics`, `morning routine`. Pick from the existing tag vocabulary in `content/blog/` when possible — don't invent a new tag for every post.

### Sibling-site cross-links (natural only)

We run three sibling sites. When — and only when — the post has a genuinely relevant angle, link to one of them **once**, inline, as an external reference. **Never force a link.** If no natural opening exists in a given post, don't add one — a forced cross-link is worse than no cross-link.

- **[demimanifest.com](https://demimanifest.com)** — Demi, the manifestation-for-skeptics app (this site). Most posts already self-link via the CTA; don't double-link.
- **[deenup.com](https://deenup.com)** — DeenUp, a daily ritual app for Muslims. Natural fit when a post touches on: daily ritual across faith traditions, small-practice habit formation in a religious context, attention/intention in prayer, Ramadan-season habit design, or comparing secular ritual to religious ritual honestly.
- **[deenback.com](https://deenback.com)** — DeenBack, an Islamic short-form content app. Natural fit when a post touches on: short-form daily content as a habit anchor, attention and scrolling, replacing doomscrolling with intentional content, micro-content + habit formation.

**Test for "natural":** could a thoughtful reader who has never heard of the sibling site read that sentence and think _"yes, that's a reasonable thing to link to there"_? If the sentence had to be twisted to make the link fit, remove both the link and the twist.

**Placement:** inline, in the body of the sentence that already wanted to gesture at the idea — not a "see also" dump, not in the CTA.

### External links — approval rules

**APPROVE** links to:

- Official sites of any product/app mentioned (the actual homepage, not App Store listing)
- Peer-reviewed / authoritative sources: university pages, APA, Nature, NIH, Wikipedia, MDN
- Primary sources written by the author/researcher themselves
- Reputable long-form outlets when used as an example (NYT, The Atlantic, New Yorker) — not listicles

**REJECT** links to:

- Manifestation-guru blogs, "law of attraction" content farms, affiliate "best manifestation journal" listicles
- Amazon product pages, retail, marketplaces
- MLM / coaching funnels, "manifest $10k" sales pages
- Random Medium / Substack SEO spam

Principle: link to the official source, not to pages selling or packaging it.

---

## Pipeline Steps

Execute in order. After each step, briefly show the result before proceeding.

### Step 1: Pick Keyword

1. Read `~/.claude/skills/demimanifest-blog-writer/keywords.csv`.
2. Read `~/.claude/skills/demimanifest-blog-writer/written.csv` — this tracks every keyword already covered (including secondary keywords clustered into a single post).
3. Parse keywords, skip the header row and empty cells.
4. If `$ARGUMENTS` is empty → pick the **first keyword from the list that isn't in `written.csv`**.
5. If `$ARGUMENTS` is a specific keyword → use that.
6. Also list files in the host repo's `content/blog/` as a secondary dedupe check.

Show: picked keyword + slug.

**After publishing (end of Step 8):** append ALL keywords targeted by the post to `written.csv` — not just the primary. If a post about "manifestation for skeptics" also covers "does manifestation actually work", append both rows.

### Step 2: Research

Web search the topic with queries focused on:

- How real (skeptical) people actually talk about the topic — Reddit threads, reviews, therapist posts
- Current competitor apps (Manifest, Mindvalley, To Be Magnetic, Lacy Phillips, Rhonda Byrne material) — know who they are, pick what's honest about them
- The science-adjacent evidence where it exists: reticular activating system, confirmation bias, goal-setting research, habit formation (BJ Fogg), attention research
- 2026 cultural moment — lucky girl syndrome, scripting, "that girl" routines — know the vocabulary so you can write around or against it honestly
- Real examples, real names, real numbers — no "some studies suggest"

Keep research quick and actionable. Gather enough for a well-informed article without deep-diving.

Show: 3-5 key findings that will shape the article.

### Step 3: Write Article

#### 3.0 — Confirm host stack

The demimanifest project uses:

- **Next.js 15** (App Router)
- Blog posts: **plain Markdown with YAML frontmatter** at `content/blog/[slug].mdx`
- Rendering: `lib/blog.ts` uses remark/rehype (supports raw HTML, but no MDX JSX components — so don't use `<Image>`, `<QuizEmbed>`, etc.)
- Post pages live at `app/blog/[slug]/page.tsx` and pull frontmatter + metadata automatically
- Images go in `public/` and are referenced with absolute paths (e.g. `/blog/[slug]/hero.jpg`)

Before writing, glob `content/blog/*.mdx` to confirm existing slugs and conventions. Match the convention of the existing post (`half-belief-is-the-honest-place-to-start.mdx`) — don't invent a new structure.

If the host repo's blog location has moved (e.g. `data/blog/` instead of `content/blog/`), match whatever's there and update this skill.

#### 3.1 — Frontmatter schema (required fields)

The `PostFrontmatter` type in `lib/blog.ts` is the source of truth:

```yaml
---
title: 'Literary H1 — can be expressive'
description: 'One-sentence plain-language summary, 50–160 chars, ends with . or ?'
date: '2026-MM-DD'
updated: '2026-MM-DD'
author: 'Demi'
tags: ['manifestation', 'daily ritual']
keywords:
  - primary keyword
  - variant keyword
  - related keyword
image: '/blog/[slug]/hero.jpg'
---
```

- `title` is the H1 shown in the post layout (`page.tsx` renders it from frontmatter). **Do NOT repeat the title as an `# H1` inside the body** — it would render twice.
- `description` feeds both meta description and the lead paragraph shown in the layout (`t-lead mb-10`). Write it once, write it well.
- `date` and `updated` — use **2026** for the year.
- `image` — path under `public/`. Keep `1200x630` OG-ready.
- `draft: true` hides the post in production.

#### 3.2 — Body conventions

Because the post layout already renders the title, description, date, and eyebrow, **the MDX body starts directly with the first paragraph of prose**. Open with the hook. Don't restate the title.

Allowed markdown:

- Standard headings (`##`, `###`)
- Paragraphs, lists, blockquotes, bold/italic, links
- Inline HTML (remark-rehype is configured with `allowDangerousHtml: true`) — but prefer plain markdown
- GFM features (tables, task lists, strikethrough) via `remark-gfm`

**Not allowed** (would break rendering): MDX JSX components like `<Image>`, `<Callout>`, `<YouTube>`. This is a markdown pipeline, not MDX-with-components.

HTML entities for curly quotes are fine (`&rsquo;`, `&ldquo;`) — the existing post uses them.

Show: filename, title, description, word count, tags.

### Step 4: Proofread

Review the draft and fix:

- Guru vocabulary that slipped in ("high-vibe", "abundance", "align", "the universe has your back")
- Generic filler ("It's worth noting", "In today's world", "In conclusion", "Let's dive in")
- Repetitive sentence openings — especially repeated "Remember..." / "Imagine..." / "Think about...".
- Passive voice where active is clearer
- Overly long sentences — split them (Demi's voice is short).
- Any promise of outcomes ("you will manifest X", "this guarantees Y") — replace with honest language about attention and showing up
- Restated title at the top of the body (the layout renders it)

Read it mentally — if it sounds like a smart, tired, slightly-skeptical friend explaining it to you over coffee, it's good.

Show: number of changes + a one-line summary of what was fixed.

### Step 5: Validate External Links

For every external URL in the post, fetch it and verify HTTP 200 (or a valid redirect: 301/302/307/308).

```bash
curl -sI -o /dev/null -w "%{http_code}" -L --max-time 10 "<URL>"
```

- Remove or replace any non-200s
- Don't include links you can't verify
- Follow the **External links** approval rules above — official/primary sources only, no affiliate spam, no guru funnels

Show: list of links + their status.

### Step 6: Add Internal Links

1. Glob `content/blog/*.mdx` to get every existing slug.
2. Read each one briefly to know what it's about.
3. Identify 3–5 natural anchor opportunities to link to other posts OR to product pages (`/`, `/about`, `/contact`).
4. Add the links **inline** where they fit naturally — never in a "Related" dump list.
5. If there are fewer than 3 existing posts on the site, link fewer times and fall back to `/` (the manifesto / home) and `/about`.

**Good:** "If you've already read [the case for half-belief](/blog/half-belief-is-the-honest-place-to-start), this is the companion question…"

**Bad:** "Related posts: [post a](/blog/a), [post b](/blog/b)" (no disconnected link lists)

**Constraints:**

- Minimum 3 internal links when the site has enough posts; otherwise as many as fit naturally
- Maximum 5 internal links
- Each must fit naturally in sentence context — no "click here", no forced anchors
- Never self-link

Show: list of internal links and where they were placed.

### Step 7: Generate Hero Image

Hero image rules:

- One clear, central visual concept — a single object or scene
- Mood: quiet, natural light, lived-in — not glossy
- Palette: soft neutrals + one lavender or blush accent (Demi's brand leans lavender — see `lav-500` in the theme)
- No text in the image
- No stock-photo clichés (no "woman meditating on beach at sunset", no vision boards, no sparkles, no cosmic galaxies)
- Prefer concrete: a windowsill, a single ceramic mug, a hand on a phone, morning light on a pillow, a half-open notebook

**Good prompts:**

- "A single ceramic mug on a sunlit windowsill, soft morning light, muted palette, editorial photography"
- "A hand holding a phone on a kitchen counter at dawn, soft lavender accent, unstyled, editorial"
- "An unmade bed catching first morning light, one pillow dented, quiet domestic scene, film photography"

Save to `public/blog/[slug]/hero.jpg` (the path referenced by `image` in frontmatter).

If no image-gen tool is available in the environment, **skip with a note** in the summary — don't block publishing. The existing fallback is `/og.png`; use that as `image` if no hero was generated.

Show: image path, status.

### Step 8: Register Blog Post

There is **no separate registry** — `lib/blog.ts` auto-discovers posts by globbing `content/blog/*.mdx`. So registration is automatic once the file is saved.

Then **append every targeted keyword** (primary + secondary clustered keywords) to `~/.claude/skills/demimanifest-blog-writer/written.csv`.

Show: confirmation that written.csv was updated and the post appears when `getAllSlugs()` is re-run (or just that the file exists at the expected path).

### Step 9: Summary

```
BLOG POST PUBLISHED
===================
Keyword:        [keyword]
Slug:           [slug]
File:           content/blog/[slug].mdx
Image:          [path or "skipped — using /og.png fallback"]
Title:          [title]
Description:    [description]
Word Count:     [count]
Tags:           [tags]
Internal Links: [count]
External Links: [count] (all verified)
Status:         READY

Checklist:
- [ ] Body starts with the hook — title not duplicated as H1 in body
- [ ] Intro delivers value in the first 3 sentences (no warmup)
- [ ] Headers are concrete and descriptive (no "Introduction"/"Conclusion")
- [ ] No repeated content across sections
- [ ] No guru vocabulary ("high-vibe", "abundance", "align", "the universe")
- [ ] No promise-of-outcome language
- [ ] Voice is short-sentenced, concrete, dryly warm
- [ ] Frontmatter complete: title, description, date (2026), updated, author, tags, keywords, image
- [ ] description is 50–160 chars and ends with . or ?
- [ ] All external links verified (200 OK) and from approved sources
- [ ] 3–5 internal links added naturally
- [ ] CTA mentions Demi + demimanifest.com once or twice, fits the topic
- [ ] Hero image generated (or skipped with note)
- [ ] written.csv updated with all targeted keywords
```

---

## Important

- Default is ALWAYS auto-pick the next unwritten keyword
- NEVER skip proofreading or external link validation
- NEVER add MDX JSX components (`<Image>`, `<Callout>`) — this is a plain-markdown pipeline
- NEVER duplicate the title as an H1 inside the body — the layout already renders it
- If image generation fails or is unavailable, continue with a note and use `/og.png` — don't block
- Follow the **Writing Guidelines** and **CTA Guidelines** sections above exactly — do not improvise structure or voice
- Check for existing posts with the same slug before writing
- Match the existing post's frontmatter shape exactly (see `content/blog/half-belief-is-the-honest-place-to-start.mdx`)
- Always use **2026** for dates
- The skill lives at `~/.claude/skills/demimanifest-blog-writer/` and is fully self-contained — it does not touch or share files with other blog-writer skills
