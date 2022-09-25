import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./features/product/productSlice";
import cartReducer from "./features/product/cartSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
