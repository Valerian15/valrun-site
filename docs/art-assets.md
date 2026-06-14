# Val'Run — Art Asset Checklist

Every image the site uses or could use. `map.jpg` (Geography) is intentionally excluded.
Run `npm run optimize-images` after adding/replacing any JPEG/PNG in `public/`.

Legend: ✅ have art · ⬜ slot empty (needs art) · ◻️ optional

---

## A. Have art today (19) — replace/upgrade as desired

### Hero / cinematic — 6 · **1920×1080 JPEG, 16:9 landscape**
Each is reused 3–4× across the site, so these are the highest-impact images.

- ✅ `public/hero/01-frontispiece.jpg` — the Gyre at dusk · Home opener · History late-age backdrop · source of the OG share card
- ✅ `public/hero/02-the-breaking.jpg` — the meteor strike · Home panel · History hero · History early-age backdrop
- ✅ `public/hero/03-aetherflow.jpg` — the Architect's Breath · Home panel · Faith hero + page background
- ✅ `public/hero/04-continent.jpg` — continent of four faces · Home panel · Factions hero + page background
- ✅ `public/hero/05-peoples.jpg` — the peoples · Home panel · Peoples hero + page background
- ✅ `public/hero/06-the-crack.jpg` — the sunken crack · 404 page · History mid-age backdrop

### Peoples portraits — 12 · **square ≥600×600 (portrait ~720×1000 frames the tall card better); face upper-center**
Displayed full-bleed as the card face.

- ✅ humans · elves · dwarves · orcs · fauns · centaurs · gnolls · velorath · ashborn · thalvari · pethryn · sketh
  (`public/peoples/<name>.jpg`)

### Brand — 1 · **square transparent PNG ≥512×512**
- ✅ the gold tree logo → currently `valrun-tree-160.png` (header), `favicon-64.png`, `apple-touch-icon.png` all derive from it. Supply one ≥512px master and regenerate the smaller sizes.

### Auto-generated (no new art)
- `public/og-image.jpg` — 1200×630, built from `01-frontispiece.jpg` + title/tagline overlay.

---

## B. Open slots — cards that currently show only the gold initial letter

**Recommended treatment: sigil / emblem / crest** (gold line-art on the dark plate), NOT full portraits — except optionally the Nine deities.
Requires a small `sigil` prop added to `TarotCard` (centered-on-plate variant). Full-bleed illustrations work in the current code; sigils do not yet.

### Faith — the Nine deities — 9 ⬜ · sigil **or** portrait
- ⬜ Lumina (Shimmering Veil — stars/light) · ⬜ Terron (Stoneheart — earth) · ⬜ Reyron (Flame Warden — fire/forge) · ⬜ Maris (Tide Whisperer — water) · ⬜ Aerel (Sky Dancer — wind) · ⬜ Cavale (Forest Sentinel — **symbol: Shimmer Stag**) · ⬜ Vitalis (Life Stream — healing) · ⬜ Mystria (Arcane Conduit — magic) · ⬜ Luna (Shadow Veil — night)

### Faith — temples — 6 ◻️ (optional; read fine as text)
- ◻️ Cathedral of the Architect · ◻️ Hall of the First Stone · ◻️ Sanctum of Roots · ◻️ Tide Chapels · ◻️ Sand Circles · ◻️ Stone of Speaking

### Factions — crests/sigils — 30 ⬜ (heraldic, not portraits)
- **Sovereign Powers (8):** Council of Five · Kingdom of Rhystara · Kingdom of Eryndor · Durumbar · Grimgar · Council of Concord · Brabrar Confederacy · Black Bastion
- **Guilds & Commerce (3):** Gilded Consortium · Verduran Artificer's Guild · Ironspire League
- **The Underworld (6):** Black Serpents · Silent Daggers · Bastion Thieves · Crimson Tide · Pallid Sails · Bonepickers
- **Arms (5):** Crimson Wardens · Iron Blades · Everpeak's Vanguard (**phoenix-and-gear sigil**) · Twilight Wardens · Sandriders
- **Orders & Schools (8):** Order of the Maker · Order of the Veil · Order of the Green · Rootspeakers · Tidecallers · Ash Priests · Inquisitors of the Dawn · Collegium of the Fracture

### History — the Seven Ages — 7 ◻️ (optional; pages currently share the 3 hero backdrops)
- ◻️ one small illustration per age (the First Age → Seventh Age)

---

## Totals
- **Have:** 19 (6 heroes + 12 portraits + 1 logo)
- **Open (recommended):** 9 deity + 30 faction sigils = **39**
- **Optional:** 6 temples + 7 ages = 13

## Notes
- Symbol/sigil hints already in the lore: Cavale → Shimmer Stag; Everpeak's Vanguard → phoenix-and-gear. Richer canon (symbols, colors, heraldry) lives in `/Users/valerian/BRAIN/30-projects/valrun/`.
- Before building the sigil slots, decide the style: gold inline-SVG line-art (cohesive, scalable, cheap) vs raster emblems. SVG matches the existing corner-bracket / diamond ornament language.
