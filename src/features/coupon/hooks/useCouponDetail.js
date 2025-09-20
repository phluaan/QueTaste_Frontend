// src/features/coupon/hooks/useCouponDetail.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCouponDetail, updateCoupon } from "../slices/couponSlice";
import { showSuccess, showError } from "../../../utils/toastUtils";
import axios from "axios";

const useCouponDetail = (mode = "detail") => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { couponDetail, loading, error } = useSelector((s) => s.coupon);

    // Form state dùng chung cho cả create & edit
    const [form, setForm] = useState({
        name: "",
        code: "",
        description: "",
        type: "percentage",
        value: "",
        maxDiscount: "",
        minOrderValue: "",
        usageLimit: "",
        usagePerCustomer: "",
        startDate: "",
        endDate: "",
        status: "active",
        visibility: "public",
    });

    // Nếu là trang detail thì fetch và fill form
    useEffect(() => {
        if (mode === "detail" && id) {
        dispatch(fetchCouponDetail(id));
        }
    }, [id, mode, dispatch]);

    useEffect(() => {
        if (mode === "detail" && couponDetail) {
        setForm({
            name: couponDetail.name || "",
            code: couponDetail.code || "",
            description: couponDetail.description || "",
            type: couponDetail.type || "percentage",
            value: couponDetail.value || "",
            maxDiscount: couponDetail.maxDiscount || "",
            minOrderValue: couponDetail.minOrderValue || "",
            usageLimit: couponDetail.usageLimit || "",
            usagePerCustomer: couponDetail.usagePerCustomer || "",
            startDate: couponDetail.startDate
            ? new Date(couponDetail.startDate).toISOString().split("T")[0]
            : "",
            endDate: couponDetail.endDate
            ? new Date(couponDetail.endDate).toISOString().split("T")[0]
            : "",
            status: couponDetail.status || "active",
            visibility: couponDetail.visibility || "public",
        });
        }
    }, [couponDetail, mode]);

    // Change form
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Save (edit)
    const handleSave = async () => {
        try {
        await dispatch(updateCoupon({ id, data: form })).unwrap();
        showSuccess("Cập nhật coupon thành công!");
        navigate("/admin/coupons");
        } catch (err) {
        showError(err || "Cập nhật coupon thất bại!");
        }
    };

    // Submit (create)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await axios.post("http://localhost:8088/api/coupon", form);
        showSuccess("Tạo coupon thành công!");
        navigate("/admin/coupons");
        } catch (err) {
        showError(err.response?.data?.message || "Tạo coupon thất bại!");
        }
    };

    // Validate ngày
    const startDate = form.startDate;
    const isEndBeforeStart = form.endDate && startDate && form.endDate < startDate;

    return {
        form,
        setForm,
        handleChange,
        handleSave,
        handleSubmit,
        couponDetail,
        loading,
        error,
        startDate,
        isEndBeforeStart,
    };
};

export default useCouponDetail;