import urllib.request,urllib.error,urllib.parse,xml.etree.ElementTree as ET,json,concurrent.futures,sys
from html.parser import HTMLParser
from pathlib import Path
base=sys.argv[1];destination=sys.argv[2];canonical='https://www.demimanifest.com'
if urllib.parse.urlsplit(base).hostname in ('localhost','127.0.0.1'): urllib.request.install_opener(urllib.request.build_opener(urllib.request.ProxyHandler({})))
class P(HTMLParser):
 def __init__(self):super().__init__();self.h1=0;self.lang='';self.canonical=[];self.robots=[];self.alternates={};self.description=[];self.images=[];self.ctas=0;self.stores=[];self.links=[];self.article=False;self.title=[];self.in_title=False
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='html':self.lang=a.get('lang','')
  if t=='h1':self.h1+=1
  if t=='title':self.in_title=True
  if t=='article' and a.get('data-article-slug'):self.article=True
  if t=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if t=='link' and a.get('hreflang'):self.alternates[a['hreflang']]=a.get('href')
  if t=='meta' and a.get('name')=='robots':self.robots.append(a.get('content',''))
  if t=='meta' and a.get('name')=='description':self.description.append(a.get('content',''))
  if 'data-cta-placement' in a:self.ctas+=1
  if t=='img':self.images.append(a.get('src'))
  if t=='a' and a.get('href'):
   self.links.append(a['href'])
   if any(x in a['href'] for x in ['apps.apple.com','play.google.com']):self.stores.append(a['href'])
 def handle_data(self,d):
  if self.in_title:self.title.append(d)
 def handle_endtag(self,t):
  if t=='title':self.in_title=False
xml=urllib.request.urlopen(base+'/sitemap.xml').read();root=ET.fromstring(xml);urls=[e.text for e in root.iter() if e.tag.endswith('}loc')]
def get(url):
 target=base+urllib.parse.urlsplit(url).path
 for attempt in range(2):
  try:
   r=urllib.request.urlopen(target,timeout=30);p=P();p.feed(r.read().decode());result=dict(url=url,status=r.status,**{k:getattr(p,k) for k in ['h1','lang','canonical','robots','alternates','description','images','ctas','stores','links','article','title']});break
  except Exception as e:result=dict(url=url,error=str(e))
 return result
rows=list(concurrent.futures.ThreadPoolExecutor(8).map(get,urls));errors=[]
for row in rows:
 if 'error'in row:errors.append(row);continue
 expected_lang=row['url'].split('/')[3] if row['url'].split('/')[3] in ['fr','de','it'] else 'en'
 if row['h1']!=1 or [u.rstrip('/') for u in row['canonical']]!=[row['url'].rstrip('/')] or row['lang']!=expected_lang or len(row['description'])!=1 or any('noindex'in x for x in row['robots']):errors.append({k:row[k] for k in ['url','h1','canonical','lang','description','robots']})
 if row['article'] and (row['ctas']<3 or not any('apps.apple.com' in x for x in row['stores']) or not any('play.google.com'in x for x in row['stores'])):errors.append({'url':row['url'],'issue':'missing article CTAs'})
 if row['alternates']:
  if set(row['alternates'])!={'en','fr','de','it','x-default'}:errors.append({'url':row['url'],'issue':'incorrect alternate languages'})
  for lang,other in row['alternates'].items():
   peer=next((x for x in rows if x['url'].rstrip('/')==other.rstrip('/')),None)
   if not peer or peer.get('alternates')!=row['alternates']:errors.append({'url':row['url'],'issue':'nonreciprocal alternate','target':other})
extras={}
for path in ['/robots.txt','/feed.xml','/opengraph-image','/fr/privacy','/de/support','/it/terms','/blog/page/999','/fr/blog/not-a-real-article','/definitely-not-a-page']:
 try:
  r=urllib.request.urlopen(base+path);extras[path]=r.status
 except urllib.error.HTTPError as e:extras[path]=e.code
Path(destination).write_text(json.dumps(dict(base=base,count=len(rows),errors=errors,extras=extras,rows=rows),ensure_ascii=False,indent=2))
print(json.dumps(dict(count=len(rows),errors=errors,extras=extras),ensure_ascii=False,indent=2))
if errors:sys.exit(1)
