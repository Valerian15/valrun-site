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
 *   image       — optional full-bleed art for the card face;
 *                 without it the face shows a placeholder (faint initial)
 *                 in the same full-bleed frame, ready to receive art. */
export default function TarotCard({ name, description, image }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((v) => !v);
  return (
    <article className={`${styles.card} ${flipped ? styles.flipped : ""}`}>
      <div className={styles.cardInner}>
        <div
          className={`${styles.cardFace} ${styles.cardFrontImage}`}
          aria-hidden={flipped}
        >
          <Corners />
          {image ? (
            <img
              src={image}
              alt=""
              className={styles.faceImage}
              loading="lazy"
              decoding="async"
              width="600"
              height="600"
            />
          ) : (
            <div className={styles.facePlaceholder} aria-hidden="true">
              <span className={styles.placeholderMark}>{name.charAt(0)}</span>
            </div>
          )}
          <div className={styles.faceScrim} aria-hidden="true" />
          <h2 className={`${styles.cardName} ${styles.cardNamePlate}`}>{name}</h2>
          <div className={styles.flipHint} aria-hidden="true">turn the card ↻</div>
        </div>

        <div className={`${styles.cardFace} ${styles.cardBack}`} aria-hidden={!flipped}>
          <Corners />
          <h2 className={styles.cardNameBack}>{name}</h2>
          <div className={styles.cardRule} aria-hidden="true"><span>◆</span></div>
          <p className={styles.cardDesc}>{description}</p>
          <div className={styles.flipHint} aria-hidden="true">turn back ↻</div>
        </div>
      </div>
      <button
        type="button"
        className={`${styles.flipControl} ${flipped ? styles.flipControlBack : ""}`}
        onClick={toggle}
        aria-expanded={flipped}
      >
        <span className="visually-hidden">
          {flipped ? `Turn the ${name} card back` : `Turn the ${name} card to read its tale`}
        </span>
      </button>
    </article>
  );
}
