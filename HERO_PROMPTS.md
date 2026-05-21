# Hero image prompts — Val'Run cinematic homepage

The new homepage is a long parallax scroll. Each chapter is a full-viewport panel with a single full-bleed image behind a short evocative passage. Six images total.

## How to use this file

1. For each chapter below, copy the **Prompt** block into ChatGPT (GPT-4o, "create image" — uses DALL·E 3). Or any other tool you prefer (Midjourney, Firefly, Stable Diffusion).
2. **Aspect ratio: 16:9 landscape, all six images.** Specifics by tool:
   - **ChatGPT / DALL·E 3** — pick "wide" → outputs **1792 × 1024**.
   - **Midjourney** — add `--ar 16:9` (e.g. `/imagine prompt: ... --ar 16:9 --v 6`).
   - **Adobe Firefly** — set aspect ratio to **Widescreen (16:9)**.
   - **Stable Diffusion** — **1920 × 1080** or **1536 × 864**.
3. Save each result under exactly the filename listed (e.g. `01-frontispiece.jpg`).
4. Drop all the files into [public/hero/](public/hero/).
5. Tell me when done and I'll wire them into the cinematic homepage.

If a generation doesn't feel right, regenerate. Don't worry about getting it perfect — these are *mood* images, slightly blurred and vignetted behind text. Atmosphere > sharpness. The images will be served full-width, so 1792 × 1024 (or larger 16:9) is the right minimum — anything smaller will look soft on retina displays.

---

## 01 — Frontispiece (the world)

**Filename:** `public/hero/01-frontispiece.jpg`
**Aspect ratio:** 16:9 (1792 × 1024 in ChatGPT — pick "wide")
**Goal:** The opening image. Atmospheric establishing shot. Sets the tone for the whole site. Mysterious, ancient, a little ominous, but beautiful.

**Prompt:**

> A cinematic, painterly fantasy landscape: a vast inland sea at twilight, seen from a high cliff. In the far distance, a colossal slow whirlpool dominates the horizon, its surface glowing faintly with a sickly bluish-gold light. Storm clouds churn above it. To the left, snow-capped mountain ranges; to the right, faint silhouettes of forested coast and a desert beyond. The sky is deep blue-violet shading to ember-orange at the horizon. The mood is hushed, vast, ancient — a world watching itself break, in slow motion. No characters. No text. Style: oil-painted concept art, the feel of John Howe or Alan Lee, soft focus, deep contrast, faint vellum-grain texture.

---

## 02 — The Breaking (Year 0)

**Filename:** `public/hero/02-the-breaking.jpg`
**Aspect ratio:** 16:9 (1792 × 1024 in ChatGPT — pick "wide")
**Goal:** The world's defining event — the meteor that struck Cinder Island and buried the Aetheric Anchor. Catastrophic, beautiful, fixed in time.

**Prompt:**

> A photorealistic cinematic painting of an enormous meteor mid-impact, striking the center of a luminous arcane city built on a volcanic island. The meteor is white-hot, trailing fire across a violet evening sky. The city's tall crystal spires and stepped marble plazas are mid-shatter — debris and shockwave radiating outward. In the foreground, dark ocean rocks and breaking surf. The light is apocalyptic: deep blacks, brilliant whites, copper and ember oranges, with sickly green-blue secondary glow from the city's exposed magical core. No human figures visible. Aspect ratio 16:9. Painterly cinematic, the feel of a Dune or Lord of the Rings establishing shot.

---

## 03 — The Aetherflow (magic, the Architect's breath)

**Filename:** `public/hero/03-aetherflow.jpg`
**Aspect ratio:** 16:9 (1792 × 1024 in ChatGPT — pick "wide")
**Goal:** The world's underlying force. Abstract, beautiful, slightly otherworldly. Not "wizards casting" — the Aether itself as a phenomenon.

**Prompt:**

