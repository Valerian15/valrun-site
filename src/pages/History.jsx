import { useEffect, useRef, useState } from "react";
import { HISTORY, HISTORY_INTRO } from "../data/history.jsx";
import ChapterHero from "../components/ChapterHero.jsx";
import useDocumentMeta from "../hooks/useDocumentMeta.js";
import { chapterFor } from "../data/chapters.js";
import styles from "./History.module.css";

/* Backdrop art per band of ages: the Breaking for the early ages,
 * the Crack for the middle, the present-day frontispiece for the late. */
const ERA_BACKDROPS = [
  { src: "/hero/02-the-breaking.jpg", upTo: 2 },
  { src: "/hero/06-the-crack.jpg", upTo: 4 },
  { src: "/hero/01-frontispiece.jpg", upTo: Infinity },
];

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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
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

  const backdropIndex = ERA_BACKDROPS.findIndex((b) => activeIndex <= b.upTo);

  return (
    <>
      <ChapterHero
        numeral={chapterFor("/history").numeral}
        title="The History"
        lede="All time in Val'Run is reckoned from a single moment of fire."
        image={chapterFor("/history").hero}
      />
      <article className={styles.page}>
        <div className={styles.backdrops} aria-hidden="true">
          {ERA_BACKDROPS.map((b, i) => (
            <div
              key={b.src}
              className={`${styles.backdrop} ${i === backdropIndex ? styles.backdropActive : ""}`}
              style={{ backgroundImage: `url(${b.src})` }}
            />
          ))}
        </div>
        <header className={styles.head}>
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
    </>
  );
}
