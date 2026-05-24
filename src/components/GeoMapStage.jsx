import styles from "./GeoMapStage.module.css";

const MAP = "/map.jpg";

/* Sticky map stage — left-half of the geography page. Shared across
 * all design variants. Renders the map at its native 4:3 aspect inside
 * a canvas wrapper so coordinate percentages align 1:1 with the image. */
export default function GeoMapStage({ focus }) {
  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.canvas}>
        <div
          className={styles.mapImage}
          style={{
            backgroundImage: `url(${MAP})`,
            transform: `scale(${focus.scale})`,
            transformOrigin: `${focus.x}% ${focus.y}%`,
          }}
        />
        <div
          className={styles.pin}
          style={{ left: `${focus.x}%`, top: `${focus.y}%` }}
        >
          <span className={styles.pinDot} />
          <span className={styles.pinRing} />
        </div>
      </div>
      <div className={styles.stageOverlay} />
    </div>
  );
}
