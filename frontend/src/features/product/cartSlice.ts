import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { Cart, ProductInCart } from "types";

export type CartState = {
  cart: Cart;
};

const cartItemFromStorage = JSON.parse(
  localStorage.getItem("cartItems") ?? "[]"
);

const initialState: CartState = {
  cart: {
    cartItems: cartItemFromStorage,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateItemQuantityInCart: (
      state: CartState,
      action: PayloadAction<ProductInCart>
    ) => {
      const itemIndex = state.cart.cartItems.findIndex(
        ({ _id }) => action.payload._id === _id
      );

      if (itemIndex !== -1) {
        state.cart.cartItems[itemIndex].quantity = action.payload.quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
      }
    },
    addToCart: (state: CartState, action: PayloadAction<ProductInCart>) => {
      const itemIndex = state.cart.cartItems.findIndex(
        ({ _id }) => action.payload._id === _id
      );

      if (itemIndex === -1) {
        state.cart.cartItems.push(action.payload);
      } else {
        state.cart.cartItems[itemIndex].quantity =
          state.cart.cartItems[itemIndex].quantity + action.payload.quantity;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
    },
    removeItemInCart: (state: CartState, action: PayloadAction<string>) => {
      state.cart.cartItems = state.cart.cartItems.filter(
        ({ _id }) => _id !== action.payload
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
    },
  },
});

export const { addToCart, updateItemQuantityInCart, removeItemInCart } =
  cartSlice.actions;

//  Selector
export const selectCartState = (state: RootState): CartState => state.cart;

export default cartSlice.reducer;
