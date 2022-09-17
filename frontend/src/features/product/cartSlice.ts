import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { Cart, ProductInCart } from "types";

export type CartState = {
  cart: Cart;
};

const initialState: CartState = {
  cart: {
    cartItems: [],
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addToCart } = cartSlice.actions;

//  Selector
export const selectCartState = (state: RootState): CartState => state.cart;

export default cartSlice.reducer;
