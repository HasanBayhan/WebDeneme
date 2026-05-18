// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ecpower.com.tr',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'tr',
        locales: {
          tr: 'tr-TR',
          en: 'en-US',
        },
      },
      filter: (page) => page !== undefined,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: ['https://ecpower.com.tr/', 'https://ecpower.com.tr/about', 'https://ecpower.com.tr/products', 'https://ecpower.com.tr/contact'],
    }),
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    optimizeDeps: {
      include: ['astro'],
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  redirects: {},
  trailingSlash: 'never',
});