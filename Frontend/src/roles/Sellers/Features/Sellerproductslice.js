import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateAxios } from "../../../lib/axios";
import { publicAxios }  from "../../../lib/axios";

// ============================================================
//                  SELLER PRODUCT THUNKS
// ============================================================

/**
 * @desc  Fetch the logged-in seller's own products
 *        GET /api/products/seller/:sellerId
 */
export const fetchMyProducts = createAsyncThunk(
  "sellerProduct/fetchMyProducts",
  async (sellerId, { rejectWithValue }) => {
    try {
      const { data } = await publicAxios.get(`/products/seller/${sellerId}`);
      return data.data.products;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load products"
      );
    }
  }
);

/**
 * @desc  Create a new product (multipart/form-data for images)
 *        POST /api/products
 */
export const createProduct = createAsyncThunk(
  "sellerProduct/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          "Failed to create product"
      );
    }
  }
);

/**
 * @desc  Update a product (multipart/form-data for images)
 *        PUT /api/products/:id
 */
export const updateProduct = createAsyncThunk(
  "sellerProduct/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          "Failed to update product"
      );
    }
  }
);

/**
 * @desc  Delete a product
 *        DELETE /api/products/:id
 */
export const deleteProduct = createAsyncThunk(
  "sellerProduct/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await privateAxios.delete(`/products/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

/**
 * @desc  Toggle product active status
 *        PATCH /api/products/:id/toggle
 */
export const toggleProductStatus = createAsyncThunk(
  "sellerProduct/toggleProductStatus",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.patch(`/products/${id}/toggle`);
      return { id, isActive: data.data.isActive };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to toggle status"
      );
    }
  }
);

/**
 * @desc  Fetch a single product by id (for EditProduct pre-fill)
 *        GET /api/products/:idOrSlug
 */
export const fetchProductForEdit = createAsyncThunk(
  "sellerProduct/fetchProductForEdit",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await publicAxios.get(`/products/${id}`);
      return data.data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Product not found"
      );
    }
  }
);

// ============================================================
//                   SELLER PRODUCT SLICE
// ============================================================

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState: {
    // ── My products list (ManageProducts) ──────────────────
    myProducts:   [],
    listLoading:  false,
    listError:    null,

    // ── Single product for edit form ───────────────────────
    editProduct:        null,
    editProductLoading: false,
    editProductError:   null,

    // ── Create / Update ────────────────────────────────────
    saving:       false,
    saveError:    null,
    saveSuccess:  false,

    // ── Delete ─────────────────────────────────────────────
    deleting:     false,
    deleteError:  null,

    // ── Toggle ─────────────────────────────────────────────
    toggling:     false,
  },

  reducers: {
    resetSaveState(state) {
      state.saving      = false;
      state.saveError   = null;
      state.saveSuccess = false;
    },
    clearEditProduct(state) {
      state.editProduct      = null;
      state.editProductError = null;
    },
  },

  extraReducers: (builder) => {
    // ── fetchMyProducts ────────────────────────────────────
    builder
      .addCase(fetchMyProducts.pending, (state) => {
        state.listLoading = true;
        state.listError   = null;
      })
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.listLoading = false;
        state.myProducts  = action.payload;
      })
      .addCase(fetchMyProducts.rejected, (state, action) => {
        state.listLoading = false;
        state.listError   = action.payload;
      });

    // ── fetchProductForEdit ────────────────────────────────
    builder
      .addCase(fetchProductForEdit.pending, (state) => {
        state.editProductLoading = true;
        state.editProductError   = null;
        state.editProduct        = null;
      })
      .addCase(fetchProductForEdit.fulfilled, (state, action) => {
        state.editProductLoading = false;
        state.editProduct        = action.payload;
      })
      .addCase(fetchProductForEdit.rejected, (state, action) => {
        state.editProductLoading = false;
        state.editProductError   = action.payload;
      });

    // ── createProduct ──────────────────────────────────────
    builder
      .addCase(createProduct.pending, (state) => {
        state.saving      = true;
        state.saveError   = null;
        state.saveSuccess = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.saving      = false;
        state.saveSuccess = true;
        state.myProducts.unshift(action.payload); // add to top of list
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.saving    = false;
        state.saveError = action.payload;
      });

    // ── updateProduct ──────────────────────────────────────
    builder
      .addCase(updateProduct.pending, (state) => {
        state.saving      = true;
        state.saveError   = null;
        state.saveSuccess = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.saving      = false;
        state.saveSuccess = true;
        const idx = state.myProducts.findIndex(
          (p) => p._id === action.payload._id
        );
        if (idx !== -1) state.myProducts[idx] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.saving    = false;
        state.saveError = action.payload;
      });

    // ── deleteProduct ──────────────────────────────────────
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.deleting    = true;
        state.deleteError = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleting   = false;
        state.myProducts = state.myProducts.filter(
          (p) => p._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleting    = false;
        state.deleteError = action.payload;
      });

    // ── toggleProductStatus ────────────────────────────────
    builder
      .addCase(toggleProductStatus.pending, (state) => {
        state.toggling = true;
      })
      .addCase(toggleProductStatus.fulfilled, (state, action) => {
        state.toggling = false;
        const p = state.myProducts.find((p) => p._id === action.payload.id);
        if (p) p.isActive = action.payload.isActive;
      })
      .addCase(toggleProductStatus.rejected, (state) => {
        state.toggling = false;
      });
  },
});

export const { resetSaveState, clearEditProduct } = sellerProductSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectMyProducts         = (state) => state.sellerProduct.myProducts;
export const selectListLoading        = (state) => state.sellerProduct.listLoading;
export const selectListError          = (state) => state.sellerProduct.listError;
export const selectEditProduct        = (state) => state.sellerProduct.editProduct;
export const selectEditProductLoading = (state) => state.sellerProduct.editProductLoading;
export const selectEditProductError   = (state) => state.sellerProduct.editProductError;
export const selectSaving             = (state) => state.sellerProduct.saving;
export const selectSaveError          = (state) => state.sellerProduct.saveError;
export const selectSaveSuccess        = (state) => state.sellerProduct.saveSuccess;
export const selectDeleting           = (state) => state.sellerProduct.deleting;
export const selectToggling           = (state) => state.sellerProduct.toggling;

export default sellerProductSlice.reducer;