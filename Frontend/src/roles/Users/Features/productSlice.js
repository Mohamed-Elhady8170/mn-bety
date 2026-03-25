import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicAxios } from "../../../lib/axios";

// ============================================================
//                     PRODUCT THUNKS
// ============================================================

/**
 * @desc  Fetch paginated + filtered products
 *        Called whenever selectedSub, page, sort, or priceRange changes
 */
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await publicAxios.get("/products", { params });
      return data.data; // { products, total, page, pages }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load products"
      );
    }
  }
);

/**
 * @desc  Fetch a single product by _id or slug
 */
export const fetchProductByIdOrSlug = createAsyncThunk(
  "product/fetchProductByIdOrSlug",
  async (idOrSlug, { rejectWithValue }) => {
    try {
      const { data } = await publicAxios.get(`/products/${idOrSlug}`);
      return data.data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Product not found"
      );
    }
  }
);

/**
 * @desc  Fetch all products for a specific seller
 */
export const fetchSellerProducts = createAsyncThunk(
  "product/fetchSellerProducts",
  async (sellerId, { rejectWithValue }) => {
    try {
      const { data } = await publicAxios.get(`/products/seller/${sellerId}`);
      return data.data.products;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load seller products"
      );
    }
  }
);

// ============================================================
//                      PRODUCT SLICE
// ============================================================

const productSlice = createSlice({
  name: "product",
  initialState: {
    // ── Product list (ProductGrid) ─────────────────────────
    products:     [],
    total:        0,
    pages:        1,
    loading:      false,
    error:        null,

    // ── Filters (controlled by UI — drive fetchProducts) ───
    page:         1,
    limit:        6,
    sort:         "-createdAt",
    priceRange:   1000,  // max price filter

    // ── Single product (product detail page) ───────────────
    currentProduct:        null,
    currentProductLoading: false,
    currentProductError:   null,

    // ── Seller products ────────────────────────────────────
    sellerProducts:        [],
    sellerProductsLoading: false,
    sellerProductsError:   null,
  },

  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setSort(state, action) {
      state.sort  = action.payload;
      state.page  = 1; // reset to page 1 on sort change
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
      state.page       = 1;
    },
    resetProducts(state) {
      state.products = [];
      state.total    = 0;
      state.pages    = 1;
      state.page     = 1;
      state.error    = null;
    },
  },

  extraReducers: (builder) => {
    // ── fetchProducts ──────────────────────────────────────
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading  = false;
        state.products = action.payload.products;
        state.total    = action.payload.total;
        state.pages    = action.payload.pages;
        state.page     = action.payload.page;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });

    // ── fetchProductByIdOrSlug ─────────────────────────────
    builder
      .addCase(fetchProductByIdOrSlug.pending, (state) => {
        state.currentProductLoading = true;
        state.currentProductError   = null;
      })
      .addCase(fetchProductByIdOrSlug.fulfilled, (state, action) => {
        state.currentProductLoading = false;
        state.currentProduct        = action.payload;
      })
      .addCase(fetchProductByIdOrSlug.rejected, (state, action) => {
        state.currentProductLoading = false;
        state.currentProductError   = action.payload;
      });

    // ── fetchSellerProducts ────────────────────────────────
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.sellerProductsLoading = true;
        state.sellerProductsError   = null;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.sellerProductsLoading = false;
        state.sellerProducts        = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.sellerProductsLoading = false;
        state.sellerProductsError   = action.payload;
      });
  },
});

export const { setPage, setSort, setPriceRange, resetProducts } =
  productSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectProducts             = (state) => state.product.products;
export const selectProductsTotal        = (state) => state.product.total;
export const selectProductsPages        = (state) => state.product.pages;
export const selectProductsLoading      = (state) => state.product.loading;
export const selectProductsError        = (state) => state.product.error;
export const selectCurrentPage          = (state) => state.product.page;
export const selectCurrentSort          = (state) => state.product.sort;
export const selectPriceRange           = (state) => state.product.priceRange;
export const selectCurrentProduct       = (state) => state.product.currentProduct;
export const selectCurrentProductLoading= (state) => state.product.currentProductLoading;
export const selectSellerProducts       = (state) => state.product.sellerProducts;
export const selectSellerProductsLoading= (state) => state.product.sellerProductsLoading;

export default productSlice.reducer;