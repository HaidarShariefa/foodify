import { createSlice, nanoid } from "@reduxjs/toolkit";

// Helper to compare selectedAddons regardless of order
function areAddonsEqual(a, b) {
  if (a.length !== b.length) return false;

  const sortedA = [...a].sort((x, y) => x.id.localeCompare(y.id));
  const sortedB = [...b].sort((x, y) => x.id.localeCompare(y.id));

  return JSON.stringify(sortedA) === JSON.stringify(sortedB);
}

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const {
        itemId,
        itemName,
        itemImage,
        basePrice,
        selectedAddons,
        quantity = 1, // default to 1 if not passed
      } = action.payload;

      const addonsPrice = selectedAddons.reduce(
        (sum, addon) => sum + addon.price * (addon.quantity || 1),
        0
      );

      const totalPerUnit = basePrice + addonsPrice;

      const existingCartItem = state.find(
        (item) =>
          item.itemId === itemId &&
          areAddonsEqual(item.selectedAddons, selectedAddons)
      );

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        existingCartItem.totalPrice = existingCartItem.quantity * totalPerUnit;
      } else {
        state.push({
          id: nanoid(),
          itemId,
          itemName,
          itemImage,
          basePrice,
          selectedAddons,
          addonsPrice,
          quantity,
          totalPrice: totalPerUnit * quantity,
        });
      }
    },

    removeItemFromCart: (state, action) => {
      const { id } = action.payload;

      const existingCartItem = state.find((item) => item.id === id);

      if (existingCartItem) {
        if (existingCartItem.quantity > 1) {
          existingCartItem.quantity--;
          const unitPrice =
            existingCartItem.basePrice + existingCartItem.addonsPrice;
          existingCartItem.totalPrice = existingCartItem.quantity * unitPrice;
        } else {
          return state.filter((item) => item.id !== id);
        }
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity++;
        item.totalPrice = (item.basePrice + item.addonsPrice) * item.quantity;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
          item.totalPrice = (item.basePrice + item.addonsPrice) * item.quantity;
        } else {
          return state.filter((i) => i.id !== action.payload.id);
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
