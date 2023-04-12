import { combineReducers, configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import newsReducer from "./newsSlice";
import othersReducer from "./othersSlice";
import sizeReducer from "./sizeSlice";
import colorReducer from "./colorSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    news: newsReducer,
    others: othersReducer,
    size: sizeReducer,
    color: colorReducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = (): any => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;
