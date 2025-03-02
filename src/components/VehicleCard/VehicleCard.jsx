import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleWishlistItem } from "../../redux/wishlistSlice";
import { formatDistance, parseAddress } from "../../utils/formatters";
import { getIconPath } from "../../utils/iconUtils";
import sprite from "../../images/sprite.svg";
import styles from "./VehicleCard.module.css";

const VehicleCard = ({ vehicleData }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isInWishlist = wishlistItems.some((item) => item.id === vehicleData.id);

  const { city, country } = parseAddress(vehicleData.address);

  const handleWishlistToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(toggleWishlistItem(vehicleData));
  };

  const tags = [
    city,
    country,
    vehicleData.rentalCompany,
    vehicleData.type,
    vehicleData.id % 2 === 0
      ? vehicleData.accessories[0]
      : vehicleData.functionalities[0],
    `${formatDistance(vehicleData.mileage)} km`,
  ].filter(Boolean);

  return (
    <article className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <img
          src={vehicleData.img}
          alt={`${vehicleData.brand} ${vehicleData.model}`}
          className={styles.vehicleImage}
          loading="lazy"
        />
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`${styles.wishlistButton} ${
            isInWishlist ? styles.isFavorite : ""
          }`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg className={styles.heartIcon} width="18" height="18">
            <use
              href={getIconPath(
                sprite,
                isInWishlist ? "blue-heart" : "white-heart"
              )}
            ></use>
          </svg>
        </button>
      </div>

      <div className={styles.infoBlock}>
        <div className={styles.titleRow}>
          <h3 className={styles.vehicleTitle}>
            {vehicleData.brand}{" "}
            <span className={styles.accentText}>{vehicleData.model}</span>,{" "}
            {vehicleData.year}
          </h3>
          <span className={styles.price}>${vehicleData.rentalPrice}</span>
        </div>

        <div className={styles.tagList}>
          {tags.map((tag, index) => (
            <span key={`tag-${index}`} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={`/catalog/${vehicleData.id}`}
          className={styles.detailsButton}
        >
          Read more
        </Link>
      </div>
    </article>
  );
};

export default memo(VehicleCard);
