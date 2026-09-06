#!/usr/bin/env python3
"""Flag keywords that would produce a near-duplicate of an existing post.

The writer trackers all dedupe on an EXACT slug match, which misses the case
that actually hurts: two different keywords that mean the same thing. On
2026-09-06 defykegel's queue offered "how to grow sex stamina" while
`how-to-sex-stamina-increase` was already live — different slug, same search
intent. Publishing it would have split the site's own ranking between two
pages competing for one query.

Usage
-----
  # check one keyword before writing it
  dupecheck.py --site defykegel --keyword "how to grow sex stamina"

  # audit the next N queued keywords (what a routine should run each morning)
  dupecheck.py --site defykegel --queue 20

  # audit every existing post against every other (find damage already done)
  dupecheck.py --site defykegel --self-audit

Exit status is 1 when anything is flagged, so a routine can gate on it.

Scoring
-------
Keywords are reduced to a content-word set: stopwords and filler dropped, a
crude singular form applied. Two scores are reported.

  containment = |A ∩ B| / min(|A|, |B|)
  jaccard     = |A ∩ B| / |A ∪ B|

Containment is the one that matters. "how to grow sex stamina" -> {grow, sex,
stamina} and "how to sex stamina increase" -> {sex, stamina, increase} share
two of three content words: containment 0.67, jaccard only 0.50. A short
keyword fully inside a longer one is the classic cannibalisation shape, and
jaccard alone scores it too low to notice.
"""

import argparse, json, os, re, sys

REGISTRY = os.path.expanduser("~/.claude/skills/seo-pipeline/sites.json")

# Dropped before comparison: function words, and the question/instruction
# scaffolding that shows up in a large share of these keywords without
# carrying any topic meaning.
STOP = {
    "a", "an", "the", "and", "or", "but", "if", "of", "to", "in", "on", "at",
    "by", "for", "with", "from", "as", "is", "are", "was", "were", "be", "been",
    "do", "does", "did", "can", "could", "will", "would", "should", "how", "what",
    "why", "when", "where", "which", "who", "your", "you", "my", "me", "i", "it",
    "its", "that", "this", "these", "those", "there", "here", "get", "got",
    "make", "made", "guide", "tips", "best", "top", "vs", "versus", "about",
    "some", "any", "s",
    # Qualifiers that never create a distinct page. "average life expectancy of
    # a dog" and "how long do dogs live" are one query; the word "average" was
    # enough to clear the adds-nothing test and let the duplicate through.
    "average", "expected", "typical", "usual", "normal", "mean",
}

# NOT stopwords, though they look like filler: quantity words carry the whole
# question in several of these niches. Dropping "much" made "how much should my
# dog eat" collapse to {dog, eat} and read as a duplicate of "can dogs eat
# maize" — a portion-size query and a specific-food query are different pages.
# Kept here as a reminder not to re-add them: more, most, much, many.

# Near-synonyms folded together so "increase" and "boost" do not read as
# different topics. Deliberately small — an aggressive list creates false
# positives, which train people to ignore the check.
SYN = {
    "increase": "raise", "boost": "raise", "improve": "raise", "grow": "raise",
    "growth": "raise", "enhance": "raise", "raise": "raise",
    "stop": "end", "quit": "end", "end": "end", "cease": "end",
    "cure": "treat", "fix": "treat", "treat": "treat", "heal": "treat",
    "exercise": "exercise", "exercises": "exercise", "workout": "exercise",
    "benefit": "benefit", "benefits": "benefit", "advantage": "benefit",
    "meaning": "meaning", "definition": "meaning", "means": "meaning",
    # Ingredient names that differ by region. "can dogs eat maize" sat in the
    # queue behind four live corn posts and passed every check, because nothing
    # told the script that maize and corn are the same thing.
    "maize": "corn", "corn": "corn",
    "aubergine": "eggplant", "eggplant": "eggplant",
    "courgette": "zucchini", "zucchini": "zucchini",
    "rocket": "arugula", "arugula": "arugula",
    "prawn": "shrimp", "shrimp": "shrimp",
    "coriander": "cilantro", "cilantro": "cilantro",
    "pennis": "penis", "penis": "penis",
    # "How long do dogs live", "dog lifespan", "dog life expectancy" and
    # "average life span of a dog" are one query wearing four hats. Without
    # this, "dog lifespan" shares only the word "dog" with the live
    # how-long-do-dogs-live post and sails through. 89 keywords in one queue
    # belonged to this family.
    "lifespan": "lifespan", "life": "lifespan", "span": "lifespan",
    "expectancy": "lifespan", "live": "lifespan", "lives": "lifespan",
    "living": "lifespan",
}


