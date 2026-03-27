import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateAxios } from "../../../lib/axios";

// ============================================================
//                     BUYER THUNKS
// ============================================================

export const checkoutThunk = createAsyncThunk(
  "order/checkout",
  async ({ paymentMethod, shippingAddress }, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.post("/orders/checkout", {
        paymentMethod,
        shippingAddress,
      });
      return data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "فشل إتمام الطلب");
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.get("/orders/my-orders");
      return data.data.orders || data.data || []; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "فشل جلب الطلبات");
    }
  }
);

export const cancelOrderThunk = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.patch(`/orders/${orderId}/cancel`);
      return data.data.order || data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "فشل إلغاء الطلب");
    }
  }
);

// ============================================================
//                     SELLER THUNKS
// ============================================================

export const fetchSellerOrders = createAsyncThunk(
  "order/fetchSellerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.get("/orders/seller-orders");
      return data.data.orders || data.data || []; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "فشل جلب طلبات البائع");
    }
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.patch(`/orders/${orderId}/status`, { status });
      return data.data.order || data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "فشل تحديث حالة الطلب");
    }
  }
);

// ============================================================
//                     ORDER SLICE
// ============================================================

const orderSlice = createSlice({
  name: "order",
  initialState: {
    userOrders: [],      // For the Buyer
    sellerOrders: [],    // For the Seller
    isLoading: false,
    error: null,
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Checkout
      .addCase(checkoutThunk.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(checkoutThunk.fulfilled, (state) => { state.isLoading = false; })
      .addCase(checkoutThunk.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      
      // Fetch My Orders (Buyer)
      .addCase(fetchMyOrders.pending, (state) => { state.isLoading = true; })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      // Cancel Order (Buyer)
      .addCase(cancelOrderThunk.fulfilled, (state, action) => {
         const canceledOrder = action.payload;
         const index = state.userOrders.findIndex(o => o._id === canceledOrder._id);
         if(index !== -1) {
             state.userOrders[index] = canceledOrder; 
         }
      })

      // Fetch Seller Orders
      .addCase(fetchSellerOrders.pending, (state) => { state.isLoading = true; })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sellerOrders = action.payload;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      // Update Order Status (Seller)
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
         const updatedOrder = action.payload;
         const index = state.sellerOrders.findIndex(o => o._id === updatedOrder._id);
         if(index !== -1) {
             state.sellerOrders[index] = updatedOrder; 
         }
      });
  },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;