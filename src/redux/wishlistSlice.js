// src/redux/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Отримуємо збережені улюблені з localStorage
const getSavedWishlist = () => {
  try {
    const savedItems = localStorage.getItem("wishlist");
    return savedItems ? JSON.parse(savedItems) : [];
  } catch (error) {
    console.error("Error loading wishlist from localStorage:", error);
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: getSavedWishlist(),
  },
  reducers: {
    toggleWishlistItem: (state, { payload }) => {
      const existingIndex = state.wishlistItems.findIndex(
        (item) => item.id === payload.id
      );

      if (existingIndex !== -1) {
        // Видаляємо з улюблених
        state.wishlistItems.splice(existingIndex, 1);
      } else {
        // Додаємо до улюблених
        state.wishlistItems.push(payload);
      }

      // Зберігаємо в localStorage
      try {
        localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error);
      }
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const { toggleWishlistItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
