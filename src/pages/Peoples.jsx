import { PEOPLES } from "../data/peoples.js";
import TarotCard from "../components/TarotCard.jsx";
import styles from "./Peoples.module.css";

const HERO = "/hero/05-peoples.jpg";

export default function Peoples() {
  return (
    <div className={styles.tarotWrap}>
      <div className={styles.bg} style={{ backgroundImage: `url(${HERO})` }} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      <header className={styles.head}>
        <div className={styles.eyebrow}>Chapter IV</div>
        <h1 className={styles.title}>The Peoples</h1>
        <p className={styles.lede}>
          Twelve kindreds, laid out as a spread. Turn any card to read its tale.
        </p>
      </header>

      <div className={styles.spread}>
        {PEOPLES.map((p) => (
          <TarotCard key={p.name} name={p.name} description={p.desc} image={p.image} />
        ))}
      </div>
    </div>
  );
}
