# Portrait prompts — the Twelve Peoples of Val'Run

Each card's circular "plate" can hold a portrait of the kindred. Run these in ChatGPT (GPT-4o "create image" — DALL·E 3), save each one under the exact filename listed, drop them into [public/peoples/](public/peoples/), then add an `image` line to the matching entry in [src/data/peoples.js](src/data/peoples.js).

---

## Aspect ratio & format

- **Square 1:1, 1024×1024** in all cases.
  - ChatGPT / DALL·E 3 — pick "square".
  - Midjourney — `--ar 1:1 --v 6`.
  - Stable Diffusion — `1024×1024` or `1536×1536`.
- The plate is a circle, so the center of the square crops in. Compose with the **face / head centered** and important details kept within the central ~80% of the frame — anything in the corners will be hidden.
- Save as **`.jpg`** (smaller files; transparency isn't needed).

## After you have the images

1. Drop the files into `public/peoples/` with the exact filenames below.
2. Open [src/data/peoples.js](src/data/peoples.js) and, for each kindred, add an `image:` field — for example:
   ```js
   { name: "Humans",   image: "/peoples/humans.jpg",   desc: "..." },
   ```
3. Commit + push. The plate will swap from the letter mark to the portrait automatically.

If you skip any kindred for now, that one just keeps the letter fallback — partial sets are fine.

---

## 01 — Humans

**Filename:** `public/peoples/humans.jpg`
**Aspect:** 1:1 square (1024×1024 in ChatGPT — pick "square")

**Prompt:**

> A square painterly cinematic portrait of a human of Val'Run — broadly Mediterranean mixed-heritage features, weathered by mountain winds and desert sun, tanned olive skin, dark eyes, simple linen-and-leather garment with a hint of bronze ornament at the collar. Calm, considered expression, gaze slightly off-camera. Background softly out of focus: snow-capped peaks dissolving into golden dunes at the horizon, warm rim light from the right. Style: oil-on-canvas brushwork, dramatic chiaroscuro, the feel of a Howe / Lee fantasy portrait. 1:1.

---

## 02 — Elves

**Filename:** `public/peoples/elves.jpg`
**Aspect:** 1:1 square

**Prompt:**

> A square painterly cinematic portrait of a Twiland elf of Val'Run — tall and slender, very pale luminous skin with a faint silvery-green undertone, long silver-platinum hair flowing past the shoulders, large almond eyes the color of moonlit water, gracefully elongated pointed ears, refined inhuman features. Wearing soft moss-toned ceremonial robes with delicate gold-thread embroidery along the collar. Serene, otherworldly expression with a hint of the ancient. Background: glowing bioluminescent forest canopy, cool cyan-blue ambient light filtering through leaves. Style: oil-on-canvas, painterly fantasy realism. 1:1.

---

## 03 — Dwarves

**Filename:** `public/peoples/dwarves.jpg`
**Aspect:** 1:1 square

**Prompt:**

> A square painterly cinematic portrait of a dwarf of Durumbar — stocky, broad-shouldered, weathered skin lit by warm forge-glow, full braided beard the color of iron-ore with bronze rings woven through, deep-set eyes that have seen mountain dark. Wearing soot-darkened leather and a chainmail collar with hammered iron runes. Patient, resolute expression. Background: dim forge interior, glowing embers and deep shadow. Style: oil-on-canvas, warm orange forge-glow lighting, painterly fantasy realism. 1:1.

---

## 04 — Orcs

**Filename:** `public/peoples/orcs.jpg`
**Aspect:** 1:1 square

**Prompt:**

> A square painterly cinematic portrait of a Sarudar orc of Val'Run — broad-jawed, dark olive-grey skin sand-weathered and sun-scarred, short worn tusks rising from the lower jaw, a nictitating membrane (translucent second eyelid) drawn halfway across one amber eye against sun-glare. Shaved scalp with tribal ochre marks across the forehead. Wearing rough hide and beaded leather, a single bone earring. Quiet ferocity in the expression. Background: golden dunes blurred by heat haze, dust in the air. Style: oil-on-canvas, painterly fantasy realism. 1:1.

---

## 05 — Fauns

**Filename:** `public/peoples/fauns.jpg`
**Aspect:** 1:1 square

**Prompt:**

> A square painterly cinematic portrait of a Twiland faun — upper body human with warm tawny skin and dark curly hair, two slender deer-like horns curving back from a band of small bone tines along the brow, pointed ears with soft fur tufts, faint freckling. Garment of woven leaves and tied vines, a small wooden hand-drum slung at one side. Curious, warm expression with a half-smile, gaze direct. Background: dappled sunlight through a forest glade, motes of pollen drifting. Style: oil-on-canvas, painterly fantasy realism, warm afternoon light. 1:1.

---

## 06 — Centaurs

**Filename:** `public/peoples/centaurs.jpg`
**Aspect:** 1:1 square

**Prompt:**

> A square painterly cinematic three-quarter portrait of a Twiland centaur — human torso noble in proportion with deep-bronze skin, long dark hair braided with silver thread, calm steady gaze. The lower body of a powerful hunter's horse visible in the lower half of the frame, midnight-coated with subtle dappled markings. Ceremonial wood-carved pendant on the chest, leather harness with brass fittings. Background: pillared forest in golden afternoon light, distant mist. Style: oil-on-canvas, painterly fantasy realism. 1:1.

---

## 07 — Gnolls

**Filename:** `public/peoples/gnolls.jpg`
**Aspect:** 1:1 square

**Prompt:**

> A square painterly cinematic portrait of a Sarudar gnoll — hyena-headed humanoid with spotted brown-tan fur, long muzzle, dark intelligent eyes, ear notches and a small scar across the brow from caravan-guard work. Wearing a vest of layered leather over the shoulders, beads and small bones strung around the neck, a curved knife at the belt. Slight grin showing teeth — pragmatic, watchful, not menacing. Background: desert evening sky, dust and amber light, distant silhouette of a caravan train. Style: oil-on-canvas, painterly fantasy realism. 1:1.

---

## 08 — Velorath

**Filename:** `public/peoples/velorath.jpg`
**Aspect:** 1:1 square

**Prompt:**

> A square painterly cinematic portrait of a Velorath — a gaunt eyeless humanoid of the deep stone beneath the Frostcrown Ridges. Smooth pale grey skin, sunken empty sockets where eyes would be, faintly translucent skin showing dark vein-paths beneath. Long graceful six-fingered hands raised near the face. Wearing a robe of resonance-tuned crystal threads that catch faint light. Faintly luminous mineral inlays trace the cheekbones. Listening expression, head slightly tilted as if hearing through the stone. Background: dark cavern with faint distant crystal glow, deep shadow. Style: oil-on-canvas, cold pale lighting, painterly fantasy realism. 1:1.

---

## 09 — Ashborn

**Filename:** `public/peoples/ashborn.jpg`
**Aspect:** 1:1 square

**Prompt:**

> A square painterly cinematic portrait of an Ashborn of Cinder Island — charcoal-grey skin like polished basalt, fine hairline cracks across the face glowing with a faint ember-orange inner light as if heat is leaking from within. White-grey hair pulled back severely. Eyes glowing softly red-gold. Wearing a dark high-collared robe with the Tharalyn family sigil pressed into volcanic-glass at the collar. Solemn, tired, dignified expression — they know they don't have long. Background: dark volcanic stone, faint embers drifting in the air, deep shadow. Style: oil-on-canvas, painterly fantasy realism, deep blacks and ember-glow lighting. 1:1.

---

## 10 — Thalvari

**Filename:** `public/peoples/thalvari.jpg`
**Aspect:** 1:1 square

**Prompt:**

> A square painterly cinematic portrait of a Thalvari — an amphibious humanoid of the deep Serene Sea. Smooth blue-grey skin, faint webbing visible between long fingers, gill-slits along the neck, large dark eyes adapted to abyssal depths, soft translucent fin-crests where ears would be. A unique constellation of bioluminescent pale-cyan markings traces the cheekbones and brow (every individual's marking is different). Wearing a translucent kelp-fiber wrap and pearl ornaments around the throat. Curious, careful expression. Background: dark underwater, distant light shafts from a far-above surface, suspended particles. Style: oil-on-canvas, painterly fantasy realism, cool deep-water lighting. 1:1.

---

## 11 — Pethryn

**Filename:** `public/peoples/pethryn.jpg`
**Aspect:** 1:1 square

**Prompt:**

> A square painterly cinematic portrait of a Pethryn — a humanoid-shaped being of living petrified wood. Body and face carved-looking, like ancient sun-bleached driftwood with hairline cracks revealing faint forest-green sap-light glowing softly beneath. Mossy growth at the temples and along the collarbones. No conventional eyes — instead, two deep knot-hollows that glow with a slow, deep forest-green. Patterns of wood-grain visible across the cheeks. Still, ancient, patient expression — as if it has not moved in a hundred years. Background: the Petrified Forest, stone trees at twilight, soft mist. Style: oil-on-canvas, painterly fantasy realism. 1:1.

---

## 12 — Sketh

**Filename:** `public/peoples/sketh.jpg`
**Aspect:** 1:1 square

**Prompt:**

> A square painterly cinematic portrait of a Sketh — a bipedal lizard-folk of Sarudar. Sleek scaled head in deep sandstone-tan and ochre, narrow vertical-slit-pupil amber eyes, small dorsal frills behind the jaw, faint rune-scoring along one temple as if memory has been carved into the scales. Wearing a draped linen wrap held with a copper clasp shaped like a Zelkaris memory-stone glyph. Quietly watchful expression — they have been waiting a long time for someone they have not yet seen. Background: red-stone Sarudar canyon walls, late afternoon, warm sand-gold light. Style: oil-on-canvas, painterly fantasy realism. 1:1.

---

## Tips

- DALL·E 3 sometimes regenerates a face that doesn't quite match the description. Regenerate or ask ChatGPT to "redo the portrait keeping the same composition but ___" to iterate.
- The center of the image is what shows on the card. If a portrait feels off-center after cropping, swap the file and the site picks it up on next build.
- Aim for **same lighting direction** across all 12 portraits if you want them to feel like a single set — warm rim light from the upper right is a safe default. (Each prompt above has its own atmospheric cue, but you can override with "lit from the upper right" appended.)
