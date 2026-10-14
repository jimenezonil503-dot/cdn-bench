import {readdir,readFile,writeFile,mkdir} from 'node:fs/promises';
import {TITLES,SLUGS,pair as P} from '../editorial/catalogue.js';
import {reviseArticles} from '../editorial/revisions.js';
import {DIAGRAMS} from '../editorial/diagrams.js';
import {articleBodyText,articleLinkParts} from '../article-links.js';
const root=new URL('../',import.meta.url);
const all=[];
for(const name of (await readdir(new URL('editorial/',root))).filter(n=>/^batch-\d+\.js$/.test(n)).sort()){
 const data=await import(new URL('editorial/'+name,root));
 all.push(...Object.values(data).find(Array.isArray));
}
reviseArticles(all);
if(all.length!==50||DIAGRAMS.length!==50)throw Error('Expected exactly 50 authored topics and diagram briefs');
const esc=v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const label=(x,y,zh,en,size=19)=>'<text x="'+x+'" y="'+y+'" font-size="'+size+'" font-weight="600" fill="#e9edf5">'+esc(zh)+'</text><text x="'+x+'" y="'+(y+28)+'" font-size="13" fill="#9eacc2">'+esc(en)+'</text>';
function diagram(a,brief,kind){
 const [zh,en,zsteps,esteps,zchecks,echecks]=brief;
 const steps=(kind===0?zsteps:zchecks).split('|'),english=(kind===0?esteps:echecks).split('|');
 const width=kind===0?208:288,gap=kind===0?28:28,start=kind===0?42:40;
 const title=kind===0?zh:zh+' · 检查重点',subtitle=kind===0?en:en+' / review points';
 let content='<rect width="1000" height="420" rx="24" fill="#0e1524"/><path d="M0 114H1000" stroke="#29364b"/>';
 content+=label(40,48,title,subtitle,24);
 for(let i=0;i<steps.length;i++){
  const x=start+i*(width+gap);
  content+='<rect x="'+x+'" y="157" width="'+width+'" height="140" rx="16" fill="'+(i===0?'#153d36':'#182438')+'" stroke="'+(i===0?'#4cbd99':'#35445c')+'"/>';
  content+='<circle cx="'+(x+28)+'" cy="187" r="14" fill="#61d9b2"/><text x="'+(x+28)+'" y="192" text-anchor="middle" font-size="13" font-weight="700" fill="#10241f">'+(i+1)+'</text>';
  content+=label(x+18,238,steps[i],english[i],steps[i].length>11?16:18);
  if(kind===0&&i<steps.length-1)content+='<path d="M'+(x+width+5)+' 224h17m-6-5 6 5-6 5" fill="none" stroke="#61d9b2" stroke-width="2"/>';
 }
 content+='<text x="40" y="354" font-size="15" fill="#bdc8d9">'+esc(kind===0?'按箭头逐段验证，结合正文核对条件与限制。':'将三个检查面分别留存证据，再作业务判断。')+'</text><text x="40" y="381" font-size="13" fill="#8493ab">'+esc(kind===0?'Verify each stage against the conditions explained in the article.':'Retain evidence for each review area before making a workload decision.')+'</text>';
 return '<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="420" viewBox="0 0 1000 420" role="img" aria-labelledby="title desc"><title id="title">'+esc(title)+'</title><desc id="desc">'+esc(steps.join(' → '))+'</desc><g font-family="Microsoft YaHei, Noto Sans CJK SC, Arial, sans-serif">'+content+'</g></svg>\n';
}
await mkdir(new URL('assets/editorial/',root),{recursive:true});
const report=[];
for(let i=0;i<all.length;i++){
 const article=all[i],n=i+1,brief=DIAGRAMS[i];
 if(article.seriesOrder!==n||article.id!==SLUGS[i]||article.title.zh!==TITLES[i])throw Error('Order/title mismatch '+n);
 const text=articleBodyText(article,'zh'),han=(text.match(/\p{Script=Han}/gu)||[]).length;
 if(han<1800)throw Error('Article '+n+' too short: '+han);
 if(article.sources.length<3||article.sources.length>6)throw Error('Source count '+n);
 const links=article.sections.flatMap(s=>s.paragraphs).flatMap(p=>articleLinkParts(p.zh)).filter(p=>p.href);
 for(const l of links.filter(x=>x.external))if(!article.sources.some(s=>s.url===l.href))throw Error('Unlisted citation '+n+' '+l.href);
 for(const l of links.filter(x=>!x.external&&x.href.startsWith('article/')))if(!SLUGS.includes(l.href.split('/')[1]))throw Error('Broken article link '+n+' '+l.href);
 for(let k=0;k<2;k++){
  const src='assets/editorial/'+article.id+(k===0?'-flow':'-review')+'.svg';
  await writeFile(new URL(src,root),diagram(article,brief,k));
  const steps=brief[k===0?2:4].split('|'),ens=brief[k===0?3:5].split('|');
  const figure={src,
   alt:P(brief[0]+'示意图：'+steps.join('、'),brief[1]+': '+ens.join(', ')),
   caption:P((k===0?'路径示意：':'检查重点：')+steps.join(' → ')+'。用于解释本篇配置与决策，不表示厂商实测结果。',(k===0?'Conceptual path: ':'Review areas: ')+ens.join(' → ')+'. An explanation of this article’s decisions, not a vendor benchmark.'),
   credit:P('CDN Bench 编辑部原创制图 · 查看SVG','Original CDN Bench diagram · View SVG')};
  const index=k===0?1:Math.max(2,article.sections.length-2);
  article.sections[index].figures=[figure];
 }
 article.readTime=Math.max(7,Math.ceil(han/300));
 report.push({order:n,id:article.id,title:article.title.zh,han,englishWords:articleBodyText(article,'en').split(/\s+/).length,sources:article.sources.length,figures:2,internalLinks:links.filter(x=>!x.external).length});
}
await writeFile(new URL('editorial/articles-2026.js',root),'// Compiled from the reviewed bilingual editorial source. Rebuild with tools/build-editorial.mjs.\nexport const NEW_ARTICLES = '+JSON.stringify(all,null,2)+';\n');
await writeFile(new URL('editorial/audit.json',root),JSON.stringify({date:'2026-10-14',articles:report,totals:{topics:all.length,languageVersions:all.length*2,originalDiagrams:all.length*2}},null,2)+'\n');
console.log('Compiled 50 bilingual articles and 100 original diagrams; Chinese body range '+Math.min(...report.map(r=>r.han))+'–'+Math.max(...report.map(r=>r.han))+' Han characters.');
