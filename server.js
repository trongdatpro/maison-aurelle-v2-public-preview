const http = require('http');
const path = require('path');
const fs = require('fs');
const { engine, THEME_DIR } = require('./engine');
const {
  baseContext,
  product1,
  collections
} = require('./fixtures');

const PORT = process.env.PORT || 3456;
const HOST = '0.0.0.0';
const ASSETS_DIR = path.join(THEME_DIR, 'assets');

// Helper to render template by name
async function renderPage(templateName, specificContext = {}) {
  const themeLiquid = fs.readFileSync(path.join(THEME_DIR, 'layout/theme.liquid'), 'utf8');

  if (templateName === 'index') {
    const indexJson = JSON.parse(fs.readFileSync(path.join(THEME_DIR, 'templates/index.json'), 'utf8'));
    let layoutHtml = '';
    for (const secKey of indexJson.order) {
      const secData = indexJson.sections[secKey];
      const secPath = path.join(THEME_DIR, 'sections', `${secData.type}.liquid`);
      const secLiquid = fs.readFileSync(secPath, 'utf8');

      let blocks = [];
      if (secData.blocks && secData.block_order) {
        blocks = secData.block_order.map(bId => ({
          id: bId,
          type: secData.blocks[bId].type,
          settings: secData.blocks[bId].settings || {}
        }));
      }

      const secScope = {
        section: {
          id: secKey,
          type: secData.type,
          settings: secData.settings || {},
          blocks
        }
      };

      const rendered = await engine.parseAndRender(secLiquid, {
        ...baseContext,
        ...secScope,
        collections: baseContext.collections,
        collection: collections['all']
      });
      layoutHtml += rendered + '\n';
    }

    return await engine.parseAndRender(themeLiquid, {
      ...baseContext,
      content_for_layout: layoutHtml,
      page_title: 'Maison Aurelle — French Modern Classicism',
      template: { name: 'index' }
    });
  }

  if (templateName === 'product') {
    const targetProduct = specificContext.product || product1;
    const prodJson = JSON.parse(fs.readFileSync(path.join(THEME_DIR, 'templates/product.json'), 'utf8'));
    let layoutHtml = '';
    for (const secKey of prodJson.order) {
      const secData = prodJson.sections[secKey];
      const secPath = path.join(THEME_DIR, 'sections', `${secData.type}.liquid`);
      const secLiquid = fs.readFileSync(secPath, 'utf8');
      const secScope = {
        section: {
          id: secKey,
          type: secData.type,
          settings: secData.settings || {},
          blocks: []
        }
      };
      const rendered = await engine.parseAndRender(secLiquid, {
        ...baseContext,
        product: targetProduct,
        ...secScope
      });
      layoutHtml += rendered + '\n';
    }

    return await engine.parseAndRender(themeLiquid, {
      ...baseContext,
      product: targetProduct,
      content_for_layout: layoutHtml,
      page_title: `${targetProduct.title} — Maison Aurelle`,
      template: { name: 'product' }
    });
  }

  if (templateName === 'collection') {
    const targetCollection = specificContext.collection || collections['all'];
    const colJson = JSON.parse(fs.readFileSync(path.join(THEME_DIR, 'templates/collection.json'), 'utf8'));
    let layoutHtml = '';
    for (const secKey of colJson.order) {
      const secData = colJson.sections[secKey];
      const secPath = path.join(THEME_DIR, 'sections', `${secData.type}.liquid`);
      const secLiquid = fs.readFileSync(secPath, 'utf8');
      const secScope = {
        section: {
          id: secKey,
          type: secData.type,
          settings: secData.settings || {},
          blocks: []
        }
      };
      const rendered = await engine.parseAndRender(secLiquid, {
        ...baseContext,
        collection: targetCollection,
        ...secScope,
        paginate: { pages: 1, current_page: 1 }
      });
      layoutHtml += rendered + '\n';
    }

    return await engine.parseAndRender(themeLiquid, {
      ...baseContext,
      collection: targetCollection,
      content_for_layout: layoutHtml,
      page_title: `${targetCollection.title} — Maison Aurelle`,
      template: { name: 'collection' }
    });
  }

  throw new Error(`Unknown template: ${templateName}`);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // Health check endpoint for Render
  // Favicon route
  if (pathname === '/favicon.ico') {
    const favPath = path.join(ASSETS_DIR, 'favicon.ico');
    if (fs.existsSync(favPath)) {
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      return res.end(fs.readFileSync(favPath));
    }
  }

  if (pathname === '/health' || pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('OK');
  }

  // Serve static assets
  if (pathname.startsWith('/assets/')) {
    const filename = pathname.replace('/assets/', '');
    const filePath = path.join(ASSETS_DIR, filename);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      let contentType = 'text/plain';
      if (filename.endsWith('.css')) contentType = 'text/css';
      else if (filename.endsWith('.js')) contentType = 'application/javascript';
      else if (filename.endsWith('.png')) contentType = 'image/png';
      else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) contentType = 'image/jpeg';
      else if (filename.endsWith('.svg')) contentType = 'image/svg+xml';
      else if (filename.endsWith('.ico')) contentType = 'image/x-icon';
      else if (filename.endsWith('.woff2')) contentType = 'font/woff2';

      res.writeHead(200, { 'Content-Type': contentType });
      return res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Asset not found');
    }
  }

  try {
    // 1. Homepage
    if (pathname === '/' || pathname === '/index' || pathname === '/home') {
      const html = await renderPage('index');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    }

    // 2. Product Detail Page (PDP)
    if (pathname.startsWith('/products/') || pathname === '/product' || pathname === '/pdp') {
      const slug = pathname.replace('/products/', '');
      const product = baseContext.products[slug] || product1;
      const html = await renderPage('product', { product });
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    }

    // 3. Collection Page
    if (pathname.startsWith('/collections/') || pathname === '/collection' || pathname === '/collections') {
      const slug = pathname.replace('/collections/', '');
      const collection = collections[slug] || collections['all'];
      const html = await renderPage('collection', { collection });
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    }

    // Fallback: 404
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 — Page Not Found</h1><p><a href="/">Return to Home</a></p>');
  } catch (err) {
    console.error('Server error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal Server Error:\n' + err.stack);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`MAISON_AURELLE_PUBLIC_PREVIEW_RUNNING on ${HOST}:${PORT}`);
});
