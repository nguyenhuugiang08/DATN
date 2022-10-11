import axiosRefresh from "./axiosRefresh";
import axiosClient from "./axiosClient";

export interface DataCreateCategory {
    name: string;
    aliasName: string;
}

export interface DataUpdateCategory {
    id: string | undefined;
    name: string;
    aliasName: string;
}

const categoryApi = {
    getAllCategories: () => {
        const url = "/category";
        return axiosClient.get(url);
    },
    createCategory: (data: DataCreateCategory) => {
        const url = "/category/create";
        return axiosRefresh.post(url, data);
    },
    deleteCategory: (params: string) => {
        const url = `/category/delete/${params}`;
        return axiosRefresh.delete(url);
    },
    updateCategory: (data: DataUpdateCategory) => {
        const { id, ...rest } = data;
        const url = `/category/update/${id}`;
        return axiosRefresh.put(url, rest);
    },
    restoreCategory: (params: string) => {
        const url = `/category/restore/${params}`;
        return axiosRefresh.patch(url);
    },
    getTrashCategory: () => {
        const url = `/category/trash`;
        return axiosRefresh.get(url);
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
