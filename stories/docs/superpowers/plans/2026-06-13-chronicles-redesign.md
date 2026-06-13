# Chronicles of Val'Run — Redesign & Content Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder React SPA with an Astro static multi-page site that publishes the twelve real Val'Run tales — each as its own HTML document — in the world's illuminated-manuscript house style.

**Architecture:** Astro (static output). The library is one page (`/`); every story is a standalone page at `/<slug>/` generated via `getStaticPaths()`. Stories are an MDX content collection converted from the final `.docx`. The only shipped JS is a tiny vanilla-TS filter island. SEO/OG/JSON-LD/sitemap/RSS come from Astro. Pure logic (read-time, chronological ordering, related-story selection, the filter predicate, the docx parser) is unit-tested with Vitest; components are verified by `astro build` + browser screenshots.

**Tech Stack:** Astro, `@astrojs/mdx`, `@astrojs/sitemap`, Zod (via `astro:content`), `astro:assets` (Sharp), Vitest, EB Garamond / Cormorant Garamond / IM Fell English SC (Google Fonts). Cover art via the Higgsfield image MCP.

**Reference design comp:** `.superpowers/brainstorm/49064-1781368106/content/system-v1.html` (palette, type, card, reading page already validated visually).
**Spec:** `docs/superpowers/specs/2026-06-13-chronicles-redesign-design.md`.

> **Note on TDD fit:** This is a content/presentation site. Where there is real logic (utils, schema, parser, filter, ordering) we write the test first. Where a task is a component or layout, "verify" means `astro build` succeeds **and** a browser screenshot matches the comp — those tasks say so explicitly instead of inventing brittle DOM unit tests.

---

## File structure (decomposition)

```
astro.config.mjs            # integrations (mdx, sitemap), site URL
tsconfig.json               # extends astro/tsconfigs/strict
package.json                # astro deps; remove react/vite
vitest.config.ts            # unit tests for src/lib + scripts
src/
  content.config.ts         # stories collection + Zod schema
  content/stories/NN-slug.mdx   # 12 tales (frontmatter + body w/ <Break/>)
  lib/
    stories.ts              # readTime, byChronology, relatedTo, ageMeta — pure, tested
    stories.test.ts
    filter.ts               # pure filterStories(stories, {era,region}) predicate — tested
    filter.test.ts
  layouts/
    Base.astro              # <head> SEO/OG/JSON-LD, header, footer, grain/glow
    Story.astro             # reading-page shell
  components/
    Header.astro  Footer.astro
    StoryCard.astro  Cover.astro      # Cover = <img> w/ gradient+monogram fallback
    Epigraph.astro  Colophon.astro  Break.astro
    ChronicleNav.astro  RelatedChronicles.astro
    Seo.astro               # meta/OG/twitter/canonical/JSON-LD partial
  islands/
    library-filter.ts       # vanilla island: pills -> show/hide cards, ?era=&region= sync, aria
  pages/
    index.astro             # library
    [slug].astro            # one static page per story
    colophon.astro          # short About/Colophon
    404.astro               # themed not-found
    rss.xml.ts              # anthology feed
  styles/theme.css          # tokens + global manuscript styles
  assets/covers/NN-slug.*   # generated cover images
public/
  favicon.svg               # new parchment/gold mark
  robots.txt
scripts/
  raw/NN.md                 # markitdown dumps of each .docx (intermediate)
  stories.meta.mjs          # curated per-story metadata (authored from the Bible)
  convert-stories.mjs       # raw/NN.md + meta -> src/content/stories/NN-slug.mdx
  convert-stories.test.mjs  # parser tests
  gen-covers.md             # the cover-generation runbook (prompts per story)
```

---

## Phase 0 — Scaffold & tooling

### Task 1: Replace the Vite/React app with an Astro skeleton

**Files:**
- Modify: `package.json`
- Create: `astro.config.mjs`, `tsconfig.json`
- Delete: `vite.config.js`, `eslint.config.js` (replaced), `src/App.jsx`, `src/main.jsx`, `src/components/ScrollToTop.jsx`, `src/pages/*.jsx`, `src/pages/*.module.css`, `src/components/Layout.*`, `src/assets/react.svg`, `src/assets/vite.svg`, `index.html` (Astro owns HTML), `public/icons.svg` (unused, off-brand)
- Keep for reference until ported: `src/styles/theme.css`, `src/data/stories.js`

- [ ] **Step 1: Replace `package.json`**

```json
{
  "name": "valrun-stories",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/mdx": "^4.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "@astrojs/rss": "^4.0.0",
    "sharp": "^0.33.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://stories.valrun.org',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
})
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Install and remove old lockfile**

Run: `rm -f package-lock.json && npm install`
Expected: installs Astro; `node_modules/.bin/astro` exists.

- [ ] **Step 5: Delete the old React/Vite source**

```bash
rm -f vite.config.js eslint.config.js index.html public/icons.svg \
  src/App.jsx src/main.jsx src/components/Layout.jsx src/components/Layout.module.css \
  src/components/ScrollToTop.jsx src/pages/StoryLibrary.jsx src/pages/StoryLibrary.module.css \
  src/pages/StoryDetail.jsx src/pages/StoryDetail.module.css src/pages/NotFound.jsx \
  src/pages/NotFound.module.css src/assets/react.svg src/assets/vite.svg
```

- [ ] **Step 6: Create a placeholder home page so the build has an entry**

Create `src/pages/index.astro`:
```astro
---
---
<html lang="en"><head><meta charset="utf-8" /><title>Chronicles of Val'Run</title></head>
<body><p>scaffold</p></body></html>
```

- [ ] **Step 7: Verify the skeleton builds**

Run: `npm run build`
Expected: `dist/index.html` produced, exit 0.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro, remove React/Vite app"
```

---

### Task 2: Add Vitest

**Files:**
- Create: `vitest.config.ts`, `src/lib/.gitkeep`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'scripts/**/*.test.mjs'],
    environment: 'node',
  },
})
```

- [ ] **Step 2: Sanity test**

Create `src/lib/smoke.test.ts`:
```ts
import { test, expect } from 'vitest'
test('vitest runs', () => { expect(1 + 1).toBe(2) })
```

- [ ] **Step 3: Run it**

Run: `npm test`
Expected: 1 passed.

- [ ] **Step 4: Remove smoke test and commit**

```bash
rm src/lib/smoke.test.ts
git add -A && git commit -m "chore: add vitest"
```

---

## Phase 1 — Design tokens & layout shell

### Task 3: Port the design tokens and global manuscript styles

**Files:**
- Create: `src/styles/theme.css` (ported + deepened from the comp)
- Delete: old `src/styles/theme.css` is overwritten in place

- [ ] **Step 1: Write `src/styles/theme.css`**

Tokens and globals lifted from the validated comp. Body face is EB Garamond; display Cormorant; smallcaps IM Fell. Includes the canonical `❦` usage, dropcap, flourish, film grain, a global `:focus-visible` ring, and `prefers-reduced-motion`.

```css
:root{
  --ink:#0d0f13; --ink-soft:#15181f; --ink-card:#161a22; --ink-line:#2a2f3a;
  --vellum:#ece3cf; --vellum-2:#d8cfb8; --vellum-dim:#b6ad97; --vellum-mute:#8d8672;
  --oxblood:#8a2a2a; --oxblood-hi:#b04a3a; --gold:#c2992f; --gold-hi:#e0bd6a; --indigo:#3a4a6e;
  --serif:"Cormorant Garamond",Garamond,"Times New Roman",serif;
  --read:"EB Garamond",Garamond,"Times New Roman",serif;
  --smcap:"IM Fell English SC",var(--serif);
  --header-h:61px;            /* single source of truth for the sticky offset */
  --maxw:1080px; --read-w:66ch;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:20px;--space-6:24px;
  --space-8:32px;--space-10:40px;--space-12:48px;--space-16:64px;--space-20:80px;--space-24:96px;
}
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0}
body{
  background:var(--ink); color:var(--vellum); font-family:var(--read);
  font-size:17px; line-height:1.6; -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility; min-height:100svh;
}
body::before{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;
  background-image:radial-gradient(ellipse at top,rgba(195,154,70,.045),transparent 60%),
  radial-gradient(ellipse at bottom,rgba(138,42,42,.03),transparent 60%)}
