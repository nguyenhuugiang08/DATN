import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces/interface";

interface Item {
    currentUser: User
}

const authSlice = createSlice({
    name: "auth",
    initialState: [] as Item[],
    reducers: {
        // addTodo: {
        //     reducer: (state, action: PayloadAction<Item>) => {
        //         state.push(action.payload);
        //     },
        //     prepare: (text: string) => {
        //         const id = nanoid();
        //         return { payload: { id, text } };
        //     },
        // },
        login: (state, action: PayloadAction<Item>) => {
            state.push(action.payload);
        }
    },
});

export const { login } = authSlice.actions
export default authSlice.reducer
