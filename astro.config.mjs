// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Per-page SEO overrides for the sitemap
const PAGE_PRIORITIES = {
  'https://ecpower.com.tr/': { priority: 1.0, changefreq: 'weekly' },
  'https://ecpower.com.tr/products': { priority: 0.9, changefreq: 'weekly' },
  'https://ecpower.com.tr/about': { priority: 0.7, changefreq: 'monthly' },
  'https://ecpower.com.tr/contact': { priority: 0.8, changefreq: 'monthly' },
};

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
      filter: (page) => !page.includes('/admin') && !page.includes('/api'),
      serialize(item) {
        const override = PAGE_PRIORITIES[item.url.replace(/\/$/, '')] 
          || PAGE_PRIORITIES[item.url];
        if (override) {
          item.priority = override.priority;
          item.changefreq = override.changefreq;
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        item.lastmod = new Date().toISOString().split('T')[0];
        return item;
      },
      customPages: [
        'https://ecpower.com.tr/',
        'https://ecpower.com.tr/about',
        'https://ecpower.com.tr/products',
        'https://ecpower.com.tr/contact',
      ],
    }),
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    format: 'file',
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
  redirects: {
    // Eski URL'lerden yönlendirmeler (gerekirse)
    '/urunler': '/products',
    '/hakkimizda': '/about',
    '/iletisim': '/contact',
  },
  trailingSlash: 'never',
});