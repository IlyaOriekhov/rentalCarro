export const formatDistance = (value, separator = " ") => {
  if (!value && value !== 0) return "";

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

export const formatPrice = (price) => {
  if (!price) return "$0";
  return `$${price}`;
};

export const formatDate = (date) => {
  if (!date) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const parseAddress = (address) => {
  if (!address) return { city: "", country: "" };

  const parts = address.split(", ");
  return {
    city: parts[1] || "",
    country: parts[2] || "",
  };
};