body::after{content:"";position:fixed;inset:0;z-index:9999;pointer-events:none;opacity:.04;
  mix-blend-mode:overlay;background-size:160px;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
h1,h2,h3,h4{font-family:var(--serif);font-weight:500;color:var(--vellum);letter-spacing:.01em;margin:0 0 var(--space-4)}
h1{font-size:clamp(2.2rem,5vw,3.4rem);line-height:1.1}
p{margin:0 0 var(--space-4)}
a{color:var(--gold);text-decoration:none;border-bottom:1px solid transparent;transition:color .12s,border-color .12s}
a:hover{color:var(--gold-hi);border-bottom-color:var(--gold-hi)}
.container{max-width:var(--maxw);margin:0 auto;padding:0 var(--space-6)}
.eyebrow{font-family:var(--smcap);font-size:.85rem;letter-spacing:.18em;color:var(--vellum-mute);text-transform:uppercase;margin-bottom:var(--space-2)}
.flourish{display:flex;align-items:center;gap:var(--space-3);color:var(--gold);margin:var(--space-8) auto;max-width:var(--read-w);opacity:.9}
.flourish::before,.flourish::after{content:"";flex:1;height:1px;opacity:.5;background:linear-gradient(90deg,transparent,var(--gold))}
.flourish::after{background:linear-gradient(270deg,transparent,var(--gold))}
.dropcap::first-letter{font-family:var(--serif);font-weight:600;float:left;font-size:3.5em;line-height:.82;padding:.06em .12em 0 0;color:var(--gold-hi)}
.visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}
:focus-visible{outline:2px solid var(--gold-hi);outline-offset:3px;border-radius:2px}
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{animation-duration:.001ms!important;transition-duration:.001ms!important}
}
```

- [ ] **Step 2: Verify it imports cleanly in a page**

Temporarily import it in `src/pages/index.astro` head (`<link>` or `import '../styles/theme.css'` in frontmatter once Base exists — for now just `npm run build`).
Run: `npm run build`
Expected: exit 0 (CSS is static; nothing to fail yet).

- [ ] **Step 3: Commit**

```bash
git add src/styles/theme.css && git commit -m "feat: port deepened manuscript design tokens"
```

---

### Task 4: Base layout, Header, Footer

**Files:**
- Create: `src/layouts/Base.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/Seo.astro`

- [ ] **Step 1: Create `src/components/Seo.astro`** (head metadata; JSON-LD optional via prop)

```astro
---
interface Props {
  title: string
  description: string
  ogImage?: string          // absolute or site-relative path
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown>
}
const { title, description, ogImage, type = 'website', jsonLd } = Astro.props
const canonical = new URL(Astro.url.pathname, Astro.site).href
const img = ogImage ? new URL(ogImage, Astro.site).href : undefined
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta name="theme-color" content="#0d0f13" />
<meta property="og:type" content={type} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
{img && <meta property="og:image" content={img} />}
<meta name="twitter:card" content={img ? 'summary_large_image' : 'summary'} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
{img && <meta name="twitter:image" content={img} />}
{jsonLd && <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />}
```

- [ ] **Step 2: Create `src/components/Header.astro`**

```astro
---
---
<header class="hdr">
  <div class="container inner">
    <a href="/" class="brand">
      <span>Val'Run</span><span class="sep" aria-hidden="true">·</span><span class="sec">Chronicles</span>
    </a>
    <nav aria-label="Site">
      <a href="https://valrun.org" class="navlink" rel="noopener noreferrer" target="_blank">Compendium</a>
    </nav>
  </div>
</header>
<style>
  .hdr{position:sticky;top:0;z-index:10;height:var(--header-h);display:flex;align-items:center;
    background:rgba(13,15,19,.88);backdrop-filter:blur(10px);border-bottom:1px solid var(--ink-line)}
  .inner{display:flex;justify-content:space-between;align-items:center;width:100%}
  .brand{font-family:var(--serif);font-size:1.4rem;font-weight:600;letter-spacing:.02em;color:var(--vellum);border:none;display:inline-flex;gap:var(--space-2);align-items:baseline}
  .brand:hover{color:var(--gold);border:none}
  .sep{color:var(--vellum-mute);font-weight:400} .sec{color:var(--gold);font-style:italic;font-weight:500}
  .navlink{font-family:var(--smcap);text-transform:uppercase;letter-spacing:.13em;font-size:.74rem;color:var(--vellum-dim);border:none}
  .navlink:hover{color:var(--vellum);border:none}
  @media(max-width:600px){.brand{font-size:1.15rem}}
</style>
```

- [ ] **Step 3: Create `src/components/Footer.astro`**

```astro
---
---
<footer class="ft">
  <div class="container inner">
    <span>Val'Run · Chronicles</span>
    <a href="https://valrun.org" class="ftlink" rel="noopener noreferrer" target="_blank">valrun.org</a>
  </div>
</footer>
<style>
  .ft{border-top:1px solid var(--ink-line);padding:var(--space-8) 0;color:var(--vellum-mute);font-family:var(--smcap);letter-spacing:.06em;font-size:.85rem}
  .inner{display:flex;justify-content:space-between;align-items:center}
  .ftlink{font-family:var(--smcap);letter-spacing:.15em;font-size:.75rem;color:var(--vellum-mute);border:none}
  .ftlink:hover{color:var(--gold);border:none}
</style>
```

- [ ] **Step 4: Create `src/layouts/Base.astro`**

```astro
---
import '../styles/theme.css'
import Header from '../components/Header.astro'
import Footer from '../components/Footer.astro'
import Seo from '../components/Seo.astro'
interface Props {
  title: string
  description: string
  ogImage?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown>
}
const { title, description, ogImage, type, jsonLd } = Astro.props
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=IM+Fell+English+SC&display=swap" rel="stylesheet" />
    <Seo title={title} description={description} ogImage={ogImage} type={type} jsonLd={jsonLd} />
  </head>
  <body>
    <a href="#main" class="skip">Skip to content</a>
    <Header />
    <main id="main" tabindex="-1"><slot /></main>
    <Footer />
    <style>
      body{display:flex;flex-direction:column;min-height:100svh}
      main{flex:1}
      .skip{position:absolute;top:-100%;left:var(--space-4);z-index:20;background:var(--ink-soft);color:var(--gold);border:1px solid var(--gold);padding:var(--space-2) var(--space-4);font-family:var(--smcap);text-transform:uppercase;letter-spacing:.12em;font-size:.8rem}
      .skip:focus{top:var(--space-2)}
    </style>
  </body>
</html>
```

- [ ] **Step 5: Use Base in the home placeholder**

Replace `src/pages/index.astro`:
```astro
---
import Base from '../layouts/Base.astro'
---
<Base title="Chronicles of Val'Run" description="Short stories and chronicles set in the world of Val'Run.">
  <div class="container" style="padding:var(--space-20) 0"><h1>Chronicles of Val'Run</h1></div>
