import { PEOPLES } from "../data/peoples.js";
import TarotCard from "../components/TarotCard.jsx";
import ChapterHero from "../components/ChapterHero.jsx";
import useDocumentMeta from "../hooks/useDocumentMeta.js";
import { chapterFor } from "../data/chapters.js";
import styles from "./Peoples.module.css";

const HERO = "/hero/05-peoples.jpg";

export default function Peoples() {
  useDocumentMeta("The Peoples");
  const ch = chapterFor("/peoples");
  return (
    <>
      <ChapterHero
        numeral={ch.numeral}
        title={ch.title}
        lede="Twelve kindreds, laid out as a spread. Turn any card to read its tale."
        image={ch.hero}
      />
      <div className={styles.tarotWrap}>
        <div className={styles.bg} style={{ backgroundImage: `url(${HERO})` }} aria-hidden="true" />
        <div className={styles.bgOverlay} aria-hidden="true" />
        <div className={styles.spread}>
          {PEOPLES.map((p) => (
            <TarotCard key={p.name} name={p.name} description={p.desc} image={p.image} />
          ))}
        </div>
      </div>
    </>
  );
}
