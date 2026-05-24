import { useEffect, useRef, useState } from "react";
import GeoMapStage from "../components/GeoMapStage.jsx";
import VariantSwitch from "../components/VariantSwitch.jsx";
import { PLACES, GEOGRAPHY_VARIANTS } from "../data/geography.jsx";
import styles from "./Geography3.module.css";

/* Editorial spread — each place is a long-form entry. Region tag is
 * spaced-out tracking like a magazine masthead, name in big italic
 * serif, locus as a margin note, body with a drop-cap on its first
 * letter. Active state: drop-cap turns gold, double ornament rule.   */

function Spread({ place, index, isActive, onActivate, isLast }) {
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
    <>
      <article
        ref={ref}
        className={`${styles.spread} ${isActive ? styles.active : ""}`}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-current={isActive ? "true" : undefined}
      >
        <div className={styles.region}>{place.region}</div>
        <h2 className={styles.name}>{place.name}</h2>
        {place.label && <div className={styles.label}>— {place.label}</div>}
        <div className={styles.body}>{place.body}</div>
      </article>
      {!isLast && (
        <div className={styles.ornament} aria-hidden="true">
          <span className={styles.ornamentMark}>◆</span>
        </div>
      )}
    </>
  );
}

export default function Geography3() {
  const [activeIndex, setActiveIndex] = useState(0);
  const focus = PLACES[activeIndex] ?? PLACES[0];

  return (
    <div className={styles.mapPage}>
      <GeoMapStage focus={focus} />

      <div className={styles.scrollArea}>
        <header className={styles.head}>
          <div className={styles.eyebrow}>Chapter II · Variant III</div>
          <h1 className={styles.title}>The Geography</h1>
          <p className={styles.lede}>
            A continent of four faces, drawn together — and slowly torn apart — by a single
            inland sea.
          </p>
          <div className={styles.hint}>
            Scroll or click a place — the map will travel with you.
          </div>
        </header>

        <div className={styles.spreads}>
          {PLACES.map((place, i) => (
            <Spread
              key={place.name}
              place={place}
              index={i}
              isActive={i === activeIndex}
              onActivate={setActiveIndex}
              isLast={i === PLACES.length - 1}
            />
          ))}
        </div>
      </div>

      <VariantSwitch variants={GEOGRAPHY_VARIANTS} label="Geography · style" />
    </div>
  );
}
