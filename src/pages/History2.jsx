import { useEffect, useRef, useState } from "react";
import { HISTORY, HISTORY_INTRO, HISTORY_VARIANTS } from "../data/history.jsx";
import VariantSwitch from "../components/VariantSwitch.jsx";
import styles from "./History2.module.css";

const MAP = "/map.jpg";

/* per-Age focal point on the map (x, y as percentages of the image,
   plus a zoom scale). Approximate, tunable. The map image (Projekt X)
   has Cinder Island around 30/65, Aureon center-ish, the Gyre at ~62/40,
   Verdure / Frostcrowns upper-left. */
const FOCI = [
  { x: 50, y: 50, scale: 1.05, label: "the world entire" },        // I  · Shaping
  { x: 50, y: 50, scale: 1.15, label: "the wandering peoples" },   // II · Wandering
  { x: 30, y: 65, scale: 2.1,  label: "Cinder Island / Zelkarun" },// III· Zelkaris + Impact
  { x: 45, y: 50, scale: 1.65, label: "the warring states" },      // IV · Dark Age
  { x: 50, y: 45, scale: 1.7,  label: "Aureon · the Empire" },     // V  · Empire
  { x: 25, y: 28, scale: 1.85, label: "Verdure · Everpeak rising" },// VI · Reformation
  { x: 62, y: 40, scale: 1.95, label: "the Gyre · the present" },  // VII· New Age
];

function Era({ age, focus, index, onActive }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.45) {
          onActive(index);
        }
      },
      { threshold: [0.45, 0.6, 0.8] },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [index, onActive]);

  return (
    <article ref={ref} className={styles.era}>
      <div className={styles.eraHead}>
        <span className={styles.roman}>{age.roman}</span>
        <div className={styles.eraHeadText}>
          <div className={styles.era_label}>{age.era}</div>
          <h2 className={styles.eraTitle}>{age.title}</h2>
          <div className={styles.locus}>{focus.label}</div>
        </div>
      </div>
      <div className={styles.body}>{age.body}</div>
    </article>
  );
}

export default function History2() {
  const [activeIndex, setActiveIndex] = useState(0);
  const focus = FOCI[activeIndex] ?? FOCI[0];

  return (
    <div className={styles.mapPage}>
      {/* the sticky map stage */}
      <div className={styles.stage} aria-hidden="true">
        <div
          className={styles.mapImage}
          style={{
            backgroundImage: `url(${MAP})`,
            transform: `scale(${focus.scale})`,
            transformOrigin: `${focus.x}% ${focus.y}%`,
          }}
        />
        <div className={styles.stageOverlay} />
        {/* pulsing focus pin at the current era's spot */}
        <div
          className={styles.pin}
          style={{ left: `${focus.x}%`, top: `${focus.y}%` }}
        >
          <span className={styles.pinDot} />
          <span className={styles.pinRing} />
        </div>
      </div>

      {/* scrolling body on the right */}
      <div className={styles.scrollArea}>
        <header className={styles.head}>
          <div className={styles.eyebrow}>Chapter III · Variant II</div>
          <h1 className={styles.title}>The History</h1>
          <div className={styles.headRule} aria-hidden="true"><span>◆</span></div>
          <p className={styles.lede}>{HISTORY_INTRO}</p>
          <div className={styles.hint}>Scroll to travel through the Seven Ages — the map will follow you.</div>
        </header>

        <div className={styles.eras}>
          {HISTORY.map((age, i) => (
            <Era
              key={age.title}
              age={age}
              focus={FOCI[i]}
              index={i}
              onActive={setActiveIndex}
            />
          ))}
        </div>
      </div>

      <VariantSwitch variants={HISTORY_VARIANTS} label="History · style" />
    </div>
  );
}
