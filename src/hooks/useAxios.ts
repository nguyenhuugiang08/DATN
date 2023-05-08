import axios from "axios";
import queryString from "query-string";
import jwt_decode from "jwt-decode";
import authApi from "api/authApi";
import { RootState, useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { loginSuccess } from "redux/authSlice";
import { toast } from "react-toastify";

export interface MyToken {
    name: string;
    exp: number;
    role?: string;
    userId?: string;
}

const useAxios = () => {
    const dispatch = useAppDispatch();
    const { entities } = useSelector((state: RootState) => state.auth);

    const axiosRefresh = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        withCredentials: true,
        paramsSerializer: (params) => queryString.stringify(params),
    });

    axiosRefresh.interceptors.request.use(async (config) => {
        if (entities.length) {
            const accessToken = entities?.[0].accessToken;
            let date = new Date();
            const decodedToken = jwt_decode<MyToken>(accessToken);

            if (decodedToken.exp < date.getTime() / 1000) {
                const data = (await authApi.refreshToken()) as any;
                const newAccessToken: string = data.accessToken;

                const refreshUser = {
                    ...entities?.[0],
                    accessToken: newAccessToken,
                };

                dispatch(loginSuccess(refreshUser));

                if (config.headers) config.headers["token"] = `Bearer ${newAccessToken}`;
            } else {
                if (config.headers) config.headers["token"] = `Bearer ${accessToken}`;
            }
            return config;
        }else {
            toast("Bạn cần đăng nhập để tiếp tục thực hiện taho tác.")
        }
    });

    axiosRefresh.interceptors.response.use(
        (response) => {
            if (response && response.data) {
                return response.data;
            }

            return response;
        },
        (error) => {
            // Handle errors
            throw error;
        }
    );

    return axiosRefresh;
};

export default useAxios;
