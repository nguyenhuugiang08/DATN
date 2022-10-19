import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { News } from "../interfaces/interface";
import type { AxiosError, AxiosInstance } from "axios";
import newsApi from "api/newsApi";

interface ValidationErrors {
    errorMessage: string;
    field_errors: Record<string, string>;
}

export const getAllNews = createAsyncThunk<News[]>("news/getAll", async () => {
    try {
        const response = await newsApi.getAllNews();
        return response.data?.news;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

export const getNewsById = createAsyncThunk(
    "news/getNewsById",
    async (id: string | undefined) => {
        try {
            const response = await newsApi.getNewsById(id);
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

export const getTrashNews = createAsyncThunk<News[], AxiosInstance>(
    "news/getTrash",
    async (axiosRefresh: AxiosInstance) => {
        try {
            const response = await newsApi.getTrashNews(axiosRefresh);
            return response.data?.news;
        } catch (err) {
            let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
            if (!error.response) {
                throw err;
            }
            return error.response.data;
        }
    }
);

interface NewsState {
    error: string | null | undefined;
    listNews: News[];
    trashNews: News[];
    news: News;
}

const initialState = {
    listNews: [],
    news: {} as News,
    trashNews: [],
    error: null,
} as NewsState;

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllNews.fulfilled, (state, { payload }) => {
            state.listNews = [...payload];
        });
        builder.addCase(getAllNews.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(getNewsById.fulfilled, (state, { payload }) => {
            state.news = { ...payload };
        });
        builder.addCase(getNewsById.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(getTrashNews.fulfilled, (state, { payload }) => {
            state.trashNews = [...payload];
        });
        builder.addCase(getTrashNews.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export default newsSlice.reducer;
