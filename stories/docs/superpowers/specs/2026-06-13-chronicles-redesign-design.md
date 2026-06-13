# Chronicles of Val'Run — Redesign & Content Build

**Date:** 2026-06-13
**Status:** Design — pending user review
**Site:** stories.valrun.org (the "Chronicles" subdomain of valrun.org / "Compendium")

---

## 1. Goal

Turn the current placeholder React SPA into a finished, distinctive reading site for the
Val'Run short-story anthology: the **illuminated digital edition of the Codex**. Two things
happen in this build:

1. **Re-architect** from a single-page React app into an **Astro static multi-page site**, so
   every story is its own standalone HTML document at its own URL.
2. **Replace the six lorem placeholders** with the **twelve real tales** (converted from the
   final `.docx` files), wired into a content model and rendered in the world's own house style.

The design leans fully into a **distinct manuscript identity** (parchment / ink / oxblood / gold),
deliberately a sibling — not a twin — of the purple valrun.org "Compendium" brand.

### Source material
- Stories (final): `/Users/valerian/Desktop/V/DND/DM/ValRun/00_VALRUN/13_STORIES/ValRun_Story_NN_*_v1_2.docx` (12 files)
- World rules: `ValRun_Storytelling_Bible_v1_1.docx` (same folder) — defines the house format.

### House format the design must honour (from the Bible)
- Each tale opens with an **epigraph**: a quoted line from an in-world source + attribution.
- Section breaks are the fleuron **❦**.
- Each tale closes with a **line of record** (e.g. *"— set down at the Black Bastion in the fifth year after the Impact."*).
- Front matter framing: title · *"A Tale of Val'Run"* · Age/Year line.
- Back matter: a **Record of Canon** table — **internal/production only; not published.**
- Theme spine: **Thal'veren** — *"nothing may be held forever."* The twelve tales form a
  chronological spine across the Seven Ages ("The Fraying Thread").

---

## 2. Decisions locked with the user

| Area | Decision |
|---|---|
| Scope | Full redesign **+** wire in the 12 real stories in this build |
| Identity | **Distinct** illuminated-manuscript identity; refine favicon to match |
| Library | **Refined grid + filters** (not a timeline) |
| Cover art | **Generate illustrated atmospheric-oil covers** (one per tale) |
| Architecture | **Astro** static site; each story its own HTML document |
| URLs | **Clean paths, same domain**: `/` library, `/<slug>/` per story |
| Engines (Mystery/Tragedy/…) | Shown as a **tag**, not a filter |
| Record of Canon table | **Private** — not rendered on public pages |

---

## 3. Architecture

**Astro** (latest, static output). Chosen for: real HTML document per page, near-zero JS,
content collections for the tales, built-in image optimization, and first-class SEO/sitemap/RSS.

```
src/
  content/
    stories/            # 12 MDX files, one per tale (converted from .docx)
    config.ts           # content collection schema (Zod) — see §4
  pages/
    index.astro         # the library (tiles + filters)
    [slug].astro        # generates one static HTML page per story via getStaticPaths()
    404.astro           # themed not-found
    rss.xml.ts          # anthology feed
  components/
    Header.astro  Footer.astro  StoryCard.astro
    Epigraph.astro  Colophon.astro  RelatedChronicles.astro  ChronicleNav.astro
  islands/
    LibraryFilter.ts    # the ONLY shipped JS: filter pills + URL-param sync
  layouts/
    Base.astro          # <head> (SEO/OG/JSON-LD), header, footer, grain/glow
    Story.astro         # reading-page shell
  styles/
    theme.css           # design tokens + global manuscript styles
  assets/
    covers/             # 12 generated cover images (astro:assets optimized)
astro.config.mjs        # integrations: @astrojs/sitemap, mdx; site: 'https://stories.valrun.org'
public/
  favicon.svg           # new parchment/gold mark
  robots.txt
```

- **Library filter** stays client-side and URL-param driven (`?era=&region=`), but as a small
  vanilla-TS island that shows/hides already-rendered cards — no framework runtime.
- The current `react`, `react-dom`, `react-router-dom` dependencies are removed.

### Routing / 404
- Real files at real paths ⇒ deep links and refreshes work with no SPA fallback.
- Unknown paths hit Astro's `404.astro` (themed). This also fixes today's bug where an invalid
  single-segment slug silently redirected to the library.

---

## 4. Content model

Each tale is one MDX file: `src/content/stories/NN-slug.mdx`. The conversion script (or manual
pass) pulls structured fields from the `.docx` front/back matter; the prose body becomes MDX with
`❦` markers between scenes.

