import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://aragrow.me';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  const lines: string[] = [];
  lines.push('# Aragrow');
  lines.push('');
  lines.push('> AI consulting, automation, and software engineering — practical guides on building with LLMs, integrating AI into business workflows, and working effectively with clients.');
  lines.push('');
  lines.push('Aragrow is run by David Arago. The site publishes long-form articles on AI engineering, client work, and the RSTC method for fostering respect, safety, trust, and recognition with clients.');
  lines.push('');

  lines.push('## Core pages');
  lines.push('');
  lines.push(`- [Home](${SITE}/): Overview of Aragrow's services and recent writing`);
  lines.push(`- [Blog](${SITE}/blog/): Index of all articles`);
  lines.push(`- [FAQ](${SITE}/faq/): Frequently asked questions`);
  lines.push(`- [Contact](${SITE}/contact/): Get in touch`);
  lines.push('');

  lines.push('## Blog posts');
  lines.push('');
  for (const post of posts) {
    const url = `${SITE}/blog/${post.slug}/`;
    const desc = (post.data.excerpt || '').replace(/\s+/g, ' ').trim();
    lines.push(`- [${post.data.title}](${url})${desc ? `: ${desc}` : ''}`);
  }
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
