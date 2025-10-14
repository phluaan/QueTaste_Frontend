import axios from "axios";
import { API_BASE_URL } from "../../../config";

const authHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllPostsApi = async (useAuth = false) => {
    const res = await axios.get(`${API_BASE_URL}/post`, {
        headers: useAuth ? authHeaders() : {},
    });
    return res.data;
};

export const getPostDetailApi = async (slug, useAuth = false) => {
    const url = useAuth ? `${API_BASE_URL}/post/${slug}?preview=1` : `${API_BASE_URL}/post/${slug}`;
    const res = await axios.get(url, {
        headers: useAuth ? authHeaders() : {},
    });
    return res.data.data;
};