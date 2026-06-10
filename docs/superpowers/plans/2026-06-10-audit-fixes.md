# Val'Run Audit Fixes Implementation Plan (Plan 1 of 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix every confirmed bug, security-hardening gap, performance bottleneck, SEO hole, and accessibility failure from the 2026-06-10 site audit — without changing the visual design.

**Architecture:** Pure incremental fixes to the existing React 19 + Vite 8 SPA. New files: one scroll-reset component, one document-meta hook, an image-optimization script, sitemap/robots in `public/`. Everything else is edits to existing files. No new runtime dependencies except `@fontsource` packages (fonts) and `sharp` (dev-only).

**Tech Stack:** React 19, react-router-dom 7, Vite 8, CSS Modules, @fontsource (self-hosted fonts), sharp (build-time image tooling).

**Verification:** There is no test runner. Every task verifies with `npm run lint && npm run build`, plus task-specific checks (grep assertions, `npm run preview` + curl, browser check via chrome-devtools when noted). Commit after each task.

**Companion plan:** `2026-06-10-cinematic-redesign.md` (design upgrades — execute after this plan).

---

## Phase 1 — Bugs & SEO repairs

### Task 1: Define the missing spacing tokens

**Files:**
- Modify: `src/styles/theme.css:29-37`

The CSS modules use `var(--space-5)` (×6), `var(--space-7)` (×1), `var(--space-10)` (×2), `var(--space-20)` (×1), but theme.css never defines them — every one of those paddings/margins/gaps computes to `0` in production (an undefined `var()` makes the declaration invalid at computed-value time).

- [ ] **Step 1: Add the four missing tokens to the scale block**

In `src/styles/theme.css`, replace:

```css
  /* scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
```

with:

```css
  /* scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
```

- [ ] **Step 2: Verify every used token is now defined**

Run:
```bash
for t in $(grep -rhoE 'var\(--space-[0-9]+' src --include="*.css" | sort -u | sed 's/var(//'); do grep -q -- "$t:" src/styles/theme.css || echo "MISSING $t"; done
```
Expected: no output (no MISSING lines).

- [ ] **Step 3: Build and lint**

Run: `npm run lint && npm run build`
Expected: both pass with no output/errors.

- [ ] **Step 4: Commit**

```bash
git add src/styles/theme.css
git commit -m "fix: define missing --space-5/-7/-10/-20 tokens that collapsed spacing to 0"
```

---

### Task 2: Scroll to top on route change

**Files:**
- Create: `src/components/ScrollToTop.jsx`
- Modify: `src/App.jsx`

There is no scroll restoration anywhere — navigating from a scrolled position lands mid-page on the next route.

- [ ] **Step 1: Create the component**

Create `src/components/ScrollToTop.jsx`:

```jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Reset scroll on every route change — the SPA otherwise carries
 * the previous page's scroll position into the next one. */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
```

- [ ] **Step 2: Mount it in App.jsx**

Replace the full contents of `src/App.jsx` with:

```jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import Geography from "./pages/Geography.jsx";
import History from "./pages/History.jsx";
import Peoples from "./pages/Peoples.jsx";
import Faith from "./pages/Faith.jsx";
import Factions from "./pages/Factions.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/geography" element={<Geography />} />
          <Route path="/history" element={<History />} />
          <Route path="/peoples" element={<Peoples />} />
          <Route path="/faith" element={<Faith />} />
          <Route path="/factions" element={<Factions />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
```

- [ ] **Step 3: Verify in the browser**

Run `npm run dev`, scroll to the bottom of Home, click "Meet the Nine". Expected: /faith opens at the top of the page, not mid-scroll. (Use chrome-devtools MCP if available; otherwise `npm run build` and reason from code.)

- [ ] **Step 4: Lint, build, commit**

```bash
npm run lint && npm run build
git add src/components/ScrollToTop.jsx src/App.jsx
git commit -m "fix: scroll to top on route change"
```

---

### Task 3: Remove the undefined `styles.cardFront` reference

**Files:**
- Modify: `src/components/TarotCard.jsx:41`

`TarotCard.module.css` defines `.cardFace` and `.cardBack` but no `.cardFront` — `styles.cardFront` is `undefined`, rendering `class="… undefined"`.

- [ ] **Step 1: Fix the className**

In `src/components/TarotCard.jsx`, replace:

```jsx
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
```

with:

```jsx
        <div className={styles.cardFace}>
```

(The cinematic-redesign plan reintroduces a real `.cardFront` class for the image-front variant; this just removes the dangling reference.)

- [ ] **Step 2: Lint, build, commit**

```bash
npm run lint && npm run build
git add src/components/TarotCard.jsx
git commit -m "fix: remove undefined styles.cardFront reference rendering class=undefined"
```

