"""Prepare editorial assignments from UI-captured Semrush page clusters.

This does not publish articles or change the active blog-writer queue.
"""
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).parent


def normalize(text):
    text = text.lower().replace('ı', 'i').replace('ß', 'ss')
    text = ''.join(c for c in unicodedata.normalize('NFKD', text) if not unicodedata.combining(c))
    return re.sub(r'[^a-z0-9]+', '-', text).strip('-')


EXCLUDE = {
    'de': {
        '25 affirmationen gesundheit und heilung': 'Healing intent is outside this manifestation content batch.',
        'affirmationen gegen angst': 'Clinical/anxiety drift; prioritize nonclinical manifestation practices.',
        'gruppen achtsamkeitsübung': 'Facilitated group activity outside the app use case.',
        'coaching selbstwertgefühl': 'Service-shopping intent.',
        'geringes selbstwertgefühl symptome': 'Clinical symptom intent.',
        'journal entry starters': 'Wrong-language keyword.',
        'so stärken sie ihr selbstwertgefühl damit das leben einfach wird': 'Book-title style query and duplicate self-esteem intent.',
        'yoga kissen': 'Unrelated physical product intent.',
        'meditationskissen rund': 'Unrelated physical product intent.',
        'niesen uhrzeit bedeutung': 'Off-topic superstition attached to a bodily symptom.',
        'lebenszahl 10 sexualität': 'Off-topic sexual compatibility drift.',
        'organuhr 2 uhr nachts': 'Health/body-clock drift.',
        'nazi zeichen': 'Unrelated political-symbol query.',
        'how to build a vision board': 'Wrong-language keyword.',
        'uhr organe': 'Health/body-clock drift.',
        'meditation kurse': 'Local/service-shopping intent.',
        'vision board ideas': 'Wrong-language keyword.',
        'aesthetic vision boards': 'Wrong-language keyword.',
        'music and meditation': 'Wrong-language keyword.',
        'top meditation apps': 'Wrong-language keyword.',
        'kognitive verhaltenstherapie übungen für zuhause': 'Clinical treatment intent.',
        'entspannungsmusik 10 minuten': 'Audio playback intent; a text article would not fulfill it.',
        'entspannungsmusik natur': 'Audio playback intent; a text article would not fulfill it.',
        'meditation entspannungsmusik': 'Audio playback intent; a text article would not fulfill it.',
    },
    'fr': {
        'qst a poser a un mec': 'Dating conversation list outside this reflection batch.',
        'enfant confiance': 'Child-development drift.',
        'comment ne plus avoir peur': 'Overbroad anxiety/clinical intent.',
        'quelle question poser a une femme': 'Dating conversation list outside this reflection batch.',
        'question existentielle drole': 'Entertainment intent.',
        'journal intime kidi secret': 'Unrelated branded toy.',
        'questionnaire meilleure amie': 'Friendship quiz outside this reflection batch.',
        'thérapie écriture': 'Clinical therapy intent.',
        'gratitude journal diary': 'Wrong-language keyword.',
        '50 exercices de visualisation créatrice pdf': 'Specific copyrighted-book download intent.',
        'éveil spirituel symptômes physiques': 'Health symptom query; avoid attributing symptoms to spirituality.',
        'se réveiller plusieurs fois dans la nuit signification spirituelle': 'Sleep symptom query; avoid spiritual diagnosis.',
        'toucher son nez signification heure miroir': 'Unrelated bodily-sign superstition.',
        'cohérence cardiaque pour dormir': 'Physiological/health technique outside this batch.',
        'centre de méditation': 'Local service intent.',
        'meditation retraite': 'Retreat/travel intent.',
        'mindfulness mindfulness': 'Wrong-language/duplicate wording.',
        'cohérence cardiaque méditation': 'Physiological/health technique outside this batch.',
        'exercice de cohérence cardiaque sur des sonorités méditatives': 'Specific physiological/audio exercise intent.',
        'méditation jan et olivia sommeil': 'Creator-specific playback intent.',
        'mike méditation nettoyage émotionnel': 'Creator-specific playback intent.',
        'nicole bordeleau méditation': 'Creator-specific playback intent.',
        'méditation cédric michel apaisement': 'Creator-specific playback intent.',
        '15 minute meditation': 'Wrong-language keyword.',
        'méditation transcendantale mantra': 'Specific meditation tradition outside this product batch.',
    },
    'tr': {
        'gece cilt bakımı sıralaması': 'Unrelated skincare query.',
        'çocuğumun özgüvenini nasıl geliştirebilirim': 'Child-development drift.',
        'sosyal anksiyete nedir': 'Clinical condition intent.',
        'şükür namazından sonra okunacak dua': 'Religious worship query outside Demi.',
        'duygu etkinliği': 'Child-development/classroom drift.',
        'erkeğe güven nasıl verilir': 'Relationship control/communication drift.',
        'hedef belirleme sunum': 'Slide-deck intent; merge useful planning ideas into goal setting.',
        'sevgi eksikliği nasıl giderilir': 'Clinical/attachment drift.',
        'duygu kavramı okul öncesi': 'Child-development/classroom drift.',
        '478 nefes teknigi': 'Physiological technique outside this batch.',
        'doğru nefesin faydaları': 'Health-benefit intent.',
        'melek kartları': 'Card-reading/product intent outside the current number-sign practice.',
        'tasavvufta sayıların anlamı': 'Religious tradition outside Demi.',
        'dijital pano örnekleri': 'Ambiguous display-board query, not clearly a vision board.',
        'melek tarot kartları': 'Card-reading/product intent outside the current number-sign practice.',
        'çakra açma': 'Specific energy-healing practice outside this batch.',
    },
    'it': {
        'trucchi per calmare l ansia': 'Anxiety treatment drift.',
        'come combattere l ansia': 'Anxiety treatment drift.',
        'come aiutare una persona che soffre di ansia': 'Clinical support intent.',
        'differenza tra attacco di panico e ansia': 'Clinical differential intent.',
        'ansia senza motivo': 'Clinical symptom intent.',
        'autostima bambini': 'Child-development drift.',
        'bullet journal ideas': 'Wrong-language keyword.',
        'ansia sintomi fisici': 'Clinical symptom intent.',
        'journaling application': 'Wrong-language keyword.',
        'essere obiettivi': 'Objectivity meaning, not goal setting.',
        'frasi per uno sportivo': 'Sports quotation drift.',
        '22 33 astrocenter': 'Specific competitor navigation intent.',
        'belle frasi brevi': 'Overbroad quotation intent.',
        'speciale frasi belle da dire': 'Overbroad quotation intent.',
        'saggezza pensieri positivi divertenti': 'Entertainment quotation drift.',
        'kaizen significato': 'Workplace methodology outside Demi.',
        'numeri da tatuare': 'Tattoo-design intent.',
        'meditazione video': 'Video playback intent.',
        'meditazione per ansia e stress': 'Clinical anxiety intent outside this batch.',
    },
}

