import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/interface";
import type { AxiosError } from "axios";
import authApi from "../api/authApi";

interface ValidationErrors {
    errorMessage: string;
    field_errors: Record<string, string>;
}

export const loginUser = createAsyncThunk<
    User,
    { email: string; password: string } & Partial<User>,
    {
        rejectValue: ValidationErrors;
    }
>("users/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await authApi.login(userData);
        return response.data;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>; // cast the error for access
        if (!error.response) {
            throw err;
        }
        return rejectWithValue(error.response.data);
    }
});

interface UsersState {
    error: string | null | undefined;
    entities: User[];
}

const initialState = {
    entities: [],
    error: null,
} as UsersState;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.entities.push(payload);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export default authSlice.reducer;
