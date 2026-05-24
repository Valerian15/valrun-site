import { useEffect, useMemo, useRef, useState } from "react";
import GeoMapStage from "../components/GeoMapStage.jsx";
import { PLACES } from "../data/geography.jsx";
import styles from "./Geography.module.css";

/* The Geography — an almanac of Val'Run.
 * Places grouped under region chapters; each place is its own framed
 * card with gold corner brackets. Click or scroll to make the sticky
 * left-side map pan/zoom to that place. */

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
      <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

      <h3 className={styles.name}>{place.name}</h3>
      {place.label && <div className={styles.label}>{place.label}</div>}
      <div className={styles.body}>{place.body}</div>
    </article>
  );
}

export default function Geography() {
  const [activeIndex, setActiveIndex] = useState(0);
  const focus = PLACES[activeIndex] ?? PLACES[0];

  /* group places by region, preserving original index for the observer */
  const grouped = useMemo(() => {
    const order = [];
    const byRegion = {};
    PLACES.forEach((p, i) => {
      if (!byRegion[p.region]) {
        byRegion[p.region] = [];
        order.push(p.region);
      }
      byRegion[p.region].push({ ...p, _index: i });
    });
    return order.map((region) => ({ region, places: byRegion[region] }));
  }, []);

  return (
    <div className={styles.mapPage}>
      <GeoMapStage focus={focus} />

      <div className={styles.scrollArea}>
        <header className={styles.head}>
          <div className={styles.eyebrow}>Chapter II</div>
          <h1 className={styles.title}>The Geography</h1>
          <p className={styles.lede}>
            A continent of four faces, drawn together — and slowly torn apart — by a single
            inland sea.
          </p>
          <div className={styles.hint}>An almanac of Val'Run. Scroll or click any place.</div>
        </header>

        <div className={styles.almanac}>
          {grouped.map(({ region, places }) => (
            <section key={region} className={styles.region}>
              <header className={styles.regionHead}>
                <div className={styles.regionOrnament} aria-hidden="true">✦</div>
                <h2 className={styles.regionName}>{region}</h2>
                <div className={styles.regionRule} aria-hidden="true" />
              </header>
              <div className={styles.entries}>
                {places.map((place) => (
                  <Entry
                    key={place.name}
                    place={place}
                    index={place._index}
                    isActive={place._index === activeIndex}
                    onActivate={setActiveIndex}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
