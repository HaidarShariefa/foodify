import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./CategoriesSlice";
import itemsReducer from "./ItemsSlice";
import addonsReducer from "./AddonsSlice";
import cartReducer from "./CartSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    items: itemsReducer,
    addons: addonsReducer,
    cart: cartReducer,
  },
});

export default store;
