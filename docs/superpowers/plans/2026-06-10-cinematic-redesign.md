# Val'Run Cinematic Redesign Implementation Plan (Plan 2 of 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every interior page feel like the same film as Home — chapter heroes, portrait card faces, page-turn transitions, ambient motion — per the 2026-06-10 design critique and the owner's stated direction (cinematic, big imagery, no docs-site feel).

**Architecture:** One canonical `CHAPTERS` data array drives nav, Home panels, and the new prev/next bands so order/numbering can never diverge. Two new components (`ChapterHero`, `ChapterEnd`) reuse Home's visual grammar. TarotCard gains an image-front variant. All motion is pure CSS (View Transitions API + keyframes), gated behind `prefers-reduced-motion`. No new dependencies; no three.js.

**Tech Stack:** React 19, react-router-dom 7 (`viewTransition` prop), CSS Modules, View Transitions API (progressive enhancement).

**Prerequisite:** Plan 1 (`2026-06-10-audit-fixes.md`) must be complete — this plan builds on `useDocumentMeta`, the lazy `chapterBg` image, the TarotCard `flipControl`, and the optimized images.

**Verification:** `npm run lint && npm run build` per task + visual check via `npm run dev` (use chrome-devtools MCP screenshots where available). **Owner reviews a screenshot after Tasks 2, 4, and 8 before continuing** — he reacts strongly to design changes; show, then proceed.

---

### Task 1: Canonical chapter data — one source of truth for order and numbering

**Files:**
- Create: `src/data/chapters.js`
- Modify: `src/components/Layout.jsx` (NAV derives from it)
- Modify: `src/pages/Home.jsx` (true numerals + coda derive from it)

Today Home's panels are numbered I–IV but link to pages labeled Chapter III, V, II, IV; nav order also differs from Home's narrative order.

**⚠️ USER DECISION before starting:** Home panels currently run in narrative order (Breaking → Faith → Continent → Peoples). Option (a, default): keep narrative order, relabel each panel with its true chapter numeral (III., V., II., IV. — eyebrows, not sequence). Option (b): reorder panels to chapter order (II → V). Ask the owner; default to (a) if unavailable.

- [ ] **Step 1: Create `src/data/chapters.js`**

```js
/* Canonical chapter order, numbering, titles, and hero art for the compendium.
 * Chapter I is the frontispiece (Home). Single source of truth for the Layout
 * nav, Home's panels and coda, ChapterHero eyebrows, and ChapterEnd bands. */
export const CHAPTERS = [
  { slug: "/geography", numeral: "II",  label: "Geography", title: "The Geography", hero: "/map.jpg" },
  { slug: "/history",   numeral: "III", label: "History",   title: "The History",   hero: "/hero/02-the-breaking.jpg" },
  { slug: "/peoples",   numeral: "IV",  label: "Peoples",   title: "The Peoples",   hero: "/hero/05-peoples.jpg" },
  { slug: "/faith",     numeral: "V",   label: "Faith",     title: "The Faith",     hero: "/hero/03-aetherflow.jpg" },
  { slug: "/factions",  numeral: "VI",  label: "Factions",  title: "The Factions",  hero: "/hero/04-continent.jpg" },
];

export const chapterFor = (slug) => CHAPTERS.find((c) => c.slug === slug);
```

- [ ] **Step 2: Drive Layout NAV from it**

In `src/components/Layout.jsx`, replace:

```jsx
const NAV = [
  { to: "/geography",  label: "Geography" },
  { to: "/history",    label: "History" },
  { to: "/peoples",    label: "Peoples" },
  { to: "/faith",      label: "Faith" },
  { to: "/factions",   label: "Factions" },
];
```

with:

```jsx
import { CHAPTERS } from "../data/chapters.js";

const NAV = CHAPTERS.map(({ slug, label }) => ({ to: slug, label }));
```

(Place the import with the other imports at the top of the file.)

- [ ] **Step 3: True numerals + derived coda in Home**

In `src/pages/Home.jsx`, add the import:

```jsx
import { chapterFor, CHAPTERS as CANON } from "../data/chapters.js";
```

Replace each panel's hardcoded `eyebrow` with the canonical numeral (assuming decision (a) — narrative order kept):

