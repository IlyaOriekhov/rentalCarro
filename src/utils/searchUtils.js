export const buildSearchParams = ({
  page = 1,
  limit = 8,
  selectedVehicleBrand = "",
  selectedPriceOption = "",
  distanceMin = "",
  distanceMax = "",
}) => {
  const params = {
    page,
    limit,
  };

  if (selectedVehicleBrand) params.brand = selectedVehicleBrand;
  if (selectedPriceOption) params.rentalPrice = selectedPriceOption;
  if (distanceMin) params.minMileage = parseInt(distanceMin, 10);
  if (distanceMax) params.maxMileage = parseInt(distanceMax, 10);

  return params;
};
