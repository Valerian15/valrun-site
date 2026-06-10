import { NavLink, Outlet } from "react-router-dom";
import { CHAPTERS } from "../data/chapters.js";
import styles from "./Layout.module.css";

const NAV = CHAPTERS.map(({ slug, label }) => ({ to: slug, label }));

export default function Layout() {
  return (
    <div className={styles.shell}>
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <NavLink to="/" viewTransition className={styles.brand}>
            <span className={styles.brandText}>Val'Run</span>
          </NavLink>
          <nav className={styles.nav}>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                viewTransition
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <a
            href="https://app.valrun.org"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.appCta}
            aria-label="Enter the tabletop (app.valrun.org)"
            title="Enter the tabletop"
          >
            <img
              src="/valrun-tree-160.png"
              alt=""
              className={styles.appCtaIcon}
              width="36"
              height="36"
            />
          </a>
        </div>
      </header>

      <main id="main" className={styles.main} tabIndex={-1}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span>Val'Run · a worldbuilding compendium</span>
          <span className={styles.footerMeta}>valrun.org</span>
        </div>
      </footer>
    </div>
  );
}
