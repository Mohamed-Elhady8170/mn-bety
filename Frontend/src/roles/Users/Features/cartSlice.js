import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { privateAxios } from "../../../lib/axios";

// ============================================================
//                     CART THUNKS (Backend Calls)
// ============================================================

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.get("/cart");
      return data.data.cart.items;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "فشل جلب السلة");
    }
  }
);

export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.post("/cart", { productId, quantity });
      return data.data.cart.items;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "فشل الإضافة للسلة");
    }
  }
);

export const updateQuantityThunk = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.patch(`/cart/${productId}`, { quantity });
      return data.data.cart.items;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "فشل تحديث الكمية");
    }
  }
);

export const removeFromCartThunk = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.delete(`/cart/${productId}`);
      return data.data.cart.items;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "فشل حذف المنتج");
    }
  }
);

export const clearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await privateAxios.delete("/cart");
      return [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "فشل تفريغ السلة");
    }
  }
);

// ============================================================
//                     CART SLICE
// ============================================================

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handleSuccess = (state, action) => {
      state.isLoading = false;
      state.items = action.payload || [];
    };

    builder
      .addCase(fetchCart.pending,   (state) => { state.isLoading = true; })
      .addCase(fetchCart.fulfilled, handleSuccess)
      .addCase(fetchCart.rejected,  (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addToCartThunk.fulfilled,     handleSuccess)
      .addCase(updateQuantityThunk.fulfilled, handleSuccess)
      .addCase(removeFromCartThunk.fulfilled, handleSuccess)
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.items = [];
      });
  },
});

export default cartSlice.reducer;

// ============================================================
//                     HELPERS
// ============================================================

export const getEffectivePrice = (product) => {
  if (!product) return 0;
  const price = product.price || 0;
  const discountPrice = product.discountPrice || 0;
  return discountPrice > 0 ? price - discountPrice : price;
};

// ============================================================
//                     SELECTORS
// ============================================================

export const selectAllCartItems = (state) => state.cart.items;
export const selectCartLoading  = (state) => state.cart.isLoading;

// Total items count
export const selectCartItemsCount = createSelector(
  [selectAllCartItems],
  (items) => items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0
);

// Total price — price - discountPrice لكل منتج × الكمية
export const selectTotalCartPrice = createSelector(
  [selectAllCartItems],
  (items) =>
    items?.reduce((total, item) => {
      if (!item.product) return total;
      const price = getEffectivePrice(item.product);
      return total + price * (item.quantity || 1);
    }, 0) || 0
);