# Shared intent groups were reviewed across the captured lists. The first term is
# an identifier, not a fabricated search-volume claim.
GROUPS = {
    'de': [
        ['journaling deutsch'], ['selfcare ideen', 'selbstfürsorge ideen'],
        ['positive affirmationen', 'positive affirmation', '100 positive affirmationen'],
        ['liebe positive gedanken', 'positive liebevolle gedanken'],
        ['selbstwertgefühl stärken', 'übungen zur stärkung des selbstwertgefühls'],
        ['lebensziele finden', 'lebens ziele', 'was will ich im leben'],
        ['vision board', 'vision board bilder'],
        ['lernen zu meditieren', 'was ist meditation'],
        ['selbstliebe lernen', 'selbstliebe übungen', 'was ist selbstliebe'],
        ['positive glaubenssätze', 'positive glaubenssätze liste pdf'],
        ['glaubenssätze auflösen', 'negative glaubenssätze liste pdf'],
        ['achtsamkeit übungen', 'meditation achtsamkeit'],
        ['geführte meditation', 'kostenlose meditationen', 'meditation auf deutsch'],
        ['smart ziele', 'smart bedeutung deutsch'],
        ['engelszahlen', 'zahlen bedeutung', '4 stellige zahlen mit bedeutung'],
    ],
    'fr': [
        ['journal intime', 'définition du journal intime', 'journal intime adulte'],
        ['amour de soi', 's aimer soi même', 'amour propre def'],
        ['confiance en soi definition', 'etre sur de soi'],
        ['manque de confiance en soi', '12 signes de manque de confiance en soi'],
        ['estime de soi', 'manque d estime de soi', 'faible estime de soi'],
        ['exercice sur la confiance en soi', 'développement personnel confiance en soi'],
        ['communication assertive', 'assertivité définition'],
        ['mieux se connaitre', 'comment faire une introspection de soi', 'bilan personnel'],
        ['valeurs humaines', 'qu est ce qu une valeur'],
        ['comment manifester', 'technique de manifestation puissante'],
        ['comment refaire confiance', 'confiance en personne'],
        ['vision board', 'tableau de visualisation'],
        ['meditation guidee', 'méditation guidée', 'meditation gratuite', 'méditation relaxation guidée gratuite', 'séance de méditation'],
        ['méditation pleine conscience', 'la pleine conscience'],
        ['meditation du soir', 'méditation du soir'],
        ['meditation pour dormir', 'meditation pour s endormir', 'meditation pour dormir et lacher prise', 'méditation pour se rendormir'],
        ['relaxation meditation', 'séance relaxation', 'meditation calme profond'],
        ['meditation courte', '10 minutes de méditation de pleine conscience'],
        ['la visualisation positive', 'visualisation créatrice'],
        ['nombre des anges', 'signification nombres'],
    ],
    'tr': [
        ['günlük nasıl tutulur', 'günlük yazma', 'günce tutmak', 'kısa günlükler'],
        ['vision board nasıl yapılır', 'vizyon panosu', 'yaratım panosu', 'vision board'],
        ['özgüven nasıl kazanılır', 'kendine güven'],
        ['özgüven ne demek', 'özgüvenli insanların özellikleri'],
        ['numeroloji 3 sayısı', 'numerolojide 3 sayısının anlamı'],
        ['sayıların anlamları', 'meleklerin işaretleri'],
    ],
    'it': [
        ['amare se stessi', 'volersi bene', 'pensare a se stessi'],
        ['autostima aumentare', 'autostima esercizi', 'credere in se stessi'],
        ['journaling', 'diario per scrivere pensieri'],
        ['manifesting significato', 'come manifestare qualcosa'],
        ['pensieri positivi', 'pensiero positivo frasi', 'frasi positive brevi'],
        ['consapevolezza di se', 'consapevolezza significato'],
        ['meditazione guidata', 'meditazioni guidate gratis'],
        ['meditazione principianti', 'meditazione giornaliera'],
        ['meditazione guidata per rilassare mente e corpo', 'meditazione guidata rilassamento profondo'],
        ['meditazione mindfulness', 'metodo mindfulness'],
        ['numero angelico', 'significati dei numeri', 'numeri angelici da 0 a 100'],
    ],
}


