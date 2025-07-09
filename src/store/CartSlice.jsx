import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const { itemId, selectedAddons, itemPrice, addonsPrice } = action.payload;
      const totalPerUnit = itemPrice + addonsPrice;

      const existingCartItem = state.find(
        (item) =>
          item.itemId === itemId &&
          JSON.stringify(item.selectedAddons) === JSON.stringify(selectedAddons)
      );

      if (existingCartItem) {
        existingCartItem.quantity++;
        existingCartItem.totalPrice = existingCartItem.quantity * totalPerUnit;
      } else {
        state.push({
          id: nanoid(),
          itemId,
          quantity: 1,
          selectedAddons,
          totalPrice: totalPerUnit,
        });
      }
    },

    removeItemFromCart: (state, action) => {
      const { id } = action.payload;

      const existingCartItem = state.find((item) => item.id === id);

      if (existingCartItem) {
        if (existingCartItem.quantity > 1) {
          existingCartItem.quantity--;
        } else {
          return state.filter((item) => item.id !== id);
        }
      }
    },
    clearCart: () => {
      return [];
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
