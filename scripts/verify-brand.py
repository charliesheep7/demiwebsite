"""Check rendered brand identities after build/deployment; no third-party dependencies."""
import json, sys, urllib.request
from html.parser import HTMLParser
from pathlib import Path
BASE = sys.argv[1].rstrip('/')
CANONICAL = 'https://www.demimanifest.com'
if BASE.startswith(('http://localhost:', 'http://127.0.0.1:')):
    urllib.request.install_opener(urllib.request.build_opener(urllib.request.ProxyHandler({})))
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.json=[]; self.buffer=None; self.h1=[]; self.in_h1=False; self.links=[]; self.canonical=[]; self.site=[]; self.robots=[]; self.lang=''
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='script' and a.get('type')=='application/ld+json': self.buffer=''
        if tag=='h1': self.in_h1=True; self.h1.append('')
        if tag=='html': self.lang=a.get('lang')
        if tag=='a': self.links.append(a.get('href',''))
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a.get('href'))
        if tag=='meta' and a.get('property')=='og:site_name': self.site.append(a.get('content'))
        if tag=='meta' and a.get('name')=='robots': self.robots.append(a.get('content',''))
    def handle_data(self, data):
        if self.buffer is not None: self.buffer+=data
        if self.in_h1: self.h1[-1]+=data
    def handle_endtag(self, tag):
        if tag=='script' and self.buffer is not None: self.json.append(json.loads(self.buffer)); self.buffer=None
        if tag=='h1': self.in_h1=False
rows=[]
for locale in ['en','fr','de','it']:
    prefix='' if locale=='en' else '/'+locale
    for suffix in ['', '/about']:
        path=prefix+suffix or '/'; raw=urllib.request.urlopen(BASE+path,timeout=30).read().decode(); p=Page();p.feed(raw)
        nodes=[node for block in p.json for node in block.get('@graph',[block])]
        apps=[n for n in nodes if n.get('@type')=='SoftwareApplication']
        sites=[n for n in nodes if n.get('@type')=='WebSite']
        assert len(apps)==len(sites)==1,(path,'duplicate/missing identity')
        assert apps[0]['@id']==CANONICAL+'#app'
        assert apps[0]['sameAs']==['https://apps.apple.com/app/id6763245058','https://play.google.com/store/apps/details?id=com.demimanifest']
        assert sites[0]['name']=='Demi' and sites[0]['url']==CANONICAL+'/'
        assert 'tr-TR' not in sites[0]['inLanguage']
        assert [u.rstrip('/') for u in p.canonical]==[(CANONICAL+path).rstrip('/')] and p.lang==locale,(path,p.canonical,p.lang)
        assert len(p.h1)==1 and 'Demi' in p.h1[0],(path,p.h1)
        assert not any('noindex' in r for r in p.robots)
        assert all('legalName' not in n and 'aggregateRating' not in n for n in nodes)
        if suffix: assert '/brand/demi-facts.txt' in p.links
        else: assert p.site==['Demi'] and prefix+'/about' in p.links
        rows.append(dict(path=path,lang=p.lang,h1=p.h1[0],canonical=p.canonical[0],status='passed'))
facts=urllib.request.urlopen(BASE+'/brand/demi-facts.txt',timeout=30).read().decode();assert 'Sihan Cheng' in facts and 'h&h technology ltd' in facts
p=Page();p.feed(urllib.request.urlopen(BASE+'/blog/manifesting-a-specific-person',timeout=30).read().decode());assert p.links.count('/')>=3
out=dict(base=BASE,checks='Eight localized home/About pages: identity uniqueness, stores, canonical, indexability, H1, languages and downloadable facts; SP article homepage links.',rows=rows,status='passed')
if len(sys.argv)>2: Path(sys.argv[2]).write_text(json.dumps(out,ensure_ascii=False,indent=2))
print(json.dumps(out,ensure_ascii=False,indent=2))