Frontmatter schema (`content/config.ts`, Zod-validated):

```ts
{
  index: number,            // 1..12 — canonical order & chronological spine
  title: string,
  slug: string,             // e.g. "the-last-census-of-zelkarun"
  age: 'third'|'fourth'|'fifth'|'sixth'|'seventh',
  ageLabel: string,         // "Third Age"
  year: string,             // display: "Year 0 – 5 AI", "656 AI", "~195 BI"
  sortYear: number,         // numeric key for chronological order (BI negative)
  regions: string[],        // from each doc's Record-of-Canon "Places used" → canon Regions
  places: string[],         // specific place names for the meta line (e.g. "Everpeak, the Hollows")
  engines: string[],        // ["Mystery","Tragedy"] — display tag only
  epigraph: string,
  epigraphSource: string,   // attribution line
  lineOfRecord: string,     // closing colophon
  teaser: string,           // 1 sentence, ~14–22 words, for the card
  cover: image,             // astro:assets reference
  coverAlt: string,         // descriptive alt for the generated illustration
  wordCount: number         // → read time at ~200 wpm
}
```

- **Regions** are taken from each story's own "Record of Canon → Places used" line, mapped to the
  five canon Regions (Verdure, Sarudar, Twiland, Cinder, Serene Sea). No guessing — the source doc
  states the places. Ages/years/places are verified against the doc (canon is authoritative).
- The Record-of-Canon table itself is **not** emitted to the page.

### The twelve (titles, age, year — regions/places filled in at conversion from each doc)
| # | Title | Age | Year |
|---|---|---|---|
| 01 | The Last Census of Zelkarun | Third | Year 0 – 5 AI |
| 02 | The Quiet Dial | Third | ~195 BI |
| 03 | The Long-Dropped Stone | Fifth | 656 AI |
| 04 | The Empty Chair | Fifth | 874 AI |
| 05 | Five Rings | Sixth | 925 – 927 AI |
| 06 | The Mountain That Sings | Seventh | 1140 AI |
| 07 | The General's Ledger | Seventh | 1133 AI |
| 08 | The Words for Anchor and Deep | Seventh | 1141 AI |
| 09 | The Fourth Day of Ambershade | Seventh | 1144 AI |
| 10 | Moth-Light | Seventh | 1146 AI |
| 11 | The Door Below | Seventh | 1147 AI |
| 12 | The Glimmer Vault | Seventh | ~1132 AI |

---

## 5. Visual system

Validated in the brainstorm comp (`.superpowers/brainstorm/.../system-v1.html`).

- **Palette (tokens):** `--ink #0d0f13`, `--ink-soft #15181f`, `--ink-card #161a22`,
  `--ink-line #2a2f3a`, `--vellum #ece3cf`, `--vellum-dim #b6ad97`, `--vellum-mute #8d8672`,
  `--oxblood #8a2a2a`, `--gold #c2992f`, `--gold-hi #e0bd6a`, `--indigo #3a4a6e`. Retained from
  today, lightly deepened; gold pulled cooler/cleaner.
- **Type:** display **Cormorant Garamond**; **reading body EB Garamond** (replaces Inter 300 — a
  true Garamond matching the docs); smallcaps labels **IM Fell English SC**. Reading measure ~66ch,
  size ~1.18rem, line-height ~1.85.
