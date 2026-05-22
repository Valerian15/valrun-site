import { useEffect, useRef, useState } from "react";
import { HISTORY, HISTORY_INTRO, HISTORY_VARIANTS } from "../data/history.jsx";
import VariantSwitch from "../components/VariantSwitch.jsx";
import styles from "./History1.module.css";

const HERO = "/hero/02-the-breaking.jpg";

/* one continuous river of time:
   - the chapter image is fixed behind everything and slowly scales/pans
     as the user scrolls (CSS scroll-driven animation; gracefully degrades)
   - each Age is a viewport-tall "stop" with its own color tint blending
     over the image — cold-blue at the start, ember-warm at the end
   - era marker and body fade in when the era enters view              */

function Era({ age, index, total }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.35 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={styles.era}
      data-age={index + 1}
      style={{ "--era-progress": (index + 1) / total }}
    >
      <div className={styles.tint} aria-hidden="true" />
      <div className={`${styles.eraContent} ${inView ? styles.visible : ""}`}>
        <div className={styles.marker}>
          <span className={styles.markerLine} aria-hidden="true" />
          <span className={styles.markerText}>anno&nbsp;{age.roman}</span>
          <span className={styles.markerLine} aria-hidden="true" />
        </div>
        <h2 className={styles.eraTitle}>{age.title}</h2>
        <div className={styles.eraDates}>
          {age.era.replace(/^[a-z]+ age( ·\s*)?/, "") || "before the calendar"}
        </div>
        <div className={styles.body}>{age.body}</div>
      </div>
    </section>
  );
}

export default function History1() {
  return (
    <div className={styles.river}>
      <div className={styles.bg} style={{ backgroundImage: `url(${HERO})` }} aria-hidden="true" />

      {/* opening title — no tint, full image visible */}
      <section className={`${styles.era} ${styles.opening}`} data-age="0">
        <div className={styles.openingContent}>
          <div className={styles.eyebrow}>Chapter III · Variant I</div>
          <h1 className={styles.openingTitle}>The History</h1>
          <div className={styles.openingRule} aria-hidden="true"><span>◆</span></div>
          <p className={styles.openingLede}>{HISTORY_INTRO}</p>
          <div className={styles.scrollCue} aria-hidden="true">
            <span>begin</span><span>↓</span>
          </div>
        </div>
      </section>

      {HISTORY.map((age, i) => (
        <Era key={age.title} age={age} index={i} total={HISTORY.length} />
      ))}

      {/* coda — present day */}
      <section className={`${styles.era} ${styles.coda}`} data-age="present">
        <div className={styles.tint} aria-hidden="true" />
        <div className={styles.openingContent}>
          <div className={styles.eyebrow}>1,147 AI · present</div>
          <h2 className={styles.codaTitle}>The Anchor continues to crack.</h2>
        </div>
      </section>

      <VariantSwitch variants={HISTORY_VARIANTS} label="History · style" />
    </div>
  );
}
