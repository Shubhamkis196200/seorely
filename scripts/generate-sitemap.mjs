#!/usr/bin/env node
/**
 * Generate sitemap.xml from data.ts slugs.
 * Run after vite build to place in dist/.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIST = join(process.cwd(), 'dist');
const BASE = 'https://seorely.netlify.app';
const SRC = join(process.cwd(), 'src', 'data.ts');

const data = readFileSync(SRC, 'utf-8');

// Static pages
const staticPages = [
  { path: '/', freq: 'weekly', priority: '1.0' },
  { path: '/guides', freq: 'weekly', priority: '0.9' },
  { path: '/tools', freq: 'weekly', priority: '0.9' },
  { path: '/about', freq: 'monthly', priority: '0.6' },
  { path: '/contact', freq: 'monthly', priority: '0.5' },
  { path: '/search', freq: 'monthly', priority: '0.5' },
  { path: '/privacy', freq: 'yearly', priority: '0.3' },
  { path: '/terms', freq: 'yearly', priority: '0.3' },
];

// Category slugs
const catSlugs = ['on-page-seo', 'technical-seo', 'link-building', 'content-strategy', 'local-seo', 'analytics'];

// Tool slugs - match pattern: icon: '...', slug: '...'
const toolSlugs = [...data.matchAll(/icon:\s*'[^']+',\s*slug:\s*'([^']+)'/g)].map(m => m[1]);

// Article slugs - deeply indented (4+ spaces) slug lines
const articleSlugs = data.split('\n')
  .map(line => line.match(/^\s{4,}slug:\s*'([^']+)'/))
  .filter(Boolean)
  .map(m => m[1]);

console.log(`Sitemap: ${staticPages.length} static, ${catSlugs.length} categories, ${toolSlugs.length} tools, ${articleSlugs.length} articles`);

const urls = [
  ...staticPages.map(p => `  <url><loc>${BASE}${p.path}</loc><changefreq>${p.freq}</changefreq><priority>${p.priority}</priority></url>`),
  `  <!-- Categories -->`,
  ...catSlugs.map(s => `  <url><loc>${BASE}/category/${s}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`),
  `  <!-- Tools -->`,
  ...toolSlugs.map(s => `  <url><loc>${BASE}/tools/${s}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`),
  `  <!-- Blog Articles -->`,
  ...articleSlugs.map(s => `  <url><loc>${BASE}/blog/${s}</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

writeFileSync(join(DIST, 'sitemap.xml'), xml);
// Also update public/ for future builds
writeFileSync(join(process.cwd(), 'public', 'sitemap.xml'), xml);

const total = staticPages.length + catSlugs.length + toolSlugs.length + articleSlugs.length;
console.log(`Generated sitemap.xml with ${total} URLs`);
