import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addonsSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    addAddon: (state, action) => {
      state.push(action.payload);
    },
    removeAddon: (state, action) => {
      return state.filter((addon) => addon.id !== action.payload);
    },
    updateAddon: (state, action) => {
      const { id, name, price, linkedItemsIds } = action.payload;
      const existingAddon = state.find((addon) => addon.id === id);

      if (existingAddon) {
        existingAddon.name = name;
        existingAddon.price = price;
        existingAddon.linkedItemsIds = linkedItemsIds;
      }
    },
  },
});

export const addonActions = addonsSlice.actions;
export default addonsSlice.reducer;
