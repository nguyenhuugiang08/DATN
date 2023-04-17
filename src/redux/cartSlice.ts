import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "interfaces/interface";

interface CartState {
    cart: CartItem[];
}

const initialState = {
    cart: [],
} as CartState;

const cartSilce = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.cart.push(action.payload);
        },
        deleteItem: (state, action) => {
            state.cart = state.cart.filter((item) => item.productId !== action.payload.productId);
        },
    },
});
export const { addItem, deleteItem } = cartSilce.actions;
export default cartSilce.reducer;
