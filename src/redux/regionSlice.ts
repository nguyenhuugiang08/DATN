import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import regionApi from "api/regionApi";

interface ValidationErrors {
    errorMessage: string;
    field_errors: Record<string, string>;
}

export const getConscious = createAsyncThunk("region/getConscious", async () => {
    try {
        const response = await regionApi.getConscious();
        return response as any;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

export const getDistrict = createAsyncThunk("region/getDistrict", async (idProvince: string) => {
    try {
        const response = await regionApi.getDistrict(idProvince);
        return response as any;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

export const getCommune = createAsyncThunk("region/getCommune", async (idDistrict: string) => {
    try {
        const response = await regionApi.getCommune(idDistrict);
        return response as any;
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
    consciouses: any[];
    districts: any[];
    communes: any[];
}

const initialState = {
    error: null,
    consciouses: [],
    districts: [],
    communes: [],
} as sizeState;

const regionSlice = createSlice({
    name: "region",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getConscious.fulfilled, (state, { payload }) => {
            state.consciouses = [...payload];
        });
        builder.addCase(getConscious.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(getDistrict.fulfilled, (state, { payload }) => {
            state.districts = [...payload];
        });
        builder.addCase(getDistrict.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(getCommune.fulfilled, (state, { payload }) => {
            state.communes = [...payload];
        });
        builder.addCase(getCommune.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export default regionSlice.reducer;
