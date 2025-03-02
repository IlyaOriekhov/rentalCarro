import styles from "./LoadMoreButton.module.css";

const LoadMoreButton = ({ onLoadMore }) => {
  return (
    <button
      type="button"
      className={styles.loadMoreButton}
      onClick={onLoadMore}
    >
      Load more
    </button>
  );
};

export default LoadMoreButton;
