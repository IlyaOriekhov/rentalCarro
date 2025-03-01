// src/pages/NotFoundPage/NotFoundView.jsx
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.message}>
          The page you`re looking for doesn`t exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.homeButton}>
            Back to Home
          </Link>
          <Link to="/catalog" className={styles.catalogButton}>
            Browse Vehicles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
