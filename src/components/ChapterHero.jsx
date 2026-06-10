import styles from "./ChapterHero.module.css";

/* Full-bleed cinematic chapter opening — the interior-page counterpart
 * of Home's frontispiece. Sits above the page body, fades into --ink. */
export default function ChapterHero({ numeral, title, lede, image }) {
  return (
    <header className={styles.hero}>
      <img src={image} alt="" className={styles.heroImg} fetchpriority="high" decoding="async" />
      <div className={styles.heroVignette} aria-hidden="true" />
      <div className={styles.heroContent}>
        <div className={styles.eyebrow}>Chapter {numeral}</div>
        <h1 className={styles.title}>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
      </div>
    </header>
  );
}
