#!/usr/bin/env python3
"""Read-only selector for the two Demi Claude publishing routines."""
import argparse
import json
from pathlib import Path
import tracker

COMPLETED = tracker.SKILL / 'publishing-completed.json'


def select(slot):
    completed = json.loads(COMPLETED.read_text())['items']
    done = {(r['locale'], r['slug'], r['research_date']) for r in completed}
    picks = []
    if slot == 'morning':
        for locale in ('de', 'fr', 'it'):
            rows = [r for r in tracker.available(locale)
                    if r.get('action') == 'new_article' and r['publish_ready']
                    and (locale, r['slug'], r['observed_on']) not in done]
            if rows:
                picks.append(dict(rows[0], research_date=rows[0]['observed_on']))
    else:
        for row in tracker.read_rows('en'):
            if row.get('action') != 'refresh_existing_page':
                continue
            if ('en', row['slug'], row['observed_on']) in done:
                continue
            path = f"content/blog/{row['slug']}.mdx"
            if not (tracker.SITE / path).is_file():
                raise ValueError(f'Refresh target missing: {path}; do not invent a new URL')
            picks.append(dict(row, research_date=row['observed_on'], content_path=path,
                              url_path=f"/blog/{row['slug']}", publish_ready=True))
    return picks[:3]


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--slot', required=True, choices=('morning', 'evening'))
    args = parser.parse_args()
    rows = select(args.slot)
    print(json.dumps({'slot': args.slot, 'assignments': rows,
                      'status': 'READY' if rows else 'NO_RESEARCHED_ASSIGNMENTS_LEFT',
                      'legacy_fallback': False}, ensure_ascii=False, indent=2))
