# WordPress → Astro Sync Pipeline

Full workflow for keeping the Astro static site in sync with WordPress posts.

---

## 0. Current Architecture (as of March 2026)

### What Changed

The site was originally planned as a headless CMS pulling from the WordPress REST API at build time. That approach is **blocked** by the Hostinger CDN (see Section 7). The working architecture is now:

1. **WordPress → XML export** → `npm run import` → local `.md` files in `src/content/blog/`
2. **Git push** → GitHub Actions rebuilds and deploys to GitHub Pages
3. **WordPress publish webhook** → GitHub Actions triggered automatically on post publish

```
Author publishes/updates post in WordPress
  └─► WordPress plugin fires GitHub repository_dispatch
        └─► GitHub Actions: Build & Deploy
              ├─► npm ci
              ├─► npm run build  (reads src/content/blog/*.md)
              └─► peaceiris/actions-gh-pages → gh-pages branch → aragrow.me ✓

OR (manual content sync):
  Export posts.xml from WordPress Admin → Tools → Export
  └─► npm run import  (scripts/menu.sh)
        ├─► npx tsx scripts/import-wp.ts  (parses XML → .md files + downloads images)
        ├─► git add src/content/blog/ public/images/blog/
        ├─► git commit
        └─► git push  → triggers GitHub Actions rebuild ✓
```

---

## 1. Content Collection Architecture

### Files

| File | Purpose |
|---|---|
| `src/content/config.ts` | Zod schema for blog collection |
| `src/content/blog/*.md` | 69 blog posts (Markdown + YAML frontmatter) |
| `public/images/blog/` | 113 downloaded post images |
| `src/pages/blog/[...page].astro` | Paginated blog listing (12/page, 6 pages) |
| `src/pages/blog/[slug].astro` | Individual post page |
| `src/components/Blog.astro` | Homepage "Latest from the Blog" section (3 posts) |

### Content Schema (`src/content/config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.string(),
      modified: z.string().optional(),
      author: z.string().default('David Arago'),
      categories: z.array(z.string()).default([]),
      excerpt: z.string().default(''),
      featuredImage: z.string().nullable().default(null),
    }),
  }),
};
```

> **Astro 5 note:** `slug` is a reserved field — do NOT add it to the schema. Use `post.id` for routing (filename without extension). Always strip `.md` with `post.id.replace(/\.md$/, '')`.

### Reading posts in components/pages

```typescript
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog')).sort(
  (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
);
// Use post.id.replace(/\.md$/, '') for slug/href everywhere
```

---

## 2. XML Import Workflow (Current Working Method)

### Quick steps

1. WordPress Admin → Tools → Export → All content → Save as `posts.xml` in project root
2. Run:
   ```bash
   npm run import
   ```
   This runs `bash scripts/menu.sh` which:
   - Checks `posts.xml` exists
   - Runs `npx tsx scripts/import-wp.ts` (parses XML, writes `.md` files, downloads images)
   - Stages `src/content/blog/` and `public/images/blog/`
   - Commits and pushes → triggers GitHub Actions rebuild

### What `scripts/import-wp.ts` does

- Parses WXR (WordPress eXtended RSS) XML format
- Downloads featured images and inline `<img>` images to `public/images/blog/`
- Rewrites image URLs to local `/images/blog/` paths
- Strips WordPress block editor comments (`<!-- wp:... -->`)
- Writes YAML frontmatter: `title`, `date`, `modified`, `author`, `categories`, `excerpt`, `featuredImage`
- Skips `auto-draft` posts
- Creates `src/content/blog/<slug>.md` for each published post

### Incremental REST API importer (`scripts/fetch-wp-api.ts`)

A second script exists for incremental imports via the WordPress REST API. It compares post `modified` dates and only updates changed posts. **Currently blocked by Hostinger CDN** (see Section 7). Used by GitHub Actions when `repository_dispatch` or `workflow_dispatch` triggers the build.

---

## 3. WordPress Deploy Trigger Plugin

**File in this repo:** `plugins/aragrow-astro-deploy/aragrow-astro-deploy.php`

> Install via Hostinger File Manager — copy to `public_html/wp-content/plugins/aragrow-astro-deploy/` and activate in wp-admin → Plugins.

### How it works

Hooks `transition_post_status`. When a post is published or updated (status changes to `publish`):
- Skips autosaves, revisions, and non-`post` post types
- POSTs to `https://api.github.com/repos/aragrow/aragrow-astro/dispatches` with `event_type: wp-post-updated`
- Requires `GITHUB_PAT` constant in `wp-config.php`

