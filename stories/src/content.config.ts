import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const stories = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/stories' }),
  schema: ({ image }) =>
    z.object({
      index: z.number().int().min(1).max(99),
      title: z.string(),
      age: z.enum(['third', 'fourth', 'fifth', 'sixth', 'seventh']),
      ageLabel: z.string(),
      year: z.string(),
      sortYear: z.number().int(),
      regions: z.array(z.string()).min(1),
      places: z.array(z.string()).min(1),
      engines: z.array(z.string()).min(1),
      epigraph: z.string(),
      epigraphSource: z.string(),
      lineOfRecord: z.string(),
      teaser: z.string(),
      coverAlt: z.string(),
      cover: image().optional(),
      wordCount: z.number().int().positive(),
    }),
})

export const collections = { stories }