```jsx
const CHAPTERS = [
  {
    img: "/hero/02-the-breaking.jpg",
    eyebrow: `${chapterFor("/history").numeral}.`,
    title: "The Breaking",
    body: "A meteor struck the heart of Cinder Island in Year 0. The world has been answering ever since.",
    to: "/history",
    cta: "Read the seven ages",
    align: "left",
  },
  {
    img: "/hero/03-aetherflow.jpg",
    eyebrow: `${chapterFor("/faith").numeral}.`,
    title: "The Architect's Breath",
    body: "Eonar drew the first breath, and that breath has not stopped — it moves still, through stone, water, flesh, and the space between stars.",
    to: "/faith",
    cta: "Meet the Nine",
    align: "right",
  },
  {
    img: "/hero/04-continent.jpg",
    eyebrow: `${chapterFor("/geography").numeral}.`,
    title: "The Continent of Four Faces",
    body: "Verdure, Twiland, Sarudar, Cinder — drawn together and slowly torn apart by a single inland sea.",
    to: "/geography",
    cta: "Cross the continent",
    align: "left",
  },
  {
    img: "/hero/05-peoples.jpg",
    eyebrow: `${chapterFor("/peoples").numeral}.`,
    title: "The Twelve Kindreds",
    body: "Six peoples are remembered in scripture. Six watch from the edges of recorded history.",
    to: "/peoples",
    cta: "Meet the peoples",
    align: "right",
  },
];
```

(Keep whatever kindred-count wording Plan 1 Task 8's canon check settled on.)

And replace `CODA_LINKS` with:

```jsx
const CODA_LINKS = CANON.map(({ slug, label }) => ({ to: slug, label }));
```

- [ ] **Step 4: Lint, build, verify, commit**

`npm run dev`: nav unchanged, Home panels now show II./III./IV./V. matching their target pages' chapter labels.

```bash
npm run lint && npm run build
git add src/data/chapters.js src/components/Layout.jsx src/pages/Home.jsx
git commit -m "feat: canonical chapter data drives nav, Home numerals, and coda"
```

---

### Task 2: ChapterHero — cinematic opening for every interior chapter

**Files:**
- Create: `src/components/ChapterHero.jsx`
- Create: `src/components/ChapterHero.module.css`
- Modify: `src/pages/Faith.jsx`, `src/pages/Peoples.jsx`, `src/pages/Factions.jsx`, `src/pages/History.jsx`

Target look (approved mockup):

```
┌──────────────────────────────────────┐
│ ░░▓▓ hero image, full-bleed, ~72svh ▓│
│                                      │
│         CHAPTER V                    │  ← gold small-caps eyebrow
│        The  Faith                    │  ← clamp(3.5–6rem) serif
│ "Three faiths, one scripture…"       │  ← italic lede
│ ▒▒▒▒ vignette fades into --ink ▒▒▒▒▒ │  ← page body begins
└──────────────────────────────────────┘
```

- [ ] **Step 1: Create `src/components/ChapterHero.jsx`**

```jsx
import styles from "./ChapterHero.module.css";

/* Full-bleed cinematic chapter opening — the interior-page counterpart
 * of Home's frontispiece. Sits above the page body, fades into --ink. */
export default function ChapterHero({ numeral, title, lede, image }) {
  return (
    <header className={styles.hero}>
      <img src={image} alt="" className={styles.heroImg} fetchpriority="high" decoding="async" />
      <div className={styles.heroVignette} aria-hidden="true" />
      <div className={styles.heroContent}>
        <div className={styles.eyebrow}>Chapter {numeral}</div>
        <h1 className={styles.title}>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create `src/components/ChapterHero.module.css`**

```css
/* ChapterHero — full-bleed chapter opening shared by interior pages. */

.hero {
  position: relative;
  min-height: 72vh;
  min-height: 72svh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.heroImg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.heroVignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(14, 16, 20, 0.55) 0%,
    rgba(14, 16, 20, 0.12) 35%,
    rgba(14, 16, 20, 0.5) 70%,
    var(--ink) 100%
  );
  pointer-events: none;
}

.heroContent {
  position: relative;
  z-index: 1;
  max-width: 760px;
  padding: 0 var(--space-6) var(--space-16);
  animation: heroIn 1200ms ease both;
}

.eyebrow {
  font-family: var(--smcap);
  font-size: 0.85rem;
  letter-spacing: 0.28em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.title {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(3.5rem, 8vw, 6rem);
  line-height: 1.02;
  color: var(--vellum);
  margin: var(--space-2) 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9), 0 4px 30px rgba(0, 0, 0, 0.8);
}

.lede {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.3rem;
  color: var(--vellum-dim);
  max-width: 560px;
  margin: 0 auto;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.85);
}

