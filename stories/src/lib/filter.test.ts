import { test, expect } from 'vitest'
import { matchesFilter } from './filter'

const card = { era: 'fifth', regions: ['Verdure', 'Cinder'] }
test('empty filters match everything', () => {
  expect(matchesFilter(card, { era: '', region: '' })).toBe(true)
})
test('era must match exactly', () => {
  expect(matchesFilter(card, { era: 'fifth', region: '' })).toBe(true)
  expect(matchesFilter(card, { era: 'third', region: '' })).toBe(false)
})
test('region matches if present in the card regions', () => {
  expect(matchesFilter(card, { era: '', region: 'Cinder' })).toBe(true)
  expect(matchesFilter(card, { era: '', region: 'Twiland' })).toBe(false)
})
