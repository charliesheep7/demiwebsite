# Release verification — 15 October 2026

**Production release shipped. Analytics activation remains blocked.**

- Implementation: [PR #2](https://github.com/charliesheep7/demiwebsite/pull/2), merged as `7c3c707d15d2430d3be0873b1a9b59cec81b6785`; Vercel production deployment succeeded.
- Live EN/FR/DE/IT product pages and nine original native articles verified. The existing 430 English posts remain English; this is a complete localized product site plus a native starter library and publishing pipeline, not 430 automatic translations.
- Full live crawl: **514 sitemap URLs, zero validation failures**. Checks cover HTTP status, one H1, expected HTML language, one self canonical, description, indexability, both stores on article pages, and reciprocal language alternates. RSS, robots and social image return 200; invalid articles/pages return 404.
- Build, lint/types, source checks for 439 articles and analytics behavior tests passed. French/German mobile layouts checked at 390 CSS pixels with no horizontal overflow; Italian SP content and contextual offers verified.
- GSC canonical sitemap `https://www.demimanifest.com/sitemap.xml` resubmitted using the browser. Google displayed **“Sitemap submitted successfully.”** Existing non-www submission was preserved. Submission does not guarantee indexing.
- GSC Manual Actions and Security Issues: **No issues detected**. HTTPS: no critical issues and no issues detected in the last 90 days. Core Web Vitals: insufficient usage data on mobile and desktop, not a confirmed field pass.
- [Mobile PageSpeed report](https://pagespeed.web.dev/analysis/https-demimanifest-com/gz5m38eihd?utm_source=search_console&form_factor=mobile&hl=en): performance **95**, accessibility **100**, best practices **100**, SEO **100**. Single lab run at 02:21 GMT+8, emulated Moto G Power/slow 4G; FCP 0.9s, LCP 2.6s, TBT 20ms, CLS 0. Scores can vary and do not establish rankings or real-user Core Web Vitals.

## Remaining blocker

Dedicated EU Mixpanel project 4073625 and [private setup board](https://eu.mixpanel.com/project/4073625/view/4570155/app/boards#id=11587477) exist. The board's saved description explicitly records setup as pending. Tracking code is deployed, but `NEXT_PUBLIC_MIXPANEL_TOKEN` is absent from production; Vercel's environment settings require a two-factor sign-in and the existing CLI credential is unauthorized. The configured connector cannot read the EU project. No token was placed in source control and no authentication protection was changed.

**Clicks are not being recorded yet.** Configure the new project's token in the Vercel production environment, redeploy, accept analytics on a production browser, follow an actual article store link, and confirm the corresponding EU Mixpanel event. Then build saved reports from the agreed schema. The website and store links work without analytics; no consent banner appears while configuration is absent.

Only this activation and live event/report verification remain unfinished. No recurring publishing or monitoring automation was created.
