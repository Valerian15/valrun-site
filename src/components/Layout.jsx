import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const NAV = [
  { to: "/geography",  label: "Geography" },
  { to: "/history",    label: "History" },
  { to: "/peoples",    label: "Peoples" },
  { to: "/faith",      label: "Faith" },
  { to: "/factions",   label: "Factions" },
];

export default function Layout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <NavLink to="/" className={styles.brand}>
            <span className={styles.brandMark}>✦</span>
            <span className={styles.brandText}>Val'Run</span>
          </NavLink>
          <nav className={styles.nav}>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
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
              src="/valrun-tree.png"
              alt=""
              className={styles.appCtaIcon}
              width="36"
              height="36"
            />
          </a>
        </div>
      </header>

      <main className={styles.main}>
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