---

### Task 4: Per-route document titles + canonical URL

**Files:**
- Create: `src/hooks/useDocumentMeta.js`
- Modify: `src/pages/Home.jsx`, `src/pages/Geography.jsx`, `src/pages/History.jsx`, `src/pages/Peoples.jsx`, `src/pages/Faith.jsx`, `src/pages/Factions.jsx`, `src/pages/NotFound.jsx`

Every route currently shares the static `<title>` from index.html, and no route declares a canonical URL.

- [ ] **Step 1: Create the hook**

Create `src/hooks/useDocumentMeta.js`:

```js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "Val'Run";
const ORIGIN = "https://valrun.org";

/* Sets the document title ("<title> — Val'Run") and keeps a canonical
 * <link> in sync with the current route. Pass no title for the home page. */
export default function useDocumentMeta(title) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — a worldbuilding compendium`;
  }, [title]);

  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = ORIGIN + (pathname === "/" ? "/" : pathname);
  }, [pathname]);
}
```

- [ ] **Step 2: Call it from every page**

Add to each page component (import at top, call as first line of the component function):

| File | Import line | Call |
|---|---|---|
| `src/pages/Home.jsx` | `import useDocumentMeta from "../hooks/useDocumentMeta.js";` | `useDocumentMeta();` (inside `Home()`) |
| `src/pages/Geography.jsx` | same | `useDocumentMeta("The Geography");` (inside `Geography()`) |
| `src/pages/History.jsx` | same | `useDocumentMeta("The History");` (inside `History()`) |
| `src/pages/Peoples.jsx` | same | `useDocumentMeta("The Peoples");` (inside `Peoples()`) |
| `src/pages/Faith.jsx` | same | `useDocumentMeta("The Faith");` (inside `Faith()`) |
| `src/pages/Factions.jsx` | same | `useDocumentMeta("The Factions");` (inside `Factions()`) |
| `src/pages/NotFound.jsx` | same | `useDocumentMeta("Lost in the margins");` (inside `NotFound()`) |

Example for Peoples (the others follow the exact same two-line pattern):

```jsx
import { PEOPLES } from "../data/peoples.js";
import TarotCard from "../components/TarotCard.jsx";
import useDocumentMeta from "../hooks/useDocumentMeta.js";
import styles from "./Peoples.module.css";

const HERO = "/hero/05-peoples.jpg";

