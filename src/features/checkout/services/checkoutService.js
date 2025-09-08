import axiosClient from "../../../utils/axiosClient";

export const createOrderApi = async (data) => {
    const res = await axiosClient.post("/order/checkout", data);
    return res.data;
};