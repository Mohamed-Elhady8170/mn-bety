import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE = "http://localhost:4000";

export const fetchLandingCategories = createAsyncThunk(
    "landing/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE}/api/categories`);
            console.log("Full API Payload:", response.data);

            const data = response.data.data?.categories || response.data.categories || [];
            return data;
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.message || "Error");
        }
    }
);
export const fetchPlatformStats = createAsyncThunk(
    "landing/fetchPlatformStats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE}/api/products/stats/platform`);
            return response.data.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error fetching stats");
        }
    }
);

const landingSlice = createSlice({
    name: "landing",
    initialState: {
        categories: [],
        stats: {
            buyerSatisfaction: 0,
            sellerSatisfaction: 0,
        },
        loading: false,
        statsLoading: false, 
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLandingCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLandingCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchLandingCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handling Platform Stats
            .addCase(fetchPlatformStats.pending, (state) => {
                state.statsLoading = true;
            })
            .addCase(fetchPlatformStats.fulfilled, (state, action) => {
                state.statsLoading = false;
                state.stats = action.payload;
            })
            .addCase(fetchPlatformStats.rejected, (state, action) => {
                state.statsLoading = false;
                state.error = action.payload;
            });
    },
});

export default landingSlice.reducer;