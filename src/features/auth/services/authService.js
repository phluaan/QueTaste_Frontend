import axios from "axios";
import { API_BASE_URL } from "../../../config";

export const loginApi = async (credential) => {
  const res = await axios.post(`${API_BASE_URL}/auth/login`, credential);
  return res.data;
};

export const logoutApi = async (refreshToken) => {
  const res = await axios.post(`${API_BASE_URL}/auth/logout`, { refreshToken });
  return res.data;
};

export const registerApi = async (payload) => {
  const res = await axios.post(`${API_BASE_URL}/auth/register`, payload);
  return res.data;
};

export const forgotPasswordApi = async (email) => {
  const res = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
  return res.data;
};

export const resetPasswordApi = async ({ email, newPassword, otp }) => {
  const res = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
    email,
    newPassword,
    otp,
  });
  return res.data;
};

export const verifyOtpApi = async ({ email, otp }) => {
  const res = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
    email,
    otp,
  });
  return res.data;
};