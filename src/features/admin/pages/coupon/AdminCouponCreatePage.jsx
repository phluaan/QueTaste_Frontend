import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import useCouponDetail from "../../../coupon/hooks/useCouponDetail";

const AdminCouponCreatePage = () => {
    const { form, handleChange, handleSubmit } = useCouponDetail("create");

    return (
        <AdminLayout>
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">➕ Thêm Coupon mới</h1>
            <Link
                to="/admin/coupons"
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
                ← Quay lại
            </Link>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium">Tên</label>
                <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Mã code</label>
                <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 uppercase"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Mô tả</label>
                <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium">Loại</label>
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="percentage">Phần trăm</option>
                    <option value="fixed">Cố định</option>
                    <option value="free_shipping">Miễn phí ship</option>
                </select>
                </div>
                <div>
                <label className="block text-sm font-medium">Giá trị</label>
                <input
                    type="number"
                    name="value"
                    value={form.value}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium">Giảm tối đa</label>
                <input
                    type="number"
                    name="maxDiscount"
                    value={form.maxDiscount}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                </div>
                <div>
                <label className="block text-sm font-medium">Đơn tối thiểu</label>
                <input
                    type="number"
                    name="minOrderValue"
                    value={form.minOrderValue}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium">Số lần dùng tối đa</label>
                <input
                    type="number"
                    name="usageLimit"
                    value={form.usageLimit}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                </div>
                <div>
                <label className="block text-sm font-medium">Mỗi khách hàng</label>
                <input
                    type="number"
                    name="usagePerCustomer"
                    value={form.usagePerCustomer}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium">Ngày bắt đầu</label>
                <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
                </div>
                <div>
                <label className="block text-sm font-medium">Ngày kết thúc</label>
                <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium">Trạng thái</label>
                <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                >
                <option value="active">🟢 Active</option>
                <option value="paused">⏸ Paused</option>
                <option value="expired">🔴 Expired</option>
                <option value="archived">📦 Archived</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                ✅ Tạo coupon
            </button>
            </form>
        </div>
        </AdminLayout>
    );
};

export default AdminCouponCreatePage;