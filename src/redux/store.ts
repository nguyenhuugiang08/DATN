import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";

const rootReducer = {
    auth: authReducer,
};

const store = configureStore({ reducer: rootReducer });

export default store;
