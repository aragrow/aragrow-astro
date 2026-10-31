#!/usr/bin/env node
// Runs before every build (npm "prebuild"). Brings the site database up to date with the
// source files, then exports each page's status and dates to src/data/publishing.json,
// which the build uses to decide what goes live:
//   - new source files are added as drafts (blog listing and internal pages stay live)
//   - scheduled items whose publish_at has passed become published
//   - items whose source file was deleted are marked removed
// Without a database (for example in GitHub Actions), the committed snapshot is used as is.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { isLive, MANAGED_TYPES } from '../src/lib/publishing.mjs';
import { connect, discoverSources, git, SCHEMA, SNAPSHOT_FILE } from './site-db.mjs';

async function main() {
  const client = await connect();
  if (!client) {
    if (existsSync(SNAPSHOT_FILE)) {
      console.log('Using the committed src/data/publishing.json.');
      return;
    }
    console.error('No site database and no src/data/publishing.json. Run `npm run db:snapshot` locally first.');
    process.exit(1);
  }

  try {
    await client.query('begin');
    await client.query(SCHEMA);
    const { rows: [sync] } = await client.query(
      'insert into syncs (git_commit, git_branch) values ($1, $2) returning id',
      [git('rev-parse', '--short', 'HEAD'), git('rev-parse', '--abbrev-ref', 'HEAD')]
    );
    const event = (id, name) =>
      client.query('insert into page_versions (page_id, sync_id, event) values ($1, $2, $3)', [id, sync.id, name]);

    // New source files start as drafts; a file that comes back after deletion is restored.
    const sources = discoverSources();
    let added = 0;
    for (const s of sources) {
      const { rows: [row] } = await client.query(
        `insert into pages (url, type, source_file, status)
         values ($1, $2, $3, $4)
         on conflict (url) do update set source_file = excluded.source_file, removed_at = null
           where pages.removed_at is not null
         returning id, (xmax = 0) as inserted`,
        [s.url, s.type, s.source_file, MANAGED_TYPES.has(s.type) ? 'draft' : 'published']
      );
      if (row) {
        await event(row.id, row.inserted ? 'added' : 'restored');
        added++;
        console.log(`  ${row.inserted ? 'new draft' : 'restored'}: ${s.url}`);
      }
    }

    // Source files that no longer exist.
    const { rows: gone } = await client.query(
      `update pages set removed_at = now()
        where removed_at is null and type <> 'listing' and not (url = any($1))
        returning id, url`,
      [sources.map((s) => s.url)]
    );
    for (const g of gone) {
      await event(g.id, 'removed');
      console.log(`  removed (source deleted): ${g.url}`);
    }

    // Scheduled items whose time has come.
    const { rows: due } = await client.query(
      `update pages set status = 'published'
        where status = 'scheduled' and publish_at <= now() and removed_at is null
        returning id, url`
    );
    for (const d of due) {
      await event(d.id, 'published');
      console.log(`  scheduled -> published: ${d.url}`);
    }

    const { rows } = await client.query(
      `select url, type, status, publish_at, expire_at from pages where removed_at is null order by url`
    );
    await client.query(
      'update syncs set finished_at = now(), pages_total = $2, added = $3, changed = $4, removed = $5 where id = $1',
      [sync.id, rows.length, added, due.length, gone.length]
    );
    await client.query('commit');

    const items = Object.fromEntries(
      rows.map((r) => [
        r.url,
        {
          type: r.type,
          status: r.status,
          publishAt: r.publish_at?.toISOString() ?? null,
          expireAt: r.expire_at?.toISOString() ?? null,
        },
      ])
    );
    const json = JSON.stringify({ items }, null, 2) + '\n';
    const previous = existsSync(SNAPSHOT_FILE) ? readFileSync(SNAPSHOT_FILE, 'utf8') : '';
    if (json !== previous) writeFileSync(SNAPSHOT_FILE, json);

    const now = Date.now();
    const managed = rows.filter((r) => MANAGED_TYPES.has(r.type));
    const live = managed.filter((r) => isLive(items[r.url], now)).length;
    console.log(
      `Publishing snapshot: ${live} live, ${managed.length - live} not live (draft, scheduled or expired)` +
        `${json === previous ? ', unchanged' : ', updated src/data/publishing.json'}.`
    );
  } catch (err) {
    await client.query('rollback');
    throw err;
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('Publishing snapshot failed:', err.message);
  process.exit(1);
});
