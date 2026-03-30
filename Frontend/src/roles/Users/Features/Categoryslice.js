import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
// import axios from "axios";
import { publicAxios } from "../../../lib/axios";

// ─── Thunks ───────────────────────────────────────────────────────────────────

/**
 * Fetch all active root categories (parent = null) for the sidebar.
 * Uses ?active=true so inactive ones are hidden from users.
 */
export const fetchRootCategories = createAsyncThunk(
  "category/fetchRootCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await publicAxios.get("/categories", {
        params: { active: true },
      });
      return data?.data?.categories ?? data?.categories ?? [];
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
      const { data } = await publicAxios.get(`/categories/${parentId}/children`);
      return data?.data?.children ?? data?.children ?? [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load subcategories");
    }
  }
);

// في categorySlice.js — أضف الـ thunk ده
export const fetchCategoryTree = createAsyncThunk(
  "category/fetchCategoryTree",
  async (_, { rejectWithValue }) => {
    try {
      let categories = [];

      // 1) Try API tree mode first
      try {
        const { data } = await publicAxios.get("/categories", {
          params: { active: true, tree: true },
        });
        categories = data?.data?.categories ?? data?.categories ?? [];
      } catch {
        // 2) Fallback to plain categories list
        const { data } = await publicAxios.get("/categories", {
          params: { active: true },
        });
        categories = data?.data?.categories ?? data?.categories ?? [];
      }

      const hasNestedChildren = categories.some(
        (cat) => Array.isArray(cat?.children) && cat.children.length > 0
      );

      if (hasNestedChildren) return categories;

      const roots = categories.filter((cat) => !cat?.parent);
      if (roots.length === 0) return categories;

      // 3) Build sections by loading children for each root category.
      const enrichedRoots = await Promise.all(
        roots.map(async (root) => {
          try {
            const { data } = await publicAxios.get(`/categories/${root._id}/children`, {
              params: { active: true },
            });
            const children = data?.data?.children ?? data?.children ?? [];
            return { ...root, children };
          } catch {
            return { ...root, children: [] };
          }
        })
      );

      return enrichedRoots;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load categories"
      );
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const categorySlice = createSlice({
  name: "category",
  initialState: {
    // Root categories shown in the sidebar
    allCategories: [],
    rootLoading: false,
    rootError: null,

    categoryTree: [],
    treeLoading: false,
    treeError: null,

    // The category the user has clicked
    selectedCategory: null,   // full category object

    // Children of the selected category shown in the TopBar dropdown
    subcategories: [],
    subLoading: false,
    subError: null,

    // The subcategory chosen in the TopBar dropdown
    selectedSub: null,   // full subcategory object
  },

  reducers: {
    /**
     * Set the active main category.
     * Also resets selectedSub since the subcategory list will change.
     */
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
      state.selectedSub = null;
      state.subcategories = [];
    },

    /** Set the active subcategory from the TopBar dropdown */
    setSelectedSub(state, action) {
      state.selectedSub = action.payload;
    },

    /** Clear everything (e.g. on unmount or navigation) */
    resetCategoryState(state) {
      state.selectedCategory = null;
      state.selectedSub = null;
      state.subcategories = [];
    },
  },

  extraReducers: (builder) => {
    // ── fetchRootCategories ───────────────────────────────────────────────────
    builder
      .addCase(fetchRootCategories.pending, (state) => {
        state.rootLoading = true;
        state.rootError = null;
      })
      .addCase(fetchRootCategories.fulfilled, (state, action) => {
        state.rootLoading = false;
        state.allCategories = action.payload;
      })
      .addCase(fetchRootCategories.rejected, (state, action) => {
        state.rootLoading = false;
        state.rootError = action.payload;
      });

    // ── fetchSubcategories ────────────────────────────────────────────────────
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.subLoading = true;
        state.subError = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.subLoading = false;
        state.subcategories = action.payload;

        // Auto-select the first sub so the dropdown always has a value
        state.selectedSub = action.payload[0] ?? null;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.subLoading = false;
        state.subError = action.payload;
      });

    // ── fetchCategoryTree ─────────────────────────────────────────────────────
    builder
  .addCase(fetchCategoryTree.pending, (state) => {
    state.treeLoading = true;
    state.treeError   = null;
  })
  .addCase(fetchCategoryTree.fulfilled, (state, action) => {
    state.treeLoading    = false;
    state.categoryTree   = action.payload;
  })
  .addCase(fetchCategoryTree.rejected, (state, action) => {
    state.treeLoading = false;
    state.treeError   = action.payload;
  });
  },
});

export const {
  setSelectedCategory,
  setSelectedSub,
  resetCategoryState,
} = categorySlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

const selectAllCategories = (state) => state.category.allCategories;
const selectCategoryTreeRaw = (state) => state.category.categoryTree;

const isRootCategory = (cat) => !cat?.parent;

export const selectRootCategories = createSelector(
  [selectAllCategories, selectCategoryTreeRaw],
  (allCategories, categoryTree) => {
    const source = allCategories.length > 0 ? allCategories : categoryTree;
    return source.filter(isRootCategory);
  }
);
export const selectSubcountFor = (categoryId) => (state) =>
  state.category.allCategories.filter(
    (cat) => String(cat.parent?._id ?? cat.parent) === String(categoryId)
  ).length;
export const selectRootLoading = (state) => state.category.rootLoading;
export const selectRootError = (state) => state.category.rootError;
export const selectSelectedCategory = (state) => state.category.selectedCategory;
export const selectSubcategories = (state) => state.category.subcategories;
export const selectSubLoading = (state) => state.category.subLoading;
export const selectSelectedSub = (state) => state.category.selectedSub;
export const selectCategoryTree    = (state) => state.category.categoryTree;
export const selectTreeLoading     = (state) => state.category.treeLoading;

export const selectHomeCategorySections = createSelector(
  [selectCategoryTreeRaw, selectAllCategories],
  (categoryTree, allCategories) => {
    const source = categoryTree.length > 0 ? categoryTree : allCategories;

    if (source.length === 0) return [];

    const hasNestedChildren = source.some(
      (cat) => Array.isArray(cat?.children) && cat.children.length > 0
    );

    if (hasNestedChildren) {
      return source.filter((cat) => Array.isArray(cat?.children) && cat.children.length > 0);
    }

    const roots = source.filter((cat) => !cat?.parent);
    return roots
      .map((root) => {
        const children = source.filter(
          (cat) => String(cat?.parent?._id ?? cat?.parent) === String(root?._id)
        );

        return { ...root, children };
      })
      .filter((cat) => cat.children.length > 0);
  }
);


export default categorySlice.reducer;