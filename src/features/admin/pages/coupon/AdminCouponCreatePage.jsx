import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import useCouponDetail from "../../../coupon/hooks/useCouponDetail";

const AdminCouponCreatePage = () => {
  const { form, handleChange, handleSubmit } = useCouponDetail("create");

  const [errors, setErrors] = useState({});

  // ===== Helpers ngày LOCAL (tránh lệch TZ) =====
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
  const minStartStr = todayStr;                                   // start >= today
  const minEndStr = useMemo(() => maxStr(todayStr, form.startDate), [todayStr, form.startDate]); // end >= max(today, start)

  // ===== helpers số & text =====
  const isIntStr = (s) => /^-?\d+$/.test(String(s ?? "").trim());
  const isNonNegIntStr = (s) => /^\d+$/.test(String(s ?? "").trim());
  const toInt = (s) => Number.parseInt(String(s ?? ""), 10);
  const wordCount = (s = "") => (s.trim().length ? s.trim().split(/\s+/).filter(Boolean).length : 0);

  const isEndBeforeStart = useMemo(() => {
    if (!form.startDate || !form.endDate) return false;
    return new Date(form.endDate) < new Date(form.startDate);
  }, [form.startDate, form.endDate]);

  const validateAll = () => {
    const next = {};
    const type = form.type;

    // name, code
    if (!String(form.name || "").trim()) next.name = "Vui lòng nhập tên coupon.";
    if (!String(form.code || "").trim()) next.code = "Vui lòng nhập mã code.";

    // mô tả ≤ 100 chữ
    if (form.description && wordCount(form.description) > 100) {
      next.description = "Mô tả không được quá 100 chữ.";
    }

    // value / maxDiscount theo type
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

    // các số nguyên không âm khác (nếu có nhập)
    for (const f of ["minOrderValue", "usageLimit", "usagePerCustomer"]) {
      if (String(form[f] || "") !== "" && !isNonNegIntStr(form[f])) {
        next[f] = "Chỉ cho phép số nguyên không âm.";
      }
    }

    // ===== NGÀY =====
    // startDate bắt buộc và >= hôm nay
    if (!form.startDate) {
      next.startDate = "Vui lòng chọn ngày bắt đầu.";
    } else if (new Date(form.startDate) < new Date(minStartStr)) {
      next.startDate = `Ngày bắt đầu phải từ ${minStartStr} trở về sau.`;
    }

    // endDate bắt buộc và >= max(hôm nay, startDate)
    if (!form.endDate) {
      next.endDate = "Vui lòng chọn ngày kết thúc.";
    } else {
      const end = new Date(form.endDate);
      const minEnd = new Date(minEndStr);
      if (end < minEnd) {
        next.endDate = `Ngày kết thúc phải từ ${minEndStr} trở về sau.`;
      }
      if (form.startDate && end < new Date(form.startDate)) {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validateAll();
    if (Object.keys(next).length > 0) return;
    if (form.code && form.code !== form.code.trim().toUpperCase()) {
      handleChange({ target: { name: "code", value: form.code.trim().toUpperCase() } });
    }
    await handleSubmit(e);
  };

  return (
    <>
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
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium">Tên</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => {
                handleChange({ target: { name: "name", value: e.target.value } });
              }}
              required
              onBlur={validateAll}
              className={`w-full border rounded px-3 py-2 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Mã code</label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={(e) => {
                const v = e.target.value.toUpperCase();
                handleChange({ target: { name: "code", value: v } });
              }}
              required
              onBlur={validateAll}
              className={`w-full border rounded px-3 py-2 uppercase ${errors.code ? "border-red-500" : ""}`}
            />
            {errors.code && <p className="text-xs text-red-600 mt-1">{errors.code}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Mô tả{" "}
              <span className="text-xs text-gray-500">
                (tối đa 100 chữ — hiện tại {wordCount(form.description)} chữ)
              </span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={(e) => handleChange(e)}
              onBlur={validateAll}
              className={`w-full border rounded px-3 py-2 ${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Loại</label>
              <select
                name="type"
                value={form.type}
                onChange={(e) => {
                  handleChange(e);
                  setTimeout(validateAll, 0);
                }}
                className="w-full border rounded px-3 py-2"
              >
                <option value="percentage">Phần trăm</option>
                <option value="fixed">Cố định</option>
                <option value="free_shipping">Miễn phí ship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Giá trị{" "}
                <span className="text-xs text-gray-500">
                  {form.type === "percentage" ? "(% 1–100)" : "(VNĐ, ≥ 1.000)"}
                </span>
              </label>
              <input
                type="number"
                name="value"
                inputMode="numeric"
                step="1"
                min={form.type === "percentage" ? 1 : 0}
                value={form.value}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d]/g, "");
                  handleChange({ target: { name: "value", value: v } });
                }}
                onBlur={validateAll}
                required
                className={`w-full border rounded px-3 py-2 ${errors.value ? "border-red-500" : ""}`}
              />
              {errors.value && <p className="text-xs text-red-600 mt-1">{errors.value}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Giảm tối đa{" "}
                <span className="text-xs text-gray-500">(VNĐ, ≥ 1.000, có thể để trống)</span>
              </label>
              <input
                type="number"
                name="maxDiscount"
                inputMode="numeric"
                step="1"
                min="0"
                value={form.maxDiscount}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d]/g, "");
                  handleChange({ target: { name: "maxDiscount", value: v } });
                }}
                onBlur={validateAll}
                className={`w-full border rounded px-3 py-2 ${errors.maxDiscount ? "border-red-500" : ""}`}
              />
              {errors.maxDiscount && <p className="text-xs text-red-600 mt-1">{errors.maxDiscount}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Đơn tối thiểu (VNĐ)</label>
              <input
                type="number"
                name="minOrderValue"
                inputMode="numeric"
                step="1"
                min="0"
                value={form.minOrderValue}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d]/g, "");
                  handleChange({ target: { name: "minOrderValue", value: v } });
                }}
                onBlur={validateAll}
                className={`w-full border rounded px-3 py-2 ${errors.minOrderValue ? "border-red-500" : ""}`}
              />
              {errors.minOrderValue && <p className="text-xs text-red-600 mt-1">{errors.minOrderValue}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Số lần dùng tối đa</label>
              <input
                type="number"
                name="usageLimit"
                inputMode="numeric"
                step="1"
                min="0"
                value={form.usageLimit}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d]/g, "");
                  handleChange({ target: { name: "usageLimit", value: v } });
                }}
                onBlur={validateAll}
                className={`w-full border rounded px-3 py-2 ${errors.usageLimit ? "border-red-500" : ""}`}
              />
              {errors.usageLimit && <p className="text-xs text-red-600 mt-1">{errors.usageLimit}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Mỗi khách hàng</label>
              <input
                type="number"
                name="usagePerCustomer"
                inputMode="numeric"
                step="1"
                min="0"
                value={form.usagePerCustomer}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d]/g, "");
                  handleChange({ target: { name: "usagePerCustomer", value: v } });
                }}
                onBlur={validateAll}
                className={`w-full border rounded px-3 py-2 ${errors.usagePerCustomer ? "border-red-500" : ""}`}
              />
              {errors.usagePerCustomer && (
                <p className="text-xs text-red-600 mt-1">{errors.usagePerCustomer}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Ngày bắt đầu</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={(e) => {
                  handleChange(e);
                  setTimeout(validateAll, 0);
                }}
                required
                min={minStartStr}     // KHÓA quá khứ
                className={`w-full border rounded px-3 py-2 ${errors.startDate ? "border-red-500" : ""}`}
              />
              {errors.startDate && (
                <p className="text-xs text-red-600 mt-1">{errors.startDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Ngày kết thúc</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={(e) => {
                  handleChange(e);
                  setTimeout(validateAll, 0);
                }}
                required
                min={minEndStr}       // end ≥ max(today, startDate)
                className={`w-full border rounded px-3 py-2 ${errors.endDate ? "border-red-500" : ""}`}
              />
              {(errors.endDate || isEndBeforeStart) && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.endDate || "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu."}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Trạng thái</label>
            <select
              name="status"
              value={form.status}
              onChange={(e) => {
                handleChange(e);
                setTimeout(validateAll, 0);
              }}
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
            disabled={hasErrors}
            className={`w-full py-2 rounded-lg text-white transition ${
              hasErrors ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            ✅ Tạo coupon
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminCouponCreatePage;