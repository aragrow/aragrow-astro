# WordPress → Astro Sync Pipeline

Full workflow for keeping the Astro static site in sync with WordPress posts.

---

## 0. Migration Strategy — WordPress to Astro

> **Reference:** [Astro Docs — Migrate from WordPress](https://docs.astro.build/en/guides/migrate-to-astro/from-wordpress/)

### 0.1 Key Differences

| Aspect | WordPress | Astro |
|---|---|---|
| **Editing** | Online dashboard (wp-admin) | Code editor + dev environment |
| **Rendering** | PHP server-side on every request | Static HTML at build time |
| **Extensibility** | Plugins & themes marketplace | Build features in code; fewer plugins |
| **Content storage** | MySQL database | Markdown/MDX files **or** headless CMS (REST API) |
| **Hosting** | Requires PHP + MySQL server | Static files on any CDN/host |

### 0.2 Migration Strategies

#### Strategy A — WordPress as Headless CMS ✅ (This project)

Keep WordPress as the content editor (wp-admin stays). Astro fetches posts at build time via the WP REST API and outputs pure static HTML. This is what AraGrow uses.

**Pros:**
- No workflow change for content editors
- Familiar WordPress dashboard for writing posts
- Astro handles all frontend performance (100 Lighthouse scores)
- WordPress can live on a subdomain or even a different host

**Cons:**
- Site must be rebuilt whenever content changes (handled via webhook — see Section 2)
- WordPress server still needs to run (but only for the API endpoint, not serving traffic)

#### Strategy B — Full Content Migration to Astro

Export all posts from WordPress to local Markdown files and remove WordPress entirely.

**When to choose this:** You want zero WordPress dependency, full content in Git, and the simplest possible hosting.

**Steps:**
1. Export posts using the community tool [`wordpress-export-to-markdown`](https://github.com/lonekorean/wordpress-export-to-markdown):
   ```bash
   npx wordpress-export-to-markdown
   ```
   This converts your WordPress XML export into `.md` files with frontmatter.

2. Start from an Astro blog template:
   ```bash
   npm create astro@latest -- --template blog
   ```

3. Drop the generated `.md` files into `src/content/blog/`.

4. Replace the REST API fetches (`src/lib/wordpress.ts`) with Astro's `getCollection('blog')`.

5. Update `src/pages/blog/[slug].astro` to use `getStaticPaths` from the content collection instead of the WP API.

**Note:** Large or complex sites (custom post types, ACF fields, shortcodes) will need manual adjustments after export.

### 0.3 What This Project Uses (Headless — Strategy A)

```
WordPress (aragrow.me/wp-admin)
  └─► WP REST API  (aragrow.me/wp-json/wp/v2)
        └─► Astro build  (npm run build)
              └─► Static HTML in ./dist
                    └─► Deployed to CDN / host
```

- Posts are fetched at **build time**, not at request time.
- No WordPress PHP code runs on the public-facing site.
- Content updates require a new build (automated via webhook — see Section 2).

### 0.4 Beginner Resources (Official Astro Docs)

| Resource | Link |
|---|---|
| Build a Blog Tutorial | https://docs.astro.build/en/tutorial/0-introduction/ |
| Content Collections | https://docs.astro.build/en/guides/content-collections/ |
| Dynamic Routes | https://docs.astro.build/en/guides/routing/#dynamic-routes |
| WordPress Migration Guide | https://docs.astro.build/en/guides/migrate-to-astro/from-wordpress/ |

---

## 1. How Posts Are Fetched (Current Setup)

The WordPress REST API helper lives at `src/lib/wordpress.ts`.
The base URL is `https://aragrow.me/wp-json/wp/v2`.

### Key functions

| Function | What it does |
|---|---|
| `getPosts(perPage?)` | Fetches published posts, newest first, with embedded author/media/terms |
| `getPostBySlug(slug)` | Fetches a single post by slug |
| `getCategories()` | Fetches all categories |
| `getFeaturedImage(post)` | Extracts featured image URL from embedded media |
| `getPostCategories(post)` | Extracts category names from embedded terms |
| `getAuthorName(post)` | Extracts author name from embedded author |

### How static paths are generated

`src/pages/blog/[slug].astro` calls `getStaticPaths()` at **build time**, which:
1. Fetches all published posts via `getPosts()`
2. Returns one `{ params: { slug } }` entry per post
3. Astro generates a static HTML file for each slug

This means **a new WordPress post only appears on the site after a new build**.

---

## 2. Triggering a Rebuild When a Post Is Published/Updated

### Option A — WordPress Webhook → GitHub Actions (Recommended)

**On the WordPress side**, install a webhook plugin (e.g. WP Webhooks, or use the built-in
`publish_post` / `post_updated` hooks in a small custom plugin):

```php
// wp-content/plugins/aragrow-deploy/aragrow-deploy.php
add_action('publish_post',    'aragrow_trigger_deploy');
add_action('post_updated',    'aragrow_trigger_deploy');

function aragrow_trigger_deploy() {
    wp_remote_post('https://api.github.com/repos/aragrow/aragrow-astro/dispatches', [
        'headers' => [
            'Authorization' => 'Bearer ' . GITHUB_PAT,   // set in wp-config.php
            'Accept'        => 'application/vnd.github.v3+json',
            'Content-Type'  => 'application/json',
        ],
        'body' => json_encode(['event_type' => 'wp-post-updated']),
    ]);
}
```

Add to `wp-config.php`:
```php
define('GITHUB_PAT', 'ghp_xxxxxxxxxxxxxxxxxxxx'); // fine-grained PAT, repo:write scope
```

**On the GitHub side**, create `.github/workflows/deploy.yml` (see Section 4).

---

### Option B — Scheduled Rebuild (Simpler, Less Real-Time)

Add a cron trigger to the GitHub Actions workflow that rebuilds every N hours:
```yaml
on:
  schedule:
    - cron: '0 */6 * * *'   # every 6 hours
```

---

## 3. GitHub Actions Workflow (Build + Deploy)

Create `.github/workflows/deploy.yml` in the repo root:

```yaml
name: Build & Deploy

on:
  push:
    branches: [main]
  repository_dispatch:
    types: [wp-post-updated]   # triggered by WordPress webhook
  workflow_dispatch:            # allows manual trigger from GitHub UI

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build Astro site
        run: npm run build
        env:
          PUBLIC_GTM_ID: ${{ secrets.PUBLIC_GTM_ID }}

      # ── Deploy step — fill in when cloud target is decided ──────────────────
      # See Section 4 for provider-specific deploy steps.
      - name: Deploy
        run: echo "Deploy step TBD — see Section 4"
```

---

## 4. Deploy Step — To Be Determined

Replace the `Deploy` step above with the appropriate block for your cloud provider:

### Netlify
```yaml
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v3
        with:
          publish-dir: ./dist
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Vercel
```yaml
      - name: Deploy to Vercel
        run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }} --yes
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

