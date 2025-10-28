import axios from "axios";
import { API_BASE_URL } from "../../../config";
import axiosClient from "../../../utils/axiosClient";
export const getProfileApi = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data.data);
  return response.data;
};
export const updateProfileApi = async (token, data) => {
  const response = await axios.put(`${API_BASE_URL}/user/me/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const searchUsersApi = (keyword, role) => {
  return axiosClient.get("/user/search", {
    params: { q: keyword, role },
  });
};