</Base>
```

- [ ] **Step 6: Build + visually verify the shell**

Run: `npm run build && npm run preview &` then screenshot `http://localhost:4321/`.
Expected: header (Val'Run · *Chronicles* … Compendium), dark ground with grain/glow, footer; fonts loaded. Stop preview after.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: Base layout, header, footer, SEO partial"
```

---

## Phase 2 — Content model & conversion

### Task 5: Content schema + pure story helpers (TDD)

**Files:**
- Create: `src/content.config.ts`, `src/lib/stories.ts`, `src/lib/stories.test.ts`

- [ ] **Step 1: Write failing tests `src/lib/stories.test.ts`**

```ts
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
```

- [ ] **Step 2: Run, verify fail**

Run: `npm test`
Expected: FAIL — cannot import from `./stories`.

- [ ] **Step 3: Implement `src/lib/stories.ts`**

```ts
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

export function relatedTo<T extends StoryMeta>(self: T, all: T[]): T[] {
  const others = all.filter((s) => s.slug !== self.slug)
  const sameAge = others.filter((s) => s.age === self.age)
  const sharedRegion = others.filter(
    (s) => s.age !== self.age && s.regions.some((r) => self.regions.includes(r)),
  )
  return [...sameAge, ...sharedRegion].slice(0, 3)
}
```

- [ ] **Step 4: Run, verify pass**

Run: `npm test`
Expected: 3 passed.

- [ ] **Step 5: Create `src/content.config.ts`** (collection + Zod schema)

```ts
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
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/stories.ts src/lib/stories.test.ts src/content.config.ts
git commit -m "feat: story content schema + tested helpers"
```

---

### Task 6: docx parser for conversion (TDD)

The converter splits a markitdown-produced markdown dump of one tale into the structured pieces. It does **not** invent metadata — curated fields come from `stories.meta.mjs` (Task 7).

**Files:**
- Create: `scripts/convert-stories.mjs`, `scripts/convert-stories.test.mjs`

- [ ] **Step 1: Write failing test `scripts/convert-stories.test.mjs`**

```js
import { test, expect } from 'vitest'
import { parseTale } from './convert-stories.mjs'

const RAW = `**The Last Census of Zelkarun**

*A Tale of Val’Run*

Third Age · Year 0 – 5 AI

Story 01 · Version 1.2

*“We counted what we could not keep.”*

— the first of the Three Bound Volumes, Ash Archive of the Black Bastion

**The Last Census of Zelkarun**

The forty-first name on the census roll was a child of six.

❦

The keeper of records had no name the harbour could pronounce.

❦

*— set down at the Black Bastion in the fifth year after the Impact.*

**Record of Canon**

| | |
| --- | --- |
| **Age / Year** | Third Age |`

test('parseTale extracts epigraph, source, body scenes, line of record; drops front/back matter', () => {
  const t = parseTale(RAW)
  expect(t.epigraph).toBe('We counted what we could not keep.')
  expect(t.epigraphSource).toBe('the first of the Three Bound Volumes, Ash Archive of the Black Bastion')
  expect(t.lineOfRecord).toBe('set down at the Black Bastion in the fifth year after the Impact.')
  expect(t.scenes.length).toBe(2)
  expect(t.scenes[0]).toContain('forty-first name')
  expect(t.body).not.toContain('Record of Canon')
  expect(t.body).not.toContain('A Tale of Val')
})
```

- [ ] **Step 2: Run, verify fail**

Run: `npm test -- convert-stories`
Expected: FAIL — `parseTale` not exported.

- [ ] **Step 3: Implement `scripts/convert-stories.mjs` (parser + writer)**

```js
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { STORY_META } from './stories.meta.mjs'

const stripMd = (s) => s.replace(/^[*_]+|[*_]+$/g, '').trim()
const deSmart = (s) => s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
const unquote = (s) => stripMd(s).replace(/^["“]|["”]$/g, '').trim()

// Pure: turn one markitdown dump into structured parts.
export function parseTale(raw) {
  const lines = raw.split('\n').map((l) => l.trimEnd())
  // Epigraph = first italic *"..."* line; its attribution = next non-empty line starting with —
  let epigraph = '', epigraphSource = ''
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\*[“"](.+)[”"]\*$/)
    if (m) {
      epigraph = unquote(m[1])
      const at = lines.slice(i + 1).find((l) => l.trim().startsWith('—'))
      if (at) epigraphSource = at.replace(/^—\s*/, '').trim()
      break
    }
  }
  // Line of record = italic line starting with — near the end
  let lineOfRecord = ''
  const lr = [...lines].reverse().find((l) => /^\*—.*\*$/.test(l))
  if (lr) lineOfRecord = stripMd(lr).replace(/^—\s*/, '').trim()

  // Body = between the SECOND occurrence of the bold title and the line of record,
  // excluding the "Record of Canon" back matter.
  const titleIdxs = lines.map((l, i) => (/^\*\*.+\*\*$/.test(l) ? i : -1)).filter((i) => i >= 0)
  const bodyStart = titleIdxs.length >= 2 ? titleIdxs[1] + 1 : 0
  const recordIdx = lines.findIndex((l) => /Record of Canon/i.test(l))
  const lrIdx = lr ? lines.lastIndexOf(lr) : -1
  const bodyEnd = lrIdx >= 0 ? lrIdx : recordIdx >= 0 ? recordIdx : lines.length
  const body = lines.slice(bodyStart, bodyEnd).join('\n').trim()
  const scenes = body.split(/^❦$/m).map((s) => s.trim()).filter(Boolean)

  return { epigraph: deSmart(epigraph), epigraphSource: deSmart(epigraphSource),
    lineOfRecord: deSmart(lineOfRecord), body, scenes }
}

function wordCount(body) {
  return body.replace(/❦/g, ' ').split(/\s+/).filter(Boolean).length
}

// MDX emitter: scenes joined by the <Break/> component.
function toMdx(meta, parsed) {
  const fm = {
    index: meta.index, title: meta.title, age: meta.age, ageLabel: meta.ageLabel,
    year: meta.year, sortYear: meta.sortYear, regions: meta.regions, places: meta.places,
    engines: meta.engines, teaser: meta.teaser, coverAlt: meta.coverAlt,
    epigraph: parsed.epigraph, epigraphSource: parsed.epigraphSource,
    lineOfRecord: parsed.lineOfRecord, wordCount: wordCount(parsed.body),
  }
  const yaml = Object.entries(fm).map(([k, v]) =>
    Array.isArray(v) ? `${k}:\n${v.map((x) => `  - ${JSON.stringify(x)}`).join('\n')}`
      : `${k}: ${JSON.stringify(v)}`).join('\n')
  const bodyMdx = parsed.scenes
    .map((sc) => sc.split(/\n{2,}/).map((p) => deSmart(p.replace(/\n/g, ' ')).trim()).join('\n\n'))
    .join('\n\n<Break />\n\n')
  return `---\n${yaml}\n---\nimport Break from '../../components/Break.astro'\n\n${bodyMdx}\n`
}

// CLI: read scripts/raw/NN.md -> write src/content/stories/NN-slug.mdx
function main() {
  const here = dirname(fileURLToPath(import.meta.url))
  const rawDir = join(here, 'raw')
  const outDir = join(here, '..', 'src', 'content', 'stories')
  for (const meta of STORY_META) {
    const nn = String(meta.index).padStart(2, '0')
    const raw = readFileSync(join(rawDir, `${nn}.md`), 'utf8')
    const parsed = parseTale(raw)
    if (!parsed.epigraph || !parsed.lineOfRecord || parsed.scenes.length === 0)
      throw new Error(`Tale ${nn}: parse incomplete (epigraph/lineOfRecord/scenes)`)
    writeFileSync(join(outDir, `${nn}-${meta.slug}.mdx`), toMdx(meta, parsed))
    console.log(`wrote ${nn}-${meta.slug}.mdx (${wordCount(parsed.body)} words)`)
  }
}

