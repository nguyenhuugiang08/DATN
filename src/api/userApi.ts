import { AxiosInstance } from "axios";
import axiosClient from "./axiosClient";

export interface DataForgotPassword {
    email: string;
}

export interface DataResetPassword {
    newPassword: string;
    email: string | (string | null)[] | null;
}

const userApi = {
    forgotPassword: (data: DataForgotPassword) => {
        const url = "/user/forgot-password";
        return axiosClient.post(url, data);
    },
    getInfoUser: (axios: AxiosInstance) => {
        const url = "/user/info";
        return axios.get(url);
    },
    resetPassword: (data: DataResetPassword) => {
        const { email, newPassword } = data;
        const url = "/user/reset-password";
        return axiosClient.patch(url, { newPassword }, { params: { email } });
    },
};

export default userApi;
