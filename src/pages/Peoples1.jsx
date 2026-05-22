import { PEOPLES, VARIANTS } from "../data/peoples.js";
import VariantSwitch from "../components/VariantSwitch.jsx";
import styles from "./Peoples1.module.css";

const HERO = "/hero/05-peoples.jpg";

export default function Peoples1() {
  return (
    <div className={styles.bestiary}>
      <div className={styles.bg} style={{ backgroundImage: `url(${HERO})` }} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      <article className={styles.scroll}>
        <header className={styles.head}>
          <div className={styles.eyebrow}>Chapter IV · Variant I</div>
          <h1 className={styles.title}>The Peoples</h1>
          <div className={styles.rule} aria-hidden="true"><span>◆</span></div>
          <p className={styles.lede}>
            Eleven kindreds share Val'Run. Six are remembered in scripture; five watch from the edges
            of recorded history.
          </p>
        </header>

        <div className={styles.entries}>
          {PEOPLES.map((p, i) => (
            <article key={p.name} className={styles.entry}>
              <h2 className={styles.entryName}>
                <span className={styles.initial}>{p.name.charAt(0)}</span>
                <span className={styles.rest}>{p.name.slice(1)}</span>
              </h2>
              <p className={styles.entryDesc}>{p.desc}</p>
              {i < PEOPLES.length - 1 && (
                <div className={styles.divider} aria-hidden="true">
                  <span>◆</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </article>

      <VariantSwitch variants={VARIANTS} label="Peoples · style" />
    </div>
  );
}
