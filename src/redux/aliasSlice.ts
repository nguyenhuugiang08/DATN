import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alias } from "../interfaces/interface";
import type { AxiosError } from "axios";
import aliasApi from "api/aliasApi";

interface ValidationErrors {
    errorMessage: string;
    field_errors: Record<string, string>;
}

export const getAllAlias = createAsyncThunk<Alias[]>("alias/getAll", async () => {
    try {
        const response = await aliasApi.getAllAlias();
        return response.data?.alias;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

export const getTrashAlias = createAsyncThunk<Alias[]>("alias/trash", async () => {
    try {
        const response = await aliasApi.getTrashAlias();
        return response.data?.alias;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

interface AliasState {
    error: string | null | undefined;
    aliases: Alias[];
    trashAliases: Alias[];
    alias: Alias;
}

const initialState = {
    aliases: [],
    trashAliases: [],
    alias: {} as Alias,
    error: null,
} as AliasState;

const aliasSlice = createSlice({
    name: "alias",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllAlias.fulfilled, (state, { payload }) => {
            state.aliases = [...payload];
        });
        builder.addCase(getAllAlias.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(getTrashAlias.fulfilled, (state, { payload }) => {
            state.trashAliases = [...payload];
        });
        builder.addCase(getTrashAlias.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export default aliasSlice.reducer;
