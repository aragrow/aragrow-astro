// Rehype plugin for blog post content (configured in astro.config.mjs). Posts are imported
// from WordPress and rewritten on every import, so image fixes live here instead of in the
// Markdown files:
//   - alt text from src/data/image-alts.json replaces missing, empty or poor alt text
//   - width and height come from the file in public/ (or the WordPress "-1024x683" suffix
//     for remote images), so the page does not jump while images load
//   - images load lazily and decode off the main thread
//   - images whose file is missing are removed (a broken image helps nobody)
//   - inline SVG icons without a label are hidden from screen readers
// WordPress HTML reaches this plugin as raw text, so tags are fixed both in parsed elements
// (Markdown images) and inside raw HTML.

import { existsSync } from 'node:fs';
import sharp from 'sharp';
import alts from '../data/image-alts.json' with { type: 'json' };

const PUBLIC = new URL('../../public', import.meta.url).pathname;

function walk(node, fn, parent = null) {
  fn(node, parent);
  for (const child of node.children ?? []) walk(child, fn, node);
}

async function sizeOf(src) {
  if (src.startsWith('/')) {
    const file = PUBLIC + decodeURI(src);
    if (!existsSync(file)) return null;
    const { width, height } = await sharp(file).metadata();
    return { width, height };
  }
  const m = src.match(/-(\d+)x(\d+)\.\w+$/);
  return m ? { width: Number(m[1]), height: Number(m[2]) } : {};
}

// The fixed attributes for one image, or null when its file is missing.
async function fixImage(attrs, where) {
  const src = String(attrs.src ?? '');
  const size = await sizeOf(src);
  if (size === null) {
    console.warn(`Image file missing, removed from ${where}: ${src}`);
    return null;
  }
  if (alts[src]) attrs.alt = alts[src];
  else if (attrs.alt === undefined) attrs.alt = '';
  if (!attrs.width && !attrs.height && size.width) {
    attrs.width = size.width;
    attrs.height = size.height;
  }
  attrs.loading ??= 'lazy';
  attrs.decoding ??= 'async';
  return attrs;
}

// ---------- raw HTML ----------

const ATTR = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const encode = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function parseAttrs(tag) {
  const inner = tag.replace(/^<\w+/, '').replace(/\/?>$/, '');
  const attrs = {};
  for (const m of inner.matchAll(ATTR)) attrs[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  return attrs;
}

const tagOf = (name, attrs) =>
  `<${name}${Object.entries(attrs).map(([k, v]) => ` ${k}="${encode(v)}"`).join('')}>`;

async function fixRaw(html, where) {
  let out = '';
  let last = 0;
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const attrs = await fixImage(parseAttrs(m[0]), where);
    out += html.slice(last, m.index) + (attrs ? tagOf('img', attrs) : '');
    last = m.index + m[0].length;
  }
  out += html.slice(last);
  return out.replace(/<svg\b[^>]*>(?!\s*<title)/gi, (tag) =>
    /aria-hidden|aria-label|role\s*=\s*["']?img/i.test(tag)
      ? tag
      : tag.replace(/^<svg/i, '<svg aria-hidden="true" focusable="false"')
  );
}

// ---------- plugin ----------

export default function rehypeImageA11y() {
  return async (tree, file) => {
    const where = file.path ?? 'a post';
    const images = [];
    const raws = [];
    walk(tree, (node, parent) => {
      if (node.type === 'raw') raws.push(node);
      if (node.type !== 'element') return;
      if (node.tagName === 'img') images.push({ node, parent });
      if (node.tagName === 'svg') {
        const p = node.properties;
        const labelled = p.ariaLabel || p.ariaLabelledBy || p.role === 'img' ||
          node.children?.some((c) => c.tagName === 'title');
        if (!labelled && p.ariaHidden === undefined) {
          p.ariaHidden = 'true';
          p.focusable = 'false';
        }
      }
    });

    for (const { node, parent } of images) {
      if (!(await fixImage(node.properties, where))) parent.children.splice(parent.children.indexOf(node), 1);
    }
    for (const node of raws) {
      if (/<(img|svg)\b/i.test(node.value)) node.value = await fixRaw(node.value, where);
    }
  };
}
