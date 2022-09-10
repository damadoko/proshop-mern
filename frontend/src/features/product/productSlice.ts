import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "store";
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

//  Selector

export const selectProductState = (state: RootState): ProductState =>
  state.product;

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export default productSlice.reducer;
