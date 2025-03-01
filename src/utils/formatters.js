/**
 * Форматує число пробігу з розділювачем тисяч
 * @param {number} value - Число, яке потрібно відформатувати
 * @param {string} separator - Розділювач (за замовчуванням пробіл)
 * @returns {string} Відформатоване число
 */
export const formatDistance = (value, separator = " ") => {
  if (!value && value !== 0) return "";

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

/**
 * Форматує ціну в доларах
 * @param {number|string} price - Ціна для форматування
 * @returns {string} Ціна з символом долара
 */
export const formatPrice = (price) => {
  if (!price) return "$0";
  return `$${price}`;
};

/**
 * Форматує дату у вигляді DD.MM.YYYY
 * @param {Date} date - Об'єкт дати
 * @returns {string} Відформатована дата
 */
export const formatDate = (date) => {
  if (!date) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

/**
 * Розбиває адресу на місто та країну
 * @param {string} address - Адреса у форматі "вулиця, місто, країна"
 * @returns {Object} Об'єкт з полями city та country
 */
export const parseAddress = (address) => {
  if (!address) return { city: "", country: "" };

  const parts = address.split(", ");
  return {
    city: parts[1] || "",
    country: parts[2] || "",
  };
};
