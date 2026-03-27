import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Auth/Features/authSlice';
import cartReducer from "../roles/Users/Features/cartSlice";
import categoryReducer from "../roles/Users/Features/Categoryslice";
import productReducer from "../roles/Users/Features/productSlice";
import reviewReducer from "../roles/Users/Features/reviewSlice";
import sellerProductReducer from "../roles/Sellers/Features/Sellerproductslice";
import sellerReducer from "../roles/Users/Features/Sellerslice";
import wishlistReducer from "../roles/Users/Features/wishlistSlice"; 
import customerReducer  from "../roles/Users/Features/customerSlice";   
import sellerProfileReducer from "../roles/Sellers/Features/sallerProfileSlice"; 



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
    customer:      customerReducer, 
    sellerProfile: sellerProfileReducer,
  },
});


// Persist cart state to localStorage whenever cart state changes
store.subscribe(() => {
  try {
    const state = store.getState();
    // Save only cart items (avoid saving whole state !!!!)
    localStorage.setItem("mn-bety-cart", JSON.stringify(state.cart.items));
  } catch (error) {
    // check for error if may cart is full
    console.log("Failed to save cart", error);
  }
});

export default store;