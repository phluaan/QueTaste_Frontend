import axios from "axios";
import { API_BASE_URL } from "../../../config";

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
