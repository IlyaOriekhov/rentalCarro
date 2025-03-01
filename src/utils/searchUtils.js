/**
 * Формує параметри пошуку на основі вибраних фільтрів
 * @param {Object} options - Об'єкт з опціями пошуку
 * @param {number} options.page - Номер сторінки
 * @param {number} options.limit - Кількість елементів на сторінці
 * @param {string} options.selectedVehicleBrand - Вибраний бренд
 * @param {string} options.selectedPriceOption - Вибрана ціна
 * @param {string} options.distanceMin - Мінімальний пробіг
 * @param {string} options.distanceMax - Максимальний пробіг
 * @returns {Object} Параметри пошуку для API
 */
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
  if (distanceMin) params.minMileage = distanceMin;
  if (distanceMax) params.maxMileage = distanceMax;

  return params;
};
