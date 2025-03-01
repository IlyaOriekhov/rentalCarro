import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehiclesList } from "../../redux/vehicleSlice";
import { buildSearchParams } from "../../utils/searchUtils";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import SearchPanel from "../../components/SearchPanel/SearchPanel";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import styles from "./CatalogPage.module.css";

const CatalogView = () => {
  const dispatch = useDispatch();

  const { vehiclesList, isLoading, errorMessage, currentPage, pagesCount } =
    useSelector((state) => state.vehicles);

  const {
    selectedVehicleBrand,
    selectedPriceOption,
    distanceMin,
    distanceMax,
  } = useSelector((state) => state.searchOptions);

  // Початкове завантаження даних - тільки якщо список порожній
  useEffect(() => {
    if (vehiclesList.length === 0) {
      dispatch(getVehiclesList({ page: 1, limit: 8 }));
    }
  }, [dispatch, vehiclesList.length]);

  // Функція для завантаження додаткових автомобілів
  const handleLoadMore = () => {
    // Використовуємо утиліту для побудови параметрів пошуку
    const params = buildSearchParams({
      page: currentPage,
      limit: 8,
      selectedVehicleBrand,
      selectedPriceOption,
      distanceMin,
      distanceMax,
    });

    dispatch(getVehiclesList(params));
  };

  return (
    <div className={styles.catalogContainer}>
      <SearchPanel />

      {errorMessage && (
        <p className={styles.errorMessage}>
          Something went wrong. Please try again later.
        </p>
      )}

      {isLoading && vehiclesList.length === 0 && (
        <div className={styles.loaderWrapper}>
          <SpinnerLoader />
        </div>
      )}

      {vehiclesList.length > 0 ? (
        <>
          <div className={styles.carsGrid}>
            {vehiclesList.map((vehicle, index) => (
              <VehicleCard
                key={`${vehicle.id}-${index}`}
                vehicleData={vehicle}
              />
            ))}
          </div>

          {currentPage <= pagesCount && !isLoading && (
            <LoadMoreButton onLoadMore={handleLoadMore} />
          )}
        </>
      ) : (
        !isLoading &&
        !errorMessage && (
          <p className={styles.noCarsMessage}>
            No cars found matching your criteria
          </p>
        )
      )}
    </div>
  );
};

export default CatalogView;
