import axios from "axios";
import queryString from "query-string";
import jwt_decode from "jwt-decode";
import authApi from "./authApi";

export interface MyToken {
    name: string;
    exp: number;
    role?: string;
    userId?: string;
}

const localUser = (
    localStorage.getItem("persist:root") ? localStorage.getItem("persist:root") : null
) as string;

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
    if (localUser) {
        let { auth } = JSON.parse(localUser);
        const { accessToken } = JSON.parse(auth)?.entities[0];
        let date = new Date();
        const decodedToken = jwt_decode<MyToken>(accessToken);
        if (decodedToken.exp < (date.getTime() / 1000)) {
            const data = (await authApi.refreshToken()) as any;
            const newAccessToken: string = data.accessToken;

            const refreshUser = {
                ...JSON.parse(auth)?.entities[0],
                accessToken: newAccessToken,
            };

            auth = { ...refreshUser };
            localStorage.setItem("persist:root",JSON.stringify(auth));

            if (config.headers) config.headers["token"] = `Bearer ${newAccessToken}`;
        } else {
            if (config.headers) config.headers["token"] = `Bearer ${accessToken}`;
        }
    }
    return config;
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

export default axiosRefresh;
