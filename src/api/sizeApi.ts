import axiosClient from "./axiosClient";

const sizeApi = {
    getSizes: () => {
        const url = "/size";
        return axiosClient.get(url);
    },
};

export default sizeApi;
