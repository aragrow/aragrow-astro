import { getCollection, type CollectionEntry } from 'astro:content';
import publishing from '../data/publishing.json';
import { isLiveUrl } from './publishing.mjs';

export type PostState = 'published' | 'draft' | 'scheduled' | 'expired';

export const postSlug = (post: CollectionEntry<'blog'>) => post.id.replace(/\.md$/, '');

const postUrl = (post: CollectionEntry<'blog'>) => `/blog/${postSlug(post)}/`;

const items = publishing.items as Record<
  string,
  { status?: string; publishAt?: string | null; expireAt?: string | null }
>;

// The publishing state of a post from src/data/publishing.json. 'published' means live now;
// otherwise 'draft', 'scheduled' or 'expired'. Used to badge non-live posts in local preview.
export function postState(post: CollectionEntry<'blog'>, now = Date.now()): PostState {
  const url = postUrl(post);
  if (isLiveUrl(url, publishing, now)) return 'published';
  const entry = items[url];
  if (!entry) return 'draft';
  const expireAt = entry.expireAt ? Date.parse(entry.expireAt) : null;
  if (expireAt !== null && expireAt <= now) return 'expired';
  return entry.status === 'scheduled' ? 'scheduled' : 'draft';
}

// Blog posts that are live at build time. Use this for production artifacts (the sitemap and
// llms.txt) so drafts, scheduled posts and expired posts never reach them.
export async function getPublishedPosts() {
  const now = Date.now();
  return (await getCollection('blog')).filter((post) => isLiveUrl(postUrl(post), publishing, now));
}

// Posts to show on pages, listings and the homepage. In production this is the live posts, so
// nothing changes on aragrow.me. On the local dev server (`npm run dev`) it also includes drafts,
// scheduled and expired posts so they can be previewed; pair it with postState() to show a badge
// instead of the date.
export async function getViewablePosts() {
  const now = Date.now();
  const posts = await getCollection('blog');
  if (!import.meta.env.DEV) return posts.filter((post) => isLiveUrl(postUrl(post), publishing, now));
  return posts;
}
