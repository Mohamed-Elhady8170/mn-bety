import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../roles/Users/Features/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
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
