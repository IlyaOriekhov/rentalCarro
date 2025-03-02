import { Link, useLocation } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import Logo from "../../images/Logo.svg";

const NavigationBar = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <nav className={styles.navigation}>
          <Link
            to="/"
            className={`${styles.navLink} ${
              location.pathname === "/" ? styles.active : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/catalog"
            className={`${styles.navLink} ${
              location.pathname.includes("/catalog") ? styles.active : ""
            }`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
