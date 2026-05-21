import styles from "./Page.module.css";

export function Page({ eyebrow, title, lede, children }) {
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

export function Flourish() {
  return (
    <div className="flourish" aria-hidden="true">
      <span className="flourish-mark">◆</span>
    </div>
  );
}

export function Section({ eyebrow, title, children }) {
  return (
    <section className={styles.section}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      <div>{children}</div>
    </section>
  );
}

export function NamedList({ items }) {
  return (
    <dl className={styles.namedList}>
      {items.map((item) => (
        <div key={item.name} className={styles.namedItem}>
          <dt className={styles.namedTerm}>{item.name}</dt>
          <dd className={styles.namedDesc}>{item.desc}</dd>
        </div>
      ))}
    </dl>
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
