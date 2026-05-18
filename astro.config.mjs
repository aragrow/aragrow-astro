import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aragrow.me',
  compressHTML: true,
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (page) => !/\/elevator-pitch(\/|$)/.test(page),
    }),
  ],
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true,
    },
  },
});
