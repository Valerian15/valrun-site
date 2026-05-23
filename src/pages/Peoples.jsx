import { useState } from "react";
import { PEOPLES } from "../data/peoples.js";
import styles from "./Peoples.module.css";

const HERO = "/hero/05-peoples.jpg";

function Corners() {
  return (
    <>
      <div className={styles.cornerTL} aria-hidden="true" />
      <div className={styles.cornerTR} aria-hidden="true" />
      <div className={styles.cornerBL} aria-hidden="true" />
      <div className={styles.cornerBR} aria-hidden="true" />
    </>
  );
}

function Card({ p }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((v) => !v);
  return (
    <article
      className={`${styles.card} ${flipped ? styles.flipped : ""}`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${p.name} — ${flipped ? "hide" : "reveal"} description`}
    >
      <div className={styles.cardInner}>
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
          <Corners />
          <h2 className={styles.cardName}>{p.name}</h2>
          <div className={styles.cardRule} aria-hidden="true"><span>◆</span></div>
          <div className={styles.plate} aria-hidden="true">
            {p.image ? (
              <img src={p.image} alt="" className={styles.plateImage} />
            ) : (
              <span className={styles.plateMark}>{p.name.charAt(0)}</span>
            )}
          </div>
          <div className={styles.flipHint} aria-hidden="true">turn the card ↻</div>
        </div>

        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <Corners />
          <h2 className={styles.cardNameBack}>{p.name}</h2>
          <div className={styles.cardRule} aria-hidden="true"><span>◆</span></div>
          <p className={styles.cardDesc}>{p.desc}</p>
          <div className={styles.flipHint} aria-hidden="true">turn back ↻</div>
        </div>
      </div>
    </article>
  );
}

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
          <Card key={p.name} p={p} />
        ))}
      </div>
    </div>
  );
}
