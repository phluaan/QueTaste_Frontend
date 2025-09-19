import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCoupons, setPage } from "../slices/couponSlice";

const useCoupon = () => {
    const dispatch = useDispatch();
    const { coupons, loading, totalPage, currentPage } = useSelector((s) => s.coupon);

    useEffect(() => {
        dispatch(fetchAllCoupons({ page: currentPage, limit: 12 }));
    }, [dispatch, currentPage]);

    return {
        coupons,
        loading,
        totalPage,
        currentPage,
        setPage: (p) => dispatch(setPage(p)),
    };
};

export default useCoupon;