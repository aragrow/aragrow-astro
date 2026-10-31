import { getCollection, type CollectionEntry } from 'astro:content';
import publishing from '../data/publishing.json';
import { isLiveUrl } from './publishing.mjs';

export const postSlug = (post: CollectionEntry<'blog'>) => post.id.replace(/\.md$/, '');

// Blog posts that are live at build time. Use this instead of getCollection('blog') so drafts,
// scheduled posts and expired posts never reach a page, a listing, the sitemap or llms.txt.
export async function getPublishedPosts() {
  const now = Date.now();
  return (await getCollection('blog')).filter((post) =>
    isLiveUrl(`/blog/${postSlug(post)}/`, publishing, now)
  );
}
