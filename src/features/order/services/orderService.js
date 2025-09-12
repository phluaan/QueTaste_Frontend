import axios from "axios";
import { API_BASE_URL } from "../../../config";

export const getMyOrdersApi = async (token, params) => {
  console.log(params);
    const response = await axios.get(`${API_BASE_URL}/order/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  };


