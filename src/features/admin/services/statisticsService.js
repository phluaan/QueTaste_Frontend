import axios from "axios";
import { API_BASE_URL } from "../../../config";

export const getRevenueApi = async (token, { filterType, range }) => {
    const res = await axios.get(`${API_BASE_URL}/statistics/revenue`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { filterType, range },
    });
    return res.data;
};

export const getCashFlowApi = async (token) => {
    const res = await axios.get(`${API_BASE_URL}/statistics/cashflow`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};