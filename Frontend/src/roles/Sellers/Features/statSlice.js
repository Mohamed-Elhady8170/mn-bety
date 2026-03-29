import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateAxios } from "../../../lib/axios";

// ============================================================
//                 STATISTICS THUNKS
// ============================================================

/**
 * @desc Fetch Dashboard Stats for Seller
 * GET /orders/dashboard/statistics (Assuming this is your backend route)
 */

export const fetchSellerStats = createAsyncThunk(
  "stat/fetchSellerStats",
  async (_, { rejectWithValue }) => {
    try {
      // 1. Updated URL to /statistics
      const { data } = await privateAxios.get("/orders/dashboard/statistics");
      
      // 2. Map data.data.statistics (matching the controller response)
      return data.data.statistics; 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "فشل جلب الإحصائيات"
      );
    }
  }
);

// ============================================================
//                 STATISTICS SLICE
// ============================================================

const statSlice = createSlice({
  name: "stat",
  initialState: {
    stats: {
      totalSales: 0,
      newOrders: 0,
      activeProducts: 0,
      growthRate: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearStatError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchSellerStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatError } = statSlice.actions;

// Selectors
export const selectDashboardStats = (state) => state.stat.stats;
export const selectStatsLoading = (state) => state.stat.loading;

export default statSlice.reducer;