@keyframes heroIn {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .heroContent { animation: none; }
}
```

- [ ] **Step 3: Apply to Faith**

In `src/pages/Faith.jsx`: add imports

```jsx
import ChapterHero from "../components/ChapterHero.jsx";
import { chapterFor } from "../data/chapters.js";
```

then replace the component's return — wrap in a fragment, put the hero **outside** `tarotWrap` (so it escapes the wrap's padding), and delete the old `<header className={styles.head}>…</header>` block:

```jsx
export default function Faith() {
  useDocumentMeta("The Faith");
  const ch = chapterFor("/faith");
  return (
    <>
      <ChapterHero
        numeral={ch.numeral}
        title={ch.title}
        lede="Three faiths, one scripture, and a silence at the heart of all three."
        image={ch.hero}
      />
      <div className={styles.tarotWrap}>
        <div className={styles.bg} style={{ backgroundImage: `url(${HERO})` }} aria-hidden="true" />
        <div className={styles.bgOverlay} aria-hidden="true" />

        <section className={styles.narrative}>
          {/* …existing narrative content unchanged… */}
        </section>

        {/* …existing card sections unchanged… */}
      </div>
    </>
  );
}
```

- [ ] **Step 4: Apply to Peoples** (same pattern)

```jsx
export default function Peoples() {
  useDocumentMeta("The Peoples");
  const ch = chapterFor("/peoples");
  return (
    <>
      <ChapterHero
        numeral={ch.numeral}
        title={ch.title}
        lede="Twelve kindreds, laid out as a spread. Turn any card to read its tale."
        image={ch.hero}
      />
      <div className={styles.tarotWrap}>
        <div className={styles.bg} style={{ backgroundImage: `url(${HERO})` }} aria-hidden="true" />
        <div className={styles.bgOverlay} aria-hidden="true" />
        <div className={styles.spread}>
          {PEOPLES.map((p) => (
            <TarotCard key={p.name} name={p.name} description={p.desc} image={p.image} />
          ))}
        </div>
      </div>
    </>
  );
}
```

(The old `<header className={styles.head}>` block is removed.)

- [ ] **Step 5: Apply to Factions** (same pattern)

```jsx
export default function Factions() {
  useDocumentMeta("The Factions");
  const ch = chapterFor("/factions");
  return (
    <>
      <ChapterHero
        numeral={ch.numeral}
        title={ch.title}
        lede="Twelve hundred years after the Empire fell, Val'Run is governed not by a throne but by a web. Turn any card to read its tale."
        image={ch.hero}
      />
      <div className={styles.tarotWrap}>
        <div className={styles.bg} style={{ backgroundImage: `url(${HERO})` }} aria-hidden="true" />
        <div className={styles.bgOverlay} aria-hidden="true" />

        <CardSection title="Sovereign Powers" items={POWERS} />
        <CardSection title="Guilds & Commerce" items={GUILDS} />
        <CardSection title="The Underworld"    items={UNDERWORLD} />
        <CardSection title="Arms"              items={ARMS} />
        <CardSection title="Orders & Schools"  items={ORDERS} />
      </div>
    </>
  );
}
```

- [ ] **Step 6: Apply to History** (hero replaces the title block; intro/hint stay)

In `src/pages/History.jsx`, replace the `History` component's return with:

```jsx
  return (
    <>
      <ChapterHero
        numeral={chapterFor("/history").numeral}
        title="The History"
        lede="All time in Val'Run is reckoned from a single moment of fire."
        image={chapterFor("/history").hero}
      />
      <article className={styles.page}>
        <header className={styles.head}>
          <p className={styles.intro}>{HISTORY_INTRO}</p>
          <div className={styles.hint}>The river of years. Scroll or click any age.</div>
        </header>

        <div className={styles.timeline}>
          <div className={styles.spine} aria-hidden="true" />
          {HISTORY.map((age, i) => (
            <AgeEntry
              key={age.title}
              age={age}
              index={i}
              isActive={i === activeIndex}
              onActivate={setActiveIndex}
            />
          ))}
        </div>
      </article>
    </>
  );
