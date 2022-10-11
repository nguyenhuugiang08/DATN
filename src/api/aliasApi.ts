import axiosRefresh from "./axiosRefresh";
import axiosClient from "./axiosClient";

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
    createAlias: (data: DataCreateAlias) => {
        const url = "/alias/create";
        return axiosRefresh.post(url, data);
    },
    deleteAlias: (params: string) => {
        const url = `/alias/delete/${params}`;
        return axiosRefresh.delete(url);
    },
    updateAlias: (data: DataUpdateAlias) => {
        const { id, ...rest } = data;
        const url = `/alias/update/${id}`;
        return axiosRefresh.put(url, rest);
    },
    restoreAlias: (params: string) => {
        const url = `/alias/restore/${params}`;
        return axiosRefresh.patch(url);
    },
    getTrashAlias: () => {
        const url = `/alias/trash`;
        return axiosRefresh.get(url);
    },
    getAliasById: (params: string | undefined) => {
        const url = `/alias/${params}`;
        return axiosClient.get(url);
    },
};

export default aliasApi;
