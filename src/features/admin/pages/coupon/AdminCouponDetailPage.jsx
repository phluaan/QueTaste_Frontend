import React, { useMemo, useState } from "react";
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
    startDate,           // YYYY-MM-DD (từ hook)
    isEndBeforeStart,    // cờ cũ — vẫn giữ để highlight UI
  } = useCouponDetail("detail");

  // ===== NEW: helpers ngày LOCAL (tránh lệch múi giờ) =====
  const toYMD = (d) => {
    const dt = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  };
  const todayStr = useMemo(() => toYMD(new Date()), []);
  const maxStr = (a, b) => {
    if (!a) return b;
    if (!b) return a;
    return new Date(a) > new Date(b) ? a : b;
  };
  // endDate tối thiểu = max(hôm nay, startDate)
  const minEndStr = useMemo(() => maxStr(todayStr, startDate), [todayStr, startDate]);

  // ===== NEW: state lỗi =====
  const [errors, setErrors] = useState({});

  // Helpers số
  const isIntStr = (s) => /^-?\d+$/.test(String(s).trim());
  const isNonNegIntStr = (s) => /^\d+$/.test(String(s).trim());
  const toInt = (s) => Number.parseInt(String(s), 10);
  const wordCount = (s = "") =>
    s.trim().length ? s.trim().split(/\s+/).filter(Boolean).length : 0;

  // ===== NEW: validate toàn bộ + NGÀY =====
  const validateAll = () => {
    const next = {};
    const type = couponDetail?.type; // percentage | fixed | free_shipping...

    // 1) Mô tả ≤ 100 chữ
    if (form.description && wordCount(form.description) > 100) {
      next.description = "Mô tả không được quá 100 chữ.";
    }

    // 2) value / maxDiscount theo type
    if (type === "percentage") {
      if (!isIntStr(form.value)) next.value = "Phải là số nguyên.";
      else {
        const v = toInt(form.value);
        if (v < 1 || v > 100) next.value = "Phần trăm hợp lệ là 1–100.";
      }
      if (String(form.maxDiscount || "") !== "") {
        if (!isNonNegIntStr(form.maxDiscount)) next.maxDiscount = "Phải là số nguyên không âm.";
        else if (toInt(form.maxDiscount) < 1000) next.maxDiscount = "Giảm tối đa phải ≥ 1.000 (VNĐ).";
      }
    } else {
      if (!isNonNegIntStr(form.value)) next.value = "Phải là số nguyên không âm.";
      else if (toInt(form.value) < 1000) next.value = "Giá trị phải ≥ 1.000 (VNĐ).";
      if (String(form.maxDiscount || "") !== "") {
        if (!isNonNegIntStr(form.maxDiscount)) next.maxDiscount = "Phải là số nguyên không âm.";
        else if (toInt(form.maxDiscount) < 1000) next.maxDiscount = "Giảm tối đa phải ≥ 1.000 (VNĐ).";
      }
    }

    // 3) Các số nguyên không âm (nếu có nhập)
    for (const f of ["minOrderValue", "usageLimit", "usagePerCustomer"]) {
      if (String(form[f] || "") !== "" && !isNonNegIntStr(form[f])) {
        next[f] = "Chỉ cho phép số nguyên không âm.";
      }
    }

    // 4) Redeem fields (chỉ khi private)
    if (form.visibility === "private") {
      for (const f of ["redeemCost", "redeemStock", "redeemTtlDays"]) {
        if (String(form[f] || "") !== "" && !isNonNegIntStr(form[f])) {
          next[f] = "Chỉ cho phép số nguyên không âm.";
        }
      }
    }

    // 5) NGÀY: endDate bắt buộc và phải ≥ max(hôm nay, startDate)
    if (!form.endDate) {
      next.endDate = "Vui lòng chọn ngày kết thúc.";
    } else {
      const end = new Date(form.endDate);
      const minEnd = new Date(minEndStr);
      if (end < minEnd) {
        next.endDate = `Ngày kết thúc phải từ ${minEndStr} trở về sau.`;
      }
      if (startDate && end < new Date(startDate)) {
        next.endDate = "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.";
      }
    }

    setErrors(next);
    return next;
  };

  const hasErrors = useMemo(
    () => isEndBeforeStart || Object.keys(errors).length > 0,
    [isEndBeforeStart, errors]
  );

  const onSave = async () => {
    const next = validateAll();
    if (Object.keys(next).length > 0 || isEndBeforeStart) return;
    await handleSave();
  };

  if (loading.detail) return <p className="p-6">Đang tải...</p>;
  if (error) return <p className="p-6 text-red-500">Lỗi: {error}</p>;
  if (!couponDetail) return <p className="p-6">Không tìm thấy coupon</p>;

  return (
    <>
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
              <label className="block text-sm font-medium mb-1">
                Mô tả{" "}
                <span className="text-xs text-gray-500">
                  (tối đa 100 chữ — hiện tại {wordCount(form.description)} chữ)
                </span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={(e) => { handleChange(e); }}
                onBlur={validateAll}
                className={`w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-600 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Giá trị + Max */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Giá trị{" "}
                  <span className="text-xs text-gray-500">
                    {couponDetail.type === "percentage" ? "(% từ 1–100)" : "(VNĐ, ≥ 1.000)"}
                  </span>
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  step="1"
                  min={couponDetail.type === "percentage" ? 1 : 0}
                  name="value"
                  value={form.value}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d]/g, "");
                    handleChange({ target: { name: "value", value: v } });
                  }}
                  onBlur={validateAll}
                  className={`w-full border rounded-lg px-3 py-2 ${errors.value ? "border-red-500" : ""}`}
                />
                {errors.value && <p className="text-xs text-red-600 mt-1">{errors.value}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Giảm tối đa <span className="text-xs text-gray-500">(VNĐ, ≥ 1.000)</span>
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  step="1"
                  min="0"
                  name="maxDiscount"
                  value={form.maxDiscount}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d]/g, "");
                    handleChange({ target: { name: "maxDiscount", value: v } });
                  }}
                  onBlur={validateAll}
                  className={`w-full border rounded-lg px-3 py-2 ${errors.maxDiscount ? "border-red-500" : ""}`}
                />
                {errors.maxDiscount && (
                  <p className="text-xs text-red-600 mt-1">{errors.maxDiscount}</p>
                )}
              </div>
            </div>

            {/* Đơn tối thiểu + Usage limit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Đơn tối thiểu (VNĐ)</label>
                <input
                  type="number"
                  inputMode="numeric"
                  step="1"
                  min="0"
                  name="minOrderValue"
                  value={form.minOrderValue}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d]/g, "");
                    handleChange({ target: { name: "minOrderValue", value: v } });
                  }}
                  onBlur={validateAll}
                  className={`w-full border rounded-lg px-3 py-2 ${errors.minOrderValue ? "border-red-500" : ""}`}
                />
                {errors.minOrderValue && (
                  <p className="text-xs text-red-600 mt-1">{errors.minOrderValue}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số lần dùng tối đa</label>
                <input
                  type="number"
                  inputMode="numeric"
                  step="1"
                  min="0"
                  name="usageLimit"
                  value={form.usageLimit}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d]/g, "");
                    handleChange({ target: { name: "usageLimit", value: v } });
                  }}
                  onBlur={validateAll}
                  className={`w-full border rounded-lg px-3 py-2 ${errors.usageLimit ? "border-red-500" : ""}`}
                />
                {errors.usageLimit && (
                  <p className="text-xs text-red-600 mt-1">{errors.usageLimit}</p>
                )}
              </div>
            </div>

            {/* Per customer + EndDate */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mỗi khách hàng</label>
                <input
                  type="number"
                  inputMode="numeric"
                  step="1"
                  min="0"
                  name="usagePerCustomer"
                  value={form.usagePerCustomer}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d]/g, "");
                    handleChange({ target: { name: "usagePerCustomer", value: v } });
                  }}
                  onBlur={validateAll}
                  className={`w-full border rounded-lg px-3 py-2 ${errors.usagePerCustomer ? "border-red-500" : ""}`}
                />
                {errors.usagePerCustomer && (
                  <p className="text-xs text-red-600 mt-1">{errors.usagePerCustomer}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={(e) => {
                    handleChange(e);
                    setTimeout(validateAll, 0); // gõ tay → validate ngay
                  }}
                  onBlur={validateAll}
                  min={minEndStr} // KHÓA quá khứ & < startDate
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.endDate || isEndBeforeStart ? "border-red-500" : ""
                  }`}
                />
                {(errors.endDate || isEndBeforeStart) && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.endDate || "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu."}
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
                onChange={(e) => { handleChange(e); setTimeout(validateAll, 0); }}
                onBlur={validateAll}
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
                onChange={(e) => { handleChange(e); setTimeout(validateAll, 0); }}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="public">🌍 Public</option>
                <option value="private">🔒 Private</option>
              </select>
            </div>

            {/* Redeem settings (private) */}
            {form.visibility === "private" && (
              <div className="space-y-4 border-t pt-4 mt-4">
                <h3 className="text-md font-semibold text-gray-800">🎁 Cấu hình đổi điểm</h3>

                <div>
                  <label className="block text-sm font-medium mb-1">Điểm cần để đổi</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    step="1"
                    min="0"
                    name="redeemCost"
                    value={form.redeemCost}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^\d]/g, "");
                      handleChange({ target: { name: "redeemCost", value: v } });
                    }}
                    onBlur={validateAll}
                    className={`w-full border rounded-lg px-3 py-2 ${errors.redeemCost ? "border-red-500" : ""}`}
                    placeholder="Ví dụ: 100"
                  />
                  {errors.redeemCost && (
                    <p className="text-xs text-red-600 mt-1">{errors.redeemCost}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Số lượng có thể đổi</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      step="1"
                      min="0"
                      name="redeemStock"
                      value={form.redeemStock}
                      onChange={(e) => {
                        const v = e.target.value.replace(/[^\d]/g, "");
                        handleChange({ target: { name: "redeemStock", value: v } });
                      }}
                      onBlur={validateAll}
                      className={`w-full border rounded-lg px-3 py-2 ${errors.redeemStock ? "border-red-500" : ""}`}
                      placeholder="Ví dụ: 500"
                    />
                    {errors.redeemStock && (
                      <p className="text-xs text-red-600 mt-1">{errors.redeemStock}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Thời gian hiệu lực (ngày)</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      step="1"
                      min="0"
                      name="redeemTtlDays"
                      value={form.redeemTtlDays}
                      onChange={(e) => {
                        const v = e.target.value.replace(/[^\d]/g, "");
                        handleChange({ target: { name: "redeemTtlDays", value: v } });
                      }}
                      onBlur={validateAll}
                      className={`w-full border rounded-lg px-3 py-2 ${errors.redeemTtlDays ? "border-red-500" : ""}`}
                      placeholder="Ví dụ: 14"
                    />
                    {errors.redeemTtlDays && (
                      <p className="text-xs text-red-600 mt-1">{errors.redeemTtlDays}</p>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  Đã đổi: {couponDetail.redeemedCount ?? 0} / {form.redeemStock || "Không giới hạn"}
                </p>
              </div>
            )}

            {/* Save */}
            <button
              onClick={onSave}
              disabled={hasErrors}
              className={`w-full py-2 rounded-lg text-white transition ${
                hasErrors ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              💾 Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCouponDetailPage;