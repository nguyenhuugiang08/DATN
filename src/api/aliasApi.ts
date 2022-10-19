import axiosClient from "./axiosClient";
import { AxiosInstance } from "axios";

export interface DataCreateAlias {
    name: string;
}

export interface DataUpdateAlias {
    id: string | undefined;
    name: string;
}

const aliasApi = {
    getAllAlias: () => {
        const url = "/alias";
        return axiosClient.get(url);
    },
    createAlias: (data: DataCreateAlias, axios: AxiosInstance) => {
        const url = "/alias/create";
        return axios.post(url, data);
    },
    deleteAlias: (params: string, axios: AxiosInstance) => {
        const url = `/alias/delete/${params}`;
        return axios.delete(url);
    },
    updateAlias: (data: DataUpdateAlias, axios: AxiosInstance) => {
        const { id, ...rest } = data;
        const url = `/alias/update/${id}`;
        return axios.put(url, rest);
    },
    restoreAlias: (params: string, axios: AxiosInstance) => {
        const url = `/alias/restore/${params}`;
        return axios.patch(url);
    },
    getTrashAlias: (axios: AxiosInstance) => {
        const url = `/alias/trash`;
        return axios.get(url);
    },
    getAliasById: (params: string | undefined) => {
        const url = `/alias/${params}`;
        return axiosClient.get(url);
    },
};

export default aliasApi;
