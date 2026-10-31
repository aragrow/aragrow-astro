import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import publishing from './src/data/publishing.json' with { type: 'json' };
import { isLiveUrl } from './src/lib/publishing.mjs';

const buildTime = Date.now();

export default defineConfig({
  site: 'https://aragrow.me',
  compressHTML: true,
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      // Leave out internal pages and anything not live per src/data/publishing.json.
      filter: (page) =>
        !/\/elevator-pitch(\/|$)/.test(page) && isLiveUrl(new URL(page).pathname, publishing, buildTime),
    }),
  ],
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true,
    },
  },
});