```

with the matching imports added. In `src/pages/History.module.css`, delete the now-unused `.eyebrow`, `.pageTitle`, and `.lede` rules (verify with grep that nothing else references them).

(Geography keeps its scroll-synced map stage as its hero — do not add ChapterHero there.)

- [ ] **Step 7: Lint, build, screenshot checkpoint, commit**

```bash
npm run lint && npm run build
```
**Take a screenshot of /faith and /history and show the owner before committing.** Then:

```bash
git add src/components/ChapterHero.jsx src/components/ChapterHero.module.css src/pages/Faith.jsx src/pages/Peoples.jsx src/pages/Factions.jsx src/pages/History.jsx src/pages/History.module.css
git commit -m "feat: cinematic ChapterHero opening on Faith, Peoples, Factions, History"
```

---

### Task 3: History — era-keyed crossfading backdrops

**Files:**
- Modify: `src/pages/History.jsx`
- Modify: `src/pages/History.module.css`

The page describing the meteor gets the apocalypse imagery: a fixed, dim backdrop that crossfades as the reader scrolls through the ages (you already track `activeIndex`).

- [ ] **Step 1: Add the backdrop stack to History.jsx**

After the imports, add:

```jsx
/* Backdrop art per band of ages: the Breaking for the early ages,
 * the Crack for the middle, the present-day frontispiece for the late. */
const ERA_BACKDROPS = [
  { src: "/hero/02-the-breaking.jpg", upTo: 2 },
  { src: "/hero/06-the-crack.jpg", upTo: 4 },
  { src: "/hero/01-frontispiece.jpg", upTo: Infinity },
];
```

Inside the `History` component, before the return:

```jsx
  const backdropIndex = ERA_BACKDROPS.findIndex((b) => activeIndex <= b.upTo);
```

And as the first child inside `<article className={styles.page}>`:

```jsx
        <div className={styles.backdrops} aria-hidden="true">
          {ERA_BACKDROPS.map((b, i) => (
            <div
              key={b.src}
              className={`${styles.backdrop} ${i === backdropIndex ? styles.backdropActive : ""}`}
              style={{ backgroundImage: `url(${b.src})` }}
            />
          ))}
        </div>
