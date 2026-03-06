/**
 * scripts/fetch-wp-api.ts
 *
 * Incremental WordPress REST API → Astro content collection importer.
 *
 * Fetches all published posts from the WP REST API, skips posts whose
 * `modified` date hasn't changed, downloads new/updated content images
 * and featured images to public/images/blog/, rewrites image URLs to
 * local paths, and writes/overwrites markdown files in src/content/blog/.
 *
 * Run locally:
 *   WP_USER=... WP_APP_PASSWORD=... npx tsx scripts/fetch-wp-api.ts
 *
 * In GitHub Actions the secrets are injected via the workflow env block.
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
const CONTENT_DIR = join(ROOT, 'src', 'content', 'blog');
const IMAGES_DIR  = join(ROOT, 'public', 'images', 'blog');
const IMG_PREFIX  = '/images/blog';
const WP_BASE     = 'https://aragrow.me/wp-json/wp/v2';

const WP_USER         = process.env.WP_USER ?? '';
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD ?? '';

if (!WP_USER || !WP_APP_PASSWORD) {
  console.error('❌  WP_USER and WP_APP_PASSWORD must be set.');
  process.exit(1);
}

// ── Auth ─────────────────────────────────────────────────────────────────────

function authHeader(): string {
  return 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');
}

// ── HTTP helpers ─────────────────────────────────────────────────────────────

/** Fetch JSON from a URL with Basic auth, following up to 5 redirects. */
async function fetchJson<T = unknown>(url: string, depth = 0): Promise<T | null> {
  if (depth > 5) return null;
  return new Promise((resolve) => {
    let parsed: URL;
    try { parsed = new URL(url); } catch { resolve(null); return; }

    const getter = parsed.protocol === 'https:' ? httpsGet : httpGet;
    getter(
      url,
      {
        headers: {
          Authorization: authHeader(),
          'User-Agent': 'AraGrow-Deploy/1.0',
          Accept: 'application/json',
        },
      },
      (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          const loc = res.headers.location;
          res.resume();
          if (loc) {
            const next = loc.startsWith('http') ? loc : `${parsed.origin}${loc}`;
            fetchJson<T>(next, depth + 1).then(resolve);
          } else {
            resolve(null);
          }
          return;
        }
        if (res.statusCode !== 200) {
          console.warn(`  ⚠ HTTP ${res.statusCode}: ${url}`);
          res.resume();
          resolve(null);
          return;
        }
        const chunks: Buffer[] = [];
        res.on('data', (c: Buffer) => chunks.push(c));
        res.on('end', () => {
          try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf-8'))); }
          catch { resolve(null); }
        });
      },
    ).on('error', () => resolve(null));
  });
}

