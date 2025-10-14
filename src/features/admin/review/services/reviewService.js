import axiosClient from "../../../../utils/axiosClient";

export const getAllReviewApi = async (params) => {
  console.log(params);
  return await axiosClient.get("review/admin", { params });
};

export const deleteReviewApi = async (id) => {
  return await axiosClient.delete(`review/admin/delete/${id}`);
};
