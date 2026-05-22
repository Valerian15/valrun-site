import { HISTORY, HISTORY_INTRO, HISTORY_VARIANTS } from "../data/history.jsx";
import VariantSwitch from "../components/VariantSwitch.jsx";
import styles from "./History3.module.css";

const HERO = "/hero/02-the-breaking.jpg";

export default function History3() {
  return (
    <div className={styles.annalsPage}>
      <div className={styles.bg} style={{ backgroundImage: `url(${HERO})` }} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      <article className={styles.scroll}>
        <header className={styles.head}>
          <div className={styles.eyebrow}>Chapter III · Variant III</div>
          <h1 className={styles.pageTitle}>The History</h1>
          <div className={styles.pageRule} aria-hidden="true"><span>◆</span></div>
          <p className={styles.lede}>{HISTORY_INTRO}</p>
        </header>

        <div className={styles.entries}>
          {HISTORY.map((age, i) => (
            <article key={age.title} className={styles.entry}>
              <div className={styles.numeral} aria-hidden="true">
                <span>{age.roman}</span>
              </div>
              <div className={styles.entryHead}>
                <div className={styles.era}>{age.era}</div>
                <h2 className={styles.entryTitle}>{age.title}</h2>
              </div>
              <div className={styles.body}>{age.body}</div>
              {i < HISTORY.length - 1 && (
                <div className={styles.divider} aria-hidden="true">
                  <span className={styles.divLine} />
                  <span className={styles.divMark}>✦</span>
                  <span className={styles.divLine} />
                </div>
              )}
            </article>
          ))}
        </div>
      </article>

      <VariantSwitch variants={HISTORY_VARIANTS} label="History · style" />
    </div>
  );
}