export default function Peoples() {
  useDocumentMeta("The Peoples");
  return (
    /* …existing JSX unchanged… */
  );
}
```

- [ ] **Step 3: Verify**

`npm run dev`, navigate between pages, watch the tab title change (e.g. "The Faith — Val'Run"). Inspect `document.head` for the canonical link updating per route.

- [ ] **Step 4: Lint, build, commit**

```bash
npm run lint && npm run build
git add src/hooks/useDocumentMeta.js src/pages/*.jsx
git commit -m "feat: per-route document titles and canonical URLs"
```

---

### Task 5: Social/SEO meta tags + LCP preload in index.html

**Files:**
- Modify: `index.html`

No meta description, no Open Graph/Twitter tags (shares render blank cards), no theme-color, and the LCP frontispiece image is discovered late.

- [ ] **Step 1: Replace the `<head>`**

Replace the full contents of `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/valrun-tree.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0e1014" />
    <title>Val'Run — a worldbuilding compendium</title>
    <meta
      name="description"
      content="A fantasy world that lives atop a wound. Explore the geography, seven ages of history, twelve kindreds, the Nine, and the factions of Val'Run."
    />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Val'Run" />
    <meta property="og:title" content="Val'Run — a worldbuilding compendium" />
    <meta
      property="og:description"
      content="A fantasy world that lives atop a wound. Geography, history, peoples, faith, and factions of Val'Run."
    />
    <meta property="og:image" content="https://valrun.org/hero/01-frontispiece.jpg" />
    <meta property="og:image:width" content="1920" />
    <meta property="og:image:height" content="1080" />
    <meta property="og:url" content="https://valrun.org/" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preload" as="image" href="/hero/01-frontispiece.jpg" fetchpriority="high" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

(Task 10 swaps the favicon link to an optimized file; leave it as-is here.)

- [ ] **Step 2: Build and verify the tags survive**

Run: `npm run build && grep -c "og:" dist/index.html`
Expected: build passes; grep prints `6`.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: meta description, Open Graph/Twitter tags, theme-color, LCP preload"
```

After the next production deploy, validate the share card at https://www.opengraph.xyz/ or by pasting valrun.org into a Discord message.

---

### Task 6: Real sitemap.xml and robots.txt

**Files:**
- Create: `public/sitemap.xml`
- Create: `public/robots.txt`

`/sitemap.xml` currently returns the SPA HTML shell with HTTP 200. (`/robots.txt` is currently served by a Cloudflare-managed override — the local file is the origin fallback and documents intent.)

- [ ] **Step 1: Create `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://valrun.org/</loc><lastmod>2026-06-10</lastmod></url>
  <url><loc>https://valrun.org/geography</loc><lastmod>2026-06-10</lastmod></url>
  <url><loc>https://valrun.org/history</loc><lastmod>2026-06-10</lastmod></url>
  <url><loc>https://valrun.org/peoples</loc><lastmod>2026-06-10</lastmod></url>
  <url><loc>https://valrun.org/faith</loc><lastmod>2026-06-10</lastmod></url>
  <url><loc>https://valrun.org/factions</loc><lastmod>2026-06-10</lastmod></url>
</urlset>
```

- [ ] **Step 2: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://valrun.org/sitemap.xml
```

- [ ] **Step 3: Verify locally**

Run: `npm run build && npm run preview &` then `curl -s http://localhost:4173/sitemap.xml | head -3`
Expected: XML output starting `<?xml version="1.0"`, not `<!doctype html>`. Kill the preview server afterwards.

- [ ] **Step 4: Commit**

```bash
git add public/sitemap.xml public/robots.txt
git commit -m "feat: real sitemap.xml and robots.txt"
```

**⚠️ USER DECISION (outside the repo):** the live robots.txt is replaced at the edge by Cloudflare's managed "content signals" robots.txt, which blocks AI crawlers. If you want the lore discoverable by AI assistants, disable that toggle in the Cloudflare dashboard (zone → Settings → robots.txt management). Flag this to the user; do not change Cloudflare config from this plan.

---

### Task 7: Security headers + immutable asset caching in vercel.json

**Files:**
- Modify: `vercel.json`

The deployment ships zero security headers, and hashed `/assets/` files get only a 4-hour cache.

- [ ] **Step 1: Replace `vercel.json`**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(hero|peoples)/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=604800" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" }
      ]
    }
  ]
}
```

Notes baked into this config:
- The CSP keeps `'unsafe-inline'` in `style-src` because pages set `backgroundImage` via the `style` attribute; React CSSOM styles are unaffected either way.
- The two Google Fonts origins are required until Task 9 self-hosts the fonts (Task 9 then removes them).
- The catch-all rewrite is kept (soft-404 was rated a nit; scoping it risks breaking real routes — revisit only if prerendering later).

- [ ] **Step 2: Validate the JSON**

Run: `python3 -m json.tool vercel.json > /dev/null && echo OK`
Expected: `OK`

- [ ] **Step 3: Commit and verify on a preview deployment**

```bash
git add vercel.json
git commit -m "feat: security headers and immutable asset caching"
```

After pushing, verify on the Vercel preview URL (or production after merge):
```bash
curl -sI https://valrun.org | grep -iE "content-security|x-content-type|x-frame|referrer-policy|permissions-policy"
curl -sI https://valrun.org/assets/$(curl -s https://valrun.org | grep -o 'index-[^"]*\.js') | grep -i cache-control
```
Expected: all five security headers present; assets show `max-age=31536000, immutable`. **Open the site in a browser and confirm no CSP violations in the console** (fonts and images must still load).

---

### Task 8: Resolve "The Eleven Kindreds" vs 12 peoples ⚠️ CANON CHECK

**Files:**
- Modify: `src/pages/Home.jsx:38-39` (only if canon says 12)

Home says "The Eleven Kindreds" / "Six peoples … Five watch", but `src/data/peoples.js` lists 12 kindreds and /peoples says "Twelve kindreds".

- [ ] **Step 1: Check the canon**

Consult the worldbuilding source docs (per CLAUDE.md):
```bash
ls "/Users/valerian/Desktop/V/DND/DM/ValRun/01_LORE/"
textutil -convert txt "/Users/valerian/Desktop/V/DND/DM/ValRun/01_LORE/<the peoples/races doc>.docx" -output /tmp/peoples-canon.txt
grep -icE "eleven|twelve|kindred" /tmp/peoples-canon.txt
```
Read the relevant section and determine the canonical count and scripture framing.

- [ ] **Step 2: Apply whichever fix canon supports**

If canon says **twelve** kindreds, in `src/pages/Home.jsx` replace:

```jsx
    title: "The Eleven Kindreds",
    body: "Six peoples are remembered in scripture. Five watch from the edges of recorded history.",
```

with:

```jsx
    title: "The Twelve Kindreds",
    body: "Six peoples are remembered in scripture. Six watch from the edges of recorded history.",
```

If canon genuinely distinguishes eleven kindreds + one outsider (or similar), instead align the /peoples lede in `src/pages/Peoples.jsx` and leave Home — and note the reasoning in the commit message. **If the canon docs are ambiguous, stop and ask the user.**

- [ ] **Step 3: Lint, build, commit**

```bash
npm run lint && npm run build
git add src/pages/Home.jsx src/pages/Peoples.jsx
git commit -m "fix: align kindred count between Home and Peoples with canon"
```

---

## Phase 2 — Performance

### Task 9: Self-host fonts (kills render-blocking chain + GDPR exposure)

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `src/main.jsx`
- Modify: `src/styles/theme.css:7`
- Modify: `vercel.json` (tighten CSP)

- [ ] **Step 1: Install the font packages**

```bash
npm install @fontsource/cormorant-garamond @fontsource/inter @fontsource/im-fell-english-sc
```

- [ ] **Step 2: Import the exact weights currently loaded from Google**

In `src/main.jsx`, replace:

```jsx
import "./styles/theme.css";
```

with:

```jsx
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/im-fell-english-sc/400.css";
import "./styles/theme.css";
```

- [ ] **Step 3: Remove the Google @import**

In `src/styles/theme.css`, delete line 7:

```css
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=IM+Fell+English+SC&display=swap");
```

- [ ] **Step 4: Tighten the CSP**

In `vercel.json`, replace the Content-Security-Policy value with:

```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
```

- [ ] **Step 5: Verify fonts render and no external requests remain**

```bash
grep -rn "fonts.googleapis\|fonts.gstatic" src/ index.html vercel.json ; echo "exit=$?"
```
Expected: `exit=1` (no matches). Then `npm run dev` and visually confirm Cormorant Garamond headlines, IM Fell small-caps eyebrows, Inter body (compare against production). Check the network tab: font files served from `/assets/` or `/node_modules/.vite`, none from Google.

- [ ] **Step 6: Lint, build, commit**

```bash
npm run lint && npm run build
git add package.json package-lock.json src/main.jsx src/styles/theme.css vercel.json
git commit -m "perf: self-host fonts via @fontsource, drop Google Fonts and tighten CSP"
```

---

### Task 10: Optimize images + proper favicon

**Files:**
- Create: `scripts/optimize-images.mjs`
- Modify: `package.json` (devDependency + script)
- Modify: `index.html:5` (favicon link)
- Modify: `src/components/Layout.jsx:42` (header logo src)
- Create (generated): `public/favicon-64.png`, `public/valrun-tree-160.png`

~3MB of hero JPEGs + 1.6MB map + a 510KB PNG used as both favicon and 36px logo.

- [ ] **Step 1: Install sharp (dev-only)**

```bash
npm install -D sharp
```

- [ ] **Step 2: Create `scripts/optimize-images.mjs`**

```js
/* One-off image optimizer: recompresses public JPEGs in place (mozjpeg,
 * progressive) and emits small favicon/logo PNGs from valrun-tree.png.
 * Run: node scripts/optimize-images.mjs */
