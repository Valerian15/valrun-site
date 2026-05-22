import { useState } from "react";
import { HISTORY, HISTORY_INTRO, HISTORY_VARIANTS } from "../data/history.jsx";
import VariantSwitch from "../components/VariantSwitch.jsx";
import styles from "./History2.module.css";

const HERO = "/hero/02-the-breaking.jpg";

export default function History2() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={styles.strataPage}>
      <div className={styles.bg} style={{ backgroundImage: `url(${HERO})` }} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      <header className={styles.head}>
        <div className={styles.eyebrow}>Chapter III · Variant II</div>
        <h1 className={styles.pageTitle}>The History</h1>
        <div className={styles.rule} aria-hidden="true"><span>◆</span></div>
        <p className={styles.lede}>{HISTORY_INTRO}</p>
        <p className={styles.hint}>The continent's history laid out as strata — older buried at the top, newer surfacing toward the present. Click a stratum to expand.</p>
      </header>

      <div className={styles.strata}>
        {HISTORY.map((age, i) => {
          const isOpen = openIndex === i;
          return (
            <article
              key={age.title}
              className={`${styles.stratum} ${isOpen ? styles.open : ""}`}
              data-age={i + 1}
            >
              <button
                type="button"
                className={styles.head2}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className={styles.roman}>{age.roman}</span>
                <span className={styles.label}>
                  <span className={styles.stratumTitle}>{age.title}</span>
                  <span className={styles.stratumEra}>{age.era}</span>
                </span>
                <span className={styles.toggle} aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className={styles.stratumBody}>{age.body}</div>
              )}
            </article>
          );
        })}
      </div>

      <VariantSwitch variants={HISTORY_VARIANTS} label="History · style" />
    </div>
  );
}
