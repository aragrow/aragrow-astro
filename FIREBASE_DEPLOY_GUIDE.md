# Firebase Hosting Deploy Guide

How the AraGrow Astro site was set up to deploy to Firebase Hosting, and how to deploy going forward.

## Prerequisites

- Node.js 20+
- A Firebase project (this repo uses `warpinsights`)
- `firebase-tools` available via `npx` (no global install needed)

## One-time setup

### 1. Initialize Firebase Hosting

```bash
npx firebase-tools login
npx firebase-tools init hosting
```

Answers used during `init`:

| Prompt | Answer |
|---|---|
| Use an existing project | `warpinsights` |
| Public directory | `dist` *(see "Gotcha: public directory" below)* |
| Configure as a single-page app | **No** — Astro builds a multi-page site |
| Set up automatic builds and deploys with GitHub | **No** — configured manually for repo-scoped access |
| Enable Gemini in Firebase features | No (optional) |

This creates `firebase.json` and `.firebaserc`.

### 2. Fix `firebase.json`

If `init` set `public` to `public`, change it to `dist` (Astro's build output folder):

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

### 3. Remove Firebase placeholder files

`firebase init` drops `index.html` and `404.html` into the `public/` folder. Astro copies everything in `public/` into `dist/` during build, so these placeholders would overwrite Astro's real pages. **Delete them** — keep the `public/` folder itself (it holds fonts, images, logos, favicons).

```bash
rm public/index.html public/404.html
```

### 4. Set up CI deploy (repo-scoped, no GitHub OAuth app)

Instead of using Firebase's automated GitHub integration (which grants OAuth access across your account), the service account is provisioned manually so only this repo can deploy.

1. **Google Cloud Console** → IAM & Admin → Service Accounts → Create
   - Role: **Firebase Hosting Admin**
   - Generate a JSON key and download it
2. **GitHub** → `aragrow-astro` → Settings → Secrets and variables → Actions → New repository secret
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: paste the JSON file contents
3. **Delete the JSON file from disk** after uploading. The key lives only in the GitHub secret.
4. The workflow at [.github/workflows/firebase-deploy.yml](.github/workflows/firebase-deploy.yml) reads this secret and deploys on every push to `main`.

> ⚠️ **Never open the service account JSON in VS Code** while the Claude Code extension is active — the IDE selection is sent to the model and will leak the private key. If it's ever exposed, revoke and recreate the key immediately.

## Deploying

Use [deploy.sh](deploy.sh) at the repo root:

```bash
./deploy.sh         # interactive prompt
./deploy.sh ci      # git push → GitHub Actions builds & deploys
./deploy.sh local   # npm run build + firebase deploy from your machine
```

- **`ci` mode**: deploys via GitHub Actions using the service account secret. Normal release flow.
- **`local` mode**: deploys from your machine using your `firebase login` session. Good for sanity checks before pushing.

## Gotchas encountered during setup

- **`public/` must stay named `public/`.** Astro is hard-wired to read static assets from that folder. Renaming it (e.g. to `x-public`) breaks the build — fonts, images, and logos won't land in `dist/`.
- **Firebase's default public dir is wrong for Astro.** The `init` default is `public`, but the deployable output is `dist`. Always change this to `dist`.
- **Two workflows can run in parallel.** The pre-existing [.github/workflows/deploy.yml](.github/workflows/deploy.yml) still deploys to GitHub Pages on every push to `main`. The new Firebase workflow runs alongside it. Delete or disable one once DNS is pointed where you want.
- **Browser cache after redeploys.** Hard-refresh (`Cmd+Shift+R`) when verifying — Firebase serves aggressively cached assets.
- **Verify the deploy picked up all files.** The `firebase deploy` output should report a file count in the hundreds (matching `dist/`), not a handful.

## URLs

- Firebase default: https://aragrow-astro.web.app
- Custom domain (`aragrow.me`): currently still pointing to GitHub Pages. Switch DNS in your registrar to Firebase's records when ready to migrate fully.

## Troubleshooting

**"Firebase Hosting Setup Complete" placeholder shows up**
→ `firebase.json` has `"public": "public"` instead of `"dist"`, or the placeholder `index.html` is still in `public/`. Fix both, rebuild, redeploy.

**Images/fonts missing after deploy**
→ Confirm `dist/images/` and `dist/fonts/` exist locally after `npm run build`. If they don't, `public/` may be renamed or missing. Restore it and rebuild.

**CI deploy fails with auth error**
→ The `FIREBASE_SERVICE_ACCOUNT` secret is missing, malformed, or the key was revoked. Generate a new key, update the secret, don't commit the JSON file anywhere.
