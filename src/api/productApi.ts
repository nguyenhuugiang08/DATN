import { AxiosInstance } from "axios";
import axiosClient from "./axiosClient";

export interface DataUpdateProduct {
    id: string | undefined;
    formData: FormData;
}

export interface DataCreateProduct {
    formData: FormData;
}

const productApi = {
    getProductByFilter: () => {
        const url = "/product";
        return axiosClient.get(url);
    },
    getProductById: (params: string | undefined) => {
        const url = `/product/${params}`;
        return axiosClient.get(url);
    },
    deleteProduct: (params: string | undefined, axios: AxiosInstance) => {
        const url = `/product/delete/${params}`;
        return axios.delete(url);
    },
    updateProduct: (data: DataUpdateProduct, axios: AxiosInstance) => {
        const url = `/product/update/${data.id}`;
        return axios.put(url, data.formData);
    },
    createProduct: (data: DataCreateProduct, axios: AxiosInstance) => {
        const url = `/product/create`;
        return axios.post(url, data.formData);
    },
    getTrashProduct: (axios: AxiosInstance) => {
        const url = "/product/trash";
        return axios.get(url);
    },
    restoreProduct: (params: string | undefined, axios: AxiosInstance) => {
        const url = `/product/restore/${params}`;
        return axios.patch(url);
    },
    getProductsByCategoryId: (
        params: string | undefined,
        minPrice: number | string,
        maxPrice: number | string
    ) => {
        const url = `/product/category/${params}`;
        return axiosClient.get(url, {
            params: {
                minPrice: minPrice,
                maxPrice: maxPrice,
            },
        });
    },
};

export default productApi;
