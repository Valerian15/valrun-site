import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://stories.valrun.org',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
})
