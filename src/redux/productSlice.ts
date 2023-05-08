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
    sortType: number | string;
    page: number | string;
}

interface DiscountData {
    page: number | string;
    sortType: number | string;
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
    async (categoryData: CategoryData, { dispatch }) => {
        try {
            dispatch(userLoading(true));
            dispatch(setHasMore(false));
            const response = await productApi.getProductsByCategoryId(
                categoryData.categoryId,
                categoryData.minPrice,
                categoryData.maxPrice,
                categoryData.sortType,
                categoryData.page
            );
            dispatch(userLoading(false));
            dispatch(setHasMore(response.data?.hasMoreItems));
            dispatch(setIsProgress(response.data?.hasMoreItems));
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

export const getProductDiscount = createAsyncThunk<any, DiscountData>(
    "product/discount",
    async (discountData: DiscountData, { dispatch }) => {
        try {
            dispatch(userLoading(true));
            dispatch(setHasMore(false));
            const response = await productApi.getProductDiscount(
                discountData.page,
                discountData.sortType
            );
            dispatch(userLoading(false));
            dispatch(setHasMore(response.data?.hasMoreItems));
            dispatch(setIsProgress(response.data?.hasMoreItems));
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
    loading: boolean;
    discountProducts: Product[];
    hasMore: boolean;
    isProgress: boolean;
}

const initialState = {
    products: [],
    product: {} as Product,
    trashProducts: [],
    categoryProducts: [],
    error: null,
    loading: false,
    discountProducts: [],
    hasMore: false,
    isProgress: false,
} as ProductState;

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        resetProduct: (state) => {
            state.categoryProducts = [];
        },

        userLoading: (state, action) => {
            state.loading = action.payload;
        },

        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },

        setIsProgress: (state, action) => {
            state.isProgress = action.payload;
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
            const lstItems = [];
            payload?.map((item: Product) => {
                if (!state.categoryProducts.map((_) => _._id).includes(item._id)) {
                    state.categoryProducts.push(item);
                    lstItems.push(item);
                }
            });

            if (lstItems.length === 0 && state.hasMore) {
                state.categoryProducts = [...payload];
            }
        });
        builder.addCase(getProductsByCategoryId.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(getProductDiscount.fulfilled, (state, { payload }) => {
            const lstItems = [];
            payload?.map((item: Product) => {
                if (!state.discountProducts.map((_) => _._id).includes(item._id)) {
                    state.discountProducts.push(item);
                    lstItems.push(item);
                }
            });

            if (lstItems.length === 0 && state.hasMore) {
                state.discountProducts = [...payload];
            }
        });
        builder.addCase(getProductDiscount.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export const { resetProduct, userLoading, setHasMore, setIsProgress } = productSlice.actions;
export default productSlice.reducer;
