import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./CategoriesSlice";
import itemsReducer from "./ItemsSlice";
import addonsReducer from "./AddonsSlice";
import cartReducer from "./CartSlice";

function loadCartFromLocalStorage() {
  try {
    const data = localStorage.getItem("foodify_cart");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage", error);
    return [];
  }
}

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    items: itemsReducer,
    addons: addonsReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCartFromLocalStorage(),
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("foodify_cart", JSON.stringify(state.cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
});

export default store;
