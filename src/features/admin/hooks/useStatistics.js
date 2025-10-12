import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRevenue, getCashFlow } from "../slices/statisticsSlice";

export default function useStatistics({ filterType = "month", range }) {
    const dispatch = useDispatch();
    const { revenue, cashFlow, loadingRevenue, loadingCashFlow, error } =
        useSelector((state) => state.statistics);

    useEffect(() => {
        dispatch(getRevenue({ filterType, range }));
        dispatch(getCashFlow());
    }, [dispatch, filterType, range]);

    return { revenue, cashFlow, loadingRevenue, loadingCashFlow, error };
}