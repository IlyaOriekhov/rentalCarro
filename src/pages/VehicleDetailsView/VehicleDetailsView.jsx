import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVehicleDetails } from "../../redux/vehicleSlice";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import RentalForm from "../../components/RentalForm/RentalForm";
import VehicleInfo from "../../components/VehicleInfo/VehicleInfo";
import styles from "./VehicleDetailsView.module.css";

const VehicleDetailsView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentVehicle: car, isLoading } = useSelector(
    (state) => state.vehicles
  );

  useEffect(() => {
    dispatch(getVehicleDetails(id));
  }, [dispatch, id]);

  if (isLoading || !car) {
    return (
      <div className={styles.container}>
        <SpinnerLoader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.imageContainer}>
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className={styles.carImage}
            />
          </div>

          <div className={styles.bookingFormContainer}>
            <RentalForm />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <VehicleInfo car={car} />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsView;
