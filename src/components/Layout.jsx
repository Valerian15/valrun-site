import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const NAV = [
  { to: "/lore",       label: "Lore" },
  { to: "/geography",  label: "Geography" },
  { to: "/history",    label: "History" },
  { to: "/peoples",    label: "Peoples" },
  { to: "/faith",      label: "Faith" },
  { to: "/factions",   label: "Factions" },
  { to: "/language",   label: "Language" },
  { to: "/map",        label: "Map" },
  { to: "/gallery",    label: "Gallery" },
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
