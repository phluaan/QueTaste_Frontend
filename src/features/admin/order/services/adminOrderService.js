import axios from "axios";
import { API_BASE_URL } from "../../../../config";

export const getAllOrdersApi = async (token, params) => {
  //console.log(params);
  const response = await axios.get(`${API_BASE_URL}/order/get-all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  return response.data;
};

export const confirmOrderApi = async (token, orderId) => {
  const response = await axios.put(`${API_BASE_URL}/order/confirm/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const confirmOrdersApi = async (token, listOrderId) => {
  console.log(listOrderId);
  const response = await axios.put(
    `${API_BASE_URL}/order/confirmOrders`,
    { listOrderId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
