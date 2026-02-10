#!/usr/bin/env node
/**
 * Post-build prerender script.
 * Serves the dist/ folder, visits all sitemap routes with Puppeteer,
 * and saves the rendered HTML as static files.
 */
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { launch } from 'puppeteer';

const DIST = join(process.cwd(), 'dist');

// Key routes to prerender
const ROUTES = [
  '/',
  '/tools',
  '/guides',
  '/about',
  '/contact',
  '/search',
  '/privacy',
  '/terms',
];

// Add routes from sitemap
function getRoutesFromSitemap() {
  try {
    const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf-8');
    const urls = [...sitemap.matchAll(/<loc>https?:\/\/[^<]+?(\/.+?)<\/loc>/g)].map(m => m[1]);
    return urls.filter(u => u !== '/');
  } catch {
    return [];
  }
}

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json',
  '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
};

function serve(port) {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      let url = req.url.split('?')[0];
      let filePath = join(DIST, url);

      if (!existsSync(filePath) || !extname(filePath)) {
        if (existsSync(filePath + '.html')) {
          filePath = filePath + '.html';
        } else if (existsSync(join(filePath, 'index.html'))) {
          filePath = join(filePath, 'index.html');
        } else {
          filePath = join(DIST, 'index.html');
        }
      }

      try {
        const content = readFileSync(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.on('error', reject);
    server.listen(port, () => resolve(server));
  });
}

async function renderRoute(browser, url, port) {
  const page = await browser.newPage();
  try {
    await page.goto(`http://localhost:${port}${url}`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // Wait for React to mount — look for content inside #root
    await page.waitForFunction(
      () => {
        const root = document.getElementById('root');
        return root && root.children.length > 0;
      },
      { timeout: 20000 }
    );

    // Extra settle time for lazy content
    await new Promise(r => setTimeout(r, 800));

    const html = await page.content();
    return html;
  } finally {
    await page.close();
  }
}

async function prerender() {
  const sitemapRoutes = getRoutesFromSitemap();
  const allRoutes = [...new Set([...ROUTES, ...sitemapRoutes])];

  console.log(`Prerendering ${allRoutes.length} routes...`);

  // Find a free port
  const port = 14173 + Math.floor(Math.random() * 5000);
  const server = await serve(port);
  
  const browser = await launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
    ],
  });

  let success = 0;
  let failed = 0;
  
  // Process in batches of 3 for speed but avoid overloading
  const batchSize = 3;
  for (let i = 0; i < allRoutes.length; i += batchSize) {
    const batch = allRoutes.slice(i, i + batchSize);
    const results = await Promise.allSettled(
      batch.map(async (route) => {
        const html = await renderRoute(browser, route, port);
        const outDir = route === '/' ? DIST : join(DIST, route);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(join(outDir, 'index.html'), html);
        return route;
      })
    );
    
    for (const r of results) {
      if (r.status === 'fulfilled') {
        success++;
      } else {
        failed++;
        const route = batch[results.indexOf(r)];
        console.warn(`  Failed: ${route} - ${r.reason?.message || r.reason}`);
      }
    }
    
    if ((i + batchSize) % 15 === 0 || i + batchSize >= allRoutes.length) {
      console.log(`  Progress: ${success + failed}/${allRoutes.length} (${success} ok, ${failed} failed)`);
    }
  }

  await browser.close();
  server.close();
  console.log(`Prerendered ${success}/${allRoutes.length} routes. (${failed} failed)`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

prerender().catch(err => {
  console.error(err);
  process.exit(1);
});
