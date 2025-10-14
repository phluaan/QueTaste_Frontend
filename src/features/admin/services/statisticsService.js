import axios from "axios";
import { API_BASE_URL } from "../../../config";

const authHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const qs = (obj) => {
    const params = new URLSearchParams();
    Object.entries(obj || {}).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") params.set(k, v);
    });
    return params.toString();
};

export const getSummaryApi = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/statistics/summary`, { headers: authHeaders() });
    return data;
};

export const getCompareApi = async ({ scope, year, month, quarter, metric }) => {
    const query = qs({
        scope,
        year,
        month: scope === "month" ? month : undefined,
        quarter: scope === "quarter" ? quarter : undefined,
        metric: metric || "revenue",
    });
    const { data } = await axios.get(`${API_BASE_URL}/statistics/compare?${query}`, { headers: authHeaders() });
    return data;
};

export const getWeeklyProfitApi = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/statistics/weekly-profit`, { headers: authHeaders() });
    return data;
};

export const getOrderStatusApi = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/statistics/order-status`, { headers: authHeaders() });
    return data;
};

export const getTopProductsApi = async ({ limit = 5, from, to } = {}) => {
    const query = qs({ limit, from, to });
    const { data } = await axios.get(`${API_BASE_URL}/statistics/top-products?${query}`, {
        headers: authHeaders(),
    });
    return data;
};

export const getNewCustomersApi = async ({ months = 3 } = {}) => {
    const { data } = await axios.get(`${API_BASE_URL}/statistics/new-customers?${qs({ months })}`, {
        headers: authHeaders(),
    });
    return data;
};

export const getUserRegsByDayApi = async ({ year, month }) => {
    const { data } = await axios.get(
        `${API_BASE_URL}/statistics/users/registrations-by-day?${qs({ year, month })}`,
        { headers: authHeaders() }
    );
    return data;
};

export const getTopSpendersUsersApi = async ({ limit = 3, from, to } = {}) => {
    const { data } = await axios.get(
        `${API_BASE_URL}/statistics/users/top-spenders?${qs({ limit, from, to })}`,
        { headers: authHeaders() }
    );
    return data;
};

export const getBuyerRatioApi = async ({ year }) => {
    const { data } = await axios.get(
        `${API_BASE_URL}/statistics/users/buyer-ratio?${qs({ year })}`,
        { headers: authHeaders() }
    );
    return data;
};

export const getUsersApi = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE_URL}/statistics/users?${qs(params)}`, {
        headers: authHeaders(),
    });
    return data;
};

export const getUserDetailApi = async (id) => {
    const { data } = await axios.get(`${API_BASE_URL}/statistics/users/${id}`, { headers: authHeaders() });
    return data;
};

export const getPostsViewsTotalApi = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/statistics/posts/views-total`, {
        headers: authHeaders(),
    });
    return data;
};

export const getTopPostsByViewsApi = async ({ limit = 5 } = {}) => {
    const { data } = await axios.get(`${API_BASE_URL}/statistics/posts/top?${qs({ limit })}`, {
        headers: authHeaders(),
    });
    return data;
};

export const lockPostBySlugApi = async (slug, locked) => {
    const { data } = await axios.patch(
        `${API_BASE_URL}/statistics/posts/${slug}/lock`,
        { locked },
        { headers: authHeaders() }
    );
    return data;
};

export const updatePostBySlugApi = async (slug, payload) => {
    const { data } = await axios.patch(`${API_BASE_URL}/statistics/posts/${slug}`, payload, {
        headers: authHeaders(),
    });
    return data;
};