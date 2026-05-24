import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

/* ── data ───────────────────────────────────────────── */

const CHAPTERS = [
  {
    img: "/hero/02-the-breaking.jpg",
    eyebrow: "I.",
    title: "The Breaking",
    body: "A meteor struck the heart of Cinder Island in Year 0. The world has been answering ever since.",
    to: "/history",
    cta: "Read the seven ages",
    align: "left",
  },
  {
    img: "/hero/03-aetherflow.jpg",
    eyebrow: "II.",
    title: "The Architect's Breath",
    body: "Eonar drew the first breath, and that breath has not stopped — it moves still, through stone, water, flesh, and the space between stars.",
    to: "/lore",
    cta: "Enter the lore",
    align: "right",
  },
  {
    img: "/hero/04-continent.jpg",
    eyebrow: "III.",
    title: "The Continent of Four Faces",
    body: "Verdure, Twiland, Sarudar, Cinder — drawn together and slowly torn apart by a single inland sea.",
    to: "/geography",
    cta: "Cross the continent",
    align: "left",
  },
  {
    img: "/hero/05-peoples.jpg",
    eyebrow: "IV.",
    title: "The Eleven Kindreds",
    body: "Six peoples are remembered in scripture. Five watch from the edges of recorded history.",
    to: "/peoples",
    cta: "Meet the peoples",
    align: "right",
  },
  {
    img: "/hero/06-the-crack.jpg",
    eyebrow: "V.",
    title: "The Crack Beneath",
    body: "The Anchor continues to crack. None who hold the pieces of the puzzle have yet spoken to one another.",
    to: "/lore",
    cta: "Listen for the hum",
    align: "center",
  },
];

const CODA_LINKS = [
  { to: "/lore",       label: "Lore" },
  { to: "/geography",  label: "Geography" },
  { to: "/history",    label: "History" },
  { to: "/peoples",    label: "Peoples" },
  { to: "/faith",      label: "Faith" },
  { to: "/factions",   label: "Factions" },
];

/* ── hook: fade in on scroll ────────────────────────── */

function useInView(threshold = 0.35) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
        });
      },
      { threshold },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── components ─────────────────────────────────────── */

function Frontispiece() {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      ref={ref}
      className={styles.frontispiece}
      style={{ backgroundImage: "url(/hero/01-frontispiece.jpg)" }}
    >
      <div className={styles.vignetteFrontispiece} />
      <div className={`${styles.frontContent} ${inView ? styles.visible : ""}`}>
        <div className={styles.eyebrow}>A worldbuilding compendium</div>
        <h1 className={styles.frontTitle}>Val'Run</h1>
        <div className={styles.frontRule} aria-hidden="true">
          <span>◆</span>
        </div>
        <p className={styles.frontLede}>
          A world that lives atop a wound — and a quiet doctrine that holds it together:
          <em> the breaking is necessary, and whoever forgets this will be answered.</em>
        </p>
        <div className={styles.scrollCue} aria-hidden="true">
          <span>begin</span>
          <span className={styles.scrollArrow}>↓</span>
        </div>
      </div>
    </section>
  );
}

function Chapter({ img, eyebrow, title, body, to, cta, align }) {
  const [ref, inView] = useInView(0.3);
  const alignClass =
    align === "right" ? styles.alignRight : align === "center" ? styles.alignCenter : styles.alignLeft;
  const vignetteClass =
    align === "right" ? styles.vignetteRight : align === "center" ? styles.vignetteCenter : styles.vignetteLeft;
  return (
    <section ref={ref} className={styles.chapter} style={{ backgroundImage: `url(${img})` }}>
      <div className={`${styles.vignette} ${vignetteClass}`} />
      <div className={`${styles.chapterContent} ${alignClass} ${inView ? styles.visible : ""}`}>
        <div className={styles.romanWrap}>
          <span className={styles.roman}>{eyebrow}</span>
        </div>
        <h2 className={styles.chapterTitle}>{title}</h2>
        <p className={styles.chapterBody}>{body}</p>
        <Link to={to} className={styles.chapterLink}>
          {cta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function Coda() {
  const [ref, inView] = useInView(0.2);
  return (
    <section ref={ref} className={styles.coda}>
      <div className={`${styles.codaContent} ${inView ? styles.visible : ""}`}>
        <div className={styles.eyebrow}>The compendium</div>
        <h2 className={styles.codaTitle}>Read on</h2>
        <div className={styles.codaRule} aria-hidden="true">
          <span>◆</span>
        </div>
        <ul className={styles.codaList}>
          {CODA_LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={styles.codaLink}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── page ───────────────────────────────────────────── */

export default function Home() {
  return (
    <div className={styles.home}>
      <Frontispiece />
      {CHAPTERS.map((c) => (
        <Chapter key={c.title} {...c} />
      ))}
      <Coda />
    </div>
  );
}
