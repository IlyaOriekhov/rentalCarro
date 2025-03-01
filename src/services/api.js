// src/services/api.js
import axios from "axios";

const API_BASE_URL = "https://car-rental-api.goit.global";

// Створюємо екземпляр axios з базовим URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Додаємо інтерцептори для обробки помилок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

// Отримання списку автомобілів з опціональними параметрами
export const fetchVehicles = async (options = {}) => {
  try {
    const response = await apiClient.get("/cars", { params: options });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch vehicles: ${error.message}`);
  }
};

// Отримання інформації про конкретний автомобіль за ID
export const fetchVehicleById = async (id) => {
  try {
    const response = await apiClient.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch vehicle details: ${error.message}`);
  }
};

// Отримання списку брендів автомобілів
export const fetchBrandsList = async () => {
  try {
    const response = await apiClient.get("/brands");
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch brands list: ${error.message}`);
  }
};

export default apiClient;
