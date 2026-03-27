// src/roles/Users/Features/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchWishlistThunk,
  addToWishlistThunk,
  removeFromWishlistThunk,
  clearWishlistThunk,
} from './wishlistThunks';

const initialState = {
  products: [],      // array of product IDs from backend
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // ─── Fetch ────────────────────────────────────────────────────────────────
    builder
      .addCase(fetchWishlistThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWishlistThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // backend returns wishlist object with products array
        state.products = action.payload?.products ?? [];
      })
      .addCase(fetchWishlistThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // ─── Add ──────────────────────────────────────────────────────────────────
    builder
      .addCase(addToWishlistThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(addToWishlistThunk.fulfilled, (state, action) => {
        state.products = action.payload?.products ?? [];
      })
      .addCase(addToWishlistThunk.rejected, (state, action) => {
        state.error = action.payload;
      });

    // ─── Remove ───────────────────────────────────────────────────────────────
    builder
      .addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
        state.products = action.payload?.products ?? [];
      })
      .addCase(removeFromWishlistThunk.rejected, (state, action) => {
        state.error = action.payload;
      });

    // ─── Clear ────────────────────────────────────────────────────────────────
    builder
      .addCase(clearWishlistThunk.fulfilled, (state) => {
        state.products = [];
      });
  },
});

export default wishlistSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────────────────────
// returns Set of product IDs for O(1) lookup
export const selectWishlistIds = (state) =>
  new Set(state.wishlist.products.map((p) =>
    typeof p === 'string' ? p : p._id?.toString()
  ));

export const selectWishlistProducts = (state) => state.wishlist.products;
export const selectWishlistLoading = (state) => state.wishlist.isLoading;