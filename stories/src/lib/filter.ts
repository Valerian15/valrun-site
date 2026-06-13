export interface CardData { era: string; regions: string[] }
export interface FilterState { era: string; region: string }

export function matchesFilter(card: CardData, f: FilterState): boolean {
  if (f.era && card.era !== f.era) return false
  if (f.region && !card.regions.includes(f.region)) return false
  return true
}
