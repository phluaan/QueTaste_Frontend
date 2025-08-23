import axios from "axios";
import store from "../app/store";
import { setTokens, logout } from "../features/auth/authSlice";
import { API_BASE_URL } from "./config";

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {"Content-Type": "application/json"},
});

// Request: gan token
axiosClient.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token){
        config.headers.Authorization = 'Bearer ${token}';
    }
    return config;
});

// Response 401
axiosClient.interceptors.response.use(
    (res) => res.data,
    async (error) => {
        const originalRequest = error.config;
        const state = store.getState();
        if (error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
        try{
            const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                token: state.auth.refreshToken,
            });
            store.dispatch(setTokens({ accessToken: res.data.data.accessToken}));
            originalRequest.headers.Authorization = 'Bearer ${res.data.data.accessToken}';
            return axiosClient(originalRequest);
        } catch (err){
            console.error(err);
            store.dispatch(logout());
        }
    }
    return Promise.reject(error);
    }
);

export default axiosClient;