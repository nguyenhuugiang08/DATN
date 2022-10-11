import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/interface";
import type { AxiosError } from "axios";
import authApi from "../api/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        const response = await toast.promise(authApi.login(userData), {
            pending: "Đang xử lý",
            success: "Đăng nhập thành công",
            error: {
                render({ data }) {
                    const { response } = data;
                    return `Đăng nhập thất bại ${response.data?.message}`;
                },
            },
        });
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
    reducers: {
        loginSuccess: (state, action) => {
            state.entities = [action.payload];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.entities = [payload];
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

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