if (process.argv[1] && process.argv[1].endsWith('convert-stories.mjs')) main()
```

- [ ] **Step 4: Run, verify pass**

Run: `npm test -- convert-stories`
Expected: parser test passes.

- [ ] **Step 5: Commit**

```bash
git add scripts/convert-stories.mjs scripts/convert-stories.test.mjs
git commit -m "feat: tested docx->mdx tale parser"
```

---

### Task 7: Curate metadata, convert all 12 tales, validate

**Files:**
- Create: `scripts/stories.meta.mjs`, `scripts/raw/01.md` … `12.md`, `src/content/stories/NN-slug.mdx` (12)

- [ ] **Step 1: Author `scripts/stories.meta.mjs`** — curated, canon-true metadata (titles/ages/years from the Bible; `teaser` and `engines` from the pitch slate; `regions`/`places` taken from each doc's "Record of Canon → Places used"; `sortYear`: BI negative, AI positive; ranges use the start year).

```js
export const STORY_META = [
  { index: 1,  slug: 'the-last-census-of-zelkarun', title: 'The Last Census of Zelkarun',
    age: 'third', ageLabel: 'Third Age', year: 'Year 0 – 5 AI', sortYear: 0,
    regions: ['Verdure', 'Cinder'], places: ['Greymouth', 'the sea off Cinder', 'the Black Bastion'],
    engines: ['Tragedy', 'Adventure'],
    teaser: 'On the day the sky burns, a diplomat who resented her posting must learn what duty survives a civilization.',
    coverAlt: 'A white column of fire rising from a dark sea into a burning sky, ash over a small harbour.' },
  { index: 2,  slug: 'the-quiet-dial', title: 'The Quiet Dial',
    age: 'third', ageLabel: 'Third Age', year: '~195 BI', sortYear: -195,
    regions: ['Cinder'], places: ['Zelkarun', 'the Anchor works'],
    engines: ['Mystery', 'Tragedy'],
    teaser: 'Ordered to prove the throttled Anchor safe, an engineer’s measurements say otherwise — and the report is already written.',
    coverAlt: 'A vast brass calibration dial in a dim engine hall, one needle trembling past its mark.' },
  { index: 3,  slug: 'the-long-dropped-stone', title: 'The Long-Dropped Stone',
    age: 'fifth', ageLabel: 'Fifth Age', year: '656 AI', sortYear: 656,
    regions: ['Verdure'], places: ['Aureon', 'the imperial archive'],
    engines: ['Mystery', 'Tragedy'],
    teaser: 'Why does a healthy second son renounce the greatest throne in history? One misfiled testament he cannot forget.',
    coverAlt: 'A single stone sinking through deep dark water, a thin shaft of light above it.' },
  { index: 4,  slug: 'the-empty-chair', title: 'The Empty Chair',
    age: 'fifth', ageLabel: 'Fifth Age', year: '874 AI', sortYear: 874,
    regions: ['Verdure'], places: ['Aureon'],
    engines: ['Tragedy'],
    teaser: 'The longest-reigning emperor is dead; the court waits for his daughter to sit. She weighs six centuries against one sentence.',
    coverAlt: 'An empty gilded throne in a vast hall, a shaft of pale light across the dais.' },
  { index: 5,  slug: 'five-rings', title: 'Five Rings',
    age: 'sixth', ageLabel: 'Sixth Age', year: '925 – 927 AI', sortYear: 925,
    regions: ['Verdure'], places: ['the ruins of Aureon'],
    engines: ['Adventure', 'Intrigue'],
    teaser: 'A girl who draws buildings nobody asked for and a dwarf far from his mountain scramble to found something new in a ruined capital.',
    coverAlt: 'Five signet rings on a rough-drawn architectural plan amid broken marble.' },
  { index: 6,  slug: 'the-mountain-that-sings', title: 'The Mountain That Sings',
    age: 'seventh', ageLabel: 'Seventh Age', year: '1140 AI', sortYear: 1140,
    regions: ['Sarudar'], places: ['Durumbar deeps'],
    engines: ['Mystery', 'Tragedy'],
    teaser: 'A new carving, a spire cracking in two, and a loremaster forced to choose between his oath and what the stone is plainly saying.',
    coverAlt: 'A cracked dwarven spire deep underground, faint resonance lines glowing in the stone.' },
  { index: 7,  slug: 'the-generals-ledger', title: 'The General’s Ledger',
    age: 'seventh', ageLabel: 'Seventh Age', year: '1133 AI', sortYear: 1133,
    regions: ['Verdure'], places: ["Bastion’s Reach"],
    engines: ['Mystery', 'Tragedy'],
    teaser: 'The youngest general exposes a duke and is destroyed by the proof — told from both sides of the palace wall.',
    coverAlt: 'A sealed packet and a ledger on a desk by candlelight behind a palace window.' },
  { index: 8,  slug: 'the-words-for-anchor-and-deep', title: 'The Words for Anchor and Deep',
    age: 'seventh', ageLabel: 'Seventh Age', year: '1141 AI', sortYear: 1141,
    regions: ['Cinder'], places: ['the Onyx Spires'],
    engines: ['Adventure', 'Mystery'],
    teaser: 'A thief climbs into the ash to prove her name and comes down carrying two words she can read and no one will hear.',
    coverAlt: 'A climber high on black glassy spires under an ash sky, a small stone tablet in hand.' },
  { index: 9,  slug: 'the-fourth-day-of-ambershade', title: 'The Fourth Day of Ambershade',
    age: 'seventh', ageLabel: 'Seventh Age', year: '1144 AI', sortYear: 1144,
    regions: ['Serene Sea'], places: ['Sea Breeze docks'],
    engines: ['Mystery', 'Melancholy'],
    teaser: 'The Honey Vigil comes as it has for three centuries — but since 1140 one gesture in the rite is different.',
    coverAlt: 'A lantern-lit dock at dusk, robed figures performing a sea rite, honey-gold light on still water.' },
  { index: 10, slug: 'moth-light', title: 'Moth-Light',
    age: 'seventh', ageLabel: 'Seventh Age', year: '1146 AI', sortYear: 1146,
    regions: ['Twiland'], places: ['Luneberg', 'the World Tree'],
    engines: ['Mystery', 'Romance'],
    teaser: 'A warden whose ledgers say the imprinted lives are shortening loves a Canopy Singer whose voice is failing the rites.',
    coverAlt: 'Pale moths circling a single lantern beneath the immense dark canopy of the World Tree.' },
  { index: 11, slug: 'the-door-below', title: 'The Door Below',
    age: 'seventh', ageLabel: 'Seventh Age', year: '1147 AI', sortYear: 1147,
    regions: ['Verdure'], places: ['Everpeak', 'the Hollows'],
    engines: ['Mystery', 'Intrigue'],
    teaser: 'An honest thief and a doubting inquisitor circle the same black-stone door in the Hollows — and neither can open it.',
    coverAlt: 'A great seamless black-stone door at the end of a wet river-tunnel, one lantern before it.' },
  { index: 12, slug: 'the-glimmer-vault', title: 'The Glimmer Vault',
    age: 'seventh', ageLabel: 'Seventh Age', year: '~1132 AI', sortYear: 1132,
    regions: ['Twiland'], places: ['Nilvelond'],
    engines: ['Romance', 'Intrigue'],
    teaser: 'A half-elf clerk and a bloodline vault-warden fall in love across a counter of other people’s treasure — until the law gives her a reason to rob it.',
    coverAlt: 'A jewelled vault interior glittering with Glimmers, two figures at a counter in warm dim light.' },
]
```

> **Region note for the executor:** the `regions`/`places` above are best-effort from the pitch slate. When you run the conversion you will have each doc's real "Record of Canon → Places used" in `scripts/raw/NN.md`. **Reconcile each story's `regions` against that table; if a doc names a place that maps to a different canon Region, fix the meta and flag it for the user.** Durumbar (Story 06) and Bastion's Reach (07) and Nilvelond (12) are the ones to double-check.

- [ ] **Step 2: Dump each `.docx` to markdown via markitdown**

Using the markitdown MCP tool, convert each of the 12 final docs and save the output to `scripts/raw/NN.md`:
```
file:///Users/valerian/Desktop/V/DND/DM/ValRun/00_VALRUN/13_STORIES/ValRun_Story_01_The_Last_Census_of_Zelkarun_v1_2.docx
... 02 The_Quiet_Dial ... through ... 12 The_Glimmer_Vault ...
```
Save verbatim markdown to `scripts/raw/01.md` … `scripts/raw/12.md`.

- [ ] **Step 3: Run the converter**

Run: `node scripts/convert-stories.mjs`
Expected: prints `wrote NN-slug.mdx (NNNN words)` for all 12; throws if any tale fails to parse (epigraph/lineOfRecord/scenes missing).

- [ ] **Step 4: Validate against the schema via Astro**

Run: `npm run build`
Expected: content collection loads; **zero** Zod errors. If a field fails, fix the meta or parser and re-run.

- [ ] **Step 5: Spot-check fidelity**

Open 3 MDX files (01, 06, 12). Confirm: smart quotes normalized, italics preserved as `*…*`, `<Break />` between scenes, epigraph/lineOfRecord populated, no "Record of Canon" leakage, no "A Tale of Val'Run" duplicated into body.

- [ ] **Step 6: Commit**

```bash
git add scripts/stories.meta.mjs scripts/raw src/content/stories
git commit -m "content: convert and wire the 12 real tales"
```

---

## Phase 3 — Library page

### Task 8: Cover + StoryCard components

**Files:**
- Create: `src/components/Cover.astro`, `src/components/StoryCard.astro`

- [ ] **Step 1: Create `src/components/Cover.astro`** (image with Age-keyed gradient + monogram fallback)

```astro
---
import { Image } from 'astro:assets'
interface Props { cover?: ImageMetadata; alt: string; title: string; age: string }
const { cover, alt, title, age } = Astro.props
const grad: Record<string, string> = {
  third:'linear-gradient(160deg,#241b13,#0c1418)', fourth:'linear-gradient(160deg,#2a1a0a,#12100a)',
  fifth:'linear-gradient(160deg,#1a1622,#0e1320)', sixth:'linear-gradient(160deg,#1f1008,#10140f)',
  seventh:'linear-gradient(160deg,#0b0e16,#07090d)',
}
---
<div class="cov">
  {cover
    ? <Image src={cover} alt={alt} widths={[320, 640, 960]} sizes="(max-width:560px) 100vw, 360px" class="art" />
    : <div class="ph" style={`background:${grad[age] ?? grad.seventh}`} aria-hidden="true"><span>{title.charAt(0)}</span></div>}
  <div class="vig" aria-hidden="true"></div>
