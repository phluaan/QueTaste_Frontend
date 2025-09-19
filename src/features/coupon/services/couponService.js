import axios from "axios";
import { API_BASE_URL } from "../../../config";

// Lấy danh sách coupon
export const getAllCouponsApi = async (params = {}) => {
    const res = await axios.get(`${API_BASE_URL}/coupon`, { params });
    return res.data;
};

// Lấy chi tiết coupon
export const getCouponDetailApi = async (id) => {
    const res = await axios.get(`${API_BASE_URL}/coupon/${id}`);
    return res.data;
};

// Tạo coupon mới
export const createCouponApi = async (data) => {
    const res = await axios.post(`${API_BASE_URL}/coupon`, data);
    return res.data;
};

// Cập nhật coupon
export const updateCouponApi = async (id, data) => {
    const res = await axios.patch(`${API_BASE_URL}/coupon/${id}`, data);
    return res.data;
};

// Đổi trạng thái (pause/archive/activate)
export const changeCouponStatusApi = async (id, action) => {
    const res = await axios.patch(`${API_BASE_URL}/coupon/${id}/${action}`);
    return res.data;
};