import api from "../../../utils/axiosClient";


export const getSummaryApi = async () => api.get(`/statistics/summary`);

export const getCompareApi = async ({ scope, year, month, quarter, metric }) =>
  api.get(`/statistics/compare`, {
    params: {
      scope,
      year,
      month: scope === "month" ? month : undefined,
      quarter: scope === "quarter" ? quarter : undefined,
      metric: metric || "revenue",
    },
  });

export const getWeeklyProfitApi = async () => api.get(`/statistics/weekly-profit`);

export const getOrderStatusApi = async () => api.get(`/statistics/order-status`);

export const getTopProductsApi = async ({ limit = 5, from, to } = {}) =>
  api.get(`/statistics/top-products`, { params: { limit, from, to } });

export const getNewCustomersApi = async ({ months = 3 } = {}) =>
  api.get(`/statistics/new-customers`, { params: { months } });

export const getUserRegsByDayApi = async ({ year, month }) =>
  api.get(`/statistics/users/registrations-by-day`, { params: { year, month } });

export const getTopSpendersUsersApi = async ({ limit = 3, from, to } = {}) =>
  api.get(`/statistics/users/top-spenders`, { params: { limit, from, to } });

export const getBuyerRatioApi = async ({ year }) =>
  api.get(`/statistics/users/buyer-ratio`, { params: { year } });

export const getUsersApi = async (params = {}) =>
  api.get(`/statistics/users`, { params });

export const getUserDetailApi = async (id) =>
  api.get(`/statistics/users/${id}`);

export const getPostsViewsTotalApi = async () =>
  api.get(`/statistics/posts/views-total`);

export const getTopPostsByViewsApi = async ({ limit = 5 } = {}) =>
  api.get(`/statistics/posts/top`, { params: { limit } });

export const lockPostBySlugApi = async (slug, locked) =>
  api.patch(`/statistics/posts/${slug}/lock`, { locked });

export const updatePostBySlugApi = async (slug, payload) =>
  api.patch(`/statistics/posts/${slug}`, payload);
