import api from "../../../utils/axiosClient";

export const getAllPostsApi = async (useAuth = false) => {
  return api.get(`/post`);
};

export const getPostDetailApi = async (slug, useAuth = false) => {
  const url = useAuth ? `/post/${slug}?preview=1` : `/post/${slug}`;
  const res = await api.get(url); 
  return res.data;              
};