# Original strategy lists, captured after the first expansion batches.
EXCLUDE['de'].update({k: 'Wrong-language, dictionary-only, or entertainment query outside this native practice queue.' for k in ['daily affirmations','affirmation mean','affirmativ bedeutung','positiv denken sprüche lustig']})
EXCLUDE['de']['mantra für gesundheit']='Health outcome intent outside this reflection batch.'
EXCLUDE['fr'].update({k: 'Broad quotation intent without a specific Demi practice.' for k in ['proverbe de la vie touchant','proverbes citation penser à soi','encouragement citation sur la vie et l espoir']})
EXCLUDE['tr'].update({'sünnetullah yasaları':'Religious law outside Demi.','manifesto ne demek':'Political/dictionary manifesto intent, not manifestation.'})
EXCLUDE['it'].update({k:'Broad quotation, sport, or dating-tactic drift outside this manifestation queue.' for k in ['frasi motivazionali sport','allontanarsi per farsi desiderare da un uomo','pensieri positivi divertenti']})
GROUPS['de'].extend([['manifestieren bedeutung','was bedeutet manifestation'],['dankbarkeitstagebuch','dankbarkeits tagebuch'],['affirmationen selbstliebe','selbstliebe affirmationen'],['glaubenssätze auflösen','negative glaubenssätze liste']])
GROUPS['fr'].extend([['vision board','visualisation board'],['elevation spirituelle','eveil spirituel'],['pensées positives','bonheur pensée positive']])
GROUPS['tr'].extend([['evrensel yasa','evrenin kuralları'],['olumlama cümleleri','olumlama nedir']])


