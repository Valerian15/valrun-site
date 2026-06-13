import { matchesFilter, type FilterState } from '../lib/filter'

const grid = document.getElementById('grid')
const empty = document.getElementById('empty')
const status = document.getElementById('status')

// Guard: this island only applies on the library page. Bail cleanly elsewhere.
if (grid && empty && status) {
  const params = new URLSearchParams(location.search)
  const state: FilterState = { era: params.get('era') ?? '', region: params.get('region') ?? '' }
  const cards = Array.from(grid.querySelectorAll<HTMLElement>('.card'))
  const pills = Array.from(document.querySelectorAll<HTMLButtonElement>('.pill'))

  const syncPills = () => {
    for (const p of pills) {
      const on = state[p.dataset.key as keyof FilterState] === p.dataset.val
      p.classList.toggle('on', on)
      p.setAttribute('aria-pressed', String(on))
    }
  }
  const apply = () => {
    let shown = 0
    for (const c of cards) {
      const ok = matchesFilter({ era: c.dataset.era ?? '', regions: (c.dataset.region ?? '').split('|') }, state)
      c.hidden = !ok
      if (ok) shown++
    }
    empty.hidden = shown !== 0
    status.textContent = `${shown} ${shown === 1 ? 'chronicle' : 'chronicles'} shown`
    const q = new URLSearchParams()
    if (state.era) q.set('era', state.era)
    if (state.region) q.set('region', state.region)
    history.replaceState(null, '', q.toString() ? `?${q}` : location.pathname)
    syncPills()
  }
  for (const p of pills) {
    p.addEventListener('click', () => {
      const key = p.dataset.key as keyof FilterState
      state[key] = state[key] === p.dataset.val ? '' : (p.dataset.val ?? '')
      apply()
    })
  }
  document.getElementById('clear')?.addEventListener('click', () => { state.era = ''; state.region = ''; apply() })
  apply()
}
