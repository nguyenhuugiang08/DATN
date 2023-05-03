import axiosClient from "./axiosClient";

const apiUrl = "https://sheltered-anchorage-60344.herokuapp.com";

const regionApi = {
    getConscious: () => {
        return axiosClient.get(`${apiUrl}/province`);
    },
    getDistrict: (idProvince: string) => {
        return axiosClient.get(`${apiUrl}/district/?idProvince=${idProvince}`);
    },
    getCommune: (idDistrict: string) => {
        return axiosClient.get(`${apiUrl}/commune/?idDistrict=${idDistrict}`);
    },
};

export default regionApi;
