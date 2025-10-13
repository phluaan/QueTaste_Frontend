import axios from "axios";
import store from "../redux/store";
import { logout, setAccessToken } from "../features/auth/slices/authSlice";
import { setTokens, getRefreshToken } from "./storage";
import { API_BASE_URL } from "../config";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token available");

        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        const newAccessToken = data?.data?.accessToken || data?.accessToken;

        if (!newAccessToken) throw new Error("No new access token returned");

        store.dispatch(setAccessToken(newAccessToken));
        const rememberMe = store.getState().auth.rememberMe;
        setTokens(newAccessToken, refreshToken, rememberMe);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        console.error("❌ Refresh token failed:", err);
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
