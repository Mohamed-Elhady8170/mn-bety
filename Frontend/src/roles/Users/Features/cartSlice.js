import { createSelector, createSlice } from "@reduxjs/toolkit";


// test data
const products = [
  {
    id: 1,
    title: { ar: "وعاء خزفي منقوش يدوياً", en: "Hand-painted Ceramic Bowl" },
    price: 150,
    rating: 4.9,
    image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD581JS31bmp-J99chrHGjZEPGd_d_lcZSjPJ4VN5UHQnR_GIcuhtj5fPsirILrzGkNUBhiE5riP3IU2VqZ4iB-V16J_Px6csD1QcUsCKPTDtPA7LGlSuPZUO_d0NeSMTPYO9OL2KuyBoP6Y7339iyU9zi4_j_KiaX5CRhqtBy4BCDUDpGw_l7PA8VNucZIpZJzdTf6FzWsdbDpZTXUO-a0TdQXp1AzqYBlaGghaNtV_pGzxsEQ4q-mvQ9xmf5Wo7J6sdvXR07LjvJw",
    quantity: 20,
    isNew: true,
  },
  {
    id: 2,
    title: { ar: "حقيبة قش منسوجة", en: "Woven Straw Bag" },
    price: 210,
    rating: 4.8,
    image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuChwX706ZV10xHuak-kJq2-GuO5dCPyz1rmJJnKHzYrTm0tHEuJnAhbx3LkBmRziNGqOJOo4hpxsEYKhm7k9wiTfoA7S27lrDFtpm-KC4CcPY7KmgLqlDqDOpdmLFseuwKG92XFZog1i_kSdfdJST0bFcFjG6kqTnPiE7BYMtPxovfpSbfVh_el9iguCCzotLmGFJLWyVx5N1xwyq3fe-iW0vwg1vbXu1bccJ-WaJDCWDkBMvXSU39AJv5qZK9wvVXJipbGQ5b-C6u-",
    quantity: 20,
  },
  {
    id: 3,
    title: { ar: "طقم صابون طبيعي فاخر", en: "Luxury Natural Soap Set" },
    price: 85,
    rating: 5.0,
    image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCsaTqMjUmjSYJ1NXUrjFoa0jOE25LynVAjwp2_N9FStXyQKSoKUHKxT2I-YL7AEg3mm4L5GrlLhHOIYqN1wMElXVi4PFJMkGONM_OUjmkfqjyamKrDOOHE7tQPV1z4ZbMq83YNKNVMzRN72jydiWENfJ_BAGmLndaCscjBDteswjJCkxrOFbUrv0VW8y0wPjZ6A5jJr1sncUvJs4zKblxlwZvGm1AYKDF6zRGXaNoJwquAP8hhW3OeJhNaH9rN_soLFnWQoeVC1SuC",
    quantity: 20,
  },
  {
    id: 4,
    title: { ar: "دلة قهوة نحاسية عتيقة", en: "Antique Copper Coffee Pot" },
    price: 450,
    rating: 4.7,
    image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBzRrW8Mg52en63o_YV6iL0eFV5feVwfoC1yJzyvP5IH7PJ38N7h7MMm---M1h6xQczMUF3cbpYdTRfR4NFZ91zeHvhSH6WwYpYcuEqKwZAx0XlCMSFNPYsBY1ExN__8HEploUVRyp4JyOEdviVku_b2EABM7DFL3CBXugFTHz-20ldGKpCyLI4JQuNQv6dA-qpdJrrSsQ1zEFGWcJX6bv-XwSBHAt5y87cC-clSYVFUURdNtVf1UJcffFjKxOafxPifmzeLiWq1qei",
    quantity: 20,
  },
];
// check if there is cart items in localStorage
// if false return []
function loadCartFromLocalStorage() {
  const cartItems = localStorage.getItem("mn-bety-cart");
  return cartItems ? JSON.parse(cartItems) : products;
}

// cart slice initial state
// contain array of products in cart
const initialState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 1. add item to cart
    addToCart: (state, action) => {
      // check if item exist in cart before, using id from payload
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // if true use increment operator in item quantity
        existingItem.quantity++;
      } else {
        // if false add it in items with quantity = 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // 2. decrease item quantity or remove if it was single item
    decreaseQuantity: (state, action) => {
      // check if item exist in cart, using id from payload
      const item = state.items.find((item) => item.id === action.payload);
      // if true use check its total if === 1
      // to decide remove it or decrease its count
      if (item) {
        item.quantity > 1
          ? item.quantity--
          : (state.items = state.items.filter(
              (item) => item.id !== action.payload
            ));
      }
    },
    // 3. remove item from cart
    removeFromCart: (state, action) => {
      // check if item exist in cart, using id from payload
      const item = state.items.find((item) => item.id === action.payload);
      if (item)
        state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // 4. claer all cart items
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export const selectAllCartItems = (state) => state.cart.items;

// calculate total items count and price using Array.reduce()
// and using createSelector for memoizing return of results
export const selectCartItemsCount = createSelector([selectAllCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);
export const selectTotalCartPrice = createSelector([selectAllCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity * item.price, 0)
);
