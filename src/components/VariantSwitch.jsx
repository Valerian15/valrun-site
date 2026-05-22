import { NavLink } from "react-router-dom";
import styles from "./VariantSwitch.module.css";

export default function VariantSwitch({ variants, label = "Style" }) {
  return (
    <div className={styles.bar}>
      <span className={styles.label}>{label}</span>
      <div className={styles.chips}>
        {variants.map((v) => (
          <NavLink
            key={v.to}
            to={v.to}
            end
            className={({ isActive }) =>
              `${styles.chip} ${isActive ? styles.active : ""}`
            }
          >
            {v.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
