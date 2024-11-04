import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  coupon: {},
  numberOfItems: 0,
  totalCartPrice: 0,
  totalPriceAfterDiscount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const {
        cartItems,
        coupon,
        numberOfItems,
        totalCartPrice,
        totalPriceAfterDiscount,
      } = action.payload;

      state.cartItems = cartItems;
      state.coupon = coupon;
      state.numberOfItems = numberOfItems;
      state.totalCartPrice = totalCartPrice;
      state.totalPriceAfterDiscount = totalPriceAfterDiscount;
    },

    clearCart: (state) => (state = initialState),
  },
});

export default cartSlice.reducer;
export const { setCart, clearCart } = cartSlice.actions;
export const selectCurrentCart = (state) => state.cart;
