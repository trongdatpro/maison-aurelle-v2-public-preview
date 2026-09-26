const path = require('path');
const fs = require('fs');
const { Liquid } = require('liquidjs');

const THEME_DIR = path.join(__dirname, 'theme');
const SECTIONS_DIR = path.join(THEME_DIR, 'sections');
const SNIPPETS_DIR = path.join(THEME_DIR, 'snippets');
const LAYOUT_DIR = path.join(THEME_DIR, 'layout');
const LOCALES_DIR = path.join(THEME_DIR, 'locales');
const TEMPLATES_DIR = path.join(THEME_DIR, 'templates');

// Load locales
let enLocale = {};
try {
  enLocale = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, 'en.default.json'), 'utf8'));
} catch (e) {
  console.warn('Could not load en.default.json', e.message);
}

function getTranslation(key) {
  const parts = key.split('.');
  let curr = enLocale;
  for (const part of parts) {
    if (curr && typeof curr === 'object' && part in curr) {
      curr = curr[part];
    } else {
      return null;
    }
  }
  return typeof curr === 'string' ? curr : null;
}

const engine = new Liquid({
  root: [SECTIONS_DIR, SNIPPETS_DIR, LAYOUT_DIR, TEMPLATES_DIR],
  extname: '.liquid',
  dynamicLibPath: false
});

// Custom tags
engine.registerTag('schema', {
  parse(tagToken, remainTokens) {
    const stream = this.liquid.parser.parseStream(remainTokens);
    stream
      .on('tag:endschema', () => stream.stop())
      .on('template', () => {})
      .on('end', () => { throw new Error('schema not closed'); });
    stream.start();
  },
  * render() {
    return '';
  }
});

engine.registerTag('sections', {
  parse(tagToken) {
    this.groupName = tagToken.args.replace(/['"]/g, '').trim();
  },
  async render(ctx) {
    const groupFilePath = path.join(SECTIONS_DIR, `${this.groupName}.json`);
    if (!fs.existsSync(groupFilePath)) return `<!-- sections group ${this.groupName} not found -->`;
    const groupData = JSON.parse(fs.readFileSync(groupFilePath, 'utf8'));
    let out = '';
    for (const secKey of groupData.order || []) {
      const secConfig = groupData.sections[secKey];
      if (!secConfig) continue;
      const secFilePath = path.join(SECTIONS_DIR, `${secConfig.type}.liquid`);
      if (fs.existsSync(secFilePath)) {
        const secLiquid = fs.readFileSync(secFilePath, 'utf8');
        const secScope = {
          section: {
            id: secKey,
            type: secConfig.type,
            settings: secConfig.settings || {},
            blocks: []
          }
        };
        const rendered = await engine.parseAndRender(secLiquid, { ...ctx.getAll(), ...secScope });
        out += `\n<!-- BEGIN SECTION: ${secKey} (${secConfig.type}) -->\n${rendered}\n<!-- END SECTION: ${secKey} -->\n`;
      }
    }
    return out;
  }
});

engine.registerTag('form', {
  parse(tagToken, remainTokens) {
    this.args = tagToken.args;
    this.templates = [];
    const stream = this.liquid.parser.parseStream(remainTokens);
    stream
      .on('tag:endform', () => stream.stop())
      .on('template', tpl => this.templates.push(tpl))
      .on('end', () => { throw new Error('form not closed'); });
    stream.start();
  },
  * render(ctx, emitter) {
    let formAction = '/cart/add';
    let formClass = '';
    let formId = '';

    if (this.args.includes('customer')) {
      formAction = '/contact#newsletter';
      formClass = 'footer-newsletter-form';
      formId = 'ContactFooter';
    } else if (this.args.includes('product')) {
      formAction = '/cart/add';
      formClass = 'product-form';
      formId = 'product-form';
    }

    const classMatch = this.args.match(/class:\s*['"]([^'"]+)['"]/);
    if (classMatch) formClass = classMatch[1];
    const idMatch = this.args.match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch) formId = idMatch[1];

    emitter.write(`<form method="post" action="${formAction}"${formId ? ` id="${formId}"` : ''}${formClass ? ` class="${formClass}"` : ''} enctype="multipart/form-data">`);
    yield this.liquid.renderer.renderTemplates(this.templates, ctx, emitter);
    emitter.write('</form>');
  }
});

engine.registerTag('paginate', {
  parse(tagToken, remainTokens) {
    this.templates = [];
    const stream = this.liquid.parser.parseStream(remainTokens);
    stream
      .on('tag:endpaginate', () => stream.stop())
      .on('template', tpl => this.templates.push(tpl))
      .on('end', () => { throw new Error('paginate not closed'); });
    stream.start();
  },
  * render(ctx, emitter) {
    yield this.liquid.renderer.renderTemplates(this.templates, ctx, emitter);
  }
});

// Custom Filters
engine.registerFilter('asset_url', v => `/assets/${v}`);
engine.registerFilter('stylesheet_tag', url => `<link rel="stylesheet" href="${url}">`);
engine.registerFilter('image_url', (img, args) => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (img.src) return img.src;
  if (img.featured_media) {
    return typeof img.featured_media === 'string' ? img.featured_media : (img.featured_media.src || '');
  }
  return '';
});
engine.registerFilter('money', cents => {
  if (cents == null) return '$0';
  const num = Number(cents) / 100;
  return `$${num % 1 === 0 ? num : num.toFixed(2)}`;
});
engine.registerFilter('placeholder_svg_tag', (name, cls) => {
  return `<div class="${cls || ''}" style="background:#f0ede7;display:flex;align-items:center;justify-content:center;color:#7d766f;font-size:11px;font-family:sans-serif;letter-spacing:0.1em;border:1px dashed #d5cec5;">${name}</div>`;
});
engine.registerFilter('t', (key, args) => {
  let val = getTranslation(key);
  if (!val) return key;
  if (args && typeof args === 'object') {
    for (const [k, v] of Object.entries(args)) {
      val = val.replace(`{{ ${k} }}`, v).replace(`{{${k}}}`, v);
    }
  }
  return val;
});
engine.registerFilter('payment_button', () => {
  return `<button type="button" class="btn-primary" style="width:100%;margin-top:0.5rem;background:#1e1b18;color:#fff;">Buy with Shop Pay</button>`;
});
engine.registerFilter('default_pagination', () => '');

module.exports = { engine, THEME_DIR, getTranslation };