### wp-config.php addition (on Hostinger)

Add before `/* That's all, stop editing! */`:

```php
define( 'GITHUB_PAT', 'ghp_xxxxxxxxxxxxxxxxxxxx' ); // fine-grained PAT, contents:write on aragrow/aragrow-astro
```

**PAT requirements:** Fine-grained personal access token, scoped to `aragrow/aragrow-astro`, with `Contents: Read and write` permission.

---

## 4. GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

### Triggers

| Trigger | When |
|---|---|
| `push` to `main` | Code/content changes pushed to repo |
| `repository_dispatch` (`wp-post-updated`) | WordPress plugin fires on publish/update |
| `workflow_dispatch` | Manual run from GitHub UI |

### Build steps

1. Checkout → Setup Node 20 → `npm ci`
2. If triggered by `repository_dispatch` or `workflow_dispatch`: run `npx tsx scripts/fetch-wp-api.ts` (incremental REST API import — **currently blocked by CDN**, step is a no-op until CDN is fixed)
3. `npm run build` (builds from `src/content/blog/*.md`)
4. Deploy to `gh-pages` branch with `peaceiris/actions-gh-pages@v4`
   - Writes `CNAME: aragrow.me` so GitHub Pages preserves the custom domain

### Required GitHub Secrets

Go to: **github.com/aragrow/aragrow-astro → Settings → Secrets and variables → Actions**

| Secret | Value |
|---|---|
| `WP_USER` | `aragrowwp-headless` |
| `WP_APP_PASSWORD` | (Application Password from WP admin) |
| `PUBLIC_GTM_ID` | GTM ID when ready (optional) |

`GITHUB_TOKEN` is automatic — no setup needed.

### GitHub Pages setup (one-time)

1. Go to `github.com/aragrow/aragrow-astro/settings/pages`
2. Source → **Deploy from a branch**
3. Branch → `gh-pages` / `/ (root)` → Save
4. Add custom domain `aragrow.me`

> The `gh-pages` branch is created automatically by `peaceiris/actions-gh-pages` on first successful build — no manual branch creation needed.

---

## 5. Pagination

The blog listing is paginated using Astro's built-in `paginate()`:

- **Page size:** 12 posts per page
- **Routes:** `/blog` (page 1), `/blog/2` … `/blog/N`
- **File:** `src/pages/blog/[...page].astro`
- As posts are added/removed, the number of pages recalculates automatically at build time
- Pagination controls: Prev/Next buttons + numbered page links with ellipsis for large page counts

---

## 6. WordPress REST API — Status & Troubleshooting

### Current Status: BLOCKED by Hostinger CDN

The WordPress REST API (`aragrow.me/wp-json/wp/v2/posts`) requires Basic Authentication with an Application Password. The Astro build (via `scripts/fetch-wp-api.ts`) sends:

```
Authorization: Basic base64(aragrowwp-headless:app-password)
```

**Root cause of 401 errors:** Hostinger's CDN (`server: hcdn`) strips the `Authorization` header before it reaches the origin server. This means even with `.htaccess` and mu-plugin fixes applied correctly, PHP never sees the header.

### Investigation findings

