import { Page, Section, NamedList, Flourish } from "../components/Page.jsx";
import styles from "./Map.module.css";

const RATES = [
  { name: "Walker, maintained road",        desc: "~6 leagues / day" },
  { name: "Mounted traveler",               desc: "~9 leagues / day" },
  { name: "Courier relay",                  desc: "~20 leagues / day" },
  { name: "Sailing vessel, fair season",    desc: "~28 leagues / day (day-sail)" },
  { name: "Rhystaran airship, in service",  desc: "~20 leagues / day — bypasses the Gyre and the pirates" },
];

const CHOKEPOINTS = [
  { name: "Saltwood Hold",            desc: "Controls Verdure's southwest crossing and all Cinder Island resupply." },
  { name: "Bastion's Reach",          desc: "Dominates the northeast naval gate and the airship dock." },
  { name: "Sea Breeze",                desc: "The small port whose central position makes it disproportionately important." },
  { name: "The Gyre of the Deep",      desc: "Both a hazard and a tax on distance. Every sea lane bends — and the bend is where the pirates wait." },
  { name: "Driftwood Haven",           desc: "Lets the Crimson Tide strike and vanish." },
  { name: "Black Bastion",             desc: "The only secure harbour on Cinder Island." },
  { name: "Brabrar",                   desc: "Sarudar's western customs gate." },
  { name: "Gadh'aran",                 desc: "Interior caravan and shamanic legitimacy hub." },
  { name: "Lazgudh",                   desc: "Militarized northern shore." },
  { name: "Endless Pit / Tomb of Time corridor", desc: "Strategic for an unusual reason — information, not goods, moves through it." },
  { name: "Nilvelond",                 desc: "Twiland's economic gateway." },
  { name: "Lylenore",                  desc: "Twiland's eastern counterweight." },
];

const UNITS = [
  { name: "League",        desc: "~5 km. The standard overland measure." },
  { name: "Day-sail",      desc: "~28 leagues (140 km) in fair season." },
  { name: "Pace",          desc: "~0.75 m." },
  { name: "Handspan",      desc: "~20 cm." },
  { name: "Stoneweight",   desc: "~10 kg. Distinct from the real-world stone." },
  { name: "Skin",          desc: "Sarudar water measure, ~3–4 L." },
  { name: "Cartload",      desc: "300–600 kg of useful freight depending on road, animal team, and weather." },
];

export default function MapPage() {
  return (
    <Page
      eyebrow="Plate I"
      title="Map"
      lede="Geography is the slowest power in Val'Run, and the one that decides every war."
    >
      <figure className={styles.mapFigure}>
        <a href="/map.jpg" target="_blank" rel="noreferrer" className={styles.mapLink}>
          <img src="/map.jpg" alt="Map of Val'Run" className={styles.mapImage} loading="lazy" />
        </a>
        <figcaption className={styles.mapCaption}>
          The continent of Val'Run, the Serene Sea, and the Gyre of the Deep. Click to view full size.
        </figcaption>
      </figure>

      <Section eyebrow="i." title="Scale and Speed">
        <p>
          The atlas is built on a working scale of approximately five kilometres to the
          league, with all conversions held to metric units. Travel rates are deliberately
          conservative.
        </p>
        <NamedList items={RATES} />
      </Section>

      <Section eyebrow="ii." title="The Roads">
        <p>
          Verdure's road network is anchored on the <strong>Kings' Road</strong>, paved and
          patrolled, with milestones every league and Hearthposts every thirty. Its principal
          segments are the Kings' Road West (Saltwood Hold–Harveston–Everpeak, ~42 leagues,
          five days on horse), the North Spur (Everpeak–Greenrun–Grimgar–Durumbar, ~51
          leagues), and the Kings' Road East (Everpeak–Timbercross–Riftward–Bastion's Reach,
          ~127 leagues, fourteen days on horse). The Riftward Spur to the Rupture is
          restricted scholarly road. The Fenwood Track out to Mirehold Ruins is a smuggler's
          route.
        </p>
        <p>
          Twiland's <strong>Western Path</strong> runs Nilvelond–Onhethas–Luneberg through
          unmarked forest reliant on magical waymarkers; the <strong>Inner Path</strong>{" "}
          continues Luneberg–Flaluma–Moonshadow Mount–Lylenore. Sarudar's{" "}
          <strong>North Trade Road</strong> loops Brabrar–Gadh'aran–Lazgudh; the{" "}
          <strong>South Caravan Road</strong> swings via the Western Sarudar Watchtower and
          the Tomb of Time. The <strong>Forbidden Observatory Track</strong> between
          Gadh'aran, the Endless Pit, and the Tomb is politically sensitive, ritually charged,
          and contested by Sketh and Dustshade guardians.
        </p>
      </Section>

      <Flourish />

      <Section eyebrow="iii." title="The Sea Lanes">
        <p>
          The Serene Sea is laced with eight principal lanes. The{" "}
          <strong>Saltwood–Nilvelond Lane</strong> is the short western crossing. The{" "}
          <strong>Saltwood–Black Bastion Military Crossing</strong> is the strategic resupply
          line to Cinder Island. The <strong>Sea Breeze–Black Bastion Lane</strong> is the
          central artery for soldiers, ore, and volcanic samples — and the most exposed to the
          Crimson Tide. The <strong>Sea Breeze–Brabrar Spice Lane</strong> carries the most
          valuable cargoes in fair season, skirting the Gyre wide.
        </p>
        <p>
          The <strong>Bastion's Reach–Brabrar North Lane</strong> is the politically sensitive
          Rhystaran approach; the <strong>Bastion's Reach–Lazgudh Patrol Lane</strong> is the
          warship route. The <strong>Nilvelond–Lylenore Coastal Passage</strong> is the long
          Twiland coastwise route, and the <strong>Black Bastion–Lylenore Lane</strong> is
          the southern volcanic-and-magical exchange. Sea-lane distance is dominated by one
          obstacle: the Gyre forces every route to bend, and the bend is where the pirates
          wait.
        </p>
      </Section>

      <Section eyebrow="iv." title="Chokepoints">
        <NamedList items={CHOKEPOINTS} />
      </Section>

      <Flourish />

      <Section eyebrow="v." title="Units of the World">
        <NamedList items={UNITS} />
      </Section>
    </Page>
  );
}