import sharp from "sharp";
import { readdir, stat, rename } from "node:fs/promises";
import path from "node:path";

const JPEG_DIRS = ["public/hero", "public/peoples"];
const SINGLE_JPEGS = ["public/map.jpg"];

async function recompress(file) {
  const before = (await stat(file)).size;
  const tmp = file + ".tmp";
  await sharp(file).jpeg({ quality: 72, progressive: true, mozjpeg: true }).toFile(tmp);
  const after = (await stat(tmp)).size;
  if (after < before * 0.95) {
    await rename(tmp, file);
    console.log(`${file}: ${(before / 1024) | 0}KB -> ${(after / 1024) | 0}KB`);
  } else {
    const { unlink } = await import("node:fs/promises");
    await unlink(tmp);
    console.log(`${file}: kept original (${(before / 1024) | 0}KB)`);
  }
}

for (const dir of JPEG_DIRS) {
  for (const f of await readdir(dir)) {
    if (f.endsWith(".jpg")) await recompress(path.join(dir, f));
  }
}
for (const f of SINGLE_JPEGS) await recompress(f);

await sharp("public/valrun-tree.png").resize(64, 64).png().toFile("public/favicon-64.png");
await sharp("public/valrun-tree.png").resize(160, 160).png().toFile("public/valrun-tree-160.png");
console.log("favicon-64.png and valrun-tree-160.png written");
```

- [ ] **Step 3: Add the npm script and run it**

In `package.json` `"scripts"`, add: `"optimize-images": "node scripts/optimize-images.mjs"`.

Run: `npm run optimize-images`
Expected: each hero JPEG drops to roughly 150–300KB, map.jpg to well under 1MB, two new PNGs created. Visually spot-check 2–3 images for quality (open `public/hero/01-frontispiece.jpg`).

- [ ] **Step 4: Point favicon and header logo at the small files**

In `index.html`, replace:
```html
    <link rel="icon" type="image/png" href="/valrun-tree.png" />
