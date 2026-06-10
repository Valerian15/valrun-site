import { Link } from "react-router-dom";
import { CHAPTERS } from "../data/chapters.js";
import styles from "./ChapterEnd.module.css";

/* Full-width "next chapter" threshold at the end of every chapter page.
 * Wraps after the last chapter back to the first. */
export default function ChapterEnd({ current }) {
  const idx = CHAPTERS.findIndex((c) => c.slug === current);
  if (idx === -1) return null;
  const next = CHAPTERS[(idx + 1) % CHAPTERS.length];
  return (
    <Link to={next.slug} viewTransition className={styles.band}>
      <img src={next.hero} alt="" className={styles.bandImg} loading="lazy" decoding="async" />
      <div className={styles.bandVignette} aria-hidden="true" />
      <div className={styles.bandContent}>
        <div className={styles.bandEyebrow}>Next — Chapter {next.numeral}</div>
        <div className={styles.bandTitle}>{next.title}</div>
        <div className={styles.bandCue} aria-hidden="true">turn the page →</div>
      </div>
    </Link>
  );
}
