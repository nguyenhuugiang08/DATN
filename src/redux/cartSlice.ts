import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "interfaces/interface";

interface CartState {
    cart: CartItem[];
}

const initialState = {
    cart: [],
} as CartState;

const cartSilce = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            if (state.cart.map((_) => _.productId).includes(action.payload.productId)) {
                const index = state.cart.findIndex((_) => _.productId === action.payload.productId);
                if (
                    state.cart[index].color._id === action.payload.color._id &&
                    state.cart[index].size._id === action.payload.size._id
                ) {
                    state.cart[index].quantity = Number(state.cart[index].quantity) + 1;
                } else {
                    state.cart.push(action.payload);
                }
            } else {
                state.cart.push(action.payload);
            }
        },
        deleteItem: (state, action) => {
            state.cart = state.cart.filter((item) => item.productId !== action.payload.productId);
        },
    },
});
export const { addItem, deleteItem } = cartSilce.actions;
export default cartSilce.reducer;
