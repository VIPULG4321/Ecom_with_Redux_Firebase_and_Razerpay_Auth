import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/searchSlice";
import cartReducer from "../features/cartSlice"

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
  },
});

export default store;