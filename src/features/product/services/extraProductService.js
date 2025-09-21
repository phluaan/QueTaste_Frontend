import axiosClient from "../../../utils/axiosClient";
import { API_BASE_URL } from "../../../config";

export const getFavoritesApi = () => axiosClient.get(`${API_BASE_URL}/favorites`);

export const addFavoriteApi = (productId) =>
  axiosClient.post(`${API_BASE_URL}/favorites`, { productId });

export const removeFavoriteApi = (productId) =>
  axiosClient.delete(`${API_BASE_URL}/favorites/${productId}`);

export const getRelatedProductsApi = (id) =>
  axiosClient.get(`${API_BASE_URL}/product/${id}/related`);

export const getProductStatsApi = (id) =>
  axiosClient.get(`${API_BASE_URL}/product/${id}/stats`);

export const getViewedProductsApi = () =>
  axiosClient.get(`${API_BASE_URL}/userviews/recent`);

export const addViewedProductApi = (id) =>
  axiosClient.post(`${API_BASE_URL}/userviews/${id}`);
