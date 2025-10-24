import axiosClient from "../../../../utils/axiosClient";

export const useShipperOrders = () => {
  const getOrders = async () => {
    const res = await axiosClient.get("/orders/shipper");
    return res.data.data;
  };

  const markAsDone = async (id) => {
    await axiosClient.put(`/orders/${id}/update-to-done-shipping`);
  };

  const requestCancel = async (id) => {
    await axiosClient.put(`/orders/${id}/request-cancelled`);
  };

  return { getOrders, markAsDone, requestCancel };
};
