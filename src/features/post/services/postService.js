import axios from "axios";
import { API_BASE_URL } from "../../../config";

export const getAllPostsApi = async () => {
    const res = await axios.get(`${API_BASE_URL}/post`);
    return res.data;
};

export const getPostDetailApi = async (slug) => {
    const res = await axios.get(`${API_BASE_URL}/post/${slug}`);
    return res.data.data;
};

