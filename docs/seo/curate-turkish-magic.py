"""Attach concrete article angles to observed Turkish Keyword Magic terms."""
import json
from pathlib import Path
from importlib.util import spec_from_file_location, module_from_spec

ROOT = Path(__file__).parent
spec = spec_from_file_location('runway', ROOT / 'curate-runway.py')
runway = module_from_spec(spec)
spec.loader.exec_module(runway)
source = json.loads((ROOT / 'magic-demi-tr-olumlama.json').read_text())
rows = {r['keyword']: r for r in source['rows']}

# Keyword | related observed variants | native writing angle
BRIEFS = '''olumlama nedir|olumlama nasıl yapılır;doğru olumlama nasıl yapılır;olumlama ritüelleri|Olumlamanın ne olduğunu, gerçekçi cümle yazmayı ve günlük uygulamayı örneklerle açıklayan başlangıç rehberi.
21 günlük olumlama cümleleri|21 gün olumlama nedir;21 günlük olumlama nasıl yapılır;21 günde olumlama|21 günlük örnek uygulama planı ve ilerleme günlüğü. 21 günün bilimsel bir dönüşüm garantisi olmadığını açıkla.
evlenmek için olumlama|evlilik için olumlama cümleleri;evlilik olumlama cümleleri|Sağlıklı ilişki değerlerini netleştiren evlilik olumlamaları ve günlük soruları. Başkasının kararlarını kontrol etme vaadi verme.
ben değerliyim olumlama|kendimi seviyorum olumlama;hak ediyorum olumlama|Özdeğer ve özsevgi için kişiselleştirilebilir cümleler, inandırıcı ifadeler seçme ve kısa günlük egzersizi.
bilinçaltı olumlama cümleleri|bilinçaltı olumlama;bilinçaltı olumlama nasıl yapılır|Bilinçaltı olumlaması denen pratiği açıkla; otomatik inançları sorgulayan örnekler ver. Zihni yeniden programlama garantisi verme.
olumlama kartları|olumlama kartı|Kendi olumlama kartlarını hazırlama, seçme ve günlük rutin içinde kullanma rehberi.
sabah olumlama cümleleri|güne başlarken olumlama;günlük olumlama cümleleri|Güne başlarken niyet belirlemek için kısa cümleler ve beş dakikalık uygulama akışı.
toksik olumlama||Zor duyguları inkâr eden pozitiflik ile gerçekçi özdestek arasındaki farkı günlük örneklerle anlat.
olumlama kitapları|olumlama kitap önerileri;olumlama ile ilgili kitaplar|Güncel, gerçekten mevcut kitapları yaklaşım ve okuyucu ihtiyacına göre karşılaştır. Yazar ve kitap bilgilerini yazım sırasında doğrula.
rakamlarla olumlama||Sayılarla niyet belirleme ritüellerinin nasıl kullanıldığını ve sınırlamalarını açıkla. Sayılara bilimsel etki atfetme.
uyku öncesi olumlama|gece yatmadan önce olumlama;uyumadan önce olumlama|Günün değerlendirmesi ve yarının niyeti için yatmadan önce kullanılabilecek kısa cümleler ve yazma rutini.
başarı için olumlama|başarı olumlama cümleleri|Başarı hedeflerini küçük davranışlarla bağlayan olumlamalar ve haftalık ilerleme soruları.
beden olumlama nedir|beden olumlama;beden olumlama nasıl yapılır|Beden olumlama ve beden nötrlüğü kavramları, yargısız günlük ifadeleri ve beden saygısı örnekleri. Kilo kaybı vaadi verme.
ev sahibi olmak için olumlama||Ev hedefini netleştiren olumlamalar ve eylem günlüğü. Finansal getiri veya satın alma garantisi verme.
olumlama cümleleri aşk|aşk için olumlama;aşk olumlama cümleleri;sevgi olumlama cümleleri|Karşılıklı saygı, açıklık ve özdeğere odaklanan aşk olumlamaları. Belirli bir kişiyi zorlayabilme iddiası kullanma.
olumlama cümleleri para|para olumlama cümleleri;bolluk bereket olumlama cümleleri;para çekmek için olumlama|Para hakkındaki inançları fark etmeye yarayan ifadeler ve günlük soruları. Gelir artışı garantisi veya yatırım tavsiyesi verme.
olumlama yapmanın faydaları|olumlama ile hayatı değişenler;olumlama yapanların yorumları|Olumlamaların olası yararları, sınırlamaları ve gerçekçi beklentiler. Araştırma ile kişisel anlatıları ayır; başarı hikâyesi uydurma.
sevgiliyle barışmak için olumlama||Ayrılık sonrası kendi davranışına, sınırlara ve saygılı iletişime odaklanan cümleler. Karşı tarafın rızasını ve iletişim sınırlarını koru.
suya olumlama nasıl yapılır||Suya niyet söyleme pratiğini sembolik bir ritüel olarak anlat ve alternatif günlük egzersizi sun. Suyun fiziksel özelliklerini değiştirdiğini iddia etme.
dolunay olumlama||Dolunayla ilişkilendirilen niyet ve bırakma ritüellerini kültürel/spiritüel pratik olarak anlat; günlük soruları ve örnek cümleler ver.
iş bulmak için olumlama cümleleri|işe girmek için olumlama;iş için olumlama|İş arama sürecinde hazırlık ve özdesteğe odaklanan cümleler; başvuru ve görüşme eylemleriyle birlikte kullanma örnekleri.
alma verme dengesi olumlama||İlişkilerde karşılıklılık ve sınır koyma üzerine olumlamalar ve özdeğerlendirme soruları.
mantra olumlama||Mantra ve olumlama arasındaki amaç ve kullanım farklarını, örnekleri ve kişisel rutin seçimlerini karşılaştır.
özgüven olumlama cümleleri||Özgüven cümlelerini günlük küçük denemelerle eşleştir; kişinin inanabileceği ifadeler oluşturmasına yardım et.
yazarak olumlama yapmak||El yazısıyla olumlama defteri tutmak için yapı, örnek sayfa ve kısa uygulama. Tekrarlama sayılarını garanti gibi sunma.
sınav olumlama cümleleri||Sınav hazırlığında dikkat ve çabayı destekleyen gerçekçi ifadeler, çalışma öncesi kısa rutin ve sınırları.
affetme olumlama cümleleri||Affetmeyi zorunlu kılmadan özşefkat, duyguları adlandırma ve kişisel sınırlar için örnek ifadeler.
ruh eşi olumlama cümleleri||İdeal ilişki değerleri ve karşılıklı bağlılık üzerine cümleler ve günlük soruları. Ruh eşi fikrini inanç olarak ele al.
olumlama defteri||Olumlama defteri için bölüm düzeni, örnek sayfa ve haftalık değerlendirme şablonu.
olumlama yaparken dikkat edilmesi gerekenler||İnanılmayan cümleler, duyguları bastırma ve eylemsiz beklenti gibi yaygın sorunlar; her biri için daha gerçekçi alternatifler.
satış yapmak için olumlama||Satış görüşmesi öncesinde hazırlık, dinleme ve dürüst iletişime odaklanan kısa cümleler. Sonuç garantisi verme.
şans olumlama cümleleri||Şansı kontrol etme iddiası yerine fırsat fark etme ve harekete geçmeye odaklanan cümleler ve günlük soruları.
uyurken olumlama dinlemek||Uykuda olumlama dinleme iddialarını kanıt ve sınırlamalarıyla incele; uyku öncesi bilinçli uygulamayla farkını açıkla.'''

assignments = []
for line in BRIEFS.splitlines():
    keyword, variants, angle = line.split('|')
    keywords = [keyword] + ([v for v in variants.split(';') if v] if variants else [])
    assert all(k in rows for k in keywords), keywords
    occurrences = [{**rows[k], 'source': source['source'], 'metric_type': 'individual_keyword'} for k in keywords]
    assignments.append({'locale': 'tr', 'intent_key': runway.normalize(keyword), 'slug': runway.normalize(keyword), 'primary_keyword': keyword, 'article_angle': angle, 'source_occurrences': occurrences})

output = {
    'status': 'reviewed_partial_batch_not_live_queue',
    'observed_on': '2026-09-08', 'locale': 'tr',
    'scope': 'Selected distinct intents from the first 200 captured olumlama results. Unselected source rows are not approved assignments.',
    'assignment_count': len(assignments), 'assignments': assignments,
    'consolidation_required': 'Merge with keyword-runway-tr.json and original Turkish structured list before final runway certification.',
}
assert len({a['slug'] for a in assignments}) == len(assignments)
(ROOT / 'keyword-magic-assignments-tr.json').write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n')
print(len(assignments))
