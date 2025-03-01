// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "./vehicleSlice";
import wishlistReducer from "./wishlistSlice";
import searchOptionsReducer from "./searchOptionsSlice";

const appStore = configureStore({
  reducer: {
    vehicles: vehicleReducer,
    wishlist: wishlistReducer,
    searchOptions: searchOptionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default appStore;