- **Texture:** the existing film-grain overlay + radial glow, kept subtle.
- **Mark:** the decorative glyph becomes **❦** (the manuscripts' own fleuron), replacing `◆`.

---

## 6. Page designs

### 6.1 Library (`/`)
- Masthead: eyebrow *"Stories of the World"*, title *"Chronicles of Val'Run"*, italic subline.
- Sticky filter bar — **Age** + **Region** pills (real canon values), URL-param driven, with
  `aria-pressed` state and a true grouping label. Offset driven by a shared `--header-h` token
  (fixes today's hardcoded `top:57px`).
- **Grid of StoryCards** (3 / 2 / 1 col responsive): 3:4 illustrated cover with vignette + gilded
  Age chip; Cormorant title; **3-line-clamped** teaser; meta = *in-world year · place · read-time*;
  a small engines tag. Hover: lift + gilded hairline.
- Themed empty state (flourish + serif line + Clear-filters).

### 6.2 Story (`/<slug>/`)
- **Hero:** the illustrated cover, full-bleed, with a bottom gradient and the **title + eyebrow
  (Age · Year) + meta overlaid** at the bottom (solves the empty-hero problem). `coverAlt` is real,
  descriptive alt text.
- *"A Tale of Val'Run"* smallcaps line.
- **Epigraph** block: italic serif quote + smallcaps attribution, set off by ❦.
- **Body:** EB Garamond, ~66ch; first paragraph **dropcap**; scene breaks render the **❦** fleuron
  centered with breathing room.
- **Colophon:** the **line of record** (italic, centered, hairline above).
- **ChronicleNav:** *earlier / later in the chronicle* — chronological prev/next by `sortYear`.
- **RelatedChronicles:** up to 3 — same Age or shared Region (replaces the misleading
  "More from this era"); section only shown when non-empty.
- Back band: *Return to the library*.

### 6.3 404 (`/404.astro`)
- Themed, reusing the existing copy (*"This story has not been written yet…"*).

### 6.4 Colophon / About (`/colophon/`) — in scope, light
- One short page: what the Chronicles are, the house style in one paragraph, link to the
  Compendium. (A "Seven Ages" explainer is noted as a **future** enhancement, not this build.)

---

## 7. Cover art

- **Direction:** atmospheric oil — romantic-era landscape painting, painterly brushwork, dramatic
  chiaroscuro, low-key **desaturated** values so the overlaid title stays legible. No text/lettering.
  3:4 portrait.
- **Cohesion recipe (locked, applied to all 12):** a fixed style suffix + a palette keyed to the
  story's **Age**, so the set reads as one volume. Each prompt = `<scene from the tale> + <age palette> + <style suffix>`.
- **Pipeline:** generate via the Higgsfield image MCP (currently mid-outage — retry during build),
  model TBD at generation (candidates: `nano_banana_pro`, `recraft-v4-1` with locked `colors`),
  `get_cost` preflight first; download winners into `src/assets/covers/`. Generate **one sample for
  Story 01 and confirm with the user before producing the remaining eleven.**
- **Graceful fallback:** if a cover is missing, the card/hero falls back to the Age-keyed gradient +
  monogram (today's behaviour), so the site never breaks on a missing asset.

---

## 8. SEO, feeds, sharing (now near-free with Astro)

- Per-page `<title>` + meta description (story-specific).
- **Open Graph + Twitter Card** per story (cover as `og:image`), plus `theme-color`.
- Canonical URLs; `@astrojs/sitemap` → `sitemap.xml`; `robots.txt`.
- **JSON-LD** per story (`CreativeWork`/`Article`: name, author, description, image; `datePublished`
  uses the real publication date, not the in-world year).
- **RSS/Atom feed** (`/rss.xml`) of the anthology (title, teaser, link, cover).

## 9. Accessibility

- Global **`:focus-visible`** gold ring (today there is none).
- **`prefers-reduced-motion`** disables tile/hover transforms.
- Filter pills expose **`aria-pressed`**; the filter group has a programmatic label; result/empty
  changes announced via `aria-live`.
- Covers carry descriptive `alt` (`coverAlt`), not `alt=""`.
- Maintain heading order, skip link, landmark structure (already good).

---

## 10. Out of scope (this build)

- A "Seven Ages" interactive explainer / world map page.
- Search & sort (revisit past ~20 stories; only 12 now).
- A CMS — content stays as in-repo MDX (the bible's pipeline produces docs, we convert).
- Publishing the Record-of-Canon tables.
- Analytics (can be added later as a single snippet).

## 11. Migration / build outline (detail goes to the plan)

1. Scaffold Astro; port `theme.css` + tokens; build `Base`/`Story` layouts, header/footer, grain.
2. Define content collection schema; convert the 12 `.docx` → MDX (epigraph, body w/ ❦, line of
   record, frontmatter incl. regions from each doc's canon table); verify ages/years/places vs canon.
3. Build `StoryCard` + library page + filter island; `[slug].astro` story page + components.
4. Generate covers (sample → confirm → batch); wire `astro:assets`; new favicon.
5. SEO/OG/JSON-LD, sitemap, robots, RSS; 404; colophon page.
6. A11y pass; `astro build` clean; verify deep links, feeds, and OG previews.

## 12. Risks / open items

- **Higgsfield outage** — cover generation deferred until the API recovers; the gradient fallback
  means the site can ship/preview before art lands.
- **Region mapping** — resolved per-tale from each doc's "Places used"; flag any ambiguous case
  for the user during conversion rather than guessing.
- **`.docx` → MDX fidelity** — smart quotes, italics, and the ❦ breaks must survive conversion;
  spot-check each tale after import.
- **Deploy target** — host not chosen yet (Astro static deploys to Vercel/Netlify/Cloudflare/etc.);
  the static-MPA design is host-agnostic. Decide at deploy time.
