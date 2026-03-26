import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicAxios } from "../../../lib/axios";

// ============================================================
//                      SELLER THUNKS
// ============================================================

/**
 * @desc  Fetch all public approved+active sellers
 *        GET /api/sellers/public
 */
export const fetchPublicSellers = createAsyncThunk(
  "seller/fetchPublicSellers",
  async ({ page = 1, limit = 10, search } = {}, { rejectWithValue }) => {
    try {
      const { data } = await publicAxios.get("/sellers/public", {
        params: { page, limit, search },
      });
      return data.data; // { sellers, total, page, pages }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load sellers"
      );
    }
  }
);

/**
 * @desc  Fetch a single seller's public profile
 *        GET /api/sellers/public/:id
 */
export const fetchPublicSellerProfile = createAsyncThunk(
  "seller/fetchPublicSellerProfile",
  async (sellerId, { rejectWithValue }) => {
    try {
      const { data } = await publicAxios.get(`/sellers/public/${sellerId}`);
      return data.data.seller;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Seller not found"
      );
    }
  }
);

// ============================================================
//                       SELLER SLICE
// ============================================================

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    // ── Sellers list (SellersPage) ─────────────────────────
    sellers:      [],
    total:        0,
    page:         1,
    pages:        1,
    loading:      false,
    error:        null,

    // ── Single seller profile (SellerProductsPage header) ──
    currentSeller:        null,
    currentSellerLoading: false,
    currentSellerError:   null,

    // ── Search term ────────────────────────────────────────
    searchTerm: "",
  },

  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    clearCurrentSeller(state) {
      state.currentSeller      = null;
      state.currentSellerError = null;
    },
  },

  extraReducers: (builder) => {
    // ── fetchPublicSellers ─────────────────────────────────
    builder
      .addCase(fetchPublicSellers.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchPublicSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload.sellers;
        state.total   = action.payload.total;
        state.page    = action.payload.page;
        state.pages   = action.payload.pages;
      })
      .addCase(fetchPublicSellers.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });

    // ── fetchPublicSellerProfile ───────────────────────────
    builder
      .addCase(fetchPublicSellerProfile.pending, (state) => {
        state.currentSellerLoading = true;
        state.currentSellerError   = null;
      })
      .addCase(fetchPublicSellerProfile.fulfilled, (state, action) => {
        state.currentSellerLoading = false;
        state.currentSeller        = action.payload;
      })
      .addCase(fetchPublicSellerProfile.rejected, (state, action) => {
        state.currentSellerLoading = false;
        state.currentSellerError   = action.payload;
      });
  },
});

export const { setSearchTerm, clearCurrentSeller } = sellerSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectSellers              = (state) => state.seller.sellers;
export const selectSellersTotal         = (state) => state.seller.total;
export const selectSellersLoading       = (state) => state.seller.loading;
export const selectSellersError         = (state) => state.seller.error;
export const selectSellersPages         = (state) => state.seller.pages;
export const selectCurrentSellerPage    = (state) => state.seller.page;
export const selectSearchTerm           = (state) => state.seller.searchTerm;
export const selectCurrentSeller        = (state) => state.seller.currentSeller;
export const selectCurrentSellerLoading = (state) => state.seller.currentSellerLoading;
export const selectCurrentSellerError   = (state) => state.seller.currentSellerError;

export default sellerSlice.reducer;