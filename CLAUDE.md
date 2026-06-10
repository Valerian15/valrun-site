# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

`valrun-site` is the public web compendium for the fictional world of **Val'Run** — lore, geography, history, peoples, factions, etc. The repo's `README.md` is still the unmodified Vite-template boilerplate; ignore it as a description of the project.

Stack: React 19 + Vite 8 + react-router-dom 7, plain JS (no TypeScript), no test runner. Styling is via CSS Modules + a global theme stylesheet — no CSS framework.

## Source of the worldbuilding content

The narrative lore that lives on this site is **derived from but not copied verbatim from** the author's primary worldbuilding documents at `/Users/valerian/Desktop/V/DND/DM/ValRun/` (subfolders `01_LORE`, `02_ATLAS`, `03_MAGIC BIBLE`, `05_POLITICS`). Those `.docx` files are the canonical source — when adding content to the site, consult them first rather than inventing lore.

For programmatic reading, convert `.docx` → `.txt` via macOS `textutil`:
```bash
textutil -convert txt "<path>.docx" -output "/tmp/<name>.txt"
```

**DM-only content is excluded from the public site.** Specifically: combat stats, the Political Reaction Matrix, the Military and Logistics Bible numeric tables, D&D conversion mechanics, and "Open Questions / Story Hooks" sections of the source docs. Public pages describe what the *inhabitants* experience (a wandering oasis, a Sunken Citadel revered as Thalassor's temple), not what the *narrator* knows (a shifting aquifer above the cracking Anchor, a Zelkaris distribution hub). Preserve this discipline when adding content.

## Commands

```bash
npm run dev       # Vite dev server with HMR
npm run build     # production build to dist/
npm run preview   # serve the built bundle
npm run lint      # ESLint (flat config in eslint.config.js)
```

There is no test suite configured.

## Architecture

```
src/
  main.jsx                    # entry; wraps <App> in <BrowserRouter>
  App.jsx                     # <Routes> only — every route renders inside <Layout>
  styles/theme.css            # design tokens (CSS custom properties), fonts, global resets
  data/
    chapters.js               # canonical chapter order/numbering/titles/hero art
  components/
    Layout.jsx + .module.css      # sticky header + nav + footer; <Outlet/> for the page
    ChapterHero.jsx + .module.css # full-bleed cinematic chapter opening (interior pages)
    ChapterEnd.jsx + .module.css  # "turn the page" next-chapter band at the foot of chapters
    TarotCard.jsx + .module.css   # flippable card used by Peoples/Faith/Factions spreads
    GeoMapStage.jsx + .module.css # scroll-synced map stage for Geography
    ScrollToTop.jsx               # scroll reset on route change
  pages/
    Home.jsx + Home.module.css  # bespoke hero + chapter panels
    Geography.jsx, History.jsx, Peoples.jsx, Faith.jsx,
    Factions.jsx, NotFound.jsx (each with its own .module.css)
```

- **Real routes.** Each page has a URL (e.g. `/geography`, `/faith`). `App.jsx` is the only place routes are registered. Adding a page = add a `pages/X.jsx`, add a `<Route>` in `App.jsx`, and (for chapters) add an entry to `CHAPTERS` in [src/data/chapters.js](src/data/chapters.js).
- **Single chapter source.** [src/data/chapters.js](src/data/chapters.js) is the canonical chapter order, numbering, titles, and hero art. The Layout `NAV`, Home's panel numerals and coda, `ChapterHero` eyebrows, and `ChapterEnd` bands all derive from it — never hardcode chapter order or numerals elsewhere.
- **Pages are bespoke.** There are no generic page primitives — each page owns its markup and colocated CSS Module. Shared visual building blocks are the components above (`ChapterHero`, `ChapterEnd`, `TarotCard`, `GeoMapStage`, `ScrollToTop`).

## Design system

The whole visual identity is a **midnight-library / illuminated-manuscript** aesthetic — ink-dark ground, aged-ivory text, oxblood + dull-gold accents, serif headlines via Cormorant Garamond, sans body via Inter, small-caps via IM Fell English SC.

All tokens live as CSS custom properties in [src/styles/theme.css](src/styles/theme.css). The palette in particular:
- `--ink` / `--ink-soft` / `--ink-line` — backgrounds and hairlines
- `--vellum` / `--vellum-dim` / `--vellum-mute` — three weights of text
- `--gold` / `--gold-hi` — primary accent (links, headings on hover, ornaments)
- `--oxblood` / `--oxblood-hi` — secondary accent (reserved; sparingly used)
- `--indigo` — tertiary; manuscript blue

**Reuse the tokens — do not hardcode hex.** When introducing a new component, prefer CSS Modules colocated with the component (`Foo.jsx` + `Foo.module.css`) over inline styles. The previous version of this site was 100% inline `style={{...}}`; that pattern has been deliberately retired — don't reintroduce it.

Reusable utility classes from the global stylesheet:
- `.container` — centered max-width page column (`--maxw: 980px`)
- `.eyebrow` — small-caps section label
- `.flourish` + `.flourish-mark` — ornamental gold rule with centered diamond
- `.dropcap` — illuminated drop-cap on a paragraph's first letter

## Assets

`/public` holds runtime assets referenced by absolute path (`icons.svg`, favicons, the `/hero/*.jpg` chapter art, `/peoples` portraits, `/map.jpg`). `src/assets/` is empty/removed — all imagery lives in `/public`. There is no longer any 3D model or three.js scene — those were removed in the rewrite along with `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, and `three`.

## What was removed (and don't re-introduce without reason)

The previous incarnation was a single ~1100-line `App.jsx` with inline styles and an R3F dragon hero. It was scrapped intentionally. Don't re-add three.js, don't merge everything back into one file, and don't reintroduce inline `style={{...}}` as the default styling approach. If something needs to go back — discuss before doing it.
