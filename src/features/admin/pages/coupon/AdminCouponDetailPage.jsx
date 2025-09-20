import React from "react";
import { Link } from "react-router-dom";
import useCouponDetail from "../../../coupon/hooks/useCouponDetail";
import AdminLayout from "../../layouts/AdminLayout";

const AdminCouponDetailPage = () => {
    const {
        couponDetail,
        loading,
        error,
        form,
        handleChange,
        handleSave,
        startDate,
        isEndBeforeStart,
    } = useCouponDetail("detail");

    if (loading.detail) return <p className="p-6">Đang tải...</p>;
    if (error) return <p className="p-6 text-red-500">Lỗi: {error}</p>;
    if (!couponDetail) return <p className="p-6">Không tìm thấy coupon</p>;

    return (
        <AdminLayout>
        <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">✨ Chi tiết Coupon</h1>
            <Link
                to="/admin/coupons"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
                ← Quay lại
            </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
            {/* Cột 1: Thông tin hiện tại */}
            <div className="space-y-4 text-gray-700 bg-gray-50 rounded-lg p-6 border">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">📌 Thông tin hiện tại</h2>
                <p><span className="font-medium">Tên:</span> {couponDetail.name}</p>
                <p>
                <span className="font-medium">Mã code:</span>{" "}
                <span className="px-2 py-1 bg-gray-200 rounded text-sm">
                    {couponDetail.code || "-"}
                </span>
                </p>
                <p><span className="font-medium">Loại:</span> {couponDetail.type}</p>
                <p>
                <span className="font-medium">Đã dùng:</span>{" "}
                {couponDetail.usedCount} / {couponDetail.usageLimit || "Không giới hạn"}
                </p>
                <p>
                <span className="font-medium">Ngày bắt đầu:</span>{" "}
                {new Date(couponDetail.startDate).toLocaleDateString()}
                </p>
            </div>

            {/* Cột 2: Form chỉnh sửa */}
            <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">✏️ Chỉnh sửa Coupon</h2>

                {/* Mô tả */}
                <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                />
                </div>

                {/* Giá trị + Max */}
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Giá trị</label>
                    <input
                    type="number"
                    name="value"
                    value={form.value}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Giảm tối đa</label>
                    <input
                    type="number"
                    name="maxDiscount"
                    value={form.maxDiscount}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
                </div>

                {/* Đơn tối thiểu + Usage limit */}
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Đơn tối thiểu</label>
                    <input
                    type="number"
                    name="minOrderValue"
                    value={form.minOrderValue}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Số lần dùng tối đa</label>
                    <input
                    type="number"
                    name="usageLimit"
                    value={form.usageLimit}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
                </div>

                {/* Per customer + EndDate */}
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Mỗi khách hàng</label>
                    <input
                    type="number"
                    name="usagePerCustomer"
                    value={form.usagePerCustomer}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
                    <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    min={startDate}
                    className={`w-full border rounded-lg px-3 py-2 ${
                        isEndBeforeStart ? "border-red-500" : ""
                    }`}
                    />
                    {isEndBeforeStart && (
                    <p className="text-xs text-red-600 mt-1">
                        Ngày kết thúc phải sau ngày bắt đầu
                    </p>
                    )}
                </div>
                </div>

                {/* Status */}
                <div>
                <label className="block text-sm font-medium mb-1">Trạng thái</label>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                >
                    <option value="active">🟢 Active</option>
                    <option value="paused">⏸ Paused</option>
                    <option value="expired">🔴 Expired</option>
                    <option value="archived">📦 Archived</option>
                </select>
                </div>

                {/* Visibility */}
                <div>
                <label className="block text-sm font-medium mb-1">Loại hiển thị</label>
                <select
                    name="visibility"
                    value={form.visibility}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                >
                    <option value="public">🌍 Public (mọi người có thể dùng mã)</option>
                    <option value="private">🔒 Private (chỉ cấp phát cho user qua UserCoupon)</option>
                </select>
                </div>

                {/* Save */}
                <button
                onClick={handleSave}
                disabled={isEndBeforeStart}
                className={`w-full py-2 rounded-lg text-white transition ${
                    isEndBeforeStart
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                >
                💾 Lưu thay đổi
                </button>
            </div>
            </div>
        </div>
        </AdminLayout>
    );
};

export default AdminCouponDetailPage;