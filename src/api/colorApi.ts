import axiosClient from "./axiosClient";

const colorApi = {
    getColors: () => {
        const url = "/color";
        return axiosClient.get(url);
    },
};

export default colorApi;
