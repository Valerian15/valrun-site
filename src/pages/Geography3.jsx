import { useEffect, useRef, useState } from "react";
import GeoMapStage from "../components/GeoMapStage.jsx";
import VariantSwitch from "../components/VariantSwitch.jsx";
import { PLACES, GEOGRAPHY_VARIANTS } from "../data/geography.jsx";
import styles from "./Geography3.module.css";

/* Atlas III — PLATE
 * Heritage atlas plate. Each entry is numbered (Plate I, Plate II…),
 * with a Roman numeral on the left, the place name + locus as a
 * scholarly title block, and the real x/y coordinates printed at
 * the bottom as a "reference" line — like the back of a real atlas. */

const toRoman = (n) => {
  const map = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let r = "";
  for (const [v, sym] of map) {
    while (n >= v) { r += sym; n -= v; }
  }
  return r;
};

function Plate({ place, index, isActive, onActivate }) {
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
      className={`${styles.plate} ${isActive ? styles.active : ""}`}
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
      <aside className={styles.numeral} aria-hidden="true">
        <div className={styles.numeralLabel}>Plate</div>
        <div className={styles.numeralValue}>{toRoman(index + 1)}</div>
      </aside>
      <div className={styles.plateBody}>
        <div className={styles.region}>{place.region}</div>
        <h2 className={styles.name}>{place.name}</h2>
        {place.label && <div className={styles.label}>— {place.label}</div>}
        <div className={styles.text}>{place.body}</div>
        <footer className={styles.reference}>
          <span className={styles.refLabel}>ref.</span>
          <span className={styles.refCoord}>
            {place.x}° / {place.y}°
          </span>
          <span className={styles.refSep}>·</span>
          <span className={styles.refScale}>scale {place.scale.toFixed(2)}×</span>
        </footer>
      </div>
    </article>
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
          <div className={styles.eyebrow}>Chapter II · Atlas III</div>
          <h1 className={styles.title}>The Geography</h1>
          <p className={styles.lede}>
            A continent of four faces, drawn together — and slowly torn apart — by a single
            inland sea.
          </p>
          <div className={styles.hint}>The plates of Val'Run. Scroll or click any.</div>
        </header>

        <div className={styles.plates}>
          {PLACES.map((place, i) => (
            <Plate
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
