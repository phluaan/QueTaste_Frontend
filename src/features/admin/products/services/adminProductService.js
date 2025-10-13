import axiosClient from "../../../../utils/axiosClient";

const BASE_URL = "/admin/products";

export const getAllProductsApi = (token, params = {}) =>
  axiosClient.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      search: params.search || "",
      page: params.page || 1,
      limit: params.limit === 0 ? 0 : (params.limit || 10),
      category: params.category || "",
      region: params.region || "",
      rating: params.rating || "",
      minPrice: params.minPrice || "",
      maxPrice: params.maxPrice || "",
      sortBy: params.sortBy || "createdAt",
      order: params.order || "desc",
      includeInactive: true,
    },
  });

export const getProductByIdApi = (token, id) =>
  axiosClient.get(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
export const createProductApi = (token, formData) =>
  axiosClient.post(BASE_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProductApi = async (token, id, formData) => {
  return axiosClient.put(`${BASE_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const toggleActiveProductApi = (token, id) =>
  axiosClient.patch(`${BASE_URL}/${id}/toggle`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProductApi = (token, id) =>
  axiosClient.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
