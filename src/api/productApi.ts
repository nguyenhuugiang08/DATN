import axiosClient from "./axiosClient";
import axiosRefresh from "./axiosRefresh";

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
    }
};

export default productApi;
