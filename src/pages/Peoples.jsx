import { Page, Section, NamedList, Flourish } from "../components/Page.jsx";

const PEOPLES = [
  { name: "Humans",   desc: "Dominant in Verdure (with dwarves) and Sarudar (with orcs). The weakest natural magic of any sentient race — a limitation that drove Verdure's technological compensation." },
  { name: "Elves",    desc: "Long-lived bloodline mages of Twiland (500–700 years). Their final century, the Dimming, is a rapid decline that shapes their politics of urgency." },
  { name: "Dwarves",  desc: "Short, dense, magic-poor, fiercely proud of their non-magical engineering. Chiefly Durumbar and Grimgar." },
  { name: "Orcs",     desc: "Broad, sandstorm-adapted, lifespan 80–120. Shamanic magic channeled through movement and chant rather than incantation alone." },
  { name: "Fauns",    desc: "Above the waist human, below either deer (Twiland) or goat (Sarudar). Music-based magic: a drummed war-rhythm sharpens reflexes, a healing song closes wounds." },
  { name: "Centaurs", desc: "Twiland only. Warriors and protectors of sacred sites, uniquely sensitive to currents in the Aetherflow." },
  { name: "Gnolls",   desc: "Hyena-headed, short-lived (50–70), pragmatic and present-focused. Loose Sarudar packs, often caravan guards." },
  { name: "Velorath", desc: "Stone-singers of the deep beneath the Frostcrown Ridges. Gaunt, six-fingered, near-blind to light, sensing through vibration. Possibly the oldest sentient race on the continent." },
  { name: "Ashborn",  desc: "Cinder Island survivors mutated by Aetheric exposure. Charcoal-skinned, bioluminescent at the cracks, body temperature ~55°C; lifespan 40–60. When they die, their bodies solidify into black stone in their final posture." },
  { name: "Thalvari", desc: "Amphibious humanoids of the deep Serene Sea. Bioluminescent markings unique to each individual. Their largest known settlement, Corathel, is lost somewhere beyond the Gyre." },
  { name: "Pethryn",  desc: "Living petrified wood. Born when the Aetheric Anchor's first activation petrified the forest around 200 BI. Chemical root communication — a message across the Petrified Forest takes a full day." },
  { name: "Sketh",    desc: "Bipedal lizard-folk of Sarudar. Memory-keepers who imprint thought directly into stone. Guard the Zelkaris ruins, waiting for someone they have not yet seen." },
];

export default function Peoples() {
  return (
    <Page
      variant="cinematic"
      bodyStyle="grid"
      heroImage="/hero/05-peoples.jpg"
      eyebrow="Chapter IV"
      title="The Peoples"
      lede="Eleven peoples share Val'Run — six remembered in scripture, five who watch from the edges of recorded history."
    >
      <Section eyebrow="i." title="The Six Classic Races">
        <p>
          The six classic races coexist along well-worn fault lines. <strong>Humans</strong>{" "}
          dominate Verdure and share Sarudar with the orcs; their natural Aetheric cores are
          the weakest of any sentient race, a limitation that drove Verdure's technological
          innovation in compensation. <strong>Elves</strong>, 180–195 cm and long-lived to
          500–700 years, carry the strongest natural cores and live almost exclusively in
          Twiland. <strong>Dwarves</strong> (130–145 cm, lifespan 200–250) take pride in
          possessing virtually no magic at all; their runic engineering mimics magical effects
          without ever quite invoking them.
        </p>
        <p>
          <strong>Orcs</strong> are tall and broad, lifespan 80–120, equipped with a unique
          nictitating membrane for sandstorms; their shamans channel magic through movement
          and physical exertion. <strong>Fauns</strong> are above the waist human, below the
          waist deer or goat depending on subspecies, and their magic is almost entirely
          musical. <strong>Centaurs</strong>, 200–230 cm at the head, live in Twiland only and
          are uniquely sensitive to currents in the Aetherflow.
        </p>
      </Section>

      <Section eyebrow="ii." title="The Five Original Species">
        <p>
          To these are added five original species that the older histories barely name. The{" "}
          <strong>Velorath</strong> of the deep stone may be the oldest sentient race on the
          continent and have lately begun to carve warnings. The <strong>Ashborn</strong>{" "}
          are children of the broken Anchor itself. The <strong>Thalvari</strong> inhabit the
          deep Serene Sea. The <strong>Pethryn</strong> are humanoid-shaped living petrified
          wood. The <strong>Sketh</strong> are memory-keepers who can imprint thought into
          stone, and who guard the Zelkaris ruins waiting, as they have for over a thousand
          years, for someone they have not yet seen.
        </p>
      </Section>

      <Flourish />

      <Section eyebrow="iii." title="Temperament and Land">
        <p>
          Cultural temperament tracks the land. Verdure prizes craft, contract, and the{" "}
          <strong>Maker's Creed</strong> ("By Eonar's hand the world was shaped. By our hands,
          the world continues."). Twiland prizes lineage, song, and ecological law; status
          follows bloodline strength, and a beautiful voice is treated as a measure of
          spiritual depth. Sarudar prizes endurance, water-honor, and shamanic ordeal — the{" "}
          <strong>Nine Thresholds</strong> by which shamans are made include three days alone
          without water, a full month of silence, and a night at the edge of the Endless Pit
          (one in three completes them). Cinder Island endures. The Ashborn govern themselves
          through their eldest still-living, who are revered precisely because their remaining
          time is shortest.
        </p>
      </Section>

      <Section eyebrow="iv." title="Quick Reference">
        <NamedList items={PEOPLES} />
      </Section>
    </Page>
  );
}
