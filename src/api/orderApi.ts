import { AxiosInstance } from "axios";
import axiosClient from "./axiosClient";

const baseUrl = "/order";

export interface DataCreateOrder {
    formData: FormData;
}

const orderApi = {
    getOrder: (axios: AxiosInstance) => {
        return axios.get(`${baseUrl}/user-id`);
    },
    getOrderById: (id: string | undefined) => {
        return axiosClient.get(`${baseUrl}/${id}`);
    },
    createOrder: (data: DataCreateOrder, axios: AxiosInstance) => {
        return axios.post(`${baseUrl}/create`, data.formData);
    },
    changeStatusOrder: (id: string | undefined, newStatus: string | undefined) => {
        return axiosClient.put(`${baseUrl}/change-status/${id}`, newStatus);
    },
};

export default orderApi;
