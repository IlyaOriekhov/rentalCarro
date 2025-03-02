import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadBrands,
  updateBrandFilter,
  updatePriceFilter,
  updateMinDistanceFilter,
  updateMaxDistanceFilter,
} from "../../redux/searchOptionsSlice";
import { clearVehiclesList } from "../../redux/vehicleSlice";
import { getVehiclesList } from "../../redux/vehicleSlice";
import { buildSearchParams } from "../../utils/searchUtils";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./SearchPanel.module.css";

const SearchPanel = () => {
  const dispatch = useDispatch();
  const {
    availableBrands,
    selectedVehicleBrand,
    selectedPriceOption,
    distanceMin,
    distanceMax,
  } = useSelector((state) => state.searchOptions);

  useEffect(() => {
    dispatch(loadBrands());
  }, [dispatch]);

  const priceOptions = Array.from({ length: 11 }, (_, i) => ({
    value: (i + 3) * 10,
    label: String((i + 3) * 10),
  }));

  const brandOptions = availableBrands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const handleSearch = () => {
    const params = buildSearchParams({
      page: 1,
      limit: 8,
      selectedVehicleBrand,
      selectedPriceOption,
      distanceMin,
      distanceMax,
    });

    dispatch(clearVehiclesList());
    dispatch(getVehiclesList(params));
  };

  const formatPriceDisplay = (value) => {
    return value ? `To $${value}` : "Choose a price";
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <label className={styles.label}>Car brand</label>
        <Dropdown
          options={brandOptions}
          value={selectedVehicleBrand}
          onChange={(value) => dispatch(updateBrandFilter(value))}
          placeholder="Choose a brand"
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Price / 1 hour</label>
        <Dropdown
          options={priceOptions}
          value={selectedPriceOption}
          onChange={(value) => dispatch(updatePriceFilter(value))}
          placeholder="Choose a price"
          displayValue={formatPriceDisplay}
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Car mileage / km</label>
        <div className={styles.mileageContainer}>
          <input
            className={`${styles.input} ${styles.leftInput}`}
            placeholder="From"
            value={distanceMin}
            onChange={(e) => dispatch(updateMinDistanceFilter(e.target.value))}
            type="text"
            inputMode="numeric"
          />
          <input
            className={`${styles.input} ${styles.rightInput}`}
            placeholder="To"
            value={distanceMax}
            onChange={(e) => dispatch(updateMaxDistanceFilter(e.target.value))}
            type="text"
            inputMode="numeric"
          />
        </div>
      </div>

      <button className={styles.primaryButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchPanel;
