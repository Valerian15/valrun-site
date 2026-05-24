import { useState } from "react";
import styles from "./TarotCard.module.css";

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

/* TarotCard — the Peoples-style flippable card.
 * Used by /peoples, /faith, /factions.
 * Props:
 *   name        — visible on both faces
 *   description — visible on the back face when flipped
 *   image       — optional portrait shown inside the plate;
 *                 falls back to the first letter of name in gold */
export default function TarotCard({ name, description, image }) {
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
      aria-label={`${name} — ${flipped ? "hide" : "reveal"} description`}
    >
      <div className={styles.cardInner}>
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
          <Corners />
          <h2 className={styles.cardName}>{name}</h2>
          <div className={styles.cardRule} aria-hidden="true"><span>◆</span></div>
          <div className={styles.plate} aria-hidden="true">
            {image ? (
              <img src={image} alt="" className={styles.plateImage} />
            ) : (
              <span className={styles.plateMark}>{name.charAt(0)}</span>
            )}
          </div>
          <div className={styles.flipHint} aria-hidden="true">turn the card ↻</div>
        </div>

        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <Corners />
          <h2 className={styles.cardNameBack}>{name}</h2>
          <div className={styles.cardRule} aria-hidden="true"><span>◆</span></div>
          <p className={styles.cardDesc}>{description}</p>
          <div className={styles.flipHint} aria-hidden="true">turn back ↻</div>
        </div>
      </div>
    </article>
  );
}
