import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductInterface } from "../interfaces/interface";
import type { AxiosError } from "axios";
import productApi from "../api/productApi";

interface ValidationErrors {
    errorMessage: string;
    field_errors: Record<string, string>;
}

export const getAllProducts = createAsyncThunk<ProductInterface[]>("product/getAll", async () => {
    try {
        const response = await productApi.getAllProduct();
        return response.data?.products;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

export const getProductById = createAsyncThunk(
    "product/getProductById",
    async (id: string | undefined) => {
        try {
            const response = await productApi.getProductById(id);
            return response.data;
        } catch (err) {
            let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
            if (!error.response) {
                throw err;
            }
            return error.response.data;
        }
    }
);

interface ProductState {
    error: string | null | undefined;
    products: ProductInterface[];
    product: ProductInterface;
}

const initialState = {
    products: [],
    product: {} as ProductInterface,
    error: null,
} as ProductState;

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
            state.products = [...payload];
        });
        builder.addCase(getAllProducts.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(getProductById.fulfilled, (state, { payload }) => {
            state.product = { ...payload };
        });
        builder.addCase(getProductById.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export default productSlice.reducer;