</div>
<style>
  .cov{position:relative;aspect-ratio:3/4;overflow:hidden}
  .art{width:100%;height:100%;object-fit:cover;display:block}
  .ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
  .ph span{font-family:var(--serif);font-size:5rem;font-weight:600;color:rgba(195,154,70,.28)}
  .vig{position:absolute;inset:0;box-shadow:inset 0 0 60px rgba(0,0,0,.5);background:radial-gradient(120% 80% at 50% 20%,transparent 45%,rgba(0,0,0,.4))}
</style>
```

- [ ] **Step 2: Create `src/components/StoryCard.astro`**

```astro
---
import Cover from './Cover.astro'
import { readTime } from '../lib/stories'
interface Props { story: any }
const { story } = Astro.props
const d = story.data
const mins = readTime(d.wordCount)
---
<a href={`/${story.id.replace(/^\d+-/, '')}/`} class="card"
   data-era={d.age} data-region={d.regions.join('|')}>
  <div class="covwrap">
    <Cover cover={d.cover} alt={d.coverAlt} title={d.title} age={d.age} />
    <span class="tag">{d.ageLabel}</span>
  </div>
  <div class="bd">
    <h2 class="t">{d.title}</h2>
    <p class="ts">{d.teaser}</p>
    <div class="mt">
      <span class="yr">{d.year}</span><span class="dot" aria-hidden="true">·</span>
      <span>{d.places[0]}</span><span class="dot" aria-hidden="true">·</span>
      <span>{mins} min</span>
    </div>
  </div>
</a>
<style>
  .card{display:flex;flex-direction:column;background:var(--ink-card);border:1px solid var(--ink-line);border-radius:4px;overflow:hidden;text-decoration:none;color:inherit;transition:transform .2s,box-shadow .2s,border-color .2s}
  .card:hover{transform:translateY(-4px);border-color:var(--gold);box-shadow:0 16px 50px rgba(0,0,0,.55)}
  .covwrap{position:relative}
  .tag{position:absolute;top:12px;left:12px;font-family:var(--smcap);font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-hi);background:rgba(13,15,19,.7);border:1px solid rgba(195,154,70,.35);padding:3px 9px;border-radius:2px;backdrop-filter:blur(3px)}
  .bd{padding:18px 18px 22px;display:flex;flex-direction:column;gap:8px;flex:1}
  .t{font-family:var(--serif);font-weight:500;font-size:1.42rem;line-height:1.15;margin:0}
  .card:hover .t{color:var(--gold-hi)}
  .ts{color:var(--vellum-dim);font-size:.95rem;line-height:1.5;margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;flex:1}
  .mt{font-family:var(--smcap);text-transform:uppercase;letter-spacing:.1em;font-size:.64rem;color:var(--vellum-mute);display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:auto}
  .yr{color:var(--gold)} .dot{opacity:.5}
</style>
```

- [ ] **Step 3: Build to typecheck**

Run: `npm run build`
Expected: exit 0 (cards not yet placed, but components compile). If `story.id` shape differs, adjust the slug derivation.

- [ ] **Step 4: Commit**

```bash
git add src/components/Cover.astro src/components/StoryCard.astro
git commit -m "feat: Cover + StoryCard components with gradient fallback"
```

---

### Task 9: Library page (masthead + grid)

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace `src/pages/index.astro`**

```astro
---
import { getCollection } from 'astro:content'
import Base from '../layouts/Base.astro'
import StoryCard from '../components/StoryCard.astro'
import { byChronology } from '../lib/stories'
const stories = byChronology((await getCollection('stories')).map((s) => ({ ...s, sortYear: s.data.sortYear }))) 
  .map((s) => s) // chronological order
const entries = (await getCollection('stories'))
const ordered = entries.sort((a, b) => a.data.sortYear - b.data.sortYear)
---
<Base title="Chronicles of Val'Run" description="Short stories and chronicles from across the Seven Ages of Val'Run.">
  <section class="mast">
    <div class="container inner">
      <p class="eyebrow">Stories of the World</p>
      <h1 class="mt">Chronicles of Val'Run</h1>
      <p class="sub">Dispatches, myths, and memories from across the ages.</p>
    </div>
  </section>

  <div class="filterwrap">
    <div class="container fbar" id="filters">
      <div class="grp" role="group" aria-label="Filter by Age">
        <span class="lab">Age</span>
        <button type="button" class="pill on" data-key="era" data-val="" aria-pressed="true">All</button>
        <button type="button" class="pill" data-key="era" data-val="third" aria-pressed="false">Third</button>
        <button type="button" class="pill" data-key="era" data-val="fourth" aria-pressed="false">Fourth</button>
        <button type="button" class="pill" data-key="era" data-val="fifth" aria-pressed="false">Fifth</button>
        <button type="button" class="pill" data-key="era" data-val="sixth" aria-pressed="false">Sixth</button>
        <button type="button" class="pill" data-key="era" data-val="seventh" aria-pressed="false">Seventh</button>
      </div>
      <div class="grp" role="group" aria-label="Filter by Region">
        <span class="lab">Region</span>
        <button type="button" class="pill on" data-key="region" data-val="" aria-pressed="true">All</button>
        {['Verdure','Sarudar','Twiland','Cinder','Serene Sea'].map((r) =>
          <button type="button" class="pill" data-key="region" data-val={r} aria-pressed="false">{r}</button>)}
      </div>
    </div>
  </div>

  <div class="container grthey">
    <div class="grid" id="grid">
      {ordered.map((s) => <StoryCard story={s} />)}
    </div>
    <p class="empty" id="empty" hidden>No stories match the current filters. <button type="button" id="clear" class="clear">Clear filters</button></p>
  </div>
  <p class="visually-hidden" id="status" role="status" aria-live="polite"></p>
  <script>import '../islands/library-filter.ts'</script>
