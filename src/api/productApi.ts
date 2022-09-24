import axiosClient from "./axiosClient";

const productApi = {
    getAllProduct: () => {
        const url = "/product";
        return axiosClient.get(url);
    },
    getProductById: (params: string | undefined) => {
        const url = `/product/${params}`;
        return axiosClient.get(url);
    },
};

export default productApi;
