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
    isFiltering: false,
  },
  reducers: {
    clearVehiclesList: (state) => {
      state.vehiclesList = [];
      state.currentPage = 1;
      state.isFiltering = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehiclesList.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })

      .addCase(getVehiclesList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isFiltering = false;
        state.initialLoadDone = true;

        const cars = payload.cars || [];

        if (state.currentPage === 1) {
          state.vehiclesList = cars;
        } else {
          const newCars = cars.filter(
            (newCar) =>
              !state.vehiclesList.some(
                (existingCar) => existingCar.id === newCar.id
              )
          );
          state.vehiclesList = [...state.vehiclesList, ...newCars];
        }

        state.pagesCount = payload.totalPages || 0;
        state.currentPage = payload.page
          ? Number(payload.page) + 1
          : state.currentPage + 1;
      })
      .addCase(getVehiclesList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload;
      })
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
