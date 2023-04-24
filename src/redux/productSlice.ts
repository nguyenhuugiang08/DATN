import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../interfaces/interface";
import type { AxiosError, AxiosInstance } from "axios";
import productApi from "../api/productApi";

interface ValidationErrors {
    errorMessage: string;
    field_errors: Record<string, string>;
}

interface CategoryData {
    categoryId: string | undefined;
    minPrice: number | string;
    maxPrice: number | string;
}

export const getProductByFilters = createAsyncThunk<Product[]>("product/getAll", async () => {
    try {
        const response = await productApi.getProductByFilter();
        return response.data?.listProducts;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

export const getProductsByCategoryId = createAsyncThunk<any, CategoryData>(
    "product/getProductByCategory",
    async (categoryData: CategoryData) => {
        try {
            const response = await productApi.getProductsByCategoryId(
                categoryData.categoryId,
                categoryData.minPrice,
                categoryData.maxPrice
            );
            return response.data?.products;
        } catch (err) {
            let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
            if (!error.response) {
                throw err;
            }
            return error.response.data;
        }
    }
);

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

export const getTrashProducts = createAsyncThunk<Product[], AxiosInstance>(
    "product/getTrash",
    async (axiosRefresh: AxiosInstance) => {
        try {
            const response = await productApi.getTrashProduct(axiosRefresh);
            return response.data?.listProducts;
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
    products: Product[];
    trashProducts: Product[];
    product: Product;
    categoryProducts: Product[];
}

const initialState = {
    products: [],
    product: {} as Product,
    trashProducts: [],
    categoryProducts: [],
    error: null,
} as ProductState;

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        sortProduct: (state, action) => {
            state.categoryProducts = [...action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProductByFilters.fulfilled, (state, { payload }) => {
            state.products = [...payload];
        });
        builder.addCase(getProductByFilters.rejected, (state, action) => {
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

        builder.addCase(getTrashProducts.fulfilled, (state, { payload }) => {
            state.trashProducts = [...payload];
        });
        builder.addCase(getTrashProducts.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(getProductsByCategoryId.fulfilled, (state, { payload }) => {
            state.categoryProducts = [...payload];
        });
        builder.addCase(getProductsByCategoryId.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export const { sortProduct } = productSlice.actions;
export default productSlice.reducer;
