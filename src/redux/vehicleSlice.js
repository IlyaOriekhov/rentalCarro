import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVehicles, fetchVehicleById } from "../services/api";

export const getVehiclesList = createAsyncThunk(
  "vehicles/getList",
  async (searchParams, { rejectWithValue }) => {
    try {
      return await fetchVehicles(searchParams);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getVehicleDetails = createAsyncThunk(
  "vehicles/getDetails",
  async (vehicleId, { rejectWithValue }) => {
    try {
      return await fetchVehicleById(vehicleId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState: {
    vehiclesList: [],
    currentVehicle: null,
    isLoading: false,
    errorMessage: null,
    currentPage: 1,
    pagesCount: 1,
  },
  reducers: {
    clearVehiclesList: (state) => {
      state.vehiclesList = [];
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обробка запиту на отримання списку автомобілів
      .addCase(getVehiclesList.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getVehiclesList.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        // Фільтруємо дублікати, якщо вони є
        const newCars = payload.cars.filter(
          (newCar) =>
            !state.vehiclesList.some(
              (existingCar) => existingCar.id === newCar.id
            )
        );

        if (state.currentPage === 1) {
          state.vehiclesList = newCars;
        } else {
          state.vehiclesList = [...state.vehiclesList, ...newCars];
        }

        state.pagesCount = payload.totalPages;
        state.currentPage = state.currentPage + 1;
      })
      .addCase(getVehiclesList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload;
      })
      // Обробка запиту на отримання інформації про конкретний автомобіль
      .addCase(getVehicleDetails.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getVehicleDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentVehicle = payload;
      })
      .addCase(getVehicleDetails.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload;
      });
  },
});

export const { clearVehiclesList } = vehicleSlice.actions;
export default vehicleSlice.reducer;
