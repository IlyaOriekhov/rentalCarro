// src/redux/searchOptionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBrandsList } from "../services/api";

export const loadBrands = createAsyncThunk(
  "searchOptions/loadBrands",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchBrandsList();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchOptionsSlice = createSlice({
  name: "searchOptions",
  initialState: {
    availableBrands: [],
    selectedVehicleBrand: "",
    selectedPriceOption: "",
    distanceMin: "",
    distanceMax: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    updateBrandFilter: (state, { payload }) => {
      state.selectedVehicleBrand = payload;
    },
    updatePriceFilter: (state, { payload }) => {
      state.selectedPriceOption = payload;
    },
    updateMinDistanceFilter: (state, { payload }) => {
      state.distanceMin = payload;
    },
    updateMaxDistanceFilter: (state, { payload }) => {
      state.distanceMax = payload;
    },
    resetAllFilters: (state) => {
      state.selectedVehicleBrand = "";
      state.selectedPriceOption = "";
      state.distanceMin = "";
      state.distanceMax = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadBrands.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.availableBrands = payload;
      })
      .addCase(loadBrands.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const {
  updateBrandFilter,
  updatePriceFilter,
  updateMinDistanceFilter,
  updateMaxDistanceFilter,
  resetAllFilters,
} = searchOptionsSlice.actions;
export default searchOptionsSlice.reducer;
