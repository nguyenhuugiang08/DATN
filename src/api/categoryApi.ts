import axiosClient from "./axiosClient";
import { AxiosInstance } from "axios";

export interface DataCreateCategory {
    name: string;
}

export interface DataUpdateCategory {
    id: string | undefined;
    name: string;
}

const categoryApi = {
    getAllCategories: () => {
        const url = "/category";
        return axiosClient.get(url);
    },
    createCategory: (data: DataCreateCategory, axios: AxiosInstance) => {
        const url = "/category/create";
        return axios.post(url, data);
    },
    deleteCategory: (params: string, axios: AxiosInstance) => {
        const url = `/category/delete/${params}`;
        return axios.delete(url);
    },
    updateCategory: (data: DataUpdateCategory, axios: AxiosInstance) => {
        const { id, ...rest } = data;
        const url = `/category/update/${id}`;
        return axios.put(url, rest);
    },
    restoreCategory: (params: string, axios: AxiosInstance) => {
        const url = `/category/restore/${params}`;
        return axios.patch(url);
    },
    getTrashCategory: (axios: AxiosInstance) => {
        const url = `/category/trash`;
        return axios.get(url);
    },
    getCategoryById: (params: string | undefined) => {
        const url = `/category/${params}`;
        return axiosClient.get(url);
    },
    getCategoryByAliasId: (params: string | undefined) => {
        const url = `/category/alias/${params}`;
        return axiosClient.get(url);
    },
};

export default categoryApi;
