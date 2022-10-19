import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import othersApi, { Params } from "api/othersApi";
import { HomeData } from "../interfaces/interface";

interface ValidationErrors {
    errorMessage: string;
    field_errors: Record<string, string>;
}

export const getHome = createAsyncThunk("others/getHome", async () => {
    try {
        const response = await othersApi.getHome();
        return response.data;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

export const search = createAsyncThunk("alias/trash", async (params: Params) => {
    try {
        const response = await othersApi.search(params);
        return response.data;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

interface OthersState {
    error: string | null | undefined;
    dataHome: HomeData;
    dataSearch: {};
}

const initialState = {
    dataHome: {},
    dataSearch: {},
    error: null,
} as OthersState;

const othersSlice = createSlice({
    name: "others",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHome.fulfilled, (state, { payload }) => {
            state.dataHome = { ...payload };
        });
        builder.addCase(getHome.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(search.fulfilled, (state, { payload }) => {
            state.dataSearch = { ...payload };
        });
        builder.addCase(search.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export default othersSlice.reducer;
