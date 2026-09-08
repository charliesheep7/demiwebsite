#!/usr/bin/env python3
"""Pick from saved Demi research without mixing locales or repeating live topics.

Usage: tracker.py next [N] --locale en|de|fr|tr|it
       tracker.py stats [--locale en]
       tracker.py refresh [--locale en]

Native queues are research-ready. They are not publish-ready until the site has
locale routes; the JSON output states this explicitly. No command publishes.
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
    path = SKILL / f'keywords-researched-{locale}.json'
    if not path.exists():
        return []
    data = json.loads(path.read_text())
    if data['locale'] != locale or any(r['locale'] != locale or not r.get('slug') for r in data['rows']):
        raise ValueError(f'{path}: invalid locale or missing slug')
    return data['rows']


def published(locale):
    directory = SITE / 'content/blog' if locale == 'en' else SITE / f'content/blog/{locale}'
    return list(directory.glob('*.mdx'))


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


def candidates(locale):
    rows = [dict(r, queue='researched') for r in read_rows(locale)]
    if locale == 'en':
        with (SKILL / 'keywords.csv').open(newline='') as f:
            for row in csv.DictReader(f):
                keyword = row.get('keyword', '').strip()
                if keyword:
                    rows.append({'keyword': keyword, 'locale': locale, 'slug': re.sub('[^a-z0-9]+', '-', key(keyword)).strip('-'),
                                 'queue': 'legacy', 'secondary_keywords': [], 'sources': [], 'volume_status': 'unverified_legacy'})
    return rows


def available(locale):
    covered, slugs = covered_terms(locale)
    seen_terms, seen_slugs, out = set(), set(), []
    if locale == 'en':
        spec = importlib.util.spec_from_file_location('dupecheck', SKILL / 'dupecheck.py')
        dupe = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(dupe)
        existing = [dupe.words(term) for term in covered]
    for row in candidates(locale):
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
        out.append(dict(row, publish_ready=locale == 'en',
                        readiness_note='English blog route exists.' if locale == 'en' else
                        'Research queue only: implement and verify this locale’s blog routes before publishing.'))
    return out


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=('next', 'stats', 'refresh'))
    parser.add_argument('count', nargs='?', default=1, type=int)
    parser.add_argument('--locale', choices=LOCALES, default='en')
    args = parser.parse_args()
    if args.count < 1:
        parser.error('count must be positive')
    if args.command == 'refresh':
        path = SKILL / f'keywords-refresh-{args.locale}.json'
        result = json.loads(path.read_text())['rows'] if path.exists() else []
    else:
        rows = available(args.locale)
        result = rows[:args.count] if args.command == 'next' else {
            'locale': args.locale, 'researched_rows_saved': len(read_rows(args.locale)),
            'researched_available': sum(r['queue'] == 'researched' for r in rows),
            'legacy_available': sum(r['queue'] == 'legacy' for r in rows),
            'published_posts': len(published(args.locale)), 'publish_ready': args.locale == 'en'}
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
