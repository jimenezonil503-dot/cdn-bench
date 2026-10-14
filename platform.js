import { ARTICLES, PROVIDERS, providerCategories } from './content.js';
import { articleBodyText } from './article-links.js';

export { ARTICLES, PROVIDERS, providerCategories };

export function providerPath(id, language = 'zh') {
  return `${language === 'en' ? 'en/' : ''}providers/${id}/`;
}

export function articlePath(id, language = 'zh') {
  return `${language === 'en' ? 'en/' : ''}article/${id}/`;
}

export function findProvider(id) {
  return PROVIDERS.find(provider => provider.id === id) ?? null;
}

export function findArticle(id) {
  return ARTICLES.find(article => article.id === id) ?? null;
}

export function filterProviders(query = '', category = 'all') {
  const normalized = query.trim().toLocaleLowerCase();
  return PROVIDERS.filter(provider => {
    const matchesCategory = category === 'all' || provider.categories.includes(category);
    if (!matchesCategory) return false;
    if (!normalized) return true;
    const searchable = [provider.name, provider.id, provider.officialUrl, provider.sourceUrl ?? '', provider.tagline.zh, provider.tagline.en, provider.intro.zh, provider.intro.en, provider.bestFor.zh, provider.bestFor.en, ...provider.highlights.flatMap(item => [item.zh, item.en])].join(' ').toLocaleLowerCase();
    return searchable.includes(normalized);
  });
}

export function filterArticles(query = '') {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return ARTICLES;
  return ARTICLES.filter(article => {
    const searchable = [article.title.zh, article.title.en, article.excerpt.zh, article.excerpt.en, article.category.zh, article.category.en, articleBodyText(article, 'zh'), articleBodyText(article, 'en')].join(' ').toLocaleLowerCase();
    return searchable.includes(normalized);
  });
}