```

- [ ] **Step 2: Backdrop CSS**

Append to `src/pages/History.module.css`:

```css
/* fixed, dim era backdrops crossfading with the active age */
.backdrops {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.backdrop {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: saturate(0.7) brightness(0.5);
  opacity: 0;
  transition: opacity 1200ms ease;
}

.backdropActive {
  opacity: 0.16;
}

@media (prefers-reduced-motion: reduce) {
  .backdrop { transition: none; }
}
```

In the existing `.page` rule: if it declares a `background`, delete that declaration (the ink ground comes from `body`; an opaque page background would hide the fixed backdrop). Ensure `.page` has `position: relative;` — add it if absent.

- [ ] **Step 3: Verify, lint, build, commit**

`npm run dev` → /history: a faint Breaking image behind the early ages; scrolling to Age V crossfades to the Crack; final ages show the frontispiece. Text legibility unchanged (backdrop ≤16% opacity).

```bash
npm run lint && npm run build
git add src/pages/History.jsx src/pages/History.module.css
git commit -m "feat: era-keyed crossfading backdrops on the History timeline"
```

---

### Task 4: TarotCard image-front variant — portraits as the card face

**Files:**
- Modify: `src/components/TarotCard.jsx`
- Modify: `src/components/TarotCard.module.css`

Approved mockup:

```
 NOW                    PROPOSED
┌─────────┐            ┌─────────┐
│  ┌───┐  │            │▓▓▓▓▓▓▓▓▓│ ← portrait fills the
│  │ ◯ │  │  empty     │▓▓ art ▓▓│   card, gold frame
│  └───┘  │  dark      │▓▓▓▓▓▓▓▓▓│   inset 6px
│  ELVES  │  space     │░scrim░░░│ ← bottom gradient
│         │            │  ELVES  │ ← name plate
└─────────┘            └─────────┘
```

Cards without an `image` (Faith's Nine, Factions) keep the current letter-medallion front.

- [ ] **Step 1: Branch the front face in TarotCard.jsx**

Replace the front-face `<div className={styles.cardFace} aria-hidden={flipped}>…</div>` block with:

```jsx
        <div
          className={`${styles.cardFace} ${image ? styles.cardFrontImage : ""}`}
          aria-hidden={flipped}
        >
          <Corners />
          {image ? (
            <>
              <img
                src={image}
                alt=""
                className={styles.faceImage}
                loading="lazy"
                decoding="async"
                width="600"
                height="600"
              />
              <div className={styles.faceScrim} aria-hidden="true" />
              <h2 className={`${styles.cardName} ${styles.cardNamePlate}`}>{name}</h2>
            </>
          ) : (
            <>
              <h2 className={styles.cardName}>{name}</h2>
              <div className={styles.cardRule} aria-hidden="true"><span>◆</span></div>
              <div className={styles.plate} aria-hidden="true">
                <span className={styles.plateMark}>{name.charAt(0)}</span>
              </div>
            </>
          )}
          <div className={styles.flipHint} aria-hidden="true">turn the card ↻</div>
        </div>
```

(The old `plateImage` path is gone for image cards; the `plate`/`plateMark` medallion remains the no-image fallback.)

- [ ] **Step 2: Image-front CSS**

Append to `src/components/TarotCard.module.css`:

```css
/* ── image-front variant: portrait fills the face ──────── */
.cardFrontImage {
  padding: 0;
  justify-content: flex-end;
}

.faceImage {
  position: absolute;
  inset: 6px;
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  object-fit: cover;
}

.faceScrim {
  position: absolute;
  inset: 6px;
  background: linear-gradient(
    to top,
    rgba(10, 12, 16, 0.92) 0%,
    rgba(10, 12, 16, 0.35) 28%,
    transparent 55%
  );
  pointer-events: none;
}

.cardNamePlate {
  position: relative;
  z-index: 1;
  margin: 0 0 var(--space-8);
  font-size: 1.8rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
}
```

And lift the corner brackets and hint above the art — in the existing corners rule, add `z-index: 2;`:

```css
.cornerTL, .cornerTR, .cornerBL, .cornerBR {
  position: absolute;
  width: 28px;
  height: 28px;
  pointer-events: none;
  z-index: 2;
}
```

and add `z-index: 1;` to the `.flipHint` rule.

- [ ] **Step 3: Verify, screenshot checkpoint, commit**

`npm run dev` → /peoples: all 12 cards show full-bleed portraits with gold frame, scrim, and name plate; hover/flip unchanged; /faith and /factions still show medallion fronts.

```bash
npm run lint && npm run build
```
**Show the owner a /peoples screenshot before committing.**

```bash
git add src/components/TarotCard.jsx src/components/TarotCard.module.css
git commit -m "feat: full-bleed portrait card faces on the Peoples spread"
```

---

### Task 5: View transitions + scroll-reset polish

**Files:**
- Modify: `src/styles/theme.css`
- Modify: `src/components/Layout.jsx`, `src/pages/Home.jsx`, `src/pages/NotFound.jsx`

react-router 7 supports the View Transitions API natively via the `viewTransition` prop — page changes become a 300/420ms crossfade. Browsers without the API get the instant swap.

- [ ] **Step 1: Transition CSS in theme.css**

Append:

```css
/* ── route transitions (View Transitions API) ─────────── */
@media not (prefers-reduced-motion: reduce) {
  ::view-transition-old(root) {
    animation: vtOut 280ms ease both;
  }
  ::view-transition-new(root) {
    animation: vtIn 420ms ease both;
  }
}

@keyframes vtOut {
  to { opacity: 0; }
}

@keyframes vtIn {
  from { opacity: 0; transform: scale(1.015); }
  to   { opacity: 1; transform: none; }
}
```

- [ ] **Step 2: Add `viewTransition` to every router link**

- `src/components/Layout.jsx`: add the `viewTransition` prop to the brand `<NavLink to="/" …>` and the NAV `<NavLink key={item.to} to={item.to} …>`.
- `src/pages/Home.jsx`: add `viewTransition` to the chapter `<Link to={to} …>` and the coda `<Link to={l.to} …>`.
- `src/pages/NotFound.jsx`: add `viewTransition` to the `<Link to="/">`.

Example (Layout NAV link):

```jsx
              <NavLink
                key={item.to}
                to={item.to}
                viewTransition
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                }
              >
```

- [ ] **Step 3: Verify, lint, build, commit**

`npm run dev` in Chrome: navigating between chapters crossfades; Firefox (no VT API yet for SPA): instant swap, no errors. Scroll reset from Plan 1 still works.

```bash
npm run lint && npm run build
git add src/styles/theme.css src/components/Layout.jsx src/pages/Home.jsx src/pages/NotFound.jsx
git commit -m "feat: page-turn view transitions between chapters"
```

---

### Task 6: Stop truncating lore — scrollable card backs

**Files:**
- Modify: `src/components/TarotCard.module.css`
- Modify: `src/components/TarotCard.jsx`

`line-clamp: 8` silently cuts longer descriptions (Council of Five, Crimson Wardens…). Make the back face scrollable; the flip-back control shrinks to the bottom strip so wheel/touch scrolling reaches the text (the full-card overlay would otherwise swallow scroll).

- [ ] **Step 1: Remove the clamp; make the back scrollable**

In `src/components/TarotCard.module.css`, replace the `.cardDesc` rule with:

```css
.cardDesc {
  font-family: var(--serif);
  font-style: italic;
  font-size: 0.98rem;
  line-height: 1.55;
  color: var(--vellum);
  margin: var(--space-3) 0 0;
  text-align: center;
  width: 100%;
}
```

and extend `.cardBack`:

```css
.cardBack {
  transform: rotateY(180deg);
  justify-content: flex-start;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(181, 138, 58, 0.4) transparent;
  padding-bottom: var(--space-12);
}
```

- [ ] **Step 2: Shrink the flip control when flipped**

In `src/components/TarotCard.jsx`, change the button to:

```jsx
      <button
        type="button"
        className={`${styles.flipControl} ${flipped ? styles.flipControlBack : ""}`}
        onClick={toggle}
        aria-expanded={flipped}
      >
