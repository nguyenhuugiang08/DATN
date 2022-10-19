import { AxiosInstance } from "axios";
import axiosClient from "./axiosClient";

export interface DataCreateNews {
    formData: FormData;
}

export interface DataEditNews {
    id: string | undefined;
    formData: FormData;
}

const newsApi = {
    getAllNews: () => {
        const url = "/news";
        return axiosClient.get(url);
    },
    getTrashNews: (axios: AxiosInstance) => {
        const url = "/news/trash";
        return axios.get(url);
    },
    getNewsById: (params: string | undefined) => {
        const url = `/news/${params}`;
        return axiosClient.get(url);
    },
    createNews: ({ formData }: DataCreateNews, axios: AxiosInstance) => {
        const url = "/news/create";
        return axios.post(url, formData);
    },
    updateNews: ({ id, formData }: DataEditNews, axios: AxiosInstance) => {
        const url = `/news/update/${id}`;
        return axios.put(url, formData);
    },
    deleteNews: (params: string | undefined, axios: AxiosInstance) => {
        const url = `/news/delete/${params}`;
        return axios.delete(url);
    },
    restoreNews: (params: string | undefined, axios: AxiosInstance) => {
        const url = `/news/restore/${params}`;
        return axios.patch(url);
    }
};

export default newsApi;
