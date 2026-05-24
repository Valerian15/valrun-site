import { useEffect, useRef, useState } from "react";
import GeoMapStage from "../components/GeoMapStage.jsx";
import VariantSwitch from "../components/VariantSwitch.jsx";
import { PLACES, GEOGRAPHY_VARIANTS } from "../data/geography.jsx";
import styles from "./Geography1.module.css";

/* Atlas index — printed-book feel. No boxes. Hairline separators
 * between entries. Region tag in the left margin. Active state =
 * a single bold gold rule down the left margin of the current entry.  */

function Entry({ place, index, isActive, onActivate }) {
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
      <div className={styles.gutter}>
        <div className={styles.region}>{place.region}</div>
      </div>
      <div className={styles.entryBody}>
        <h2 className={styles.name}>
          {place.name}
          {place.label && <span className={styles.label}> — {place.label}</span>}
        </h2>
        <div className={styles.text}>{place.body}</div>
      </div>
    </article>
  );
}

export default function Geography1() {
  const [activeIndex, setActiveIndex] = useState(0);
  const focus = PLACES[activeIndex] ?? PLACES[0];

  return (
    <div className={styles.mapPage}>
      <GeoMapStage focus={focus} />

      <div className={styles.scrollArea}>
        <header className={styles.head}>
          <div className={styles.eyebrow}>Chapter II · Variant I</div>
          <h1 className={styles.title}>The Geography</h1>
          <p className={styles.lede}>
            A continent of four faces, drawn together — and slowly torn apart — by a single
            inland sea.
          </p>
          <div className={styles.hint}>
            Scroll or click a place — the map will travel with you.
          </div>
        </header>

        <div className={styles.entries}>
          {PLACES.map((place, i) => (
            <Entry
              key={place.name}
              place={place}
              index={i}
              isActive={i === activeIndex}
              onActivate={setActiveIndex}
            />
          ))}
        </div>
      </div>

      <VariantSwitch variants={GEOGRAPHY_VARIANTS} label="Geography · style" />
    </div>
  );
}