</Base>
<style>
  .mast{padding:var(--space-20) 0 var(--space-16);text-align:center;border-bottom:1px solid var(--ink-line)}
  .inner{display:flex;flex-direction:column;align-items:center;gap:var(--space-3)}
  .mt{font-size:clamp(2.8rem,6vw,4.4rem)} .sub{font-family:var(--serif);font-style:italic;font-size:1.1rem;color:var(--vellum-dim);max-width:420px;margin:0}
  .filterwrap{position:sticky;top:var(--header-h);z-index:9;background:rgba(13,15,19,.9);backdrop-filter:blur(8px);border-bottom:1px solid var(--ink-line)}
  .fbar{display:flex;flex-direction:column;gap:var(--space-3);padding:var(--space-4) var(--space-6)}
  .grp{display:flex;align-items:center;flex-wrap:wrap;gap:var(--space-2)}
  .lab{font-family:var(--smcap);font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--vellum-mute);min-width:56px}
  .pill{font-family:var(--smcap);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--vellum-dim);background:transparent;border:1px solid var(--ink-line);border-radius:2px;padding:4px 10px;cursor:pointer;transition:color .12s,border-color .12s,background .12s}
  .pill:hover{color:var(--vellum);border-color:var(--vellum-mute)}
  .pill.on{color:var(--gold);border-color:var(--gold);background:rgba(195,154,70,.1)}
  .grthey{padding:var(--space-12) var(--space-6) var(--space-20)}
  .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-8) var(--space-6)}
  @media(max-width:900px){.grid{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:560px){.grid{grid-template-columns:1fr}}
  .empty{text-align:center;padding:var(--space-20) 0;color:var(--vellum-mute);font-style:italic}
  .clear{font-family:var(--smcap);text-transform:uppercase;letter-spacing:.14em;font-size:.75rem;color:var(--gold);background:transparent;border:1px solid var(--gold);border-radius:2px;padding:6px 18px;margin-left:8px;cursor:pointer}
</style>
```

> Clean-up note: delete the dead `const stories = …` line — the page uses `ordered`. (Left here only to flag it; remove during implementation.)

- [ ] **Step 2: Remove the dead `stories` binding**

Edit the frontmatter to keep only:
```astro
const ordered = (await getCollection('stories')).sort((a, b) => a.data.sortYear - b.data.sortYear)
```

- [ ] **Step 3: Build + screenshot**

Run: `npm run build && npm run preview &` → screenshot `/`.
Expected: masthead, sticky filter bar, 3-col grid of 12 cards in chronological order, gradient covers (until art lands), even card heights. Stop preview.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro && git commit -m "feat: library page (masthead + grid)"
```

---

### Task 10: Filter island (TDD the predicate, then wire the DOM)

**Files:**
- Create: `src/lib/filter.ts`, `src/lib/filter.test.ts`, `src/islands/library-filter.ts`

- [ ] **Step 1: Write failing test `src/lib/filter.test.ts`**

```ts
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
```

- [ ] **Step 2: Run, verify fail**

Run: `npm test -- filter`
Expected: FAIL — `matchesFilter` not defined.

- [ ] **Step 3: Implement `src/lib/filter.ts`**

```ts
export interface CardData { era: string; regions: string[] }
export interface FilterState { era: string; region: string }

export function matchesFilter(card: CardData, f: FilterState): boolean {
  if (f.era && card.era !== f.era) return false
  if (f.region && !card.regions.includes(f.region)) return false
  return true
}
```

- [ ] **Step 4: Run, verify pass**

Run: `npm test -- filter`
Expected: 3 passed.

- [ ] **Step 5: Implement `src/islands/library-filter.ts`** (uses the tested predicate; syncs `?era=&region=`; manages `aria-pressed`, empty state, and an `aria-live` count)

```ts
import { matchesFilter, type FilterState } from '../lib/filter'

const params = new URLSearchParams(location.search)
const state: FilterState = { era: params.get('era') ?? '', region: params.get('region') ?? '' }

const grid = document.getElementById('grid')!
const empty = document.getElementById('empty') as HTMLElement
const status = document.getElementById('status') as HTMLElement
const cards = Array.from(grid.querySelectorAll<HTMLElement>('.card'))
const pills = Array.from(document.querySelectorAll<HTMLButtonElement>('.pill'))

function syncPills() {
  for (const p of pills) {
    const on = (state as any)[p.dataset.key!] === p.dataset.val
    p.classList.toggle('on', on)
    p.setAttribute('aria-pressed', String(on))
  }
}
function apply() {
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
```

- [ ] **Step 6: Build + verify interaction**

Run: `npm run build && npm run preview &` → open `/?era=fifth`, click Region pills, verify cards filter, URL updates, empty state appears for impossible combos, `aria-pressed` toggles. Stop preview.

- [ ] **Step 7: Commit**

```bash
git add src/lib/filter.ts src/lib/filter.test.ts src/islands/library-filter.ts
git commit -m "feat: accessible library filter island"
```

---

## Phase 4 — Story page

### Task 11: Story sub-components (Epigraph, Break, Colophon)

**Files:**
- Create: `src/components/Epigraph.astro`, `src/components/Break.astro`, `src/components/Colophon.astro`

- [ ] **Step 1: `src/components/Break.astro`**

```astro
---
---
<div class="brk" role="separator" aria-hidden="true">❦</div>
<style>.brk{display:flex;align-items:center;justify-content:center;color:var(--gold);margin:34px 0;opacity:.85;font-size:1rem}</style>
```

- [ ] **Step 2: `src/components/Epigraph.astro`**

```astro
---
interface Props { quote: string; source: string }
const { quote, source } = Astro.props
---
<div class="epi">
  <p class="q">{quote}</p>
  <p class="at">— {source}</p>
</div>
<div class="flourish"><span aria-hidden="true">❦</span></div>
<style>
  .epi{max-width:60ch;margin:14px auto 0;text-align:center}
  .q{font-family:var(--read);font-style:italic;font-size:1.22rem;line-height:1.6;color:var(--vellum-2);margin:0}
  .at{font-family:var(--smcap);text-transform:uppercase;letter-spacing:.1em;font-size:.72rem;color:var(--vellum-mute);margin-top:12px}
</style>
```

- [ ] **Step 3: `src/components/Colophon.astro`**

```astro
---
interface Props { line: string }
const { line } = Astro.props
---
<div class="record"><p class="rl">— {line}</p></div>
<style>
  .record{max-width:60ch;margin:40px auto 0;text-align:center;border-top:1px solid var(--ink-line);padding-top:24px}
  .rl{font-family:var(--read);font-style:italic;color:var(--vellum-dim);font-size:1.05rem;margin:0}
</style>
```

- [ ] **Step 4: Build to typecheck, then commit**

Run: `npm run build` → exit 0.
```bash
git add src/components/Epigraph.astro src/components/Break.astro src/components/Colophon.astro
git commit -m "feat: epigraph, fleuron break, colophon"
```

---

### Task 12: ChronicleNav + RelatedChronicles

**Files:**
- Create: `src/components/ChronicleNav.astro`, `src/components/RelatedChronicles.astro`

- [ ] **Step 1: `src/components/ChronicleNav.astro`** (prev/next by chronology)

```astro
---
interface Item { slug: string; title: string; ageLabel: string }
interface Props { prev?: Item; next?: Item }
const { prev, next } = Astro.props
---
<nav class="cnav" aria-label="Chronicle order">
  {prev
    ? <a href={`/${prev.slug}/`} class="lk prev"><span class="dir">← Earlier in the chronicle</span><span class="ti">{prev.title}</span></a>
    : <span></span>}
  {next
    ? <a href={`/${next.slug}/`} class="lk next"><span class="dir">Later in the chronicle →</span><span class="ti">{next.title}</span></a>
    : <span></span>}
</nav>
<style>
  .cnav{display:flex;justify-content:space-between;gap:var(--space-6);max-width:var(--read-w);margin:48px auto 0}
  .lk{display:flex;flex-direction:column;gap:4px;border:none;max-width:48%}
  .lk.next{text-align:right;margin-left:auto}
  .dir{font-family:var(--smcap);text-transform:uppercase;letter-spacing:.12em;font-size:.66rem;color:var(--vellum-mute)}
  .ti{font-family:var(--serif);font-size:1.05rem;color:var(--vellum)}
  .lk:hover .ti{color:var(--gold-hi)}
</style>
```

- [ ] **Step 2: `src/components/RelatedChronicles.astro`**

```astro
---
import Cover from './Cover.astro'
interface Props { items: any[] }
const { items } = Astro.props
---
{items.length > 0 && (
  <section class="rel">
    <div class="container">
      <div class="flourish"><span aria-hidden="true">❦</span></div>
      <p class="eyebrow" style="text-align:center;margin-bottom:var(--space-8)">Related chronicles</p>
      <div class="rgrid">
        {items.map((s) => (
          <a href={`/${s.slug}/`} class="rtile">
            <div class="rcov"><Cover cover={s.data.cover} alt={s.data.coverAlt} title={s.data.title} age={s.data.age} /></div>
            <div class="rbd"><span class="re">{s.data.ageLabel}</span><span class="rt">{s.data.title}</span></div>
          </a>
        ))}
      </div>
    </div>
  </section>
)}
<style>
  .rel{border-top:1px solid var(--ink-line);padding:var(--space-12) 0 var(--space-16);background:var(--ink-soft)}
  .rgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-5)}
  @media(max-width:700px){.rgrid{grid-template-columns:1fr}}
  .rtile{display:flex;align-items:center;gap:var(--space-4);background:var(--ink);border:1px solid var(--ink-line);border-radius:3px;overflow:hidden;color:inherit;border-bottom:none;transition:border-color .15s,transform .15s}
  .rtile:hover{border-color:var(--gold);transform:translateY(-2px)}
  .rcov{width:72px;height:72px;flex-shrink:0}
  .rbd{display:flex;flex-direction:column;gap:4px;padding:var(--space-3) var(--space-4) var(--space-3) 0}
  .re{font-family:var(--smcap);text-transform:uppercase;letter-spacing:.14em;font-size:.65rem;color:var(--gold)}
  .rt{font-family:var(--serif);font-size:.95rem;font-weight:500;color:var(--vellum)}
  .rtile:hover .rt{color:var(--gold-hi)}
</style>
```

- [ ] **Step 3: Build to typecheck, then commit**

Run: `npm run build` → exit 0.
```bash
git add src/components/ChronicleNav.astro src/components/RelatedChronicles.astro
git commit -m "feat: chronicle nav + related chronicles"
```

---

### Task 13: Story layout + `[slug].astro`

**Files:**
- Create: `src/layouts/Story.astro`, `src/pages/[slug].astro`

- [ ] **Step 1: Create `src/layouts/Story.astro`**

```astro
---
import Base from './Base.astro'
import Cover from '../components/Cover.astro'
import Epigraph from '../components/Epigraph.astro'
import Colophon from '../components/Colophon.astro'
import ChronicleNav from '../components/ChronicleNav.astro'
import RelatedChronicles from '../components/RelatedChronicles.astro'
import { readTime } from '../lib/stories'
interface Props { data: any; slug: string; prev?: any; next?: any; related: any[]; ogImage?: string }
const { data, prev, next, related, ogImage } = Astro.props
const mins = readTime(data.wordCount)
const jsonLd = {
  '@context': 'https://schema.org', '@type': 'CreativeWork',
  name: data.title, description: data.teaser,
  author: { '@type': 'Organization', name: "Val'Run Chronicles" },
  isPartOf: { '@type': 'CreativeWorkSeries', name: 'Chronicles of Val’Run' },
}
---
<Base title={`${data.title} — Chronicles of Val'Run`} description={data.teaser}
      type="article" ogImage={ogImage} jsonLd={jsonLd}>
  <article class="page">
    <div class="hero">
      <div class="art"><Cover cover={data.cover} alt={data.coverAlt} title={data.title} age={data.age} /></div>
      <div class="fade" aria-hidden="true"></div>
      <div class="cap container">
        <p class="ey">{data.ageLabel} · {data.year}</p>
        <h1>{data.title}</h1>
        <p class="mt">{data.places.join(' · ')} · {mins} min read</p>
      </div>
    </div>

    <p class="tale">A Tale of Val'Run</p>
    <Epigraph quote={data.epigraph} source={data.epigraphSource} />

    <div class="body container"><slot /></div>

    <div class="container"><Colophon line={data.lineOfRecord} /></div>
    <div class="container"><ChronicleNav prev={prev} next={next} /></div>
    <RelatedChronicles items={related} />

    <div class="back"><a href="/" class="bl"><span aria-hidden="true">←</span> Return to the library</a></div>
  </article>
</Base>
<style>
  .hero{position:relative;height:clamp(320px,52vh,520px);overflow:hidden}
  .hero .art{position:absolute;inset:0} .hero :global(.cov){height:100%;aspect-ratio:auto}
  .hero .art :global(.vig){display:none}
  .fade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,15,19,.1),rgba(13,15,19,.2) 45%,rgba(13,15,19,.85) 82%,var(--ink) 100%)}
  .cap{position:absolute;left:0;right:0;bottom:0;padding-bottom:34px;text-align:center}
  .cap .ey{font-family:var(--smcap);text-transform:uppercase;letter-spacing:.2em;font-size:.82rem;color:var(--gold-hi);margin:0}
  .cap h1{font-size:clamp(2.2rem,5vw,3.4rem);margin:8px 0 12px}
  .cap .mt{font-family:var(--smcap);text-transform:uppercase;letter-spacing:.14em;font-size:.78rem;color:var(--vellum-dim);margin:0}
  .tale{font-family:var(--smcap);text-transform:uppercase;letter-spacing:.32em;font-size:.72rem;color:var(--vellum-mute);text-align:center;margin:30px 0 0}
  .body{max-width:var(--read-w);font-size:1.18rem;line-height:1.85;color:var(--vellum-2);padding-top:8px}
  .body :global(p){margin:0 0 1.3em}
  .body :global(p:first-of-type)::first-letter{font-family:var(--serif);font-weight:600;float:left;font-size:3.5em;line-height:.82;padding:.06em .12em 0 0;color:var(--gold-hi)}
  .back{background:var(--ink-soft);border-top:1px solid var(--ink-line);padding:var(--space-8) 0;text-align:center}
  .bl{font-family:var(--smcap);text-transform:uppercase;letter-spacing:.14em;font-size:.8rem;color:var(--vellum-mute);border:none}
  .bl:hover{color:var(--gold);border:none}
