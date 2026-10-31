#!/usr/bin/env node
// Records the current content of every page and post in the site database (aragrow_site)
// and keeps each addition and change in `page_versions`. Runs after every build (npm
// "postbuild") and can be run on its own with `npm run db:sync`.
//
// Content comes from the built page when it exists. Pages that were not built (drafts,
// scheduled or expired) keep their last built content. A post that has never been built
// gets its content from its Markdown file, so new drafts can be reviewed in the database;
// it is never used to overwrite built content, which would log a false change.
// Statuses and dates are never changed here; edit them in the `pages` table.

import { MANAGED_TYPES, classify } from '../src/lib/publishing.mjs';
import {
  builtPageFiles, connect, discoverSources, frontMatter, git, gitDate, hashContent,
  readBuiltPage, SCHEMA, textOf, urlOfBuiltFile,
} from './site-db.mjs';

function postFromSource(sourceFile) {
  const { data, body } = frontMatter(sourceFile);
  const text = textOf(body);
  const page = {
    title: data.title ?? null,
    description: data.excerpt ?? null,
    h1: data.title ?? null,
    body: text,
    word_count: text ? text.split(/\s+/).filter(Boolean).length : 0,
  };
  return { ...page, content_hash: hashContent(page) };
}

async function main() {
  const client = await connect();
  if (!client) return;

  const built = new Map(builtPageFiles().map((f) => [urlOfBuiltFile(f), f]));
  const sources = new Map(discoverSources().map((s) => [s.url, s]));
  // Generated pages (blog listings) have no source file of their own.
  for (const url of built.keys()) {
    if (!sources.has(url)) sources.set(url, { url, type: classify(url), source_file: null });
  }

  try {
    await client.query('begin');
    await client.query(SCHEMA);
    const { rows: [sync] } = await client.query(
      'insert into syncs (git_commit, git_branch) values ($1, $2) returning id',
      [git('rev-parse', '--short', 'HEAD'), git('rev-parse', '--abbrev-ref', 'HEAD')]
    );
    const counts = { added: 0, changed: 0, removed: 0 };

    for (const s of sources.values()) {
      const fm = s.type === 'post' ? frontMatter(s.source_file).data : {};
      const meta = [
        s.type, s.source_file, gitDate(s.source_file), fm.date || null, fm.modified || null,
        Array.isArray(fm.categories) ? fm.categories : null, fm.excerpt || null,
      ];

      const { rows: [existing] } = await client.query(
        'select id, content_hash from pages where url = $1', [s.url]
      );
      let id = existing?.id;
      if (!existing) {
        const { rows: [row] } = await client.query(
          `insert into pages (url, type, source_file, source_changed_at, published_on, modified_on,
             categories, excerpt, status)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id`,
          [s.url, ...meta, MANAGED_TYPES.has(s.type) ? 'draft' : 'published']
        );
        id = row.id;
      } else {
        await client.query(
          `update pages set type = $2, source_file = $3, source_changed_at = $4, published_on = $5,
             modified_on = $6, categories = $7, excerpt = $8, last_seen_at = now(), removed_at = null
           where id = $1`,
          [id, ...meta]
        );
      }
      const isNew = !existing || existing.content_hash === null;
      const content = built.has(s.url)
        ? readBuiltPage(built.get(s.url))
        : s.type === 'post' && isNew ? postFromSource(s.source_file) : null;
      if (!content) continue;

      if (!isNew && existing.content_hash === content.content_hash) continue;
      await client.query(
        `update pages set title = $2, description = $3, h1 = $4, body = $5, word_count = $6, content_hash = $7
         where id = $1`,
        [id, content.title, content.description, content.h1, content.body, content.word_count, content.content_hash]
      );
      await client.query(
        `insert into page_versions (page_id, sync_id, event, title, description, h1, body, word_count, content_hash)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [id, sync.id, isNew ? 'added' : 'changed', content.title, content.description, content.h1,
          content.body, content.word_count, content.content_hash]
      );
      counts[isNew ? 'added' : 'changed']++;
    }

    // Blog listing pages that are no longer generated.
    const { rows: gone } = await client.query(
      `update pages set removed_at = now()
        where removed_at is null and type = 'listing' and not (url = any($1)) returning id`,
      [[...built.keys()]]
    );
    for (const g of gone) {
      await client.query("insert into page_versions (page_id, sync_id, event) values ($1, $2, 'removed')", [g.id, sync.id]);
    }
    counts.removed = gone.length;

    await client.query(
      'update syncs set finished_at = now(), pages_total = $2, added = $3, changed = $4, removed = $5 where id = $1',
      [sync.id, sources.size, counts.added, counts.changed, counts.removed]
    );
    await client.query('commit');
    console.log(
      `Content sync ${sync.id}: ${sources.size} pages, ${built.size} built; ` +
        `added ${counts.added}, changed ${counts.changed}, removed ${counts.removed}.`
    );
  } catch (err) {
    await client.query('rollback');
    throw err;
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('Content sync failed:', err.message);
  process.exit(1);
});
