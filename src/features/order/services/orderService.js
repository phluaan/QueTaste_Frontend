import axios from "axios";
import { API_BASE_URL } from "../../../config";
import axiosClient from "../../../utils/axiosClient";

export const getMyOrdersApi = async (token, params) => {
  //console.log(params);
  const response = await axios.get(`${API_BASE_URL}/order/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  //console.log("My orders: ", response.data);
  return response.data;
};

export const cancelOrderApi = async (token, orderId) => {
  const response = await axios.post(
    `${API_BASE_URL}/order/cancel/${orderId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const requestCancelOrderApi = async (token, orderId, reason) => {
  const response = await axios.post(
    `${API_BASE_URL}/order/request-cancel/${orderId}`,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const reOrderApi = async (orderId) => {
  try {
    const res = await axiosClient.post(`/order/re-order/${orderId}`);
    // success case: { success, message, data: { cart, added, skipped, code? } }
    return res;
  } catch (err) {
    // error case (4xx/5xx): axios ném lỗi -> trả về data chuẩn hóa
    if (err.response?.data) return err.response.data; // { success:false, message, data:{...} }
    return {
      success: false,
      message: err.message || "Network error",
      data: { code: "NETWORK_ERROR", cart: null, added: [], skipped: [] },
    };
  }
};

export const confirmReceivedOrderApi = async (orderId) => {
  const res = await axiosClient.put(`/order/${orderId}/update-to-completed`);
  return res;
};

export const getOrderTracking = async (orderId) => {
  const res = await axiosClient.get(`/order/tracking/${orderId}`);
  return res;
};
