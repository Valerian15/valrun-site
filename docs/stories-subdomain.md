# stories.valrun.org — Architecture Plan

## Overview

A standalone React site hosted at `stories.valrun.org` for publishing short stories and novels set in the world of Val'Run. Linked from the main valrun.org site via a header button (same pattern as the existing `app.valrun.org` tree button in `Layout.jsx`).

---

## Repository structure

Two options to consider:

| Option | Pros | Cons |
|---|---|---|
| **Separate repo** (`valrun-stories`) | Independent deploy cadence; stories content isolated | Two codebases to maintain |
| **Monorepo subfolder** (`/stories` in this repo) | Shared design tokens, one deploy config | Build pipeline more complex |

**Recommended: separate repo.** Stories will grow independently and may eventually need their own CMS or static-generation pipeline.

---

## Domain & hosting

- **Domain:** `stories.valrun.org` — add a CNAME in DNS pointing to Vercel
- **Deploy:** Vercel project linked to the `valrun-stories` repo, auto-deploy from `main`
- **Framework:** Same stack as main site — React 19 + Vite + react-router-dom, plain JS, CSS Modules

---

## Design system inheritance

Copy `src/styles/theme.css` from the main site as the base. All shared tokens (`--ink`, `--vellum`, `--gold`, `--oxblood`, fonts) carry over. This subdomain must feel like a continuation of the main site, not a separate product.

Stories pages are content-heavy — add one new token family:

```css
--story-body-width: 68ch;   /* comfortable reading column */
--story-lede-size: 1.2rem;  /* slightly larger body text */
```

---

## Page inventory

### 1. Index — `stories.valrun.org/`

The browsable library. Default shows all stories; filters narrow the grid.

**Layout:**
- Full-bleed masthead (site title "Chronicles of Val'Run" or similar, tagline)
- Filter bar (sticky below header)
- Story tile grid

**Filter dimensions:**
- **Age / Era** — dropdown or pill group; values drawn from the Val'Run age system (e.g. *Age of Founding*, *Age of Iron*, *Age of the Accord*, etc.)
- **Region / Location** — multi-select pills; values are major areas (e.g. *Verdure*, *The Ashfields*, *Timbercross*, *The Sunken Coast*)
- Filters are URL-querystring-driven (`?era=iron&region=verdure`) so links are shareable

**Story tile:**
- Aspect-ratio locked image (3:2 or 4:3 cover art)
- Story title (serif headline)
- Era badge (small-caps eyebrow, gold)
- One-line teaser or first sentence
- Location tags (small chips)
- Hover: subtle lift + gold border glow, cursor pointer
- Click → navigates to story detail page

---

### 2. Story detail — `stories.valrun.org/[slug]`

One page per story. URL slug derived from title (e.g. `the-wandering-cartographer`).

**Layout top-to-bottom:**

1. **Hero image** — full-bleed, max ~55vh, `object-fit: cover`, with a bottom gradient fade into the page background
2. **Story header block** (centered, overlapping the hero fade):
   - Title (large serif, `--gold`)
   - Era / year line — e.g. *"Year 412 of the Age of Iron"*
   - Location tags — e.g. *Verdure · Timbercross*
   - Author byline (optional)
   - Word count / read-time estimate (optional)
3. **Divider** — `flourish` ornament from the existing global stylesheet
4. **Body text column** — constrained to `--story-body-width`, generous line-height, drop-cap on the opening paragraph using the existing `.dropcap` class
5. **Footer** — "More stories from this era" related-tile strip (3 tiles)
6. **`ChapterEnd`-style band** — "Return to the library" link, consistent with main site navigation

---

## Data model

Stories are defined in a single JS data file: `src/data/stories.js`

```js
// src/data/stories.js
export const STORIES = [
  {
    slug: "the-wandering-cartographer",
    title: "The Wandering Cartographer",
    era: "age-of-iron",           // matches filter key
    eraLabel: "Age of Iron",
    year: "412 A.I.",
    locations: ["Verdure", "Timbercross"],
    coverImage: "/covers/wandering-cartographer.jpg",
    teaser: "A mapmaker's obsession leads her into the forest no chart has ever named.",
    bodyFile: "/stories/wandering-cartographer.md",  // or inline string
    wordCount: 3200,
  },
  // …
];

export const ERAS = [
  { key: "age-of-founding", label: "Age of Founding" },
  { key: "age-of-iron",     label: "Age of Iron" },
  // …
];

export const REGIONS = [
  "Verdure", "Timbercross", "The Ashfields", "The Sunken Coast", /* … */
];
```

Story body text: for short stories, the markdown can be bundled as a static file in `/public/stories/` and fetched at render time, or imported directly as a string. For longer works (novellas) the same pattern scales — one markdown file per chapter.

---

## Routing

```
/                          → Index (StoryLibrary.jsx)
/:slug                     → Story detail (StoryDetail.jsx)
```

`App.jsx` in the stories repo only needs two routes. The `slug` param is used to look up the story in `STORIES`.

---

## Connection from valrun.org

Add a second external-link button in `Layout.jsx` alongside the existing tree/app button:

```jsx
<a
  className={styles.subdomainBtn}
  href="https://stories.valrun.org"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Read stories (stories.valrun.org)"
>
  {/* book icon or small cover thumbnail */}
</a>
```

The exact icon/graphic TBD (a quill, an open book, or a small decorative thumbnail consistent with the site's manuscript aesthetic).

---

## Open questions (to decide before build)

1. **Story body format:** Markdown files fetched at runtime vs. imported strings vs. a lightweight headless CMS (e.g. Contentlayer, Astro content collections if framework is reconsidered)
2. **Era taxonomy:** Confirm canonical age names and date system from the source docs before wiring the filter
3. **Cover art workflow:** Will covers be commissioned illustrations, AI-assisted, or photo composites? Impacts `/public/covers/` naming conventions
4. **Navigation icon:** What visual sits in the main-site header button for stories?
5. **Novels / multi-chapter works:** Should they live under `stories.valrun.org/novels/[slug]/[chapter]` or as a separate subdomain (`books.valrun.org`)?
