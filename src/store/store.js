import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/features/product/productSlice";
import brandSlice from "@/features/brand/brandSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    brand: brandSlice,
  },
});
