import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const SECTIONS = [
  { to: "/lore",      title: "Lore",      blurb: "Cosmology, myth, and the deep grammar of the world." },
  { to: "/geography", title: "Geography", blurb: "Continents, kingdoms, wastes, and the names between them." },
  { to: "/history",   title: "History",   blurb: "Ages, wars, dynasties — the chronicle in motion." },
  { to: "/peoples",   title: "Peoples",   blurb: "Kindreds, cultures, tongues, and the lives they lead." },
  { to: "/faith",     title: "Faith",     blurb: "Gods, cults, rites, and the bargains struck below them." },
  { to: "/factions",  title: "Factions",  blurb: "Orders, guilds, courts, and the powers that bend them." },
  { to: "/language",  title: "Language",  blurb: "Scripts, dialects, idioms, and the words of binding." },
  { to: "/map",       title: "Map",       blurb: "The world drawn — borders honest and otherwise." },
  { to: "/gallery",   title: "Gallery",   blurb: "Plates, sketches, and what the cartographers brought back." },
];

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={`container ${styles.hero}`}>
        <div className="eyebrow">A worldbuilding compendium</div>
        <h1 className={styles.title}>Val'Run</h1>
        <div className="flourish" aria-hidden="true">
          <span className="flourish-mark">◆</span>
        </div>
        <p className={styles.lede}>
          Eleven hundred years after a meteor buried an arcane civilization beneath what is
          now a living volcano, Val'Run lives atop a wound that has never fully closed —
          the Aetherflow leaks, the Gyre widens, and a quiet doctrine holds the world together:
          that the breaking is necessary, and whoever forgets this will be answered.
        </p>
      </section>

      <section className={`container ${styles.grid}`}>
        {SECTIONS.map((s) => (
          <Link key={s.to} to={s.to} className={styles.card}>
            <h3 className={styles.cardTitle}>{s.title}</h3>
            <p className={styles.cardBlurb}>{s.blurb}</p>
            <span className={styles.cardMark} aria-hidden="true">→</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
