import { useEffect, useRef, useState } from "react";
import { PEOPLES, VARIANTS } from "../data/peoples.js";
import VariantSwitch from "../components/VariantSwitch.jsx";
import styles from "./Peoples2.module.css";

const HERO = "/hero/05-peoples.jpg";

export default function Peoples2() {
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // intro slide + each peoples slide
  const slides = [{ kind: "intro" }, ...PEOPLES.map((p) => ({ kind: "people", ...p }))];

  useEffect(() => {
    const refs = slideRefs.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.55) {
            const i = refs.indexOf(e.target);
            if (i >= 0) setActiveIndex(i);
          }
        });
      },
      { threshold: [0.55, 0.75] },
    );
    refs.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToIndex = (i) => {
    const el = slideRefs.current[i];
    if (el && trackRef.current) {
      trackRef.current.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.carouselWrap}>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${HERO})` }}
        aria-hidden="true"
      />
      <div className={styles.bgOverlay} aria-hidden="true" />

      <div className={styles.track} ref={trackRef}>
        {slides.map((s, i) => (
          <section
            key={s.kind === "intro" ? "intro" : s.name}
            ref={(el) => (slideRefs.current[i] = el)}
            className={styles.slide}
          >
            {s.kind === "intro" ? (
              <>
                <div className={styles.eyebrow}>Chapter IV · Variant II</div>
                <h1 className={styles.title}>The Peoples</h1>
                <div className={styles.rule} aria-hidden="true"><span>◆</span></div>
                <p className={styles.lede}>
                  Eleven kindreds share Val'Run. Six are remembered in scripture; five watch
                  from the edges of recorded history.
                </p>
                <div className={styles.scrollCue} aria-hidden="true">
                  <span>turn the pages</span>
                  <span>→</span>
                </div>
              </>
            ) : (
              <>
                <div className={styles.slideNumber}>
                  {String(i).padStart(2, "0")} <span>· of {PEOPLES.length}</span>
                </div>
                <h2 className={styles.slideName}>{s.name}</h2>
                <div className={styles.rule} aria-hidden="true"><span>◆</span></div>
                <p className={styles.slideDesc}>{s.desc}</p>
              </>
            )}
          </section>
        ))}
      </div>

      {/* arrow nav */}
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowPrev}`}
        onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
        aria-label="Previous"
        disabled={activeIndex === 0}
      >
        ‹
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowNext}`}
        onClick={() => scrollToIndex(Math.min(slides.length - 1, activeIndex + 1))}
        aria-label="Next"
        disabled={activeIndex === slides.length - 1}
      >
        ›
      </button>

      {/* dot nav */}
      <div className={styles.dots} aria-hidden="true">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <VariantSwitch variants={VARIANTS} label="Peoples · style" />
    </div>
  );
}
