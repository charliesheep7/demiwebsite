# Demi localized blog routes

German `/de/blog`, French `/fr/blog`, Turkish `/tr/blog`, and Italian `/it/blog` now have native journal indexes and article routes at `/<locale>/blog/<slug>`. English keeps `/blog` and `/blog/<slug>`.

Native articles live in `content/blog/<locale>/<slug>.mdx` (or `.md`). Discovery is isolated per locale: an English article never fills a missing native URL. Independent articles have self-canonicals and no fabricated translation/hreflang pairs. Native article metadata includes its keywords, Open Graph locale and BlogPosting language. Dates, reading times, navigation, sharing controls and app calls to action use the selected language.

English pages moved into the `(english)` route group without changing public URLs. Separate root layouts allow the server to emit the correct HTML language while keeping pages statically generated. The shared document layout is now `components/SiteLayout.tsx`.

Empty native journal indexes return 200 with a native empty state and `noindex, follow`. They enter the sitemap and become indexable automatically when the first published native article exists. Drafts stay out of production indexes and sitemaps. Unknown slugs and unsupported locale paths return 404.

The keyword tracker now detects these route files and returns `publish_ready: true` together with `content_path`, `url_path`, and a locale-specific `image_directory`. The writer instructions use those destinations and native written ledgers. No native article was published in this route implementation.

## Validation

A production build passed with four temporary native articles sharing the same slug and a draft fixture. HTTP checks covered all four article routes, per-language content isolation, correct HTML language/canonicals/structured data, sitemap inclusion, draft exclusion, missing/unsupported 404s and unchanged English public routes. Temporary fixtures were then removed. The final production build and empty-index HTTP checks passed. The German layout was also inspected in the browser.

Run the HTTP regression checks against a production server with:

```bash
npm run build
npm run serve -- -p 3217
node scripts/check-blog-locales.mjs http://localhost:3217
```

The `--fixtures` flag additionally checks native test articles named `locale-route-smoke-test` in each locale; those disposable fixtures are not part of the published repository.