```
with:
```html
    <link rel="icon" type="image/png" href="/favicon-64.png" />
```

In `src/components/Layout.jsx`, replace:
```jsx
            <img
              src="/valrun-tree.png"
```
with:
```jsx
            <img
              src="/valrun-tree-160.png"
```

- [ ] **Step 5: Lint, build, commit**

```bash
npm run lint && npm run build
git add scripts/optimize-images.mjs package.json package-lock.json index.html src/components/Layout.jsx public/
git commit -m "perf: recompress hero/map/peoples images, add 64px favicon and 160px header logo"
```

---

### Task 11: Lazy-load Home chapter backgrounds (LCP stays eager)

**Files:**
- Modify: `src/pages/Home.jsx` (Chapter component)
- Modify: `src/pages/Home.module.css`

All five Home JPEGs load eagerly via CSS backgrounds. The frontispiece must stay eager (it's the LCP, now preloaded); the four chapter panels switch to native lazy `<img>`.

- [ ] **Step 1: Convert Chapter backgrounds to lazy images**

In `src/pages/Home.jsx`, replace the `Chapter` component's `<section>` opening and background with:

```jsx
function Chapter({ img, eyebrow, title, body, to, cta, align }) {
  const [ref, inView] = useInView(0.3);
  const alignClass =
    align === "right" ? styles.alignRight : align === "center" ? styles.alignCenter : styles.alignLeft;
  const vignetteClass =
    align === "right" ? styles.vignetteRight : align === "center" ? styles.vignetteCenter : styles.vignetteLeft;
  return (
    <section ref={ref} className={styles.chapter}>
      <img src={img} alt="" className={styles.chapterBg} loading="lazy" decoding="async" />
      <div className={`${styles.vignette} ${vignetteClass}`} />
      <div className={`${styles.chapterContent} ${alignClass} ${inView ? styles.visible : ""}`}>
        <div className={styles.romanWrap}>
          <span className={styles.roman}>{eyebrow}</span>
        </div>
        <h2 className={styles.chapterTitle}>{title}</h2>
        <p className={styles.chapterBody}>{body}</p>
        <Link to={to} className={styles.chapterLink}>
          {cta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
```

(Only the `style={{ backgroundImage }}` prop is removed and the `<img>` line added — everything else is unchanged.)

- [ ] **Step 2: Add the background-image class**

In `src/pages/Home.module.css`, after the `.frontispiece, .chapter { … }` block, add:

```css
/* chapter background as a real <img> so the browser can lazy-load it */
.chapterBg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

(`background-size/position` on `.chapter` become inert for chapters — harmless; the frontispiece still uses them.)

- [ ] **Step 3: Verify**

`npm run dev`, open the network tab, hard-reload Home **without scrolling**. Expected: `01-frontispiece.jpg` loads immediately; `02/03/04/05-*.jpg` only load as you scroll toward them (browser lookahead will fetch 1–2 early — that's correct behavior). Visually confirm panels look identical to before.

- [ ] **Step 4: Lint, build, commit**

```bash
npm run lint && npm run build
git add src/pages/Home.jsx src/pages/Home.module.css
git commit -m "perf: lazy-load Home chapter backgrounds, keep preloaded frontispiece eager"
```

---

### Task 12: Lazy portraits, `100svh`, and iOS-safe body background

**Files:**
- Modify: `src/components/TarotCard.jsx:47` (plate image)
- Modify: `src/styles/theme.css` (body background)
- Modify: `src/pages/Home.module.css:24`, `src/pages/Peoples.module.css:7`, `src/pages/Faith.module.css:7`, `src/pages/Factions.module.css:7`, `src/components/GeoMapStage.module.css:6,88`, `src/components/Layout.module.css:4`

- [ ] **Step 1: Lazy-load tarot plate portraits with intrinsic size**

In `src/components/TarotCard.jsx`, replace:

```jsx
              <img src={image} alt="" className={styles.plateImage} />
```

with:

```jsx
              <img
                src={image}
                alt=""
                className={styles.plateImage}
                loading="lazy"
                decoding="async"
                width="600"
                height="600"
              />
```

- [ ] **Step 2: Replace `100vh` with `100svh` (with fallback)**

CSS `svh` is supported by all evergreen browsers; keep the `vh` line first as fallback. Apply this two-line pattern at each location:

`src/pages/Home.module.css` — in `.frontispiece, .chapter`:
```css
  min-height: 100vh;
  min-height: 100svh;
```

`src/pages/Peoples.module.css` `.tarotWrap`, `src/pages/Faith.module.css` `.tarotWrap`, `src/pages/Factions.module.css` `.tarotWrap` — same pattern:
```css
  min-height: 100vh;
  min-height: 100svh;
```

`src/components/GeoMapStage.module.css` — line 6 (`height: 100vh;`):
```css
  height: 100vh;
  height: 100svh;
```
and line 88 (`height: 50vh;` in the mobile block):
```css
    height: 50vh;
    height: 50svh;
```

`src/components/Layout.module.css` `.shell`:
```css
  min-height: 100vh;
  min-height: 100svh;
```

(`src/components/Page.module.css` also has two `min-height: 100vh` in dead variants — skip; the redesign plan deletes them.)

- [ ] **Step 3: iOS-safe body wash (drop `background-attachment: fixed`)**

In `src/styles/theme.css`, replace the `body` block's background lines:

```css
  min-height: 100vh;
  /* faint vellum-grain wash */
  background-image:
    radial-gradient(ellipse at top, rgba(181, 138, 58, 0.04), transparent 60%),
    radial-gradient(ellipse at bottom, rgba(138, 42, 42, 0.03), transparent 60%);
  background-attachment: fixed;
}
```

with:

```css
  min-height: 100vh;
  min-height: 100svh;
}

/* faint vellum-grain wash — fixed layer instead of background-attachment:
 * fixed, which iOS Safari does not support */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    radial-gradient(ellipse at top, rgba(181, 138, 58, 0.04), transparent 60%),
    radial-gradient(ellipse at bottom, rgba(138, 42, 42, 0.03), transparent 60%);
}
```

- [ ] **Step 4: Verify**

`npm run dev` — confirm the page background wash still shows (subtle gold tint at top), panels still fill the viewport, map stage unchanged. If chrome-devtools MCP is available, emulate iPhone dimensions and scroll Home + Geography.

- [ ] **Step 5: Lint, build, commit**

```bash
npm run lint && npm run build
git add src/components/TarotCard.jsx src/styles/theme.css src/pages/*.module.css src/components/GeoMapStage.module.css src/components/Layout.module.css
git commit -m "perf: lazy portraits, svh viewport units, iOS-safe fixed background wash"
```

---

## Phase 3 — Accessibility

### Task 13: TarotCard — real button, content exposed to screen readers

**Files:**
- Modify: `src/components/TarotCard.jsx`
- Modify: `src/components/TarotCard.module.css`
- Modify: `src/styles/theme.css` (add `.visually-hidden` utility)

`role="button"` + `aria-label` on the `<article>` makes all card content presentational — screen readers hear only the label, never the name styling or description. Replace with a real overlay `<button>` and `aria-hidden` face toggling.

- [ ] **Step 1: Add the visually-hidden utility to theme.css**

Append to `src/styles/theme.css`:

```css
/* screen-reader-only text */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 2: Restructure TarotCard.jsx**

Replace the full contents of `src/components/TarotCard.jsx` with:

```jsx
import { useState } from "react";
import styles from "./TarotCard.module.css";

function Corners() {
  return (
    <>
      <div className={styles.cornerTL} aria-hidden="true" />
      <div className={styles.cornerTR} aria-hidden="true" />
      <div className={styles.cornerBL} aria-hidden="true" />
      <div className={styles.cornerBR} aria-hidden="true" />
    </>
  );
}

/* TarotCard — the Peoples-style flippable card.
 * Used by /peoples, /faith, /factions.
 * Props:
 *   name        — visible on both faces
 *   description — visible on the back face when flipped
 *   image       — optional portrait shown inside the plate;
 *                 falls back to the first letter of name in gold */
export default function TarotCard({ name, description, image }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((v) => !v);
  return (
    <article className={`${styles.card} ${flipped ? styles.flipped : ""}`}>
      <div className={styles.cardInner}>
        <div className={styles.cardFace} aria-hidden={flipped}>
          <Corners />
          <h2 className={styles.cardName}>{name}</h2>
          <div className={styles.cardRule} aria-hidden="true"><span>◆</span></div>
          <div className={styles.plate} aria-hidden="true">
            {image ? (
              <img
                src={image}
                alt=""
                className={styles.plateImage}
                loading="lazy"
                decoding="async"
                width="600"
                height="600"
              />
            ) : (
              <span className={styles.plateMark}>{name.charAt(0)}</span>
            )}
          </div>
          <div className={styles.flipHint} aria-hidden="true">turn the card ↻</div>
        </div>

        <div className={`${styles.cardFace} ${styles.cardBack}`} aria-hidden={!flipped}>
          <Corners />
          <h2 className={styles.cardNameBack}>{name}</h2>
          <div className={styles.cardRule} aria-hidden="true"><span>◆</span></div>
          <p className={styles.cardDesc}>{description}</p>
          <div className={styles.flipHint} aria-hidden="true">turn back ↻</div>
        </div>
      </div>
      <button
        type="button"
        className={styles.flipControl}
        onClick={toggle}
        aria-expanded={flipped}
      >
        <span className="visually-hidden">
          {flipped ? `Turn the ${name} card back` : `Turn the ${name} card to read its tale`}
        </span>
      </button>
    </article>
  );
}
```

(If Task 3 already simplified line 41, this replacement subsumes it.)

- [ ] **Step 3: Update TarotCard.module.css**

Remove `cursor: pointer;` and the `.card:focus-visible` block from `.card`. Replace:

```css
.card:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 6px;
}
```

with:

```css
/* invisible full-card flip control — the real interactive element */
.flipControl {
  position: absolute;
  inset: 0;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 1;
}

.flipControl:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 6px;
}
```

And in the `.card` rule itself, delete the `cursor: pointer;` line.

- [ ] **Step 4: Make the flip hint legible**

In `src/components/TarotCard.module.css`, in `.flipHint` replace:

```css
  font-size: 0.58rem;
  letter-spacing: 0.3em;
  color: var(--vellum-mute);
```

with:

```css
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  color: var(--vellum-dim);
```

- [ ] **Step 5: Verify**

`npm run dev` → /peoples. Tab to a card: focus ring appears; Enter flips it; the flip behaves exactly as before on click. With VoiceOver (Cmd+F5): card announces "Turn the Humans card to read its tale, button"; after flipping, the description text is readable.

- [ ] **Step 6: Lint, build, commit**

```bash
npm run lint && npm run build
git add src/components/TarotCard.jsx src/components/TarotCard.module.css src/styles/theme.css
git commit -m "a11y: real flip button on tarot cards, expose card content to screen readers"
```

---

### Task 14: Geography/History entries — buttons inside articles, not button-articles

**Files:**
- Modify: `src/pages/Geography.jsx` (Entry component)
- Modify: `src/pages/Geography.module.css`
- Modify: `src/pages/History.jsx` (AgeEntry component)
- Modify: `src/pages/History.module.css`

`role="button"` on an `<article>` wrapping headings/paragraphs makes the content presentational and the heading hierarchy invisible. Keep whole-card click for pointers; move keyboard/AT interaction to a real button on the heading.

- [ ] **Step 1: Geography Entry**

In `src/pages/Geography.jsx`, replace the `Entry` component's return with:

```jsx
  return (
    <article
      ref={ref}
      className={`${styles.entry} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

      <h3 className={styles.name}>
        <button
          type="button"
          className={styles.nameButton}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          aria-current={isActive ? "true" : undefined}
        >
          {place.name}
        </button>
      </h3>
      {place.label && <div className={styles.label}>{place.label}</div>}
      <div className={styles.body}>{place.body}</div>
    </article>
  );
```

(Removes `role`, `tabIndex`, `onKeyDown`, `aria-current` from the article.)

- [ ] **Step 2: Geography CSS — name button + visible focus**

Append to `src/pages/Geography.module.css`:

```css
/* the real interactive element inside each entry */
.nameButton {
  all: unset;
  cursor: pointer;
  font: inherit;
  color: inherit;
}

.nameButton:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 4px;
}
```

- [ ] **Step 3: History AgeEntry — same pattern**

In `src/pages/History.jsx`, replace the `AgeEntry` return with:

```jsx
  return (
    <article
      ref={ref}
      className={`${styles.entry} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      <div className={styles.numeralCell}>
        <span className={styles.numeral} aria-hidden="true">{age.roman}</span>
      </div>
      <span className={styles.marker} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.era}>{age.era}</div>
        <h2 className={styles.title}>
          <button
            type="button"
            className={styles.titleButton}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            aria-current={isActive ? "true" : undefined}
          >
            {age.title}
          </button>
        </h2>
        <div className={styles.body}>{age.body}</div>
      </div>
    </article>
  );
```

- [ ] **Step 4: History CSS**

Append to `src/pages/History.module.css`:

```css
/* the real interactive element inside each age entry */
.titleButton {
  all: unset;
  cursor: pointer;
  font: inherit;
  color: inherit;
}

.titleButton:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 4px;
}
```

- [ ] **Step 5: Verify**

`npm run dev` → /geography: Tab moves between place names with a visible gold focus ring; Enter pans the map; clicking anywhere on a card still works. Same on /history.

- [ ] **Step 6: Lint, build, commit**

```bash
npm run lint && npm run build
git add src/pages/Geography.jsx src/pages/Geography.module.css src/pages/History.jsx src/pages/History.module.css
git commit -m "a11y: real buttons inside geography/history entries instead of role=button articles"
```

---

### Task 15: Contrast fixes

**Files:**
- Modify: `src/styles/theme.css:16`
- Modify: `src/pages/History.module.css:114,130`

`--vellum-mute` (#7a7461) is 4.08:1 on `--ink` — below the 4.5:1 minimum for the small text it's used on. History's dimmed entries drop further below.

- [ ] **Step 1: Lighten --vellum-mute**

In `src/styles/theme.css`, replace:

```css
  --vellum-mute:#7a7461;   /* tertiary / meta */
```

with:

```css
  --vellum-mute:#8d8672;   /* tertiary / meta — 5.3:1 on --ink */
```

- [ ] **Step 2: Verify the ratio computationally**

```bash
node -e "
const lum = (hex) => { const c = [1,3,5].map(i=>parseInt(hex.substr(i,2),16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4); return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]; };
const ratio = (a,b) => { const [l1,l2]=[lum(a),lum(b)].sort((x,y)=>y-x); return ((l1+0.05)/(l2+0.05)).toFixed(2); };
console.log('vellum-mute on ink:', ratio('#8d8672','#0e1014'));
"
```
Expected: prints a value ≥ 4.5 (≈5.3).

- [ ] **Step 3: Raise History's dimmed-entry floor**

In `src/pages/History.module.css` line 114, replace `opacity: 0.62;` (in the `.entry` rule) with `opacity: 0.78;`, and at line 130 replace the numeral color `rgba(181, 138, 58, 0.55)` with `rgba(181, 138, 58, 0.75)`. (If exact line numbers have drifted, locate the `.entry { opacity: … }` rule and the inactive `.numeral` color.)

- [ ] **Step 4: Visual check, lint, build, commit**

`npm run dev` → confirm eyebrows/meta text are still clearly "muted" relative to body text but readable; History inactive entries still recede but are legible.

```bash
npm run lint && npm run build
git add src/styles/theme.css src/pages/History.module.css
git commit -m "a11y: lift --vellum-mute and History dimmed entries above WCAG contrast minimums"
```

---

### Task 16: Reduced-motion smooth scroll + skip link

**Files:**
- Modify: `src/pages/Geography.jsx:31`, `src/pages/History.jsx:31` (scrollIntoView)
- Modify: `src/components/Layout.jsx`, `src/components/Layout.module.css` (skip link)

- [ ] **Step 1: Respect prefers-reduced-motion in JS scrolling**

In **both** `src/pages/Geography.jsx` and `src/pages/History.jsx`, replace:

```jsx
  const handleClick = () => {
    onActivate(index);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
```

with:

```jsx
  const handleClick = () => {
    onActivate(index);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  };
```

- [ ] **Step 2: Add a skip link to Layout**

In `src/components/Layout.jsx`, immediately after `<div className={styles.shell}>` add:

```jsx
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>
```

and change the `<main>` line to:

```jsx
      <main id="main" className={styles.main} tabIndex={-1}>
```

- [ ] **Step 3: Skip link CSS**

Append to `src/components/Layout.module.css`:

```css
/* keyboard-only skip link — visible on focus */
.skipLink {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  z-index: 20;
  background: var(--ink-soft);
  color: var(--gold);
  border: 1px solid var(--gold);
  padding: var(--space-2) var(--space-4);
  font-family: var(--smcap);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.skipLink:focus {
  top: var(--space-2);
}
```

- [ ] **Step 4: Verify**

`npm run dev`, press Tab on a fresh load: "Skip to content" appears top-left; Enter jumps focus to `<main>`. Geography/History click-scroll still smooth (unless OS reduce-motion is on).

- [ ] **Step 5: Lint, build, commit**

```bash
npm run lint && npm run build
git add src/pages/Geography.jsx src/pages/History.jsx src/components/Layout.jsx src/components/Layout.module.css
git commit -m "a11y: reduced-motion-aware scrolling and skip-to-content link"
```

---

## Final verification (after all tasks)

- [ ] `npm run lint && npm run build` — clean.
- [ ] `npm run preview` + browser pass over all six routes + a bogus URL (NotFound), desktop and mobile width.
- [ ] Push, then on the deployed URL re-run the header checks from Task 7 Step 3 and the share-card check from Task 5.
- [ ] Confirm Lighthouse (chrome-devtools `lighthouse_audit` if available): Performance and Accessibility both should rise materially vs. baseline.
