import { test, expect } from 'vitest'
import { readTime, byChronology, relatedTo } from './stories'

const s = (o: Partial<any>) => ({
  index: 1, slug: 's', title: 'T', age: 'third', ageLabel: 'Third Age',
  year: '0 AI', sortYear: 0, regions: ['Verdure'], places: ['Greymouth'],
  engines: ['Tragedy'], wordCount: 4000, ...o,
})

test('readTime rounds to nearest minute at 200wpm, min 1', () => {
  expect(readTime(4000)).toBe(20)
  expect(readTime(50)).toBe(1)
})

test('byChronology sorts ascending by sortYear', () => {
  const out = byChronology([s({ sortYear: 656 }), s({ sortYear: -195 }), s({ sortYear: 0 })])
  expect(out.map((x) => x.sortYear)).toEqual([-195, 0, 656])
})

test('relatedTo prefers same age, then shared region, excludes self, max 3', () => {
  const self = s({ slug: 'self', age: 'fifth', regions: ['Verdure'] })
  const pool = [
    self,
    s({ slug: 'a', age: 'fifth', regions: ['Cinder'] }),     // same age
    s({ slug: 'b', age: 'seventh', regions: ['Verdure'] }),  // shared region
    s({ slug: 'c', age: 'seventh', regions: ['Twiland'] }),  // neither
  ]
  const r = relatedTo(self, pool)
  expect(r.map((x) => x.slug)).toEqual(['a', 'b'])
  expect(r.length).toBeLessThanOrEqual(3)
})
