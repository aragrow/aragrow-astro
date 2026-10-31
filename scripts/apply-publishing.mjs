#!/usr/bin/env node
// Runs after `astro build` (npm "postbuild"). Removes every built page that is not live
// according to src/data/publishing.json (drafts, future-dated and expired pages return 404),
// then warns about any remaining page that still links to one of them.
// Blog posts are already filtered during the build; this also catches regular pages.

import { readFileSync, rmSync, readdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { isLiveUrl } from '../src/lib/publishing.mjs';
import { builtPageFiles, DIST, SNAPSHOT_FILE, urlOfBuiltFile } from './site-db.mjs';

const snapshot = JSON.parse(readFileSync(SNAPSHOT_FILE, 'utf8'));
const now = Date.now();

const removed = [];
for (const file of builtPageFiles()) {
  const url = urlOfBuiltFile(file);
  if (isLiveUrl(url, snapshot, now)) continue;
  rmSync(file);
  const dir = dirname(file);
  if (dir !== DIST && readdirSync(dir).length === 0) rmSync(dir, { recursive: true });
  removed.push(url);
}

if (removed.length === 0) {
  console.log('Publishing: every built page is live.');
} else {
  console.log(`Publishing: removed ${removed.length} page(s) that are not live:`);
  for (const url of removed) console.log(`  - ${url}`);

  // Live pages that still link to a removed page, grouped per removed page (a footer or
  // menu link shows up on every page, so list only a few examples).
  const linkTo = (url) => new RegExp(`href="(?:https://aragrow\\.me)?${url.replace(/\/$/, '')}/?(?:[#?"])`);
  const linkedFrom = new Map(removed.map((url) => [url, []]));
  for (const file of builtPageFiles()) {
    const html = readFileSync(file, 'utf8');
    for (const url of removed) if (linkTo(url).test(html)) linkedFrom.get(url).push(urlOfBuiltFile(file));
  }
  for (const [url, pages] of linkedFrom) {
    if (pages.length === 0) continue;
    const examples = pages.slice(0, 3).join(', ') + (pages.length > 3 ? ', ...' : '');
    console.warn(`Warning: ${pages.length} live page(s) still link to ${url} (${examples}).`);
  }
}
