import axiosClient from "./axiosClient";
import axiosRefresh from "./axiosRefresh";

export interface DataUpdateProduct {
    id: string | undefined;
    formData: FormData;
}

const productApi = {
    getAllProduct: () => {
        const url = "/product";
        return axiosClient.get(url);
    },
    getProductById: (params: string | undefined) => {
        const url = `/product/${params}`;
        return axiosClient.get(url);
    },
    deleteProduct: (params: string | undefined) => {
        const url = `/product/delete/${params}`;
        return axiosRefresh.delete(url);
    },
    updateProduct: (data: DataUpdateProduct) => {
        const url = `/product/update/${data.id}`;
        return axiosRefresh.put(url, data.formData);
    },
};

export default productApi;
