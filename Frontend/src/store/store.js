import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Auth/Features/authSlice';
import cartReducer from "../roles/Users/Features/cartSlice";
import categoryReducer from "../roles/Users/Features/Categoryslice";
import productReducer from "../roles/Users/Features/productSlice";
import reviewReducer from "../roles/Users/Features/reviewSlice";
import sellerProductReducer from "../roles/Sellers/Features/Sellerproductslice";
import sellerReducer from "../roles/Users/Features/Sellerslice";
import wishlistReducer from "../roles/Users/Features/wishlistSlice"; 
import orderReducer from "../roles/Users/Features/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    cart: cartReducer,
    product: productReducer,
    review:   reviewReducer,
    sellerProduct: sellerProductReducer, 
    seller:        sellerReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
});

export default store;