NUM = {"one": "1", "two": "2", "three": "3", "four": "4", "five": "5",
       "six": "6", "seven": "7", "eight": "8", "nine": "9", "ten": "10",
       "eleven": "11", "twelve": "12", "twenty": "20", "thirty": "30",
       "forty": "40", "fifty": "50", "hundred": "100"}


def words(text):
    text = re.sub(r"['’]", "", text.lower())
    out = set()
    for w in re.split(r"[^a-z0-9]+", text):
        if not w or w in STOP:
            continue
        if len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
            w = w[:-1]          # crude singular: exercises -> exercise
        w = NUM.get(w, w)
        out.add(SYN.get(w, w))
    return out


# Two shared content words is the floor for calling something a duplicate.
# Containment divides by the SMALLER set, so a one-word post slug such as
# "what-are-affirmations" -> {affirmation} scores a perfect 1.00 against every
# keyword containing that word — "wednesday affirmations", "affirmations for
# nurses", all of it. Without this floor the check flagged 20 of 25 genuinely
# distinct keywords against that single slug.
MIN_SHARED = 2


def score(a, b):
    if not a or not b:
        return 0.0, 0.0, 0, 0
    inter = len(a & b)
    # `adds` = content words the candidate has that the existing post lacks.
    # This is the direction that decides cannibalisation. "777 manifestation
    # method" against the live "manifestation-methods" scores 1.00 containment
    # purely because the existing slug is the shorter set — but 777 is a real
    # distinguishing term and deserves its own page. "fasting ashura" against
    # "fasting-on-ashura" adds nothing, and that is a true duplicate.
    return inter / min(len(a), len(b)), inter / len(a | b), inter, len(a - b)


def load_site(key):
    with open(REGISTRY, encoding="utf-8") as fh:
        d = json.load(fh)
    for s in (d if isinstance(d, list) else d["sites"]):
        if s.get("key") == key:
            return s
    sys.exit(f"unknown site '{key}' — not in sites.json")


def posts_of(site):
    pd = site.get("posts_dir")
    if not pd:
        sys.exit(f"site '{site['key']}' has no posts_dir in sites.json")
    ext = site.get("posts_ext", ".mdx")
    if not os.path.isdir(pd):
        sys.exit(f"posts_dir does not exist: {pd}")
    return sorted(f[: -len(ext)] for f in os.listdir(pd) if f.endswith(ext))


def queued(site, limit):
    q = site.get("keyword_queue") or {}
    paths = q.get("keywords")
    if not paths:
        sys.exit(f"site '{site['key']}' has no keyword_queue.keywords in sites.json")
    cols = q.get("columns", [0])
    slugs = set(posts_of(site))
    # A keyword counts as done if a post with its slug exists OR the tracker
    # already lists it. Checking only the slug re-checks hundreds of finished
    # keywords and buries the handful that are genuinely next in line.
    done = set()
    if q.get("written") and os.path.exists(q["written"]):
        with open(q["written"], encoding="utf-8") as fh:
            done = {ln.split(",")[0].strip().lower()
                    for ln in fh.read().splitlines()[1:] if ln.strip()}
    out = []
    for path in ([paths] if isinstance(paths, str) else paths):
        with open(path, encoding="utf-8") as fh:
            for ln in fh.read().splitlines()[1:]:
                if not ln.strip():
                    continue
                parts = ln.split(",")
                for c in cols:
                    if len(parts) > c and parts[c].strip():
                        k = parts[c].strip()
                        sl = re.sub(r"[^a-z0-9]+", "-",
                                    re.sub(r"['’]", "", k.lower())).strip("-")
                        if sl not in slugs and k.lower() not in done:
                            out.append(k)
    return out[:limit]


