import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //action.payload === newwItem
      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      //action.payload === pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //action.payload === pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      // i dont understand what is happening down there though
      if(item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action)
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getCart = (state) => state.Cart.cart;
export const getTotalCartQuantity = (state) =>
  state.Cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.Cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const  getQuantity = (id) => (state)=> state.Cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0




export default cartSlice.reducer;
