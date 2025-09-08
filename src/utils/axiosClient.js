import axios from "axios";
import store from "../redux/store";
import { logout } from "../features/auth/slices/authSlice";
import { setTokens, getRefreshToken  } from "./storage";
import { API_BASE_URL } from "../config";

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {"Content-Type": "application/json"},
});

// Request interceptor: gắn token
axiosClient.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor: refresh token khi 401
axiosClient.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    const originalRequest = error.config;
    const state = store.getState();

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          token: getRefreshToken(), // <-- lấy refreshToken từ storage
        });

        const newAccessToken = res.data.data.accessToken;
        store.dispatch({ type: "auth/setAccessToken", payload: newAccessToken }); // hoặc tạo action riêng
        setTokens(newAccessToken, state.auth.refreshToken, true);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        console.error(err);
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;