def report(pairs, thresh, review):
    """Two tiers, because one threshold cannot serve both jobs.

    At 0.6 the check flags roughly four keywords in five — "is ham bad for dogs"
    scores 0.67 against "is-cheese-bad-for-dogs" purely because both are short.
    A check that fires on almost everything gets ignored, which is worse than no
    check. So >=0.8 is reported as a duplicate worth acting on, and the 0.6-0.8
    band is printed separately as context a writer can glance at and dismiss.
    """
    hits = 0
    for label, matches in pairs:
        dupes = [m for m in matches
                 if m[0] >= thresh and m[3] >= MIN_SHARED and m[4] == 0]
        near = [m for m in matches if m not in dupes and m[0] >= review]
        if not dupes and not near:
            continue
        if dupes:
            hits += 1
            print(f"\n⚠  DUPLICATE  {label}")
            for cont, jac, other, n, adds in sorted(dupes, reverse=True)[:4]:
                print(f"     {cont:.2f} containment / {n} shared / adds nothing  ->  {other}")
        elif near:
            print(f"\n·  overlaps      {label}")
            for cont, jac, other, n, adds in sorted(near, reverse=True)[:2]:
                print(f"     {cont:.2f} containment / {n} shared / adds {adds}  ->  {other}")
    return hits


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site",
                    help="site key in sites.json; omit and pass --posts-dir "
                         "to run standalone (e.g. inside a cloud checkout "
                         "where ~/.claude does not exist)")
    ap.add_argument("--posts-dir", help="standalone: directory of published posts")
    ap.add_argument("--posts-ext", default=".mdx", help="standalone: post extension")
    ap.add_argument("--keywords", action="append",
                    help="standalone: keyword CSV (repeatable)")
    ap.add_argument("--written", help="standalone: tracker CSV")
    ap.add_argument("--columns", default="0",
                    help="standalone: comma-separated keyword column indexes")
    ap.add_argument("--keyword")
    ap.add_argument("--queue", type=int, metavar="N",
                    help="check the next N unwritten keywords in the queue")
    ap.add_argument("--self-audit", action="store_true",
                    help="compare every existing post against every other")
    ap.add_argument("--threshold", type=float, default=0.8,
                    help="containment at or above this is reported as a duplicate")
    ap.add_argument("--review", type=float, default=0.6,
                    help="containment at or above this is printed as context")
    a = ap.parse_args()

    if a.posts_dir:
        site = {"key": a.site or "standalone",
                "posts_dir": a.posts_dir, "posts_ext": a.posts_ext,
                "keyword_queue": {"keywords": a.keywords, "written": a.written,
                                  "columns": [int(c) for c in a.columns.split(",")]}}
    elif a.site:
        site = load_site(a.site)
    else:
        ap.error("pass --site, or --posts-dir for standalone use")
    slugs = posts_of(site)
    tok = {s: words(s) for s in slugs}

    if a.self_audit:
        pairs, seen = [], set()
        for i, s in enumerate(slugs):
            ms = []
            for t in slugs[i + 1:]:
                c, j, n, ad = score(tok[s], tok[t])
                if c >= a.review and (s, t) not in seen:
                    ms.append((c, j, t, n, ad)); seen.add((s, t))
            if ms:
                pairs.append((s, ms))
        n = report(pairs, a.threshold, a.review)
        print(f"\n{len(slugs)} posts · {n} with a near-duplicate at ≥{a.threshold}")
        return 1 if n else 0

    targets = [a.keyword] if a.keyword else queued(site, a.queue or 20)
    if not targets:
        print("nothing to check"); return 0
    pairs = []
    for k in targets:
        kt = words(k)
        ms = [(c, j, s, n, ad) for s in slugs
              for c, j, n, ad in [score(kt, tok[s])] if c >= a.review]
        pairs.append((k, ms))
    n = report(pairs, a.threshold, a.review)
    print(f"\n{len(targets)} keyword(s) checked against {len(slugs)} posts · "
          f"{n} flagged at ≥{a.threshold}")
    if n:
        print("Flagged keywords compete with a page that already ranks. Skip them, "
              "or fold the angle into the existing post instead of publishing a rival.")
    return 1 if n else 0


if __name__ == "__main__":
    sys.exit(main())
