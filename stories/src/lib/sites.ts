// The Val'Run family of sites — single source of truth for cross-property navigation.
//
// Planned IA: the apex (valrun.org) becomes a "crossroads" portal and the Compendium
// moves to its own subdomain. Until that migration happens, `codex` points at the apex
// (where the Compendium currently lives). AFTER the move, change `codex.url` to
// 'https://codex.valrun.org' — that is the only edit required here.

export interface SiteLink {
  key: string
  label: string
  url: string
  current?: boolean // the property this site IS (rendered as non-link, marked current)
}

// Brand wordmark target — the family hub (today: Compendium; after the move: the crossroads).
export const HUB: SiteLink = { key: 'hub', label: "Val'Run", url: 'https://valrun.org' }

export const FAMILY: SiteLink[] = [
  // TODO(after Compendium move): url → 'https://codex.valrun.org'
  { key: 'codex', label: 'Codex', url: 'https://valrun.org' },
  { key: 'chronicles', label: 'Chronicles', url: '/', current: true },
  { key: 'app', label: 'App', url: 'https://app.valrun.org' },
]

export const isExternal = (url: string) => url.startsWith('http')
