import { HISTORY, HISTORY_INTRO, HISTORY_VARIANTS } from "../data/history.jsx";
import VariantSwitch from "../components/VariantSwitch.jsx";
import styles from "./History1.module.css";

const HERO = "/hero/02-the-breaking.jpg";

export default function History1() {
  return (
    <div className={styles.eraScenes}>
      <div className={styles.bg} style={{ backgroundImage: `url(${HERO})` }} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      {/* opening title scene */}
      <section className={`${styles.scene} ${styles.opening}`}>
        <div className={styles.openingContent}>
          <div className={styles.eyebrow}>Chapter III · Variant I</div>
          <h1 className={styles.openingTitle}>The History</h1>
          <div className={styles.rule} aria-hidden="true"><span>◆</span></div>
          <p className={styles.openingLede}>{HISTORY_INTRO}</p>
          <div className={styles.scrollCue} aria-hidden="true">
            <span>begin</span><span>↓</span>
          </div>
        </div>
      </section>

      {HISTORY.map((age, i) => (
        <section key={age.title} className={styles.scene} data-age={i + 1}>
          <div className={styles.tint} aria-hidden="true" />
          <div className={styles.content}>
            <div className={styles.eraMarker}>
              <span>anno&nbsp;{age.roman}</span>
            </div>
            <h2 className={styles.title}>{age.title}</h2>
            <div className={styles.rule} aria-hidden="true"><span>◆</span></div>
            <div className={styles.dates}>{age.era.replace(/^[a-z]+ age( ·\s*)?/, "")}</div>
            <div className={styles.body}>{age.body}</div>
          </div>
        </section>
      ))}

      <VariantSwitch variants={HISTORY_VARIANTS} label="History · style" />
    </div>
  );
}
