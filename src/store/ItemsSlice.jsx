import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateItem: (state, action) => {
      const { id, name, description, price, image, categoryId } =
        action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.name = name;
        existingItem.description = description;
        existingItem.price = price;
        existingItem.image = image;
        existingItem.categoryId = categoryId;
      }
    },
  },
});

export const itemActions = itemSlice.actions;
export default itemSlice.reducer;
