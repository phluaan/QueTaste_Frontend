// src/features/coupon/hooks/useCoupon.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminCoupons, fetchUserCoupons, setPage } from "../slices/couponSlice";
import { getMyCouponsApi, redeemCouponApi } from "../services/couponService";

const useCoupon = ({ role = "user", token, limit = 12, filterStatus } = {}) => {
  const dispatch = useDispatch();
  const { coupons, loading, totalPage, currentPage } = useSelector((s) => s.coupon);

  // --- USER STATES ---
  const [publicPage, setPublicPage] = useState(1);
  const [privatePage, setPrivatePage] = useState(1);
  const [myCoupons, setMyCoupons] = useState([]);
  const [loadingMy, setLoadingMy] = useState(false);
  const [myPage, setMyPage] = useState(1);

  const pageSize = limit;
  const myPageSize = 9;

  // --- FILTERS ---
  const publicCoupons = coupons.filter((c) => c.visibility === "public");
  const privateCoupons = coupons.filter((c) => c.visibility === "private");
  const publicTotalPage = Math.ceil(publicCoupons.length / pageSize);
  const privateTotalPage = Math.ceil(privateCoupons.length / pageSize);
  const myTotalPage = Math.ceil(myCoupons.length / myPageSize);

  const publicCouponsPage = publicCoupons.slice((publicPage - 1) * pageSize, publicPage * pageSize);
  const privateCouponsPage = privateCoupons.slice((privatePage - 1) * pageSize, privatePage * pageSize);
  const myCouponsPage = myCoupons.slice((myPage - 1) * myPageSize, myPage * myPageSize);

  // --- MAIN EFFECT ---
  useEffect(() => {
    if (!token) return;

    if (role === "admin") {
      // ADMIN fetch
      dispatch(fetchAdminCoupons({ params: { page: currentPage, limit }, token }));
    } else {
      // USER fetch
      dispatch(fetchUserCoupons({ params: { page: 1, limit: 1000, status: filterStatus }, token }));
    }
  }, [dispatch, role, token, currentPage, limit, filterStatus]);

  // --- Fetch my coupons ---
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
    if (role === "user") fetchMyCoupons();
  }, [role, token]);

  const redeemCoupon = async (id) => {
    if (!token) throw new Error("No token provided");
    return await redeemCouponApi(id, token);
  };

  // --- RETURN OBJECT ---
  if (role === "admin") {
    return {
      coupons,
      loading,
      totalPage,
      currentPage,
      setPage: (p) => dispatch(setPage(p)),
    };
  }

  return {
    loading,
    // public
    publicCoupons,
    publicCouponsPage,
    publicTotalPage,
    publicPage,
    setPublicPage,
    // private
    privateCoupons,
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
