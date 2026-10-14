import {readdir,readFile,writeFile} from 'node:fs/promises';
import {plainArticleText,articleLinkParts,articleBodyText} from '../article-links.js';
import {reviseArticles} from '../editorial/revisions.js';
const directory=new URL('../editorial/',import.meta.url);
const articles=[];
for(const name of (await readdir(directory)).filter(x=>/^batch-\d+\.js$/.test(x)).sort()){
 let body=await readFile(new URL(name,directory),'utf8');
 if(body.includes('\\\\n')){body=body.replaceAll('\\\\n','\\n');await writeFile(new URL(name,directory),body);}
 const module=await import(new URL(name,directory));
 articles.push(...Object.values(module).find(Array.isArray));
}
reviseArticles(articles);
const report=articles.map(article=>{
 const text=article.sections.flatMap(s=>s.paragraphs??[]);
 const zh=articleBodyText(article,'zh'),en=articleBodyText(article,'en');
 const links=text.flatMap(p=>articleLinkParts(p.zh)).filter(p=>p.href);
 return {order:article.seriesOrder,id:article.id,han:(zh.match(/\p{Script=Han}/gu)??[]).length,englishWords:en.split(/\s+/).length,sections:article.sections.length,sources:article.sources.length,internalLinks:links.filter(p=>!p.external).length,missingSources:links.filter(p=>p.external&&!article.sources.some(s=>s.url===p.href)).map(p=>p.href)};
});
console.log(JSON.stringify(report,null,2));
