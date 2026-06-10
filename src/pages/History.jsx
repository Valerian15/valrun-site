import { useEffect, useRef, useState } from "react";
import { HISTORY, HISTORY_INTRO } from "../data/history.jsx";
import useDocumentMeta from "../hooks/useDocumentMeta.js";
import styles from "./History.module.css";

/* The History — River of Years.
 * A single vertical gold spine runs down the left of the column.
 * Each Age is a milestone beside it: huge Roman numeral hanging
 * over the spine, era label, name, body. The active milestone
 * (whichever is in the reading band) glows gold.                 */

function AgeEntry({ age, index, isActive, onActivate }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) onActivate(index);
        });
      },
      { rootMargin: "-28% 0px -42% 0px", threshold: 0 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [index, onActivate]);

  const handleClick = () => {
    onActivate(index);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <article
      ref={ref}
      className={`${styles.entry} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      <div className={styles.numeralCell}>
        <span className={styles.numeral} aria-hidden="true">{age.roman}</span>
      </div>
      <span className={styles.marker} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.era}>{age.era}</div>
        <h2 className={styles.title}>
          <button
            type="button"
            className={styles.titleButton}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            aria-current={isActive ? "true" : undefined}
          >
            {age.title}
          </button>
        </h2>
        <div className={styles.body}>{age.body}</div>
      </div>
    </article>
  );
}

export default function History() {
  useDocumentMeta("The History");
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <article className={styles.page}>
      <header className={styles.head}>
        <div className={styles.eyebrow}>Chapter III</div>
        <h1 className={styles.pageTitle}>The History</h1>
        <p className={styles.lede}>
          All time in Val'Run is reckoned from a single moment of fire.
        </p>
        <p className={styles.intro}>{HISTORY_INTRO}</p>
        <div className={styles.hint}>The river of years. Scroll or click any age.</div>
      </header>

      <div className={styles.timeline}>
        <div className={styles.spine} aria-hidden="true" />
        {HISTORY.map((age, i) => (
          <AgeEntry
            key={age.title}
            age={age}
            index={i}
            isActive={i === activeIndex}
            onActivate={setActiveIndex}
          />
        ))}
      </div>
    </article>
  );
}