### AWS S3 + CloudFront
```yaml
      - name: Deploy to S3
        run: aws s3 sync ./dist s3://${{ secrets.S3_BUCKET }} --delete
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: us-east-1

      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CF_DISTRIBUTION_ID }} \
            --paths "/*"
```

### GitHub Pages
```yaml
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 5. Required GitHub Secrets

Add these under **Settings → Secrets and variables → Actions**:

| Secret | Used for |
|---|---|
| `PUBLIC_GTM_ID` | Google Tag Manager ID injected at build time |
| `NETLIFY_AUTH_TOKEN` | Netlify deploy (if chosen) |
| `NETLIFY_SITE_ID` | Netlify site ID |
| `VERCEL_TOKEN` | Vercel deploy (if chosen) |
| `VERCEL_ORG_ID` | Vercel org |
| `VERCEL_PROJECT_ID` | Vercel project |
| `AWS_ACCESS_KEY_ID` | AWS S3/CloudFront deploy |
| `AWS_SECRET_ACCESS_KEY` | AWS S3/CloudFront deploy |
| `S3_BUCKET` | AWS S3 bucket name |
| `CF_DISTRIBUTION_ID` | CloudFront distribution ID |

---

## 6. Full End-to-End Flow (Once Set Up)

```
WordPress (publish/update post)
  └─► WordPress webhook plugin
        └─► POST /repos/aragrow/aragrow-astro/dispatches  (GitHub API)
              └─► GitHub Actions: build-and-deploy.yml
                    ├─► npm ci
                    ├─► npm run build  (fetches posts from WP REST API)
                    └─► Deploy ./dist → Cloud provider
                              └─► Live site updated ✓
```

**Manual fallback**: Go to GitHub → Actions → "Build & Deploy" → "Run workflow"
to trigger a rebuild at any time without publishing a new post.

---

## 7. WordPress REST API — Enabling & Troubleshooting

If `getPosts()` returns `[]` (the blog shows placeholder cards):

1. **Check permalinks** — WordPress Admin → Settings → Permalinks → Save Changes
   (this flushes rewrite rules which enables the REST API routes)

2. **Check for security plugins** — Wordfence, iThemes Security, etc. may block
   external REST API requests. Add the build server IP to the allowlist,
   or disable "block REST API access for non-authenticated users".

3. **Test the endpoint directly**:
   ```
   curl https://aragrow.me/wp-json/wp/v2/posts?per_page=1
   ```
   Should return a JSON array. If it returns an error, the API is blocked.

4. **Application Passwords** — Already implemented in `src/lib/wordpress.ts`.
   All fetch calls include a `Basic` auth header when `WP_USER` and
   `WP_APP_PASSWORD` are set in `.env`. This bypasses WordFence's REST API
   blocking without disabling the firewall.

   **Setup steps:**
   - WordPress Admin → Users → Profile → scroll to **Application Passwords**
   - Enter a name (e.g. `Astro Build`) → click **Add New Application Password**
   - Copy the generated password (shown only once)
   - Add to `.env`:
     ```
     WP_USER=your-wp-username
     WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
     ```
   - Add the same two values as **GitHub Secrets** so the CI build can also
     authenticate (Settings → Secrets → `WP_USER`, `WP_APP_PASSWORD`).
   - Add them to the GitHub Actions workflow env block:
     ```yaml
     env:
       PUBLIC_GTM_ID: ${{ secrets.PUBLIC_GTM_ID }}
       WP_USER: ${{ secrets.WP_USER }}
       WP_APP_PASSWORD: ${{ secrets.WP_APP_PASSWORD }}
     ```