> A cinematic close-up of magical air: shimmering strands of pale gold and aquamarine light flowing like wind-currents through a dim cathedral-like space made of dark polished stone. The light moves like silk underwater, branching and re-merging, with thousands of tiny particles drifting along the streams. A single shaft of moonlight cuts through the upper darkness. The atmosphere is sacred, hushed, and slightly alien — the feeling of standing inside the bloodstream of a god. No characters, no faces. Painterly fantasy realism, deep blacks, luminous teals and golds. Aspect ratio 16:9.

---

## 04 — The Continent of Four Faces

**Filename:** `public/hero/04-continent.jpg`
**Aspect ratio:** 16:9 (1792 × 1024 in ChatGPT — pick "wide")
**Goal:** Sweeping landscape suggesting the variety of the world — forest, mountain, desert, volcano — all together. A "behold the land" panel.

**Prompt:**

> A painterly cinematic landscape from a high aerial vantage: in the foreground, dark evergreen forests and a paved stone road threading through alpine meadows toward distant snow-capped mountains. Mid-distance to the right, a vast desert of gold dunes meeting the forest's edge with a sharp transition. Far left horizon, a glowing bioluminescent forest where the trees emit a soft cyan light. Far center horizon, a single volcanic island silhouetted on a calm sea, smoke rising from its peak. The sky is broad, late-afternoon golden-amber with high cirrus. No characters, no figures. The mood is reverent — a world worth knowing. Painterly fantasy concept art, 16:9, the feel of a Studio Ghibli matte painting crossed with classical landscape oils.

---

## 05 — The Peoples

**Filename:** `public/hero/05-peoples.jpg`
**Aspect ratio:** 16:9 (1792 × 1024 in ChatGPT — pick "wide")
**Goal:** A sense of culture, presence, kindreds — without any single character dominating. Lived-in, atmospheric, not a portrait.

**Prompt:**

> A cinematic painterly scene at dusk inside a vast open marketplace beneath a colossal bioluminescent tree, its trailing branches glowing pale green-blue overhead. Lantern-lit stalls, intricately carved wooden architecture, smoke from braziers, hanging silk banners in deep reds and indigos. In the soft-focus middle distance, the silhouettes of many figures of mixed heights and proportions — some tall and slender, some short and broad, some with horns or hooved legs — none individually distinct, all part of a flowing crowd. The lighting is warm amber and cool teal, with mist softening the depths. No close-up faces. The mood is convivial but mysterious, festive but ancient. Painterly fantasy realism, 16:9.

---

## 06 — The Crack Beneath (present danger)

**Filename:** `public/hero/06-the-crack.jpg`
**Aspect ratio:** 16:9 (1792 × 1024 in ChatGPT — pick "wide")
**Goal:** The present-day undercurrent. The cracking Anchor, the widening Gyre, the warning none of the powers can yet hear. Ominous, beautiful, not screaming "danger" — whispering it.

**Prompt:**

> A cinematic underwater painting: deep dark ocean, with a vast cracked spire of luminous blue-white crystal embedded in the seabed and rising upward into murky shadow above. The spire is fractured along its length, hairline cracks leaking pale gold-green light into the surrounding water. Suspended particles, debris, faint silhouettes of forgotten ruined architecture half-buried in silt around its base. Slow currents, soft caustics from a distant surface. No fish, no figures. The mood is silent, ancient, and quietly catastrophic — a wound that has been bleeding for a thousand years. Painterly fantasy realism, deep teals, blacks, and luminous bone-white highlights. 16:9.

---

## Once images are ready

When you have all six (or as many as you've generated — I can wire up partial sets and CSS-placeholder the rest):

- Confirm they're saved at the exact paths listed above (`public/hero/01-frontispiece.jpg` etc).
- Tell me, and I'll build the cinematic parallax homepage referencing those files.

If you regenerate a chapter later, just overwrite the file — the site picks it up on next build.