| Fix attempted | Result | Why |
|---|---|---|
| `RewriteRule .* - [E=HTTP_AUTHORIZATION:...]` in `.htaccess` | ❌ | Apache env vars don't cross PHP-FPM FastCGI boundary |
| `CGIPassAuth On` in `.htaccess` (inside `<If /wp-json/>`) | ❌ | Correct for PHP-FPM, but irrelevant — CDN strips header before it reaches Apache |
| mu-plugin `disable_rest_api_by_user` Authorization bypass | ✅ already in place | PHP never sees the header so this bypass never fires |
| `allow-api-auth.php` plugin (removed) | N/A | Redundant; `remove_filter` can't remove a class method callback by function name |

**Evidence of CDN:** `curl` response headers contain `server: hcdn` and `x-hcdn-request-id`.

### Pending fix options

**Option A — Configure Hostinger CDN** (preferred):
- In Hostinger hPanel → CDN settings, add a rule to pass `Authorization` header for paths matching `/wp-json/*`
- May not be available on all Hostinger plans

**Option B — WP Plugin pushes content to GitHub** (alternative):
- Instead of GitHub Actions pulling from REST API, the WordPress plugin pushes post Markdown to the repo directly via GitHub Contents API
- Bypasses CDN entirely
- More complex but fully decouples the CDN issue

**Current workaround:** XML export + `npm run import` (Section 2). Reliable and works today.

### Server-side setup documentation

See `plugins/aragrow-astro-deploy/SETUP.md` for full documentation of:
- `.htaccess` `CGIPassAuth On` change (correct but insufficient due to CDN)
- `disable_rest_api_by_user` mu-plugin Authorization header bypass code

---

## 7. Full End-to-End Flow (Once Fully Set Up)

```
WordPress (publish/update post)
  └─► aragrow-astro-deploy plugin
        └─► POST github.com/repos/aragrow/aragrow-astro/dispatches
              └─► GitHub Actions: Build & Deploy
                    ├─► npm ci
                    ├─► npx tsx scripts/fetch-wp-api.ts  ← blocked by CDN currently
                    ├─► npm run build  (reads src/content/blog/*.md)
                    └─► peaceiris/actions-gh-pages → gh-pages → aragrow.me ✓
```

Until CDN is resolved, content sync is done manually:

```
WordPress export (posts.xml)
  └─► npm run import
        └─► git push → GitHub Actions → aragrow.me ✓
```

---

## 8. Migration Strategy Reference

### 0.1 Key Differences

| Aspect | WordPress | Astro |
|---|---|---|
| **Editing** | Online dashboard (wp-admin) | Code editor + dev environment |
| **Rendering** | PHP server-side on every request | Static HTML at build time |
| **Extensibility** | Plugins & themes marketplace | Build features in code; fewer plugins |
| **Content storage** | MySQL database | Markdown/MDX files or headless CMS |
| **Hosting** | Requires PHP + MySQL server | Static files on any CDN/host |

### 0.2 What This Project Uses

**Headless CMS with local Markdown files** — WordPress stays as the content editor (wp-admin). Posts are exported to Markdown files checked into Git. Astro reads those files at build time and outputs pure static HTML.

```
WordPress (aragrow.me/wp-admin)  ← authors write here
  └─► XML export → import script → src/content/blog/*.md (in Git)
        └─► Astro build (npm run build)
              └─► Static HTML in ./dist
                    └─► GitHub Pages → aragrow.me
```

### 0.3 Beginner Resources (Official Astro Docs)

| Resource | Link |
|---|---|
| Build a Blog Tutorial | https://docs.astro.build/en/tutorial/0-introduction/ |
| Content Collections | https://docs.astro.build/en/guides/content-collections/ |
| Dynamic Routes | https://docs.astro.build/en/guides/routing/#dynamic-routes |
| WordPress Migration Guide | https://docs.astro.build/en/guides/migrate-to-astro/from-wordpress/ |
