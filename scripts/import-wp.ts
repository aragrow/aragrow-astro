/**
 * scripts/import-wp.ts
 *
 * WordPress XML (WXR) → Astro Content Collection importer.
 *
 * Reads posts.xml from the project root, extracts all published posts,
 * downloads featured images + inline content images to public/images/blog/,
 * rewrites image URLs to local paths, and writes markdown files to
 * src/content/blog/<slug>.md.
 *
 * Run: npx tsx scripts/import-wp.ts
 */

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  createWriteStream,
} from 'node:fs';
import { resolve, join, basename, dirname } from 'node:path';
import { get as httpsGet } from 'node:https';
import { get as httpGet } from 'node:http';
import { URL } from 'node:url';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const ROOT        = resolve(__dirname, '..');
const XML_PATH    = join(ROOT, 'posts.xml');
const CONTENT_DIR = join(ROOT, 'src', 'content', 'blog');
const IMAGES_DIR  = join(ROOT, 'public', 'images', 'blog');
const IMG_PREFIX  = '/images/blog';

// ── Types ───────────────────────────────────────────────────────────────────

interface AuthorMap { [login: string]: string }

// ── XML helpers ─────────────────────────────────────────────────────────────

/** Split raw XML into individual <item> blocks. */
function extractItems(xml: string): string[] {
  const items: string[] = [];
  let pos = 0;
  while (true) {
    const start = xml.indexOf('<item>', pos);
    if (start === -1) break;
    const end = xml.indexOf('</item>', start);
    if (end === -1) break;
    items.push(xml.slice(start, end + 7));
    pos = end + 7;
  }
  return items;
}

/**
 * Extract the text content of the FIRST occurrence of a tag.
 * Handles both <tag><![CDATA[...]]></tag> and plain <tag>...</tag>.
 */
function getTag(xml: string, tag: string): string {
  // Escape the colon in namespace prefixes for use in regex
  const t   = tag.replace(':', '\\:');
  const re  = new RegExp(
    `<${t}[^>]*>\\s*(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))\\s*<\\/${t}>`,
    'i',
  );
  const m = xml.match(re);
  if (!m) return '';
  return (m[1] ?? m[2] ?? '').trim();
}

/** Extract the value of a specific postmeta key from an item block. */
function getPostMeta(item: string, key: string): string {
  const re = new RegExp(
    `<wp:postmeta>[\\s\\S]*?<wp:meta_key>(?:<!\\[CDATA\\[)?${key}(?:\\]\\]>)?<\\/wp:meta_key>[\\s\\S]*?<wp:meta_value>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/wp:meta_value>[\\s\\S]*?<\\/wp:postmeta>`,
    'i',
  );
  const m = item.match(re);
  return m ? m[1].trim() : '';
}

/** Extract categories (domain="category") from an item. */
function getCategories(item: string): string[] {
  const re   = /<category domain="category"[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/category>/gi;
  const cats: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(item)) !== null) cats.push(m[1].trim());
  return cats;
}

/** Build author login → display name map from the channel-level <wp:author> blocks. */
function buildAuthorMap(xml: string): AuthorMap {
  const map: AuthorMap = {};
  const re = /<wp:author>([\s\S]*?)<\/wp:author>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const block       = m[1];
    const login       = getTag(block, 'wp:author_login');
    const displayName = getTag(block, 'wp:author_display_name');
    if (login && displayName) map[login] = displayName;
  }
  return map;
}

// ── Image handling ───────────────────────────────────────────────────────────

/** Derive a safe local filename from a URL. */
function localFileName(url: string): string {
  try {
    return basename(new URL(url).pathname);
  } catch {
    return basename(url);
  }
}

/** Download a file from url to destPath, following up to 5 redirects. */
async function downloadImage(url: string, destPath: string, depth = 0): Promise<boolean> {
  if (depth > 5) return false;
  return new Promise((resolve) => {
    let parsedUrl: URL;
    try { parsedUrl = new URL(url); }
    catch { resolve(false); return; }

    const getter = parsedUrl.protocol === 'https:' ? httpsGet : httpGet;
    getter(url, { headers: { 'User-Agent': 'AraGrow-Import/1.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const loc = res.headers.location;
        res.resume();
        if (loc) {
          const next = loc.startsWith('http') ? loc : `${parsedUrl.origin}${loc}`;
          downloadImage(next, destPath, depth + 1).then(resolve);
        } else {
          resolve(false);
        }
        return;
      }
      if (res.statusCode !== 200) {
        console.warn(`    ⚠ HTTP ${res.statusCode}: ${url}`);
        res.resume();
        resolve(false);
        return;
      }
      mkdirSync(dirname(destPath), { recursive: true });
      const stream = createWriteStream(destPath);
      res.pipe(stream);
      stream.on('finish', () => resolve(true));
      stream.on('error',  () => resolve(false));
    }).on('error', () => resolve(false));
  });
}

/** Find all aragrow.me/wp-content/uploads image URLs in HTML. */
function extractImageUrls(html: string): string[] {
  const re = /src="(https?:\/\/aragrow\.me\/wp-content\/uploads\/[^"]+)"/gi;
  const urls = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) urls.add(m[1]);
  return [...urls];
}

