import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gopinas.org',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
