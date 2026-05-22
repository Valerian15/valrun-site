import { Page, Section } from "../components/Page.jsx";

export default function History() {
  return (
    <Page
      variant="cinematic"
      bodyStyle="timeline"
      heroImage="/hero/02-the-breaking.jpg"
      eyebrow="Chapter III"
      title="The History"
      lede="All time in Val'Run is reckoned from a single moment of fire."
    >
      <p>
        Val'Run divides its past into <strong>Seven Ages</strong>, of which the first two
        predate the common calendar. The present year is <strong>1,147 AI</strong>.
      </p>

      <Section eyebrow="first age" title="The Shaping">
        <p>
          The age of scripture: Eonar's seven labors, the dividing of the Nine, the weaving of
          Thal'veren. Before mortals, before the first sun rose on a thing it could call its
          own name.
        </p>
      </Section>

      <Section eyebrow="second age · ~10,000 — 2,000 BI" title="The Wandering">
        <p>
          Mortals settled their chosen lands. Elves drifted toward the World Tree, dwarves
          into the Frostcrown Ridges, humans across the temperate and desert belts, orcs into
          the southern heat. The Velorath were already there, older than any surface race, and
          the Sketh claim — alone among mortals — to remember the Age of Shaping directly.
          Around 4,000 BI the peoples began to encounter one another; trade, war, and language
          divergence followed.
        </p>
      </Section>

      <Section eyebrow="third age · ~2,000 BI — 0 AI" title="The Zelkaris">
        <p>
          On the green and forested island then known as Zelkarun, a multi-ethnic civilization
          of humans, elves, dwarves, and the ancestors of the Ashborn became the first to
          study the Aetherflow as a measurable natural force. By 1,400 BI they had
          mana-crystal technology and built the <strong>Tomb of Time</strong> as an
          observatory. By 500 BI they had long-range Aetheric communication and permanent
          enchantments.
        </p>
        <p>
          Then came the Great Work: the <strong>Aetheric Anchor</strong>, a four-hundred-meter
          spire of luminous crystal designed to stabilize and concentrate magic across the
          entire continent. When it was activated around 200 BI, the world answered. Northern
          Verdure split open along the line we now call the <strong>Rupture</strong>; a forest
          on Sarudar's border turned to stone in a single moment, birthing the{" "}
          <strong>Pethryn</strong>.
        </p>
        <p>
          Recalibration only half-succeeded. In Year 0, a meteor struck the center of Cinder
          Island. The Anchor was driven deep, cracked but not destroyed, and only those
          Zelkaris abroad on diplomatic missions survived — chiefly the{" "}
          <strong>Tharalyn</strong> line.
        </p>
      </Section>

      <Section eyebrow="fourth age · 5 — 237 AI" title="The Dark Age">
        <p>
          Two centuries of warlords, betrayals, and short-lived states: the Kingdom of
          Drenvale, the Barony of Iskrel (whose <strong>Mirehold Ruins</strong> still rot at
          the edge of the Fenwood), the Emerald Principality, the first Ironspire League, the
          city-state of Meraldin. Out of Sarudar's nomadic tribes rose{" "}
          <strong>Valtheris Morvain</strong> — born 145 AI, a charismatic and ruthless warrior
          who unified the desert by 175, conquered Verdure by 220, and broke Twiland in a
          ten-year campaign. In 237 AI he declared himself the first Emperor of the{" "}
          <strong>Aurean Empire</strong>.
        </p>
      </Section>

      <Section eyebrow="fifth age · 237 — 874 AI" title="The Empire">
        <p>
          The only time Val'Run has ever been unified. Six centuries of Morvain rule built the
          Kings' Road, founded the capital <strong>Aureon</strong>, established the{" "}
          <strong>Aurean Standard</strong> gold coin, and codified law through the{" "}
          <strong>Aurean Edicts</strong>. The Golden Age (roughly 343–490 AI), under Valtheris
          II, Dorian, and Lucien, fused Twiland's magic with Verdure's craft and Sarudar's
          resilience into a single imperial culture.
        </p>
        <p>
          Decline followed: bureaucratic corruption, regional fragmentation, the Ironspire
          Rebellion of 840 AI. When Emperor Eliron II died in 874, his daughter{" "}
          <strong>Elayna Morvain</strong> refused the throne, declaring that the Empire's time
          had passed and the people of Val'Run should govern themselves. The court dissolved
          almost overnight. One Morvain line that had renounced succession centuries earlier
          — descended from the elven explorer Caelith's marriage with the Empress Lyanna —
          survived quietly as the <strong>Caladris</strong> family.
        </p>
      </Section>

      <Section eyebrow="sixth age · 874 — 927 AI" title="The Reformation">
        <p>
          A half-century of Scrambling and rebuilding. The Kingdoms of <strong>Rhystara</strong>{" "}
          and <strong>Eryndor</strong> rose in Verdure, <strong>Durumbar</strong> and{" "}
          <strong>Grimgar</strong> formalized as independent dwarven kingdoms, and Twiland's
          elves established the Council of Concord beneath the World Tree. In 925, five
          visionaries — Drogan Emberheart, Beldar Ironmar, Althea Starforge, Kastian Solvayne,
          and Aelric Caladris — met in Aureon's ruins. Two years later they founded{" "}
          <strong>Everpeak</strong> on those bones and established the{" "}
          <strong>Council of Five</strong>.
        </p>
      </Section>

      <Section eyebrow="seventh age · 927 AI — present" title="The New Age">
        <p>
          Our own age. An age of slow reconstruction and quiet warning. Mana-crystal refining,
          the founding of the <strong>Gilded Consortium</strong> in 1015, the rise of the{" "}
          <strong>Crimson Wardens</strong> in 1055, Rhystara's first sustained airship flight
          in 1062, the founding of the <strong>Collegium of the Fracture</strong> at Riftward
          in 1080 — all of it has unfolded against the slow, measurable expansion of the Gyre
          and a hum from beneath the Frostcrown Ridges that the Velorath have begun, at last,
          to carve warnings about.
        </p>
        <p>
          The present year is 1,147 AI. The Anchor continues to crack. None of the people who
          hold the pieces of the puzzle have yet spoken to one another.
        </p>
      </Section>
    </Page>
  );
}
