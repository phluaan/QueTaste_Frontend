import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchSummary,
    fetchCompare,
    fetchWeeklyProfit,
    fetchOrderStatus,
    fetchTopProducts,
    fetchNewCustomers,
    fetchUserRegsByDay,
    fetchTopSpendersUsers,
    fetchBuyerRatio,
    fetchUsersList,
    fetchUserDetail,
    fetchPostsViewsTotal,
    fetchPostsTop,
} from "../slices/statisticsSlice";

export default function useStatistics({ filterType = "month", range, metric = "revenue" }) {
    const dispatch = useDispatch();
    const statistics = useSelector((state) => state.statistics);

    useEffect(() => {
        dispatch(fetchSummary());
        dispatch(fetchWeeklyProfit());
        dispatch(fetchOrderStatus());
        dispatch(fetchTopProducts({ limit: 5 }));
        dispatch(fetchNewCustomers({ months: 3 }));
    }, [dispatch]);

    useEffect(() => {
        const common = { scope: filterType, year: range?.year, metric };
        if (filterType === "month") {
        dispatch(fetchCompare({ ...common, month: range?.month }));
        } else {
        dispatch(fetchCompare({ ...common, quarter: range?.quarter }));
        }
    }, [dispatch, filterType, range?.year, range?.month, range?.quarter, metric]);

    return statistics;
}

export const useUserRegistrationsByDay = ({ year, month }) => {
    const dispatch = useDispatch();
    const { usersByDay, loading, error } = useSelector((s) => s.statistics);
    useEffect(() => {
        if (year && month) dispatch(fetchUserRegsByDay({ year, month }));
    }, [dispatch, year, month]);
    return { usersByDay, loading: loading.usersByDay, error };
};

export const useTopSpenders = (limit = 3) => {
    const dispatch = useDispatch();
    const { topSpendersUsers, loading, error } = useSelector((s) => s.statistics);
    useEffect(() => {
        dispatch(fetchTopSpendersUsers({ limit }));
    }, [dispatch, limit]);
    return { topSpendersUsers, loading: loading.topSpendersUsers, error };
    };

export const useBuyerRatio = (year) => {
    const dispatch = useDispatch();
    const { buyerRatio, loading, error } = useSelector((s) => s.statistics);
    useEffect(() => {
        if (year) dispatch(fetchBuyerRatio({ year }));
    }, [dispatch, year]);
    return { buyerRatio, loading: loading.buyerRatio, error };
};

export const useUsersList = (params) => {
    const dispatch = useDispatch();
    const { usersList, loading, error } = useSelector((s) => s.statistics);
    useEffect(() => {
        dispatch(fetchUsersList(params || {}));
    }, [dispatch, JSON.stringify(params || {})]);
    return { usersList, loading: loading.usersList, error };
};

export const useUserDetail = (id) => {
    const dispatch = useDispatch();
    const { userDetail, loading, error } = useSelector((s) => s.statistics);
    useEffect(() => {
        if (id) dispatch(fetchUserDetail(id));
    }, [dispatch, id]);
    return { userDetail, loading: loading.userDetail, error };
};

export const usePostsStatistics = (limit = 5) => {
    const dispatch = useDispatch();
    const { postsViewsTotal, postsTop, loading, error } = useSelector((s) => s.statistics);

    useEffect(() => {
        dispatch(fetchPostsViewsTotal());
        dispatch(fetchPostsTop({ limit }));
    }, [dispatch, limit]);

    return {
        totalViews: postsViewsTotal,
        topPosts: postsTop,
        loading: { total: loading.postsViewsTotal, top: loading.postsTop },
        error,
    };
};