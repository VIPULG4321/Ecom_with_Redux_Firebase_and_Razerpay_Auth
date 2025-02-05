import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const { id, title, price, quantity } = action.payload;
        console.log(state.items)

        const existingProduct = state.items.find((item) => item.id === id);
  
        if (existingProduct) {
          existingProduct.quantity += quantity; // Update quantity
        } else {
          state.items.push({ id, title, price, quantity });
        }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;