/** Download a file from url to destPath, following up to 5 redirects. */
async function downloadImage(url: string, destPath: string, depth = 0): Promise<boolean> {
  if (depth > 5) return false;
  return new Promise((resolve) => {
    let parsed: URL;
    try { parsed = new URL(url); } catch { resolve(false); return; }

    const getter = parsed.protocol === 'https:' ? httpsGet : httpGet;
    getter(url, { headers: { 'User-Agent': 'AraGrow-Import/1.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const loc = res.headers.location;
        res.resume();
        if (loc) {
          const next = loc.startsWith('http') ? loc : `${parsed.origin}${loc}`;
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

// ── WP REST API types ────────────────────────────────────────────────────────

interface WpPost {
  id: number;
  slug: string;
  date: string;          // ISO 8601 e.g. "2024-01-23T10:00:00"
  modified: string;      // ISO 8601
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ taxonomy: string; name: string }>>;
    author?: Array<{ name: string }>;
  };
}

// ── Content helpers ───────────────────────────────────────────────────────────

/** Strip HTML tags and collapse whitespace. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

/** Build a plain-text excerpt (max 200 chars). */
function makeExcerpt(rendered: string): string {
  const text = stripHtml(rendered);
  return text.length > 200 ? text.slice(0, 197) + '…' : text;
}

/** Derive a safe local filename from a URL. */
function localFileName(url: string): string {
  try { return basename(new URL(url).pathname); }
  catch { return basename(url); }
}

/** Find all aragrow.me/wp-content/uploads image URLs in HTML. */
function extractImageUrls(html: string): string[] {
  const re = /src="(https?:\/\/aragrow\.me\/wp-content\/uploads\/[^"]+)"/gi;
  const urls = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) urls.add(m[1]);
  return [...urls];
}

/** Replace all original image URLs with local paths. */
function rewriteImageUrls(html: string, map: Map<string, string>): string {
  let out = html;
  for (const [orig, local] of map) out = out.split(orig).join(local);
  return out;
}

/** Escape a value for YAML (double-quoted). */
function yamlStr(val: string | null): string {
  if (val === null) return 'null';
  return JSON.stringify(val);
}

/** Read the `modified` field from an existing .md frontmatter. */
function getExistingModified(slug: string): string | null {
  const filePath = join(CONTENT_DIR, `${slug}.md`);
  if (!existsSync(filePath)) return null;
  const content = readFileSync(filePath, 'utf-8');
  const m = content.match(/^modified:\s*"?([^"\n]+)"?/m);
  return m ? m[1].trim() : null;
}

// ── Fetch all published posts (auto-paginated) ────────────────────────────────

async function fetchAllPosts(): Promise<WpPost[]> {
  const posts: WpPost[] = [];
  let page = 1;
  while (true) {
    const url = `${WP_BASE}/posts?per_page=100&page=${page}&status=publish&_embed=true`;
    console.log(`  Fetching page ${page} …`);
    const data = await fetchJson<WpPost[]>(url);
    if (!data || data.length === 0) break;
    posts.push(...data);
    if (data.length < 100) break;
    page++;
  }
  return posts;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  mkdirSync(CONTENT_DIR, { recursive: true });
  mkdirSync(IMAGES_DIR,  { recursive: true });

  console.log('🌐  Fetching posts from WordPress REST API …');
  const wpPosts = await fetchAllPosts();
  console.log(`    Total published posts: ${wpPosts.length}\n`);

  if (wpPosts.length === 0) {
    console.error('❌  No posts returned — check WP_USER / WP_APP_PASSWORD and REST API access.');
    process.exit(1);
  }

  let imported  = 0;
  let skipped   = 0;
  let imgFetched = 0;

  for (const wp of wpPosts) {
    const slug     = wp.slug;
    const modified = wp.modified.split('T')[0]; // YYYY-MM-DD

    // ── Skip if unchanged ────────────────────────────────────────────────────
    const existingModified = getExistingModified(slug);
    if (existingModified === modified) {
      skipped++;
      continue;
    }

    console.log(`  → ${slug}${existingModified ? ' (updated)' : ' (new)'}`);

    // ── Extract fields ───────────────────────────────────────────────────────
    const title    = wp.title.rendered.replace(/&amp;/g, '&').replace(/&#\d+;/g, '');
    const date     = wp.date.split('T')[0];
    const author   = wp._embedded?.author?.[0]?.name ?? 'David Arago';
    const categories = (wp._embedded?.['wp:term'] ?? [])
      .flat()
      .filter((t) => t.taxonomy === 'category')
      .map((t) => t.name);

    let content = wp.content.rendered;
    const excerptRaw = stripHtml(wp.excerpt.rendered);
    const excerpt = excerptRaw.length > 200
      ? excerptRaw.slice(0, 197) + '…'
      : (excerptRaw || makeExcerpt(content));

    // ── Download inline images ───────────────────────────────────────────────
    const urlMap = new Map<string, string>();
    for (const imgUrl of extractImageUrls(content)) {
      const fname    = localFileName(imgUrl);
      const destPath = join(IMAGES_DIR, fname);
      urlMap.set(imgUrl, `${IMG_PREFIX}/${fname}`);
      if (!existsSync(destPath)) {
        const ok = await downloadImage(imgUrl, destPath);
        if (ok) { imgFetched++; console.log(`    ✓ ${fname}`); }
        else { console.warn(`    ✗ failed: ${imgUrl}`); }
      }
    }
    content = rewriteImageUrls(content, urlMap);

    // ── Resolve featured image ───────────────────────────────────────────────
    let featuredImage: string | null = null;
    const featMedia = wp._embedded?.['wp:featuredmedia']?.[0];
    if (featMedia?.source_url) {
      const fname    = localFileName(featMedia.source_url);
      const destPath = join(IMAGES_DIR, fname);
      featuredImage  = `${IMG_PREFIX}/${fname}`;
      if (!existsSync(destPath)) {
        const ok = await downloadImage(featMedia.source_url, destPath);
        if (ok) { imgFetched++; console.log(`    ✓ [feat] ${fname}`); }
        else { console.warn(`    ✗ featured failed: ${featMedia.source_url}`); }
      }
    }

    // ── Write markdown file ──────────────────────────────────────────────────
    const fm = [
      '---',
      `title: ${yamlStr(title)}`,
      `date: ${yamlStr(date)}`,
      `modified: ${yamlStr(modified)}`,
      `author: ${yamlStr(author)}`,
      `categories: ${JSON.stringify(categories)}`,
      `excerpt: ${yamlStr(excerpt)}`,
      `featuredImage: ${yamlStr(featuredImage)}`,
      '---',
      '',
    ].join('\n');

    writeFileSync(join(CONTENT_DIR, `${slug}.md`), fm + content + '\n');
    imported++;
  }

  console.log(`\n✅  Done.`);
  console.log(`    New / updated : ${imported}`);
  console.log(`    Unchanged     : ${skipped}`);
  console.log(`    Images fetched: ${imgFetched}`);

  if (imported === 0 && skipped === wpPosts.length) {
    console.log('\n    No content changes — build will use existing files.');
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
