import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "types/product";

export type ProductState = {
  products: Product[];
};

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state: ProductState, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
