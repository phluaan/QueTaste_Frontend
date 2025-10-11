import axiosClient from "../../../../utils/axiosClient";

export const getAllReviewApi = async (params) => {
  console.log(params);
  return await axiosClient.get("review/admin", { params });
};
