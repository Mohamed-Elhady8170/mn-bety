import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { privateAxios } from "../../../lib/axios"; // ⚠️ Adjust this path to your axios.js file!

// ============================================================
//                     CART THUNKS (Backend Calls)
// ============================================================

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.get("/cart");
      return data.data.cart.items; // Array of items from Redis
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
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => { state.isLoading = true; })
      .addCase(fetchCart.fulfilled, handleSuccess)
      .addCase(fetchCart.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      
      // Add to Cart
      .addCase(addToCartThunk.fulfilled, handleSuccess)
      
      // Update Quantity
      .addCase(updateQuantityThunk.fulfilled, handleSuccess)
      
      // Remove Item
      .addCase(removeFromCartThunk.fulfilled, handleSuccess)
      
      // Clear Cart
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.items = [];
      });
  },
});

export default cartSlice.reducer;

// ============================================================
//                     SELECTORS
// ============================================================

export const selectAllCartItems = (state) => state.cart.items;
export const selectCartLoading = (state) => state.cart.isLoading;

// Calculate total items count 
export const selectCartItemsCount = createSelector(
  [selectAllCartItems],
  (items) => items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0
);

// Calculate total price (checks for discountPrice first)
export const selectTotalCartPrice = createSelector(
  [selectAllCartItems],
  (items) =>
    items?.reduce((total, item) => {
      if (!item.product) return total; // Safety check
      const price = item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price;
      return total + (price || 0) * (item.quantity || 1);
    }, 0) || 0
);