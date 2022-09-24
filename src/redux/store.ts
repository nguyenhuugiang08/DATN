import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./authSlice";
import productReducer from "./productSlice";

const rootReducer = {
    auth: authReducer,
    product: productReducer,
};

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default store;
