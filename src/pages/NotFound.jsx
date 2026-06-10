import { Link } from "react-router-dom";
import useDocumentMeta from "../hooks/useDocumentMeta.js";
import styles from "./NotFound.module.css";

export default function NotFound() {
  useDocumentMeta("Lost in the margins");
  return (
    <div className={styles.lost}>
      <img src="/hero/06-the-crack.jpg" alt="" className={styles.lostBg} decoding="async" />
      <div className={styles.lostVignette} aria-hidden="true" />
      <div className={styles.lostContent}>
        <div className={styles.eyebrow}>Errata</div>
        <h1 className={styles.title}>Lost in the margins</h1>
        <p className={styles.lede}>No page bears that name in this folio.</p>
        <p className={styles.back}>
          Return to the <Link to="/" viewTransition>frontispiece</Link>, or pick a chapter from
          the spine above.
        </p>
      </div>
    </div>
  );
}
