import axios from "axios";
import { API_BASE_URL } from "../../../config";

export const getAllProductsApi = async (params = {}) => {
  const res = await axios.get(`${API_BASE_URL}/product`, { params });
  return res.data;
};

export const getProductDetailApi = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/product/${id}`);
  return res.data;
};

export const suggestProductsApi = async (q, limit = 8) => {
  const res = await axios.get(`${API_BASE_URL}/product/suggest`, { params: { q, limit } });
  return res.data;
};