def angle(locale, keyword, number=None):
    if number:
        return {
            'de': f'{number}: verbreitete spirituelle Deutungen, Reflexionsfragen und ein kleines Alltagsritual. Deutungen als Glauben kennzeichnen, keine Vorhersagen versprechen.',
            'fr': f'{number} : interprétations spirituelles courantes, questions de réflexion et petit rituel personnel. Présenter ces interprétations comme des croyances, sans promettre un événement.',
            'tr': f'{number}: yaygın spiritüel yorumlar, günlük soruları ve küçük bir kişisel ritüel. Yorumları inanç olarak sun; geleceğe ilişkin garanti verme.',
            'it': f'{number}: interpretazioni spirituali comuni, domande di journaling e un piccolo rituale personale. Distinguere le credenze dai fatti, senza promettere eventi futuri.',
        }[locale]
    return {
        'de': f'{keyword}: verständliche Erklärung, konkrete Beispiele und eine angeleitete Übung für die eigene Reflexionsroutine.',
        'fr': f'{keyword} : explication accessible, exemples concrets et exercice guidé pour une pratique personnelle de réflexion.',
        'tr': f'{keyword}: anlaşılır açıklama, somut örnekler ve kişisel farkındalık rutini için adım adım bir uygulama.',
        'it': f'{keyword}: spiegazione accessibile, esempi concreti e un esercizio guidato per la propria routine di riflessione.',
    }[locale]


def main():
    summary = {}
    for locale in ['de', 'fr', 'tr', 'it']:
        aliases = {normalize(k): normalize(g[0]) for g in GROUPS[locale] for k in g}
        for k in aliases:
            seen = set()
            while aliases[k] in aliases and aliases[aliases[k]] != aliases[k] and aliases[k] not in seen:
                seen.add(aliases[k]); aliases[k] = aliases[aliases[k]]
        excluded = {normalize(k): reason for k, reason in EXCLUDE[locale].items()}
        grouped, rejected = {}, []
        for path in sorted(ROOT.glob(f'raw-demi-{locale}-*.json')):
            source = json.loads(path.read_text())
            for row in source['rows']:
                if isinstance(row, list):
                    keyword, kd, volume = row
                else:
                    keyword, kd, volume = row['keyword'], row['pageKD'], row['clusterVolume']
                occurrence = {'keyword': keyword, 'source': source['source'], 'displayed_page_kd': kd, 'displayed_cluster_volume': volume}
                norm = normalize(keyword)
                if norm in excluded:
                    rejected.append({**occurrence, 'reason': excluded[norm]})
                    continue
                key = aliases.get(norm, norm)
                number = None
                # A number meaning and its love/twin-flame variant share one page.
                if norm not in aliases and re.search(r'angel|engel|melek|spirit|signific|bedeut|numeroloj|steht|anlami', norm):
                    chunks = re.findall(r'\d+', keyword)
                    if chunks:
                        number = str(int(''.join(chunks)))
                        key = 'number-' + number
                if locale == 'fr' and re.search(r'heure.*miroir', norm) and re.search(r'\d', keyword):
                    number = str(int(''.join(re.findall(r'\d+', keyword))))
                    key = 'number-' + number
                if key not in grouped:
                    slug = ({'de': 'engelszahl-', 'fr': 'signification-', 'tr': 'melek-sayisi-', 'it': 'numero-angelico-'}[locale] + number) if number else key
                    grouped[key] = {'locale': locale, 'intent_key': key, 'slug': slug, 'primary_keyword': keyword, 'article_angle': angle(locale, keyword, keyword if number else None), 'source_occurrences': []}
                grouped[key]['source_occurrences'].append(occurrence)
                if norm == key:
                    grouped[key]['primary_keyword'] = keyword
                    grouped[key]['article_angle'] = angle(locale, keyword)
        assignments = list(grouped.values())
        # Every retained assignment has at least one actual observed source row.
        assert len({a['slug'] for a in assignments}) == len(assignments)
        assert all(a['source_occurrences'] and re.fullmatch('[a-z0-9]+(?:-[a-z0-9]+)*', a['slug']) for a in assignments)
        output = {
            'observed_on': '2026-09-08', 'locale': locale,
            'status': 'reviewed_partial_batch_not_live_queue',
            'scope': 'All three structured lists captured for this locale. Additional Keyword Magic research still needs consolidation.',
            'metrics': 'Cluster volume is the displayed rounded source value, not individual keyword volume. Never sum overlapping source occurrences.',
            'runway_status': 'Incomplete. Not a certification of a 90-day publishing runway. Not yet imported into the publishing routine.',
            'assumed_posts_per_day': 3, 'required_unwritten_assignments': 270,
            'assignment_count': len(assignments), 'assignments': assignments,
            'rejected_occurrences': rejected,
        }
        (ROOT / f'keyword-runway-{locale}.json').write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n')
        summary[locale] = {'reviewed_partial_assignments': len(assignments), 'rejected_source_rows': len(rejected)}
    print(json.dumps(summary, indent=2))


if __name__ == '__main__':
    main()
