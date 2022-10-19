import axiosClient from "./axiosClient";
export interface Params {
    keyword: string | undefined;
}

const othersApi = {
    search: (params: Params) => {
        const url = "/search";
        return axiosClient.get(url, { params });
    },
    getHome: () => {
        const url = "/home";
        return axiosClient.get(url);
    },
};

export default othersApi;
