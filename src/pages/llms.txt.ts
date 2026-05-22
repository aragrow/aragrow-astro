import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://aragrow.me';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  const lines: string[] = [];
  lines.push('# AraGrow');
  lines.push('');
  lines.push('> Fractional CTO services for businesses between $5M and $10M in revenue — hands-on technology leadership without the full-time overhead.');
  lines.push('');
  lines.push('AraGrow is run by David Aragó, based in Minneapolis with bilingual fluency in English and Spanish. David works directly with clients: no account managers, no handoffs. Services include a 30-day technology audit and ongoing fractional CTO engagements billed at $75/hour.');
  lines.push('');

  lines.push('## Core pages');
  lines.push('');
  lines.push(`- [Home](${SITE}/): Overview of AraGrow's fractional CTO services`);
  lines.push(`- [How I Work](${SITE}/how-i-work/): Engagement model, working principles, and pricing`);
  lines.push(`- [30-Day Technology Audit](${SITE}/30-day-audit/): What the audit covers, deliverables, and pricing (up to $1,500)`);
  lines.push(`- [Self-Assessment](${SITE}/self-assessment/): Free technology self-assessment tool for business owners`);
  lines.push(`- [FAQ](${SITE}/faq/): Answers to common questions about services, rates, and fit`);
  lines.push(`- [Blog](${SITE}/blog/): Articles on AI, technology strategy, and software engineering`);
  lines.push(`- [Contact](${SITE}/contact/): Book a 30-minute conversation`);
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
