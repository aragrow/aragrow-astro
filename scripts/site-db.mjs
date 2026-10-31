// Shared helpers for the site database scripts: connection, schema, and reading the
// source files and built pages. See sync-site-inventory.mjs and publishing-snapshot.mjs.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import pg from 'pg';
import { classify, MANAGED_TYPES } from '../src/lib/publishing.mjs';

export const ROOT = new URL('..', import.meta.url).pathname;
export const DIST = join(ROOT, 'dist');
export const SNAPSHOT_FILE = join(ROOT, 'src/data/publishing.json');
const BLOG_SRC = join(ROOT, 'src/content/blog');
const PAGES_SRC = join(ROOT, 'src/pages');
const DB_URL = process.env.SITE_DB_URL ?? 'postgres:///aragrow_site';

// Returns a connected client, or null when no database is reachable (for example in the
// GitHub Actions build), so callers can skip database work instead of failing the build.
export async function connect() {
  const client = new pg.Client({ connectionString: DB_URL });
  try {
    await client.connect();
    return client;
  } catch (err) {
    console.warn(`Site database not available (${err.code ?? err.message}); skipping database step.`);
    return null;
  }
}

export const SCHEMA = `
create table if not exists syncs (
  id serial primary key,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  git_commit text,
  git_branch text,
  pages_total int,
  added int,
  changed int,
  removed int
);

create table if not exists pages (
  id serial primary key,
  url text not null unique,
  type text not null,                   -- page, post, service, listing, internal
  title text,
  description text,
  h1 text,
  body text,                            -- main content as plain text
  word_count int,
  source_file text,
  source_changed_at timestamptz,        -- last git commit touching the source file
  published_on date,                    -- posts: date from front matter
  modified_on date,                     -- posts: modified from front matter
  categories text[],                    -- posts only
  excerpt text,                         -- posts only
  content_hash text,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  removed_at timestamptz                -- source file deleted
);

create table if not exists page_versions (
  id serial primary key,
  page_id int not null references pages(id),
  sync_id int not null references syncs(id),
  event text not null,                  -- added, changed, removed, restored, published
  title text,
  description text,
  h1 text,
  body text,
  word_count int,
  content_hash text,
  recorded_at timestamptz not null default now()
);

create index if not exists page_versions_page_idx on page_versions(page_id, recorded_at desc);
create index if not exists pages_type_idx on pages(type);

-- Publishing (added later): existing rows become published; new rows start as drafts.
alter table pages alter column content_hash drop not null;
alter table pages add column if not exists status text;
alter table pages add column if not exists publish_at timestamptz;
alter table pages add column if not exists expire_at timestamptz;
update pages
   set status = 'published',
       publish_at = coalesce(publish_at, published_on::timestamptz, first_seen_at)
 where status is null;
alter table pages alter column status set default 'draft';
alter table pages alter column status set not null;
do $$ begin
  alter table pages add constraint pages_status_check check (status in ('draft', 'scheduled', 'published'));
exception when duplicate_object then null; end $$;

-- Files that belong to a page or post (images, PDFs, videos, downloads), added by hand.
create table if not exists assets (
  id serial primary key,
  page_id int not null references pages(id),
  kind text not null default 'image',   -- image, pdf, video, audio, document, other
  file_path text not null,              -- path in the project, e.g. public/images/blog/hero.webp
  url text,                             -- public URL, e.g. /images/blog/hero.webp
  title text,
  alt_text text,                        -- required for images shown on the site
  caption text,
  mime_type text,
  width int,
  height int,
  file_size_bytes bigint,
  sort_order int not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists assets_page_idx on assets(page_id, sort_order);
do $$ begin
  alter table assets add constraint assets_kind_check
    check (kind in ('image', 'pdf', 'video', 'audio', 'document', 'other'));
exception when duplicate_object then null; end $$;

-- What is live right now, for browsing in TablePlus.
create or replace view publishing as
select url, type, title, status, publish_at, expire_at,
       case
         when type not in ('page', 'post', 'service') then 'always live'
         when expire_at is not null and expire_at <= now() then 'expired'
         when status = 'draft' then 'draft'
         when publish_at is not null and publish_at > now() then 'scheduled'
         else 'live'
       end as state
  from pages
 where removed_at is null
 order by type, url;
`;

export function git(...args) {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim() || null;
  } catch {
    return null;
  }
}

// ---------- source files ----------

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

// Every URL that has its own source file. Blog listing pages are generated, so they are
// found from the built site instead.
export function discoverSources() {
  const posts = readdirSync(BLOG_SRC)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ url: `/blog/${f.replace(/\.md$/, '')}/`, source_file: `src/content/blog/${f}` }));
  const pages = walk(PAGES_SRC)
    .filter((f) => f.endsWith('.astro') && !f.includes('[') && !f.endsWith(`${sep}404.astro`))
    .map((f) => {
      const route = relative(PAGES_SRC, f).replace(/\.astro$/, '').split(sep).join('/');
      const url = route === 'index' ? '/' : `/${route.replace(/\/?index$/, '')}/`;
      return { url, source_file: relative(ROOT, f).split(sep).join('/') };
    });
  return [...posts, ...pages].map((s) => ({ ...s, type: classify(s.url) }));
}

// Blog front matter is simple `key: "value"` and `key: ["a", "b"]` lines.
export function frontMatter(sourceFile) {
  const file = join(ROOT, sourceFile);
  if (!existsSync(file)) return { data: {}, body: '' };
  const text = readFileSync(file, 'utf8');
  const fm = text.match(/^---\n([\s\S]*?)\n---\n?/);
  const data = {};
  for (const line of (fm?.[1] ?? '').split('\n')) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    try {
      data[m[1]] = JSON.parse(m[2]);
    } catch {
      data[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return { data, body: fm ? text.slice(fm[0].length) : text };
}

export function gitDate(file) {
  return file ? git('log', '-1', '--format=%cI', '--', file) : null;
}

// ---------- built pages ----------

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'" };
export function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z#0-9]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}

export function textOf(html) {
  return decode(
    html
      .replace(/<(script|style|nav|noscript|svg)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|h[1-6]|li|div|section|article|figcaption|blockquote|tr)>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
}

function pick(html, re) {
  const m = html.match(re);
  return m ? decode(m[1].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim() : null;
}

export function builtPageFiles() {
  if (!existsSync(DIST)) return [];
  const find = (dir) =>
    readdirSync(dir).flatMap((name) => {
      if (name.startsWith('_')) return []; // Astro assets and temporary folders
      const full = join(dir, name);
      if (statSync(full).isDirectory()) return find(full);
      return name === 'index.html' ? [full] : [];
    });
  return find(DIST);
}

export function urlOfBuiltFile(file) {
  const parts = relative(DIST, file).split(sep).slice(0, -1);
  return parts.length ? `/${parts.join('/')}/` : '/';
}

export function hashContent(p) {
  return createHash('sha256').update([p.title, p.description, p.h1, p.body].join('\u0000')).digest('hex');
}

export function readBuiltPage(file) {
  const html = readFileSync(file, 'utf8');
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  const body = textOf(main);
  const page = {
    title: pick(html, /<title>([\s\S]*?)<\/title>/i),
    description: pick(html, /<meta name="description" content="([^"]*)"/i),
    h1: pick(main, /<h1[^>]*>([\s\S]*?)<\/h1>/i),
    body,
    word_count: body ? body.split(/\s+/).filter(Boolean).length : 0,
  };
  return { ...page, content_hash: hashContent(page) };
}

export { MANAGED_TYPES };
