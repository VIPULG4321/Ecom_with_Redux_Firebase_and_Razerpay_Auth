import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const { id, title, price, quantity,images } = action.payload;
        console.log("Form cartSlice",action.payload)

        const existingProduct = state.items.find((item) => item.id === id);
  
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          state.items.push({ id, title, price, quantity, images });
        }
    },
    // addToCart: (state, action) => {
    //   console.log("from slice",action.payload)
    //   state.items.push(action.payload);  // Push product object to cartItems
    // },

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