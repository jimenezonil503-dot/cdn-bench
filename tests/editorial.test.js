import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {ARTICLES,PROVIDERS} from '../content.js';
import {TITLES,SLUGS} from '../editorial/catalogue.js';
import {articleBodyText,articleLinkParts,renderArticleExtras,validArticleImage} from '../article-links.js';
import {seedContent,validateContent} from '../tools/admin-content.mjs';
import {filterArticles} from '../platform.js';
import {articleMetadata} from '../tools/build-pages.mjs';
const root=new URL('../',import.meta.url);
const added=ARTICLES.filter(a=>a.seriesOrder);
test('50 new topics preserve exact Chinese titles, order, bilingual bodies and source scope',()=>{
 assert.equal(added.length,50);
 assert.deepEqual(added.map(a=>a.title.zh),TITLES);
 assert.deepEqual(added.map(a=>a.id),SLUGS);
 for(const [i,a]of added.entries()){
  assert.equal(a.seriesOrder,i+1);
  assert.ok((articleBodyText(a,'zh').match(/\p{Script=Han}/gu)||[]).length>=1800,a.id);
  assert.ok(articleBodyText(a,'en').split(/\s+/).length>=350,a.id);
  assert.ok(a.sources.length>=3&&a.sources.length<=6,a.id);
  for(const language of ['zh','en']){
   const links=a.sections.flatMap(s=>[...(s.paragraphs??[]),...(s.bullets??[])]).flatMap(p=>articleLinkParts(p[language])).filter(p=>p.href);
   assert.ok(links.filter(p=>!p.external).length>=2,a.id+' '+language);
   for(const l of links.filter(p=>p.external))assert.ok(a.sources.some(s=>s.url===l.href),a.id+' '+l.href);
   for(const l of links.filter(p=>!p.external&&p.href.startsWith('article/')))assert.ok(ARTICLES.some(x=>l.href==='article/'+x.id+'/'),l.href);
  }
 }
});
test('every new topic has two real, accessible original diagrams and bilingual metadata',async()=>{
 const paths=[];
 for(const a of added){
  const figures=a.sections.flatMap(s=>s.figures??[]);
  assert.equal(figures.length,2,a.id);
  for(const f of figures){
   assert.ok(validArticleImage(f.src));paths.push(f.src);
   for(const key of ['alt','caption','credit'])for(const language of ['zh','en'])assert.ok(f[key][language].length>5);
   const svg=await readFile(new URL(f.src,root),'utf8');
   assert.ok(svg.includes('<svg')&&svg.includes('<title')&&svg.includes('<desc'));
   assert.ok(!/<script|onload=|foreignObject/i.test(svg));
  }
 }
 assert.equal(new Set(paths).size,100);
});
test('admin validates and round trips all articles, tables, images and sequence fields',()=>{
 const seed=seedContent(PROVIDERS,ARTICLES),round=validateContent(JSON.parse(JSON.stringify(seed)));
 assert.deepEqual(round,seed);
 assert.ok(Buffer.byteLength(JSON.stringify({...seed,revision:0}))<2*1024*1024,'Admin request remains under its bounded 2MB limit');
});
test('table and image rendering escapes content and rejects escaping image paths',()=>{
 const pair=s=>({zh:s,en:s});
 const section={table:{caption:pair('<script>bad</script>'),columns:[pair('A'),pair('B')],rows:[[pair('<img src=x>'),pair('[x](javascript:bad)')]]},figures:[{src:'../.admin/secret.svg',alt:pair('bad'),caption:pair('bad'),credit:pair('bad')}]};
 const html=renderArticleExtras(section);
 assert.ok(html.includes('&lt;script&gt;'));
 assert.ok(!html.includes('<script>'));
 assert.ok(!html.includes('<img'));
 assert.ok(!validArticleImage('../assets/editorial/bad.svg'));
 const seed=seedContent([],added.slice(0,1));seed.articles[0].sections[1].figures[0].src='../secret.svg';
 assert.throws(()=>validateContent(seed));
});
test('comparison table cells are searchable and production schema includes original diagrams',()=>{
 const article=added.find(a=>a.sections.some(s=>s.table));
 const term=article.sections.find(s=>s.table).table.rows[0][1].en;
 assert.ok(filterArticles(term).some(a=>a.id===article.id));
 const html=articleMetadata(article,'en','en/article/'+article.id+'/','https://example.test/sub');
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 assert.equal(schema.image.length,2);
 assert.ok(schema.image.every(src=>src.startsWith('https://example.test/sub/assets/editorial/')));
 const rendered=renderArticleExtras(article.sections.find(s=>s.figures),'zh');
 assert.ok(rendered.includes('class="article-figure-visual" tabindex="0"'));
});
