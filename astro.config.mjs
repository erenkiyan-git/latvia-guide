// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://latviaguide.com',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/design-system') &&
        !page.includes('/palette-preview')
    }),
    react()
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});