import axiosClient from "../../../../utils/axiosClient";

export const getShipperOrdersApi = async () => {
  const res = await axiosClient.get("/order/shipper");
  return res.data;
};

export const markOrderDoneApi = async (id) => {
  const res = await axiosClient.put(`/order/${id}/update-to-done-shipping`);
  return res.data;
};

export const requestCancelOrderApi = async (id) => {
  const res = await axiosClient.put(`/order/${id}/request-cancelled`);
  return res.data;
};
