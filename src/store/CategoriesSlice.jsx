import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    removeCategory: (state, action) => {
      return state.filter((category) => category.id !== action.payload);
    },
    updateCategory: (state, action) => {
      const { id, name, image } = action.payload;
      const existingCategory = state.find((category) => category.id === id);

      if (existingCategory) {
        existingCategory.name = name;
        existingCategory.image = image;
      }
    },
  },
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