</style>
```

- [ ] **Step 2: Create `src/pages/[slug].astro`**

```astro
---
import { getCollection, render } from 'astro:content'
import Story from '../layouts/Story.astro'
import { byChronology, relatedTo } from '../lib/stories'

export async function getStaticPaths() {
  const entries = await getCollection('stories')
  const meta = entries.map((e) => ({
    slug: e.id.replace(/^\d+-/, ''),
    title: e.data.title, ageLabel: e.data.ageLabel, age: e.data.age,
    regions: e.data.regions, sortYear: e.data.sortYear,
  }))
  const chron = byChronology(meta)
  return entries.map((entry) => {
    const slug = entry.id.replace(/^\d+-/, '')
    const i = chron.findIndex((m) => m.slug === slug)
    const self = meta.find((m) => m.slug === slug)!
    const relatedMeta = relatedTo(self, meta)
    const related = relatedMeta.map((m) => entries.find((e) => e.id.replace(/^\d+-/, '') === m.slug)!)
      .map((e) => ({ slug: e.id.replace(/^\d+-/, ''), data: e.data }))
    return {
      params: { slug },
      props: {
        entry,
        prev: chron[i - 1] ? { slug: chron[i - 1].slug, title: chron[i - 1].title, ageLabel: chron[i - 1].ageLabel } : undefined,
        next: chron[i + 1] ? { slug: chron[i + 1].slug, title: chron[i + 1].title, ageLabel: chron[i + 1].ageLabel } : undefined,
        related,
      },
    }
  })
}

const { entry, prev, next, related } = Astro.props
const { Content } = await render(entry)
const slug = entry.id.replace(/^\d+-/, '')
// cover for OG, if present (string path under /_astro after build is fine as relative)
const ogImage = entry.data.cover?.src
---
<Story data={entry.data} slug={slug} prev={prev} next={next} related={related} ogImage={ogImage}>
  <Content />
</Story>
```

- [ ] **Step 3: Build + screenshot a story**

Run: `npm run build && npm run preview &` → screenshot `/the-last-census-of-zelkarun/` (top + body).
Expected: hero with overlaid title; "A Tale of Val'Run"; epigraph; ❦ breaks; dropcap; colophon line; prev/next; related; back band. Confirm `/the-quiet-dial/` (chron first) has no "Earlier" link and `/the-door-below/` (chron last) has no "Later". Stop preview.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Story.astro src/pages/[slug].astro
git commit -m "feat: story page (hero, epigraph, body, colophon, nav, related)"
```

---

## Phase 5 — Cover art & favicon

### Task 14: Generate atmospheric-oil covers + new favicon

**Files:**
- Create: `scripts/gen-covers.md` (runbook), `src/assets/covers/NN-slug.png` (12), `public/favicon.svg`
- Modify: each `src/content/stories/NN-slug.mdx` frontmatter to add `cover: ../../assets/covers/NN-slug.png`

> Higgsfield was mid-outage at planning time. If `balance`/`generate_image` still error, **skip to Step 6** (favicon) and leave the gradient fallback; covers can be added later without code changes.

- [ ] **Step 1: Write `scripts/gen-covers.md`** — the locked recipe + the 12 scene prompts (Age-keyed palette).

