import { PEOPLES } from "../data/peoples.js";
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
        <div className={styles.rule} aria-hidden="true"><span>◆</span></div>
        <p className={styles.lede}>
          Twelve kindreds, laid out as a spread.
        </p>
      </header>

      <div className={styles.spread}>
        {PEOPLES.map((p) => (
          <article key={p.name} className={styles.card}>
            <div className={styles.cornerTL} aria-hidden="true" />
            <div className={styles.cornerTR} aria-hidden="true" />
            <div className={styles.cornerBL} aria-hidden="true" />
            <div className={styles.cornerBR} aria-hidden="true" />

            <div className={styles.cardEyebrow}>The Kindred</div>
            <h2 className={styles.cardName}>{p.name}</h2>
            <div className={styles.cardRule} aria-hidden="true">
              <span>◆</span>
            </div>
            <div className={styles.plate} aria-hidden="true">
              <span className={styles.plateMark}>{p.name.charAt(0)}</span>
            </div>
            <p className={styles.cardDesc}>{p.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
