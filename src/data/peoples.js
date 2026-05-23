/* Shared canonical list of the Peoples of Val'Run.
 * To add a portrait to a kindred's plate, drop the image into
 * /public/peoples/ (e.g. /public/peoples/humans.jpg) and add
 * `image: "/peoples/humans.jpg"` to the entry below. If absent,
 * the plate falls back to the initial letter in gold serif. */
export const PEOPLES = [
  { name: "Humans",   image: "/peoples/humans.jpg",   desc: "Dominant in Verdure (with dwarves) and Sarudar (with orcs). The weakest natural magic of any sentient race — a limitation that drove Verdure's technological compensation." },
  { name: "Elves",    image: "/peoples/elves.jpg",    desc: "Long-lived bloodline mages of Twiland (500–700 years). Their final century, the Dimming, is a rapid decline that shapes their politics of urgency." },
  { name: "Dwarves",  image: "/peoples/dwarves.jpg",  desc: "Short, dense, magic-poor, fiercely proud of their non-magical engineering. Chiefly Durumbar and Grimgar." },
  { name: "Orcs",     image: "/peoples/orcs.jpg",     desc: "Broad, sandstorm-adapted, lifespan 80–120. Shamanic magic channeled through movement and chant rather than incantation alone." },
  { name: "Fauns",    image: "/peoples/fauns.jpg",    desc: "Above the waist human, below either deer (Twiland) or goat (Sarudar). Music-based magic: a drummed war-rhythm sharpens reflexes, a healing song closes wounds." },
  { name: "Centaurs", image: "/peoples/centaurs.jpg", desc: "Twiland only. Warriors and protectors of sacred sites, uniquely sensitive to currents in the Aetherflow." },
  { name: "Gnolls",   image: "/peoples/gnolls.jpg",   desc: "Hyena-headed, short-lived (50–70), pragmatic and present-focused. Loose Sarudar packs, often caravan guards." },
  { name: "Velorath", image: "/peoples/velorath.jpg", desc: "Stone-singers of the deep beneath the Frostcrown Ridges. Gaunt, six-fingered, near-blind to light, sensing through vibration. Possibly the oldest sentient race on the continent." },
  { name: "Ashborn",  image: "/peoples/ashborn.jpg",  desc: "Cinder Island survivors mutated by Aetheric exposure. Charcoal-skinned, bioluminescent at the cracks, body temperature ~55°C; lifespan 40–60. When they die, their bodies solidify into black stone in their final posture." },
  { name: "Thalvari", image: "/peoples/thalvari.jpg", desc: "Amphibious humanoids of the deep Serene Sea. Bioluminescent markings unique to each individual. Their largest known settlement, Corathel, is lost somewhere beyond the Gyre." },
  { name: "Pethryn",  image: "/peoples/pethryn.jpg",  desc: "Living petrified wood. Born when the Aetheric Anchor's first activation petrified the forest around 200 BI. Chemical root communication — a message across the Petrified Forest takes a full day." },
  { name: "Sketh",    image: "/peoples/sketh.jpg",    desc: "Bipedal lizard-folk of Sarudar. Memory-keepers who imprint thought directly into stone. Guard the Zelkaris ruins, waiting for someone they have not yet seen." },
];
