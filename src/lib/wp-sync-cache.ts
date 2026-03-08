/**
 * wp-sync-cache.ts
 *
 * Tracks which WordPress posts have already been synced so that each build
 * only processes posts that are new or have been modified since the last run.
 *
 * Cache file location: .cache/wp-sync.json  (gitignored)
 *
 * Usage in getStaticPaths / build scripts:
 *
 *   import { readCache, diffPosts, updateCache } from '../lib/wp-sync-cache';
 *   import { getPosts } from '../lib/wordpress';
 *
 *   const posts  = await getPosts();
 *   const cache  = readCache();
 *   const { newPosts, updatedPosts, unchangedPosts } = diffPosts(posts, cache);
 *
 *   // ... build pages for newPosts + updatedPosts as usual ...
 *
 *   updateCache(posts);   // write updated state to disk for next build
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import type { WPPost } from './wordpress';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PostCacheEntry {
  id: number;
  slug: string;
  /** ISO date string — when the post was first published in WordPress */
  date: string;
  /** ISO date string — when the post was last modified in WordPress */
  modified: string;
}

export interface WPSyncCache {
  /** ISO timestamp of the last successful build that wrote this cache */
  lastSync: string;
  /** Map of post ID → cached metadata */
  posts: Record<number, PostCacheEntry>;
}

export interface DiffResult {
  /** Posts not present in the cache — first time seen */
  newPosts: WPPost[];
  /** Posts whose `modified` date is newer than what's cached */
  updatedPosts: WPPost[];
  /** Posts whose `modified` date matches the cache — no changes */
  unchangedPosts: WPPost[];
}

// ---------------------------------------------------------------------------
// Cache file path
// ---------------------------------------------------------------------------

const CACHE_PATH = resolve(process.cwd(), '.cache/wp-sync.json');

// ---------------------------------------------------------------------------
// Read
// ---------------------------------------------------------------------------

/**
 * Read the on-disk cache.
 * Returns an empty cache object if the file does not exist yet or is corrupt.
 */
export function readCache(): WPSyncCache {
  if (!existsSync(CACHE_PATH)) {
    return { lastSync: '', posts: {} };
  }
  try {
    return JSON.parse(readFileSync(CACHE_PATH, 'utf-8')) as WPSyncCache;
  } catch {
    console.warn('[wp-sync-cache] Cache file unreadable — treating as empty.');
    return { lastSync: '', posts: {} };
  }
}

// ---------------------------------------------------------------------------
// Diff
// ---------------------------------------------------------------------------

/**
 * Compare the posts returned by the WP REST API against the on-disk cache.
 * Classifies each post as new, updated, or unchanged.
 *
 * NOTE: This does NOT write anything to disk.
 * Call `updateCache(posts)` after your build finishes to persist the new state.
 */
export function diffPosts(fetched: WPPost[], cache: WPSyncCache): DiffResult {
  const result: DiffResult = {
    newPosts: [],
    updatedPosts: [],
    unchangedPosts: [],
  };

  for (const post of fetched) {
    const cached = cache.posts[post.id];

    if (!cached) {
      result.newPosts.push(post);
    } else if (cached.modified !== post.modified) {
      result.updatedPosts.push(post);
    } else {
      result.unchangedPosts.push(post);
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

/**
 * Rebuild the cache from the full list of fetched posts and write it to disk.
 * Call this once at the END of a successful build so the next build starts
 * with an accurate baseline.
 */
export function updateCache(posts: WPPost[]): void {
  const cache: WPSyncCache = {
    lastSync: new Date().toISOString(),
    posts: Object.fromEntries(
      posts.map((p) => [
        p.id,
        {
          id: p.id,
          slug: p.slug,
          date: p.date,
          modified: p.modified,
        } satisfies PostCacheEntry,
      ])
    ) as Record<number, PostCacheEntry>,
  };

  mkdirSync(dirname(CACHE_PATH), { recursive: true });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf-8');
  console.log(
    `[wp-sync-cache] Cache updated — ${posts.length} posts tracked. lastSync: ${cache.lastSync}`
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Return a short human-readable summary of a diff result. */
export function summariseDiff(diff: DiffResult): string {
  return (
    `new: ${diff.newPosts.length}, ` +
    `updated: ${diff.updatedPosts.length}, ` +
    `unchanged: ${diff.unchangedPosts.length}`
  );
}
