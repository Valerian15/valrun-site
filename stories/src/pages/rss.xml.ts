import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const stories = (await getCollection('stories')).sort((a, b) => a.data.sortYear - b.data.sortYear)
  return rss({
    title: "Chronicles of Val'Run",
    description: 'Short stories and chronicles from across the Seven Ages of Val’Run.',
    site: context.site!,
    items: stories.map((s) => ({
      title: s.data.title,
      description: s.data.teaser,
      link: `/${s.id.replace(/^\d+-/, '')}/`,
      // Stable, deterministic release order so feed readers can sort: index 1..12 → distinct dates.
      pubDate: new Date(2026, 5, s.data.index),
    })),
  })
}