/** Replace all original URLs with local paths using the provided map. */
function rewriteImageUrls(html: string, map: Map<string, string>): string {
  let out = html;
  for (const [orig, local] of map) out = out.split(orig).join(local);
  return out;
}

// ── Content processing ────────────────────────────────────────────────────────

/** Remove WordPress block editor comments (<!-- wp:... --> / <!-- /wp:... -->). */
function stripWpComments(html: string): string {
  return html.replace(/<!--\s*\/?wp:[^\n]*-->\n?/g, '').trim();
}

/** Generate a plain-text excerpt from HTML (first paragraph, max 200 chars). */
function generateExcerpt(html: string): string {
  const m = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!m) return '';
  const text = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > 200 ? text.slice(0, 197) + '…' : text;
}

/** Escape YAML scalar — wrap in double quotes and escape inner quotes. */
function yamlStr(val: string | null): string {
  if (val === null) return 'null';
  return JSON.stringify(val);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('📖  Reading posts.xml …');
  const xml      = readFileSync(XML_PATH, 'utf-8');
  const allItems = extractItems(xml);
  console.log(`    Found ${allItems.length} items.`);

  // Author map
  const authorMap = buildAuthorMap(xml);
  console.log(`    Authors: ${Object.keys(authorMap).join(', ')}`);

  // Attachment ID → URL map
  const attachmentMap = new Map<string, string>();
  for (const item of allItems) {
    if (getTag(item, 'wp:post_type') === 'attachment') {
      const id  = getTag(item, 'wp:post_id');
      const url = getTag(item, 'wp:attachment_url');
      if (id && url) attachmentMap.set(id, url);
    }
  }
  console.log(`    Attachment map: ${attachmentMap.size} entries.`);

  // Published posts only
  const postItems = allItems.filter(
    (item) =>
      getTag(item, 'wp:post_type') === 'post' &&
      getTag(item, 'wp:status')    === 'publish',
  );
  console.log(`    Published posts: ${postItems.length}\n`);

  mkdirSync(CONTENT_DIR, { recursive: true });
  mkdirSync(IMAGES_DIR,  { recursive: true });

  let imported     = 0;
  let imagesFetched = 0;

  for (const item of postItems) {
    const slug     = getTag(item, 'wp:post_name');
    const title    = getTag(item, 'title');
    const date     = getTag(item, 'wp:post_date').split(' ')[0];       // YYYY-MM-DD
    const modified = getTag(item, 'wp:post_modified').split(' ')[0];
    const login    = getTag(item, 'dc:creator');
    const author   = authorMap[login] ?? login ?? 'David Arago';
    const cats     = getCategories(item);
    let   content  = getTag(item, 'content:encoded');
    const thumbId  = getPostMeta(item, '_thumbnail_id');
    const rawExc   = getTag(item, 'excerpt:encoded');

    if (!slug) { console.warn('  ⚠ Skipping item with no slug'); continue; }

    console.log(`  → ${slug}`);

    // ── Download + rewrite inline images ────────────────────────────────────
    const urlMap = new Map<string, string>();
    for (const imgUrl of extractImageUrls(content)) {
      const fname    = localFileName(imgUrl);
      const destPath = join(IMAGES_DIR, fname);
      urlMap.set(imgUrl, `${IMG_PREFIX}/${fname}`);
      if (!existsSync(destPath)) {
        const ok = await downloadImage(imgUrl, destPath);
        if (ok) { imagesFetched++; console.log(`    ✓ ${fname}`); }
        else { console.warn(`    ✗ failed: ${imgUrl}`); }
      }
    }

    content = stripWpComments(rewriteImageUrls(content, urlMap));

    const excerpt = rawExc
      ? rawExc.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
      : generateExcerpt(content);

    // ── Resolve featured image ───────────────────────────────────────────────
    let featuredImage: string | null = null;
    if (thumbId && attachmentMap.has(thumbId)) {
      const attUrl   = attachmentMap.get(thumbId)!;
      const fname    = localFileName(attUrl);
      const destPath = join(IMAGES_DIR, fname);
      featuredImage  = `${IMG_PREFIX}/${fname}`;
      if (!existsSync(destPath)) {
        const ok = await downloadImage(attUrl, destPath);
        if (ok) { imagesFetched++; console.log(`    ✓ [feat] ${fname}`); }
        else { console.warn(`    ✗ featured failed: ${attUrl}`); }
      }
    }

    // ── Write markdown file ──────────────────────────────────────────────────
    const fm = [
      '---',
      `title: ${yamlStr(title)}`,
      `date: ${yamlStr(date)}`,
      `modified: ${yamlStr(modified)}`,
      `slug: ${yamlStr(slug)}`,
      `author: ${yamlStr(author)}`,
      `categories: ${JSON.stringify(cats)}`,
      `excerpt: ${yamlStr(excerpt)}`,
      `featuredImage: ${yamlStr(featuredImage)}`,
      '---',
      '',
    ].join('\n');

    writeFileSync(join(CONTENT_DIR, `${slug}.md`), fm + content + '\n');
    imported++;
  }

  console.log(`\n✅  Done.`);
  console.log(`    Posts imported : ${imported}`);
  console.log(`    Images fetched : ${imagesFetched}`);
  console.log(`\n    Next: npm run dev  (blog pages now served from src/content/blog/)`);
}

main().catch((err) => { console.error(err); process.exit(1); });
