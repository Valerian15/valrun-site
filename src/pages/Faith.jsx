import TarotCard from "../components/TarotCard.jsx";
import styles from "./Faith.module.css";

const HERO = "/hero/03-aetherflow.jpg";

const NINE = [
  { name: "Lumina",  desc: "The Shimmering Veil. Stars, light, discovery. Celebrated first at every Festival of Creation." },
  { name: "Terron",  desc: "The Stoneheart. Earth, strength, endurance. Patron of dwarves." },
  { name: "Reyron",  desc: "The Flame Warden. Fire, the forge, the work of hands. Patron of blacksmiths." },
  { name: "Maris",   desc: "The Tide Whisperer. Rivers, rain, safe passage at sea." },
  { name: "Aerel",   desc: "The Sky Dancer. Wind, weather, change. The one who laughed at being born." },
  { name: "Cavale",  desc: "The Forest Sentinel. Woods, beasts, the wild green. Symbol: the Shimmer Stag." },
  { name: "Vitalis", desc: "The Life Stream. Healing, growth, the mending of broken things." },
  { name: "Mystria", desc: "The Arcane Conduit. Magic, voice of the Aetherflow. Most important of the Nine in Twiland." },
  { name: "Luna",    desc: "The Shadow Veil. Secrets, night, the unknown. Celebrated last." },
];

const TEMPLES = [
  { name: "Cathedral of the Architect",  desc: "Everpeak. Granite, iron, and a central mechanical orrery powered by a mana crystal." },
  { name: "Hall of the First Stone",     desc: "Durumbar. Carved from a single boulder, displaying the oldest known Corestone." },
  { name: "Sanctum of Roots",            desc: "Twiland. A natural cathedral formed by the World Tree's own roots, lit by bioluminescent moss. No chairs." },
  { name: "The Tide Chapels",            desc: "Every major port. Tidecallers of Maris keep them; Path of the Deep have begun keeping their own." },
  { name: "The Sand Circles",            desc: "Sarudar. Impermanent. Erased after the rite ends — nothing sacred persists." },
  { name: "The Stone of Speaking",       desc: "Gadh'aran. The desert's one concession to permanence." },
];

export default function Faith() {
  return (
    <div className={styles.tarotWrap}>
      <div className={styles.bg} style={{ backgroundImage: `url(${HERO})` }} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      <header className={styles.head}>
        <div className={styles.eyebrow}>Chapter V</div>
        <h1 className={styles.title}>The Faith</h1>
        <p className={styles.lede}>
          Three faiths, one scripture, and a silence at the heart of all three.
        </p>
      </header>

      <section className={styles.narrative}>
        <p>
          The dominant religion of Val'Run is <strong>Eonarism</strong>, the worship of Eonar
          through the Nine sub-deities drawn from the Architect's self at the dividing. To
          ignore any of the Nine is to deny a part of Eonar. Each region's priesthood is
          semi-autonomous, united by scripture but divided by interpretation.
        </p>
      </section>

      <section className={styles.cardSection}>
        <header className={styles.sectionHead}>
          <div className={styles.sectionOrnament} aria-hidden="true">✦</div>
          <h2 className={styles.sectionName}>The Nine</h2>
          <div className={styles.sectionRule} aria-hidden="true" />
        </header>
        <div className={styles.spread}>
          {NINE.map((n) => (
            <TarotCard key={n.name} name={n.name} description={n.desc} />
          ))}
        </div>
      </section>

      <section className={styles.narrative}>
        <h3 className={styles.narrativeTitle}>The Path of the Deep</h3>
        <p>
          The <strong>Path of the Deep</strong> venerates <strong>Thalassor</strong>, the
          deity of the deep seas and hidden crevices, whom they hold to predate Eonar — woken
          from the Vael'thura when the Architect's tears became the seas. Theologically
          uncomfortable rather than openly heretical, it is led by{" "}
          <strong>High Tidecaller Maren Saltsong</strong> of Bastion's Reach, a former sailor
          who is convinced the Gyre is Thalassor's displeasure at something beneath the sea.
        </p>
      </section>

      <section className={styles.narrative}>
        <h3 className={styles.narrativeTitle}>The Shadow Pact</h3>
        <p>
          The <strong>Shadow Pact</strong> is outlawed everywhere. Its adherents believe
          Eonarism tells only half the story — that <strong>Nyxos</strong>, the unsevered
          echo of Luna, is the primordial darkness that predates Eonar and was nearly
          understood by the Zelkaris before the Impact. The Pact is organised in three- to
          seven-member cells (Whispers, Shades, Shadowmancers, and the five-member Umbra
          Council of Veilkeepers). Promotion to Veilkeeper requires sacrificing something
          precious — not blood, but a cherished memory, a loved one's trust, one's own name.
        </p>
      </section>

      <section className={styles.narrative}>
        <h3 className={styles.narrativeTitle}>Religion as Institution</h3>
        <p>
          Religion in Val'Run is also institution. Temples own land, run granaries, hold
          relics, judge in temple courts, and shelter sanctuary cases. Tithes run 3–10% of
          harvest, fish, wool, or coin. The Order of the Green runs charity kitchens that, in
          famine, become more politically powerful than any council. The Order of the Veil
          keeps sealed archives and protects witnesses; the{" "}
          <strong>Inquisitors of the Unbroken Dawn</strong> hunt Shadow corruption and false
          relics, useful against cults and dangerous against dissidents.
        </p>
      </section>

      <section className={styles.cardSection}>
        <header className={styles.sectionHead}>
          <div className={styles.sectionOrnament} aria-hidden="true">✦</div>
          <h2 className={styles.sectionName}>Major Temples</h2>
          <div className={styles.sectionRule} aria-hidden="true" />
        </header>
        <div className={styles.spread}>
          {TEMPLES.map((t) => (
            <TarotCard key={t.name} name={t.name} description={t.desc} />
          ))}
        </div>
      </section>

      <section className={styles.narrative}>
        <h3 className={styles.narrativeTitle}>Living Rites</h3>
        <p>
          Living daily rites bind religion into life unavoidably: the daily{" "}
          <strong>Maker's Creed</strong> before any major work; the annual{" "}
          <strong>Rite of the Forge</strong> in Verdure's Forgebright Festival; the{" "}
          <strong>Blooming Ceremony</strong> in Twiland on the first day of Bloomtide, when
          the World Tree's foliage brightens and the Aetherflow synchronizes with
          participants' heartbeats; the <strong>Blood of the Sands</strong> of Sarudar's
          shamans; and the Shadow Pact's clandestine Night of Whispering Shadows.
        </p>
      </section>
    </div>
  );
}
