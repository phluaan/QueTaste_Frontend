import axiosClient from "../../../utils/axiosClient";

export const getCartApi = async () => {
  const res = await axiosClient.get("/cart");
  return res.data;
};

export const addToCartApi = async (productId, quantity = 1) => {
  const res = await axiosClient.post("/cart/add", {
    productId,
    quantity,
  });
  return res.data;
};

export const updateCartApi = async (productId, quantity) => {
  const res = await axiosClient.put("/cart/update", {
    productId,
    quantity,
  });
  return res.data;
};

export const removeFromCartApi = async (productId) => {
  const res = await axiosClient.delete("/cart/remove", {
    data: { productId },
  });
  return res.data;
};
