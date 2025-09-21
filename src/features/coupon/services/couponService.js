import axios from "axios";
import { API_BASE_URL } from "../../../config";

// --- Admin ---
export const getAdminCouponsApi = async (params = {}, token) => {
    const res = await axios.get(`${API_BASE_URL}/coupon/admin`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// --- User ---
export const getUserCouponsApi = async (params = {}, token) => {
    const res = await axios.get(`${API_BASE_URL}/coupon/user`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
    });
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

// Lấy coupon đã đổi
export const getMyCouponsApi = async (token) => {
    const res = await axios.get(`${API_BASE_URL}/coupon/my`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// Đổi coupon
export const redeemCouponApi = async (id, token) => {
    const res = await axios.post(
        `${API_BASE_URL}/coupon/${id}/redeem`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
};