import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  site: 'https://darshannere.github.io',
  base: '/aditya',
  integrations: [tailwind({ applyBaseStyles: false })],
});
