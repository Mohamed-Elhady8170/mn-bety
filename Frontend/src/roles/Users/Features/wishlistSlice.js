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
        // backend may return an object with products array or direct array
        if (Array.isArray(action.payload)) {
          state.products = action.payload;
        } else {
          state.products = action.payload?.products ?? [];
        }
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
        if (Array.isArray(action.payload)) {
          state.products = action.payload;
        } else {
          state.products = action.payload?.products ?? state.products;
        }
      })
      .addCase(addToWishlistThunk.rejected, (state, action) => {
        state.error = action.payload;
      });

    // ─── Remove ───────────────────────────────────────────────────────────────
    builder
      .addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
        if (Array.isArray(action.payload?.products)) {
          state.products = action.payload.products;
        } else {
          const removedId = action.payload?.removedId || action.meta.arg;
          state.products = state.products.filter((p) => {
            const pId = p?._id?.toString?.() || p?.toString?.();
            return pId !== removedId?.toString?.();
          });
        }
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