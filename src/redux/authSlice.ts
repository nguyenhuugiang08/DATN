import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/interface";
import type { AxiosError, AxiosInstance } from "axios";
import authApi from "../api/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "react-router-dom";

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

export const getUsers = createAsyncThunk<User[], AxiosInstance>(
    "user/getUsers",
    async (axiosRefresh: AxiosInstance) => {
        try {
            const response = await authApi.getUsers(axiosRefresh);
            return response.data?.users;
        } catch (err) {
            let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
            if (!error.response) {
                throw err;
            }
            return error.response.data;
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        await authApi.logout().then(() => redirect("/account/login"));
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

interface UsersState {
    error: string | null | undefined;
    entities: User[];
    users: User[];
}

const initialState = {
    entities: [],
    error: null,
    users: [],
} as UsersState;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.entities = [action.payload];
        },
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

        builder.addCase(getUsers.fulfilled, (state, { payload }) => {
            state.users = [...payload];
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(logout.fulfilled, (state) => {
            state.entities = [];
        });
        builder.addCase(logout.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