```

In `src/components/TarotCard.module.css`, after `.flipControl:focus-visible`, add:

```css
/* when flipped, the control shrinks to the bottom strip so the
 * description above it can scroll */
.flipControlBack {
  inset: auto 0 0 0;
  height: 44px;
}
```

- [ ] **Step 3: Verify on the longest cards, lint, build, commit**

`npm run dev` → /factions: flip "Council of Five" and "Crimson Wardens" — full text reachable by scrolling inside the card; clicking the bottom strip ("turn back") flips back; Enter on the focused button still toggles.

```bash
npm run lint && npm run build
git add src/components/TarotCard.jsx src/components/TarotCard.module.css
git commit -m "fix: card backs scroll instead of silently clamping lore at 8 lines"
```

---

### Task 7: Ambient motion — Ken Burns drift + film grain

**Files:**
- Modify: `src/pages/Home.module.css` (Ken Burns on chapter backgrounds)
- Modify: `src/styles/theme.css` (grain overlay)

- [ ] **Step 1: Ken Burns on the lazy chapter images**

Append to `src/pages/Home.module.css`:

```css
/* slow drift on chapter art — stills feel alive */
@media (prefers-reduced-motion: no-preference) {
  .chapterBg {
    animation: kenburns 36s ease-in-out infinite alternate;
  }
  .chapter:nth-child(odd) .chapterBg {
    animation-duration: 44s;
    animation-direction: alternate-reverse;
  }
}

@keyframes kenburns {
  from { transform: scale(1) translate(0, 0); }
  to   { transform: scale(1.07) translate(1%, -1%); }
}
```

- [ ] **Step 2: Film-grain overlay in theme.css**

Append:

```css
/* ── film grain — ages every surface, ~1KB inline SVG noise ── */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  background-size: 160px 160px;
}
```

- [ ] **Step 3: Verify, lint, build, commit**

`npm run dev`: Home chapter art drifts almost imperceptibly; zooming into a flat ink area shows fine grain; text remains crisp (grain is overlay-blended at 3.5%). Toggle OS reduce-motion: drift stops, grain (static) remains.

```bash
npm run lint && npm run build
git add src/pages/Home.module.css src/styles/theme.css
git commit -m "feat: Ken Burns drift on chapter art and global film-grain texture"
```

---

### Task 8: ChapterEnd — "turn the page" prev/next band

**Files:**
- Create: `src/components/ChapterEnd.jsx`
- Create: `src/components/ChapterEnd.module.css`
- Modify: `src/pages/Geography.jsx`, `src/pages/History.jsx`, `src/pages/Peoples.jsx`, `src/pages/Faith.jsx`, `src/pages/Factions.jsx`

Every chapter currently dead-ends; the only forward path is the header nav.

- [ ] **Step 1: Create `src/components/ChapterEnd.jsx`**

```jsx
import { Link } from "react-router-dom";
import { CHAPTERS } from "../data/chapters.js";
import styles from "./ChapterEnd.module.css";

/* Full-width "next chapter" threshold at the end of every chapter page.
 * Wraps after the last chapter back to the first. */
