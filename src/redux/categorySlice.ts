import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../interfaces/interface";
import type { AxiosError, AxiosInstance } from "axios";
import categoryApi from "api/categoryApi";

interface ValidationErrors {
    errorMessage: string;
    field_errors: Record<string, string>;
}

export const getAllCategory = createAsyncThunk<Category[]>("category/getAll", async () => {
    try {
        const response = await categoryApi.getAllCategories();
        return response.data?.categories;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

export const getTrashCategory = createAsyncThunk<Category[], AxiosInstance>(
    "category/trash",
    async (axiosRefresh: AxiosInstance) => {
        try {
            const response = await categoryApi.getTrashCategory(axiosRefresh);
            return response.data?.categories;
        } catch (err) {
            let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
            if (!error.response) {
                throw err;
            }
            return error.response.data;
        }
    }
);

interface categoryState {
    error: string | null | undefined;
    categories: Category[];
    trashCategories: Category[];
    category: Category;
}

const initialState = {
    categories: [],
    trashCategories: [],
    category: {} as Category,
    error: null,
} as categoryState;

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.fulfilled, (state, { payload }) => {
            state.categories = [...payload];
        });
        builder.addCase(getAllCategory.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(getTrashCategory.fulfilled, (state, { payload }) => {
            state.trashCategories = [...payload];
        });
        builder.addCase(getTrashCategory.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export default categorySlice.reducer;
