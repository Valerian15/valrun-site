import { Page, Section, NamedList, Flourish } from "../components/Page.jsx";
import VariantSwitch from "../components/VariantSwitch.jsx";
import { PEOPLES, VARIANTS } from "../data/peoples.js";

export default function Peoples() {
  return (
    <>
    <Page
      variant="cinematic"
      bodyStyle="panels"
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
    <VariantSwitch variants={VARIANTS} label="Peoples · style" />
    </>
  );
}
