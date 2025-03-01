import { SyncLoader } from "react-spinners";
import css from "./SpinnerLoader.module.css";

const SpinnerLoader = () => {
  const color = "#0b44cd";
  const size = "20px";

  return (
    <div className={css.loader}>
      <SyncLoader
        color={color}
        loading={true}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default SpinnerLoader;
