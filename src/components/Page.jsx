import { useEffect, useRef, useState } from "react";
import styles from "./Page.module.css";

/* ── shared sub-components ─────────────────────────── */

export function Section({ eyebrow, title, children }) {
  return (
    <section className={styles.section}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

export function NamedList({ items }) {
  return (
    <dl className={styles.namedList}>
      {items.map((item) => (
        <div key={item.name} className={styles.namedItem}>
          <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />
          <dt className={styles.namedTerm}>{item.name}</dt>
          <dd className={styles.namedDesc}>{item.desc}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Flourish() {
  return (
    <div className="flourish" aria-hidden="true">
      <span className="flourish-mark">◆</span>
    </div>
  );
}

export function Placeholder({ note }) {
  return (
    <div className={styles.placeholder}>
      <span className={styles.placeholderMark}>✶</span>
      <p className={styles.placeholderText}>
        {note ?? "This page is awaiting its scribe. Content will be inscribed here."}
      </p>
    </div>
  );
}

/* ── scroll-triggered fade-in hook ─────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── default (legacy) variant ──────────────────────── */

function DefaultPage({ eyebrow, title, lede, children }) {
  return (
    <article className={`container ${styles.page}`}>
      <header className={styles.head}>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 className={styles.title}>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
      </header>
      <div className={styles.body}>{children}</div>
    </article>
  );
}

/* ── cinematic variants ────────────────────────────── */

function CinematicHero({ eyebrow, title, lede, heroImage }) {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      ref={ref}
      className={styles.cinematicHero}
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className={styles.cinematicVignette} />
      <div className={`${styles.cinematicContent} ${inView ? styles.visible : ""}`}>
        {eyebrow && <div className={styles.cinematicEyebrow}>{eyebrow}</div>}
        <h1 className={styles.cinematicTitle}>{title}</h1>
        <div className={styles.cinematicRule} aria-hidden="true">
          <span>◆</span>
        </div>
        {lede && <p className={styles.cinematicLede}>{lede}</p>}
      </div>
      <div className={styles.cinematicScrollCue} aria-hidden="true">
        <span>read on</span>
        <span>↓</span>
      </div>
    </section>
  );
}

function CinematicBody({ bodyStyle, heroImage, children }) {
  /* panels — each Section becomes a full-viewport panel; NamedLists become cards */
  if (bodyStyle === "panels") {
    return (
      <div
        className={styles.bodyPanels}
        style={{ "--panel-bg": `url(${heroImage})` }}
      >
        {children}
      </div>
    );
  }
  /* timeline — vertical spine, era cards alternating left/right (History) */
  if (bodyStyle === "timeline") {
    return <div className={styles.bodyTimeline}>{children}</div>;
  }
  /* default cinematic body — clean centered column */
  return <div className={`container ${styles.cinematicBody}`}>{children}</div>;
}

function CinematicPage({ eyebrow, title, lede, heroImage, bodyStyle, children }) {
  return (
    <article className={styles.cinematicPage}>
      <CinematicHero eyebrow={eyebrow} title={title} lede={lede} heroImage={heroImage} />
      <CinematicBody bodyStyle={bodyStyle} heroImage={heroImage}>
        {children}
      </CinematicBody>
    </article>
  );
}

/* ── folio (manuscript) variant ────────────────────── */

function FolioPage({ eyebrow, title, lede, children }) {
  return (
    <div className={styles.folioWrap}>
      <article className={styles.folioPaper}>
        <header className={styles.folioHead}>
          {eyebrow && <div className={styles.folioFolio}>{eyebrow}</div>}
          <div className={styles.folioOrnamentTop} aria-hidden="true">✦</div>
          <h1 className={styles.folioTitle}>{title}</h1>
          <div className={styles.folioRule} aria-hidden="true">
            <span>◆</span>
          </div>
          {lede && <p className={styles.folioLede}>{lede}</p>}
        </header>
        <div className={styles.folioBody}>{children}</div>
        <div className={styles.folioOrnamentBottom} aria-hidden="true">✦</div>
      </article>
    </div>
  );
}

/* ── public Page API ───────────────────────────────── */

export function Page({ variant, heroImage, bodyStyle, ...props }) {
  if (variant === "cinematic" && heroImage) {
    return <CinematicPage heroImage={heroImage} bodyStyle={bodyStyle} {...props} />;
  }
  if (variant === "folio") {
    return <FolioPage {...props} />;
  }
  return <DefaultPage {...props} />;
}
