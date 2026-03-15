import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = "http://localhost:4000";

// ─── Thunks ───────────────────────────────────────────────────────────────────

/**
 * Fetch all active root categories (parent = null) for the sidebar.
 * Uses ?active=true so inactive ones are hidden from users.
 */
export const fetchRootCategories = createAsyncThunk(
  "category/fetchRootCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE}/api/categories`, {
        params: { active: true },
      });
      return data.data.categories;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load categories");
    }
  }
);

/**
 * Fetch direct children of the selected category for the subcategory dropdown.
 * Called whenever the user picks a different main category.
 */
export const fetchSubcategories = createAsyncThunk(
  "category/fetchSubcategories",
  async (parentId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE}/api/categories/${parentId}/children`);
      return data.data.children;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load subcategories");
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const categorySlice = createSlice({
  name: "category",
  initialState: {
    // Root categories shown in the sidebar
    allCategories:      [],
    rootLoading:       false,
    rootError:         null,

    // The category the user has clicked
    selectedCategory:  null,   // full category object

    // Children of the selected category shown in the TopBar dropdown
    subcategories:     [],
    subLoading:        false,
    subError:          null,

    // The subcategory chosen in the TopBar dropdown
    selectedSub:       null,   // full subcategory object
  },

  reducers: {
    /**
     * Set the active main category.
     * Also resets selectedSub since the subcategory list will change.
     */
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
      state.selectedSub      = null;
      state.subcategories    = [];
    },

    /** Set the active subcategory from the TopBar dropdown */
    setSelectedSub(state, action) {
      state.selectedSub = action.payload;
    },

    /** Clear everything (e.g. on unmount or navigation) */
    resetCategoryState(state) {
      state.selectedCategory = null;
      state.selectedSub      = null;
      state.subcategories    = [];
    },
  },

  extraReducers: (builder) => {
    // ── fetchRootCategories ───────────────────────────────────────────────────
    builder
      .addCase(fetchRootCategories.pending, (state) => {
        state.rootLoading = true;
        state.rootError   = null;
      })
      .addCase(fetchRootCategories.fulfilled, (state, action) => {
        state.rootLoading    = false;
        state.allCategories = action.payload;

        // Auto-select the first category on initial load
        if (!state.selectedCategory && action.payload.length > 0) {
          state.selectedCategory = action.payload[0];
        }
      })
      .addCase(fetchRootCategories.rejected, (state, action) => {
        state.rootLoading = false;
        state.rootError   = action.payload;
      });

    // ── fetchSubcategories ────────────────────────────────────────────────────
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.subLoading = true;
        state.subError   = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.subLoading    = false;
        state.subcategories = action.payload;

        // Auto-select the first sub so the dropdown always has a value
        state.selectedSub = action.payload[0] ?? null;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.subLoading = false;
        state.subError   = action.payload;
      });
  },
});

export const {
  setSelectedCategory,
  setSelectedSub,
  resetCategoryState,
} = categorySlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectRootCategories = (state) =>
   state.category.allCategories.filter((cat) => !cat.parent);
export const selectSubcountFor = (categoryId) => (state) =>
  state.category.allCategories.filter(
    (cat) => String(cat.parent?._id ?? cat.parent) === String(categoryId)
  ).length;
export const selectRootLoading      = (state) => state.category.rootLoading;
export const selectRootError        = (state) => state.category.rootError;
export const selectSelectedCategory = (state) => state.category.selectedCategory;
export const selectSubcategories    = (state) => state.category.subcategories;
export const selectSubLoading       = (state) => state.category.subLoading;
export const selectSelectedSub      = (state) => state.category.selectedSub;


export default categorySlice.reducer;