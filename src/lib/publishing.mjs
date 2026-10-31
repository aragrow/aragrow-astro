// Publishing rules shared by the Astro build and the database scripts.
// The build never talks to the database: it reads src/data/publishing.json, which
// `npm run db:snapshot` (run automatically before every build) exports from Postgres.

// Types whose visibility is controlled by status and dates. Blog listing pages and the
// internal elevator-pitch pages are always built.
export const MANAGED_TYPES = new Set(['page', 'post', 'service']);

export function classify(url) {
  if (url.startsWith('/elevator-pitch')) return 'internal';
  if (/^\/blog\/(\d+\/)?$/.test(url)) return 'listing';
  if (url.startsWith('/blog/')) return 'post';
  if (/-review\/$/.test(url)) return 'service';
  return 'page';
}

// published: live once publish_at (if set) has passed.
// scheduled: live once publish_at has passed (the snapshot also flips it to published).
// draft: never live. Anything with expire_at in the past is not live.
export function isLive(entry, now = Date.now()) {
  if (!entry) return false;
  const publishAt = entry.publishAt ? Date.parse(entry.publishAt) : null;
  const expireAt = entry.expireAt ? Date.parse(entry.expireAt) : null;
  if (expireAt !== null && expireAt <= now) return false;
  if (entry.status === 'published') return publishAt === null || publishAt <= now;
  if (entry.status === 'scheduled') return publishAt !== null && publishAt <= now;
  return false;
}

// Unknown URLs of a managed type count as drafts: new content stays off the site until it
// has been synced and set to published or scheduled.
export function isLiveUrl(url, snapshot, now = Date.now()) {
  if (!MANAGED_TYPES.has(classify(url))) return true;
  return isLive(snapshot.items[url], now);
}
