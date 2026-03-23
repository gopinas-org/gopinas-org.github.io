import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gopinas.org',
  trailingSlash: 'always',
  redirects: {
    '/about-go.html': '/about-go/',
    '/about.html': '/about/',
    '/press-kit.html': '/press-kit/',
  },
  integrations: [sitemap()],
});
