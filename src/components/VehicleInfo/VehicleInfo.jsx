import { memo } from "react";
import { formatDistance, parseAddress } from "../../utils/formatters";
import { getIconPath } from "../../utils/iconUtils";
import styles from "./VehicleInfo.module.css";
import sprite from "../../images/sprite.svg";

const VehicleInfo = ({ car }) => {
  if (!car) return null;

  const { city, country } = parseAddress(car.address);

  return (
    <>
      <h1 className={styles.carTitle}>
        {car.brand} {car.model}, {car.year}
      </h1>

      <div className={styles.locationInfo}>
        <svg className={styles.icon} width="16" height="16">
          <use href={getIconPath(sprite, "location")}></use>
        </svg>
        {city}, {country}
        <span className={styles.mileageInfo}>
          Mileage: {formatDistance(car.mileage)} km
        </span>
      </div>

      <div className={styles.priceSection}>
        <span className={styles.price}>${car.rentalPrice}</span>
      </div>

      <div className={styles.description}>
        <p>{car.description}</p>
      </div>

      <div className={styles.carInfo}>
        <div className={styles.sectionFirst}>
          <h2 className={styles.sectionTitle}>Rental Conditions:</h2>
          <ul className={styles.conditionsList}>
            {car.rentalConditions.map((condition, index) => {
              if (condition.includes("Minimum age")) {
                const [text, age] = condition.split(": ");
                return (
                  <li key={index} className={styles.conditionItem}>
                    <svg
                      className={styles.conditionIcon}
                      width="16"
                      height="16"
                    >
                      <use href={getIconPath(sprite, "check")}></use>
                    </svg>
                    {text}: {age}
                  </li>
                );
              }
              return (
                <li key={index} className={styles.conditionItem}>
                  <svg className={styles.conditionIcon} width="16" height="16">
                    <use href={getIconPath(sprite, "check")}></use>
                  </svg>
                  {condition}
                </li>
              );
            })}
            <li className={styles.conditionItem}>
              <svg className={styles.conditionIcon} width="16" height="16">
                <use href={getIconPath(sprite, "check")}></use>
              </svg>
              Security deposite required
            </li>
            <li className={styles.conditionItem}>
              <svg className={styles.conditionIcon} width="16" height="16">
                <use href={getIconPath(sprite, "check")}></use>
              </svg>
              Valid driver`s license
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Car Specifications:</h2>
          <ul className={styles.specsList}>
            <li className={styles.specItem}>
              <svg className={styles.specIcon} width="16" height="16">
                <use href={getIconPath(sprite, "calendar")}></use>
              </svg>
              Year: {car.year}
            </li>
            <li className={styles.specItem}>
              <svg className={styles.specIcon} width="16" height="16">
                <use href={getIconPath(sprite, "car")}></use>
              </svg>
              Type: {car.type}
            </li>
            <li className={styles.specItem}>
              <svg className={styles.specIcon} width="16" height="16">
                <use href={getIconPath(sprite, "gas")}></use>
              </svg>
              Fuel Consumption: {car.fuelConsumption}
            </li>
            <li className={styles.specItem}>
              <svg className={styles.specIcon} width="16" height="16">
                <use href={getIconPath(sprite, "setting")}></use>
              </svg>
              Engine Size: {car.engineSize}
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Accessories and functionalities:
          </h2>
          <ul className={styles.accessoriesList}>
            {car.accessories.map((accessory, index) => (
              <li key={`accessory-${index}`} className={styles.accessoryItem}>
                <svg className={styles.accessoryIcon} width="16" height="16">
                  <use href={getIconPath(sprite, "check")}></use>
                </svg>
                {accessory}
              </li>
            ))}
            {car.functionalities.map((functionality, index) => (
              <li
                key={`functionality-${index}`}
                className={styles.accessoryItem}
              >
                <svg className={styles.accessoryIcon} width="16" height="16">
                  <use href={getIconPath(sprite, "check")}></use>
                </svg>
                {functionality}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default memo(VehicleInfo);
