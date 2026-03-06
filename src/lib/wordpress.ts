const WP_API = 'https://aragrow.me/wp-json/wp/v2';

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: Array<{ name: string; avatar_urls?: Record<string, string> }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: { sizes?: { medium?: { source_url: string } } };
    }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

/** Fetch all published posts (paginated, up to 100) */
export async function getPosts(perPage = 100): Promise<WPPost[]> {
  try {
    const res = await fetch(
      `${WP_API}/posts?_embed&per_page=${perPage}&status=publish&orderby=date&order=desc`
    );
    if (!res.ok) throw new Error(`WP API error: ${res.status}`);
    return res.json();
  } catch (e) {
    console.error('[WordPress] Failed to fetch posts:', e);
    return [];
  }
}

/** Fetch a single post by slug */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${WP_API}/posts?slug=${slug}&_embed&status=publish`);
    if (!res.ok) throw new Error(`WP API error: ${res.status}`);
    const posts: WPPost[] = await res.json();
    return posts[0] ?? null;
  } catch (e) {
    console.error(`[WordPress] Failed to fetch post "${slug}":`, e);
    return null;
  }
}

/** Fetch all categories */
export async function getCategories(): Promise<WPCategory[]> {
  try {
    const res = await fetch(`${WP_API}/categories?per_page=100`);
    if (!res.ok) throw new Error(`WP API error: ${res.status}`);
    return res.json();
  } catch (e) {
    console.error('[WordPress] Failed to fetch categories:', e);
    return [];
  }
}

/** Strip HTML tags from a string */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/** Format a WP date string to a readable date */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Get featured image URL from an embedded post, with fallback */
export function getFeaturedImage(post: WPPost): string | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  return (
    media?.media_details?.sizes?.medium?.source_url ??
    media?.source_url ??
    null
  );
}

/** Get category names from an embedded post */
export function getPostCategories(post: WPPost): string[] {
  return post._embedded?.['wp:term']?.[0]?.map((t) => t.name) ?? [];
}

/** Get author name from an embedded post */
export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name ?? 'David Arago';
}
