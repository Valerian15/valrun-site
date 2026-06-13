export interface StoryMeta {
  index: number; slug: string; title: string
  age: 'third' | 'fourth' | 'fifth' | 'sixth' | 'seventh'
  ageLabel: string; year: string; sortYear: number
  regions: string[]; places: string[]; engines: string[]; wordCount: number
}

export function readTime(wordCount: number): number {
  return Math.max(1, Math.round(wordCount / 200))
}

export function byChronology<T extends { sortYear: number }>(stories: T[]): T[] {
  return [...stories].sort((a, b) => a.sortYear - b.sortYear)
}

export function relatedTo<T extends { slug: string; age: string; regions: string[] }>(self: T, all: T[]): T[] {
  const others = all.filter((s) => s.slug !== self.slug)
  const sameAge = others.filter((s) => s.age === self.age)
  const sharedRegion = others.filter(
    (s) => s.age !== self.age && s.regions.some((r) => self.regions.includes(r)),
  )
  return [...sameAge, ...sharedRegion].slice(0, 3)
}