export default function ChapterEnd({ current }) {
  const idx = CHAPTERS.findIndex((c) => c.slug === current);
  if (idx === -1) return null;
  const next = CHAPTERS[(idx + 1) % CHAPTERS.length];
  return (
    <Link to={next.slug} viewTransition className={styles.band}>
      <img src={next.hero} alt="" className={styles.bandImg} loading="lazy" decoding="async" />
      <div className={styles.bandVignette} aria-hidden="true" />
      <div className={styles.bandContent}>
        <div className={styles.bandEyebrow}>Next — Chapter {next.numeral}</div>
        <div className={styles.bandTitle}>{next.title}</div>
        <div className={styles.bandCue} aria-hidden="true">turn the page →</div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create `src/components/ChapterEnd.module.css`**

```css
/* ChapterEnd — the page-turn threshold band. The whole band is one link. */

.band {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 36vh;
  min-height: 36svh;
  overflow: hidden;
  text-align: center;
  border-top: 1px solid rgba(181, 138, 58, 0.25);
  border-bottom: none;
}

.band:hover {
  border-bottom: none;
}

.bandImg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.75) brightness(0.5);
  transition: transform 1200ms ease, filter 600ms ease;
}

.band:hover .bandImg {
  transform: scale(1.04);
  filter: saturate(0.9) brightness(0.62);
}

.bandVignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at center, rgba(10, 12, 16, 0.25) 0%, rgba(10, 12, 16, 0.7) 100%),
    linear-gradient(to bottom, var(--ink) 0%, transparent 30%, transparent 70%, var(--ink) 100%);
  pointer-events: none;
}

.bandContent {
  position: relative;
  z-index: 1;
  padding: var(--space-12) var(--space-6);
}

.bandEyebrow {
  font-family: var(--smcap);
  font-size: 0.8rem;
  letter-spacing: 0.28em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.bandTitle {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  line-height: 1.05;
  color: var(--vellum);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
}

.bandCue {
  margin-top: var(--space-4);
  font-family: var(--smcap);
  font-size: 0.78rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--vellum-dim);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 300ms ease, transform 300ms ease;
}

.band:hover .bandCue,
.band:focus-visible .bandCue {
  opacity: 1;
  transform: none;
}

.band:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: -4px;
}
```

- [ ] **Step 3: Append the band to all five chapter pages**

Add `import ChapterEnd from "../components/ChapterEnd.jsx";` to each page, then:

- `src/pages/History.jsx` — after `</article>`, inside the fragment: `<ChapterEnd current="/history" />`
- `src/pages/Peoples.jsx` — after the closing `</div>` of `tarotWrap`, inside the fragment: `<ChapterEnd current="/peoples" />`
- `src/pages/Faith.jsx` — same placement: `<ChapterEnd current="/faith" />`
- `src/pages/Factions.jsx` — same placement: `<ChapterEnd current="/factions" />`
- `src/pages/Geography.jsx` — as the last child **inside** `<div className={styles.scrollArea}>` (after the `.almanac` div), so it scrolls with the text column next to the fixed map: `<ChapterEnd current="/geography" />`

- [ ] **Step 4: Verify, screenshot checkpoint, commit**

`npm run dev`: every chapter ends in a faded next-chapter image band; hovering reveals "turn the page →"; clicking crossfades to the next chapter at the top. Geography's band stays inside the scroll column.

```bash
npm run lint && npm run build
```
**Show the owner a screenshot of one band before committing.**

```bash
git add src/components/ChapterEnd.jsx src/components/ChapterEnd.module.css src/pages/*.jsx
git commit -m "feat: turn-the-page next-chapter band on every chapter"
```

---

### Task 9: Mobile — single-row header with scrollable nav

**Files:**
- Modify: `src/components/Layout.module.css:132-156`

The <960px header stacks brand + wrapped nav + icon into ~3 rows, burning ~140px of phone viewport.

- [ ] **Step 1: Replace the small-screens block**

In `src/components/Layout.module.css`, replace the entire `@media (max-width: 960px) { … }` block with:

```css
@media (max-width: 960px) {
  .headerInner {
    flex-direction: row;
    align-items: center;
    gap: var(--space-3);
    padding-top: var(--space-3);
    padding-bottom: var(--space-3);
  }
  .brand {
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  .nav {
    flex-wrap: nowrap;
    white-space: nowrap;
    gap: var(--space-4);
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    mask-image: linear-gradient(to right, black 88%, transparent);
    -webkit-mask-image: linear-gradient(to right, black 88%, transparent);
  }
  .nav::-webkit-scrollbar {
    display: none;
  }
  .navLink {
    font-size: 0.72rem;
    flex-shrink: 0;
  }
  .appCta {
    margin-left: 0;
  }
  .appCtaIcon {
    width: 28px;
    height: 28px;
  }
}
```

- [ ] **Step 2: Verify, lint, build, commit**

`npm run dev` at 390px width (or chrome-devtools emulate): header is one compact row; nav scrolls horizontally with a right-edge fade; all five links reachable by swipe; skip link (Plan 1) still works.

```bash
npm run lint && npm run build
git add src/components/Layout.module.css
git commit -m "feat: single-row mobile header with horizontally scrollable nav"
```

---

### Task 10: NotFound set-piece + dead-code cleanup

**Files:**
- Modify: `src/pages/NotFound.jsx`
- Create: `src/pages/NotFound.module.css`
- Delete: `src/components/Page.jsx`, `src/components/Page.module.css`, `src/assets/hero.png`
- Modify: `CLAUDE.md`

NotFound is the last `Page.jsx` consumer; the unused `06-the-crack.jpg` — a sunken, lost place — is the perfect in-world 404. After this, `Page.jsx`/`Page.module.css` have zero consumers and `src/assets/hero.png` is Vite-template leftover art (not fantasy art).

- [ ] **Step 1: Rewrite `src/pages/NotFound.jsx`**

```jsx
import { Link } from "react-router-dom";
import useDocumentMeta from "../hooks/useDocumentMeta.js";
import styles from "./NotFound.module.css";

export default function NotFound() {
  useDocumentMeta("Lost in the margins");
  return (
    <div className={styles.lost}>
      <img src="/hero/06-the-crack.jpg" alt="" className={styles.lostBg} decoding="async" />
      <div className={styles.lostVignette} aria-hidden="true" />
      <div className={styles.lostContent}>
        <div className={styles.eyebrow}>Errata</div>
        <h1 className={styles.title}>Lost in the margins</h1>
        <p className={styles.lede}>No page bears that name in this folio.</p>
        <p className={styles.back}>
          Return to the <Link to="/" viewTransition>frontispiece</Link>, or pick a chapter from
          the spine above.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/pages/NotFound.module.css`**

```css
/* 404 — a sunken, lost place. Full-bleed crack imagery, centered errata. */

.lost {
  position: relative;
  min-height: calc(100vh - 160px);
  min-height: calc(100svh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.lostBg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.7) brightness(0.55);
}

.lostVignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at center, rgba(10, 12, 16, 0.3) 0%, rgba(10, 12, 16, 0.85) 100%),
    linear-gradient(to bottom, var(--ink) 0%, transparent 25%, transparent 75%, var(--ink) 100%);
  pointer-events: none;
}

.lostContent {
  position: relative;
  z-index: 1;
  max-width: 640px;
  padding: var(--space-16) var(--space-6);
}

.eyebrow {
  font-family: var(--smcap);
  font-size: 0.85rem;
  letter-spacing: 0.28em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.title {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(2.8rem, 6vw, 4.2rem);
  line-height: 1.05;
  color: var(--vellum);
  margin: var(--space-2) 0 var(--space-4);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
}

.lede {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.3rem;
  color: var(--vellum-dim);
  margin-bottom: var(--space-6);
}

.back {
  color: var(--vellum-dim);
}
```

- [ ] **Step 3: Delete the dead files**

```bash
git rm src/components/Page.jsx src/components/Page.module.css src/assets/hero.png
grep -rn "Page.jsx\|from \"../components/Page\|assets/hero" src/ ; echo "exit=$?"
```
Expected: grep prints nothing, `exit=1`. If anything still imports them, fix that first — do not force the delete.

- [ ] **Step 4: Correct CLAUDE.md**

In `CLAUDE.md`:
- In the **Architecture** tree and the page-primitives bullet, remove the references to `Page.jsx + .module.css` and the `Page/Section/NamedList/Flourish/Placeholder` primitives (they are deleted; pages are bespoke now). Mention `ChapterHero`, `ChapterEnd`, `TarotCard`, `GeoMapStage`, `ScrollToTop` as the shared components and `src/data/chapters.js` as the canonical chapter order.
- In **Assets**, replace the claim that `src/assets/hero.png` is "kept for future hero treatments" with: `src/assets/` is empty/removed; all imagery lives in `/public`.

- [ ] **Step 5: Verify, lint, build, commit**

`npm run dev` → visit /no-such-page: full-bleed crack imagery with the errata copy; link returns home with a crossfade.

```bash
npm run lint && npm run build
git add -A
git commit -m "feat: in-world 404 set-piece; remove dead Page primitives and template hero.png"
```

---

## Final verification (after all tasks)

- [ ] `npm run lint && npm run build` — clean.
- [ ] Full visual pass on all six routes + 404, desktop and 390px mobile, with reduce-motion both off and on.
- [ ] Cross-check chapter numbering: Home panel eyebrows ↔ page heroes ↔ ChapterEnd bands all agree (all derive from `chapters.js`).
- [ ] Push to a Vercel preview, share the preview URL with the owner for sign-off before merging to main.
