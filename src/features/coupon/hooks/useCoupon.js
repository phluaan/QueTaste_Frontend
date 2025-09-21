// src/features/coupon/hooks/useCoupon.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminCoupons, fetchUserCoupons, setPage } from "../slices/couponSlice";
import { getMyCouponsApi, redeemCouponApi } from "../services/couponService";

const useCoupon = ({ role = "user", token, limit = 12, filterStatus } = {}) => {
    const dispatch = useDispatch();
    const { coupons, loading, totalPage, currentPage } = useSelector((s) => s.coupon);

    // --- ADMIN: giữ nguyên server-side pagination ---
    if (role === "admin") {
        useEffect(() => {
        dispatch(fetchAdminCoupons({ params: { page: currentPage, limit }, token }));
        }, [dispatch, currentPage, token, limit]);

        return {
        coupons,
        loading,
        totalPage,
        currentPage,
        setPage: (p) => dispatch(setPage(p)),
        };
    }

    // --- USER: phân trang local cho public/private/my ---
    const [publicPage, setPublicPage] = useState(1);
    const [privatePage, setPrivatePage] = useState(1);
    const pageSize = limit;

    const publicCoupons = coupons.filter((c) => c.visibility === "public");
    const privateCoupons = coupons.filter((c) => c.visibility === "private");

    const publicTotalPage = Math.ceil(publicCoupons.length / pageSize);
    const privateTotalPage = Math.ceil(privateCoupons.length / pageSize);

    const publicCouponsPage = publicCoupons.slice(
        (publicPage - 1) * pageSize,
        publicPage * pageSize
    );
    const privateCouponsPage = privateCoupons.slice(
        (privatePage - 1) * pageSize,
        privatePage * pageSize
    );

    // --- My coupons ---
    const [myCoupons, setMyCoupons] = useState([]);
    const [loadingMy, setLoadingMy] = useState(false);
    const [myPage, setMyPage] = useState(1);
    const myPageSize = 9;

    const myTotalPage = Math.ceil(myCoupons.length / myPageSize);
    const myCouponsPage = myCoupons.slice(
        (myPage - 1) * myPageSize,
        myPage * myPageSize
    );

    useEffect(() => {
        dispatch(fetchUserCoupons({ params: { page: 1, limit: 1000, status: filterStatus }, token }));
    }, [dispatch, token, limit, filterStatus]);

    const fetchMyCoupons = async () => {
        if (!token) return;
        setLoadingMy(true);
        try {
        const res = await getMyCouponsApi(token);
        if (res.success) setMyCoupons(res.data);
        } finally {
        setLoadingMy(false);
        }
    };

    useEffect(() => {
        fetchMyCoupons();
    }, [token]);

    const redeemCoupon = async (id) => {
        if (!token) throw new Error("No token provided");
        return await redeemCouponApi(id, token);
    };

    return {
        loading,
        // public
        publicCouponsPage,
        publicTotalPage,
        publicPage,
        setPublicPage,
        // private
        privateCouponsPage,
        privateTotalPage,
        privatePage,
        setPrivatePage,
        // my
        myCouponsPage,
        myTotalPage,
        myPage,
        setMyPage,
        loadingMy,
        fetchMyCoupons,
        redeemCoupon,
    };
};

export default useCoupon;