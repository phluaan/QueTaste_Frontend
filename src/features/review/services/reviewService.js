import axiosClient from "../../../utils/axiosClient";

export const createReviewApi = async (params) => {
  console.log(params);
  return await axiosClient.post("/review", params );
};

export const getReviewApi = async (params) => {
  console.log(params);
  return await axiosClient.get("/review", { params });
};