Style suffix (all 12): `romantic-era oil painting, visible painterly brushwork, dramatic chiaroscuro, low-key desaturated palette, atmospheric haze, museum oil on canvas, no text, no lettering, 3:4 portrait`. Age palettes — Third: ember-amber + ash-grey + deep teal; Fifth: imperial indigo + tarnished gold + shadow; Sixth: dust, broken marble, cold dawn; Seventh: ink-blue night + faint gold. Scene per story = the `coverAlt` line in `stories.meta.mjs`.

- [ ] **Step 2: Preflight + generate Story 01 sample**

Use the Higgsfield MCP `generate_image` with `get_cost:true` first; then generate (model `nano_banana_pro` or `recraft-v4-1` with `colors` locked to the Age palette), `aspect_ratio:'3:4'`. Poll `job_status`. **Show the user the result and get sign-off before generating the rest.**

- [ ] **Step 3: Generate the remaining 11** in the approved style; download each to `src/assets/covers/NN-slug.png`.

- [ ] **Step 4: Wire covers into frontmatter**

For each tale, add to frontmatter: `cover: ../../assets/covers/NN-slug.png`.

- [ ] **Step 5: Build + verify covers replace gradients**

Run: `npm run build && npm run preview &` → screenshot `/` and one story. Expected: real covers in cards + heros; titles still legible over the hero. Stop preview.

- [ ] **Step 6: New favicon `public/favicon.svg`** — a parchment/gold mark (a `❦` fleuron or "VR" monogram) on ink. Replace the purple Compendium mark.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect width="48" height="48" rx="6" fill="#0d0f13"/>
  <text x="24" y="34" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="30" fill="#c2992f">&#10086;</text>
</svg>
```

- [ ] **Step 7: Commit**

```bash
git add scripts/gen-covers.md public/favicon.svg src/assets/covers src/content/stories
git commit -m "feat: atmospheric-oil covers + parchment favicon"
```

---

## Phase 6 — SEO, feeds, 404, colophon

### Task 15: RSS feed

**Files:**
- Create: `src/pages/rss.xml.ts`

- [ ] **Step 1: Create `src/pages/rss.xml.ts`**

```ts
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
    })),
  })
}
```

- [ ] **Step 2: Build + verify**

Run: `npm run build` then check `dist/rss.xml` exists and lists 12 items.
Expected: valid XML, 12 `<item>`s.

- [ ] **Step 3: Commit**

```bash
git add src/pages/rss.xml.ts && git commit -m "feat: anthology RSS feed"
```

---

### Task 16: 404, colophon, robots, feed discovery link

**Files:**
- Create: `src/pages/404.astro`, `src/pages/colophon.astro`, `public/robots.txt`
- Modify: `src/components/Seo.astro` (add RSS `<link rel="alternate">`)

- [ ] **Step 1: `src/pages/404.astro`**

```astro
---
import Base from '../layouts/Base.astro'
---
<Base title="Page Not Found — Chronicles of Val'Run" description="This story has not been written yet.">
  <div class="container nf">
    <p class="eyebrow">404</p>
    <h1>Page Not Found</h1>
    <p class="sub">This story has not been written yet — or perhaps it never was.</p>
    <a href="/" class="back">Return to the library</a>
  </div>
</Base>
<style>
  .nf{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
  .sub{font-style:italic;color:var(--vellum-mute);margin-bottom:var(--space-8)}
  .back{font-family:var(--smcap);text-transform:uppercase;letter-spacing:.14em;font-size:.8rem;color:var(--gold);border:1px solid var(--gold);border-radius:2px;padding:8px 24px}
  .back:hover{background:rgba(195,154,70,.1)}
</style>
```

- [ ] **Step 2: `src/pages/colophon.astro`**

```astro
---
import Base from '../layouts/Base.astro'
---
<Base title="Colophon — Chronicles of Val'Run" description="About the Chronicles of Val'Run and how they are written.">
  <div class="container col">
    <p class="eyebrow">Colophon</p>
    <h1>About the Chronicles</h1>
    <p>The <em>Chronicles of Val'Run</em> are short tales set across the Seven Ages of Val'Run — the human-scale echoes of a world-scale law: that nothing may be held forever.</p>
    <p>Each tale is set down in the manner of the Codex: an epigraph from an in-world source, scenes parted by the fleuron <span style="color:var(--gold)">❦</span>, and a closing line of record. They are a companion to the <a href="https://valrun.org" rel="noopener noreferrer" target="_blank">Compendium</a>.</p>
    <div class="flourish"><span aria-hidden="true">❦</span></div>
  </div>
</Base>
<style>.col{max-width:var(--read-w);padding:var(--space-16) var(--space-6)}.col p{font-size:1.12rem;line-height:1.8;color:var(--vellum-2)}</style>
```

- [ ] **Step 3: `public/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://stories.valrun.org/sitemap-index.xml
```

- [ ] **Step 4: Add RSS discovery to `src/components/Seo.astro`**

Add inside the partial:
```astro
<link rel="alternate" type="application/rss+xml" title="Chronicles of Val'Run" href={new URL('/rss.xml', Astro.site).href} />
```

- [ ] **Step 5: Build + verify**

Run: `npm run build` → `dist/404.html`, `dist/colophon/index.html`, `dist/robots.txt`, `dist/sitemap-index.xml` all present.

- [ ] **Step 6: Commit**

```bash
git add src/pages/404.astro src/pages/colophon.astro public/robots.txt src/components/Seo.astro
git commit -m "feat: 404, colophon, robots, RSS discovery"
```

---

## Phase 7 — Verification

### Task 17: Whole-site verification pass

**Files:** none (verification only)

- [ ] **Step 1: Type + content check**

Run: `npm run check`
Expected: 0 errors, 0 warnings (or only intentional hints).

- [ ] **Step 2: Unit tests**

Run: `npm test`
Expected: all suites pass (stories, filter, convert-stories).

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: exit 0; `dist/` contains `index.html`, `the-*/index.html` ×12, `colophon/index.html`, `404.html`, `rss.xml`, `sitemap-index.xml`, `robots.txt`, optimized covers under `_astro/`.

- [ ] **Step 4: Deep-link + refresh check**

Run: `npm run preview &`. Navigate directly to `http://localhost:4321/the-door-below/` (no client navigation) and reload.
Expected: loads the story directly (proves the SPA 404 problem is gone).

- [ ] **Step 5: Visual + a11y spot check (browser)**

Screenshot `/` (desktop 1280 + mobile 390), one story top, 404. Tab through the library: confirm a visible **gold focus ring** on skip-link, pills, cards. Toggle OS reduce-motion and confirm hover lift is suppressed. Confirm cover `alt` text is present in the DOM.

- [ ] **Step 6: OG/meta check**

In the preview, view-source on a story: confirm unique `<title>`, `og:title/description/image`, canonical, JSON-LD, and the RSS `<link rel=alternate>`.

- [ ] **Step 7: Final commit + cleanup**

```bash
# remove the now-unused old data file if still present
rm -f src/data/stories.js
git add -A && git commit -m "chore: verification pass; remove legacy data"
```

---

## Self-review checklist (done by the plan author)

- **Spec coverage:** architecture (T1), tokens/type (T3), layout/header/footer (T4), content model (T5–T7), library + filter (T8–T10), story page furniture incl. epigraph/❦/colophon/overlaid hero (T11–T13), chronicle nav + related (T12–T13), covers + favicon (T14), SEO/OG/JSON-LD/sitemap/robots/RSS (T4,T15,T16), 404 + colophon (T16), a11y focus/reduced-motion/aria-pressed/alt (T3,T10,T17). ✓
- **Out-of-scope** (search/sort, Seven-Ages page, CMS, Record-of-Canon, analytics) intentionally absent. ✓
- **Type consistency:** `StoryMeta`, `readTime`, `byChronology`, `relatedTo`, `matchesFilter`, `FilterState`, slug derivation `id.replace(/^\d+-/, '')`, and `data-era`/`data-region` card attributes are used consistently across tasks. ✓
- **Known caveats flagged for the executor:** region reconciliation against each doc's canon table (T7); Higgsfield outage fallback (T14); Astro 5 content-loader `entry.id` shape — verify and adjust slug derivation once on real data (T8/T13).
```
