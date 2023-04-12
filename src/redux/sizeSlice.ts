import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Size } from "../interfaces/interface";
import type { AxiosError } from "axios";
import sizeApi from "api/sizeApi";

interface ValidationErrors {
    errorMessage: string;
    field_errors: Record<string, string>;
}

export const getSizes = createAsyncThunk<Size[]>("size/getAll", async () => {
    try {
        const response = await sizeApi.getSizes();
        return response.data?.sizes;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

interface sizeState {
    error: string | null | undefined;
    sizes: Size[];
}

const initialState = {
    sizes: [],
    error: null,
} as sizeState;

const sizeSlice = createSlice({
    name: "size",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSizes.fulfilled, (state, { payload }) => {
            state.sizes = [...payload];
        });
        builder.addCase(getSizes.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export default sizeSlice.reducer;
