#!/usr/bin/env python3
"""Pick from saved Demi research without mixing locales or repeating live topics.

Usage: tracker.py next [N] --locale en|de|fr|tr|it
       tracker.py stats [--locale en]
       tracker.py refresh [--locale en]

Native readiness is derived from the locale configuration and route files.
No command publishes content.
"""
import argparse
import csv
import importlib.util
import json
import os
import re
import unicodedata
from pathlib import Path

SKILL = Path(__file__).resolve().parent
SITE = Path(os.environ.get('DEMI_SITE', SKILL.parents[2]))
LOCALES = ('en', 'de', 'fr', 'tr', 'it')


def key(value):
    value = unicodedata.normalize('NFKC', value).casefold().replace('ı', 'i').replace('ß', 'ss')
    value = ''.join(''.join(d for d in unicodedata.normalize('NFD', c) if not unicodedata.combining(d))
                    if 'LATIN' in unicodedata.name(c, '') else c for c in value)
    return re.sub(r'[^\w]+', ' ', value).strip()


def front_keywords(text):
    front = text.split('---', 2)[1] if text.startswith('---') else ''
    match = re.search(r'(?m)^keywords:\s*(\[[\s\S]*?\]|(?:\n[ \t]+-[^\n]+)+)', front)
    if not match:
        return []
    value = match[1]
    parts = value[1:-1].split(',') if value.startswith('[') else re.findall(r'(?m)^\s*-\s*(.+)$', value)
    return [x.strip().strip("'\"") for x in parts]


def read_rows(locale):
    focused = SKILL / f'keywords-focused-{locale}.json'
    path = focused if focused.exists() else SKILL / f'keywords-researched-{locale}.json'
    if not path.exists():
        return []
    data = json.loads(path.read_text())
    if data['locale'] != locale or any(r['locale'] != locale or not r.get('slug') for r in data['rows']):
        raise ValueError(f'{path}: invalid locale or missing slug')
    return data['rows']


def published(locale):
    directory = SITE / 'content/blog' if locale == 'en' else SITE / f'content/blog/{locale}'
    return sorted([*directory.glob('*.mdx'), *directory.glob('*.md')])


def covered_terms(locale):
    paths = published(locale)
    terms = {key(p.stem.replace('-', ' ')) for p in paths}
    for p in paths:
        terms.update(key(k) for k in front_keywords(p.read_text()))
    # Existing global writers recorded completed work here. Consult both ledgers
    # during migration; future writes use the versioned repository ledger.
    ledgers = [SKILL / ('written.csv' if locale == 'en' else f'written-{locale}.csv')]
    if locale == 'en':
        ledgers += [Path.home() / f'{base}/skills/demimanifest-blog-writer/written.csv' for base in ('.claude', '.agents', '.codex')]
    for path in ledgers:
        if path.exists():
            with path.open(newline='') as f:
                terms.update(key(r[0]) for r in csv.reader(f) if r and r[0] != 'keyword')
    refresh_path = SKILL / f'keywords-refresh-{locale}.json'
    if refresh_path.exists():
        for row in json.loads(refresh_path.read_text())['rows']:
            terms.update(key(k) for k in [row['keyword']] + row.get('secondary_keywords', []))
    return terms, {p.stem for p in paths}


def candidates(locale, include_legacy=False):
    rows = [dict(r, queue='researched') for r in read_rows(locale)]
    if locale == 'en' and include_legacy:
        with (SKILL / 'keywords.csv').open(newline='') as f:
            for row in csv.DictReader(f):
                keyword = row.get('keyword', '').strip()
                if keyword:
                    rows.append({'keyword': keyword, 'locale': locale, 'slug': re.sub('[^a-z0-9]+', '-', key(keyword)).strip('-'),
                                 'queue': 'legacy', 'secondary_keywords': [], 'sources': [], 'volume_status': 'unverified_legacy'})
    return rows


def publish_ready(locale):
    if locale == 'en':
        return True
    config = SITE / 'data/blogLocales.json'
    routes = ['app/[locale]/layout.tsx', 'app/[locale]/blog/page.tsx', 'app/[locale]/blog/[slug]/page.tsx']
    return config.exists() and locale in json.loads(config.read_text()) and all((SITE / path).exists() for path in routes)


def available(locale, include_legacy=False):
    covered, slugs = covered_terms(locale)
    seen_terms, seen_slugs, out = set(), set(), []
    if locale == 'en':
        spec = importlib.util.spec_from_file_location('dupecheck', SKILL / 'dupecheck.py')
        dupe = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(dupe)
        existing = [dupe.words(term) for term in covered]
    for row in candidates(locale, include_legacy):
        terms = {key(k) for k in [row['keyword']] + row.get('secondary_keywords', [])}
        if terms & (covered | seen_terms) or row['slug'] in slugs | seen_slugs:
            continue
        if locale == 'en':
            words = dupe.words(row['keyword'])
            if any(co >= .8 and shared >= 2 and adds == 0
                   for tokens in existing for co, _, shared, adds in [dupe.score(words, tokens)]):
                continue
            existing.append(words)
        seen_terms.update(terms)
        seen_slugs.add(row['slug'])
        out.append(dict(row, publish_ready=publish_ready(locale),
                        content_path=f'content/blog/{row["slug"]}.mdx' if locale == 'en' else f'content/blog/{locale}/{row["slug"]}.mdx',
                        url_path=f'/blog/{row["slug"]}' if locale == 'en' else f'/{locale}/blog/{row["slug"]}',
                        image_directory=f'public/blog/{row["slug"]}' if locale == 'en' else f'public/blog/{locale}/{row["slug"]}',
                        readiness_note='Locale blog routes are configured; publish in the returned content_path.' if publish_ready(locale) else 'Locale routes are not configured.'))
    # Editorial allocation is a starting hypothesis, not a proven optimum.
    buckets = {'love': [], 'support': [], 'money-career': [], 'signs': []}
    for row in out:
        category = row.get('category', '')
        bucket = category if category in buckets else 'support'
        buckets[bucket].append(row)
    schedule = ['love'] * 9 + ['support'] * 6 + ['money-career'] * 3 + ['signs'] * 2
    ordered = []
    while any(buckets.values()):
        for bucket in schedule:
            if buckets[bucket]: ordered.append(buckets[bucket].pop(0))
    return ordered


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=('next', 'stats', 'refresh'))
    parser.add_argument('count', nargs='?', default=1, type=int)
    parser.add_argument('--locale', choices=LOCALES, default='en')
    parser.add_argument('--include-legacy', action='store_true', help='Opt in to unverified historic English keywords; excluded by default.')
    args = parser.parse_args()
    if args.count < 1:
        parser.error('count must be positive')
    if args.command == 'refresh':
        path = SKILL / f'keywords-refresh-{args.locale}.json'
        result = [r for r in read_rows(args.locale) if r.get('action') == 'refresh_existing_page']
        if not result and path.exists(): result = json.loads(path.read_text())['rows']
    else:
        rows = available(args.locale, args.include_legacy)
        result = rows[:args.count] if args.command == 'next' else {
            'locale': args.locale, 'researched_rows_saved': len(read_rows(args.locale)),
            'researched_available': sum(r['queue'] == 'researched' for r in rows),
            'legacy_available': sum(r['queue'] == 'legacy' for r in rows),
            'published_posts': len(published(args.locale)), 'publish_ready': publish_ready(args.locale)}
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
