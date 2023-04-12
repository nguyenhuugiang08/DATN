import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Color } from "../interfaces/interface";
import type { AxiosError } from "axios";
import colorApi from "api/colorApi";

interface ValidationErrors {
    errorMessage: string;
    field_errors: Record<string, string>;
}

export const getColors = createAsyncThunk<Color[]>("color/getAll", async () => {
    try {
        const response = await colorApi.getColors();
        return response.data?.colors;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

interface colorState {
    error: string | null | undefined;
    colors: Color[];
}

const initialState = {
    colors: [],
    error: null,
} as colorState;

const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getColors.fulfilled, (state, { payload }) => {
            state.colors = [...payload];
        });
        builder.addCase(getColors.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export default colorSlice.reducer;
