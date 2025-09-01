import axios from "axios";
import { API_BASE_URL } from "../../../config";

export const getAllProductsApi = async () => {
    const res = await axios.get(`${API_BASE_URL}/product`);
    return res.data;
};

export const getProductDetailApi = async (id)=>{
    const res = await axios.get(`${API_BASE_URL}/product/${id}`);
    return res.data;
}

export const getNewestProductsApi = async () => {
    const res = await axios.get(`${API_BASE_URL}/product/newest`);
    return res.data;
};

export const getBestSellingProductsApi = async () => {
    const res = await axios.get(`${API_BASE_URL}/product/bestselling`);
    return res.data;
};

export const getMostViewedProductsApi = async () => {
    const res = await axios.get(`${API_BASE_URL}/product/mostviewed`);
    return res.data;
};

export const getTopDiscountedProductsApi = async () => {
    const res = await axios.get(`${API_BASE_URL}/product/topdiscounted`);
    return res.data;
};
