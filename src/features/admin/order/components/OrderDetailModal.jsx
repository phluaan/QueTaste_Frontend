import React from "react";
import {
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  PackageCheck,
  BadgeCheck,
} from "lucide-react";

export default function OrderDetailModal({
  order,
  onClose,
  statusColors,
  onConfirm,
}) {
  if (!order) return null;

  const formatVND = (n) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(n || 0));

  // 🔹 Các bước trạng thái
  const steps = [
    { key: "new", label: "Chờ xác nhận", icon: <Clock size={16} /> },
    { key: "confirmed", label: "Đã xác nhận", icon: <CheckCircle size={16} /> },
    { key: "shipping", label: "Đang giao", icon: <Truck size={16} /> },
    {
      key: "done_shipping",
      label: "Đã giao",
      icon: <PackageCheck size={16} />,
    },
    { key: "completed", label: "Hoàn thành", icon: <BadgeCheck size={16} /> },
  ];

  // Tìm vị trí hiện tại
  const currentIndex = steps.findIndex((s) => s.key === order.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-6 relative border border-gray-200">
        {/* Nút đóng */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            Đơn hàng #{order.code || order.id}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              statusColors[order.status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {order.status}
          </span>
        </div>

        {/* === Timeline trạng thái === */}
        <div className="flex items-center justify-between mb-6 relative">
          {steps.map((step, index) => {
            const isDone = index <= currentIndex;
            return (
              <React.Fragment key={step.key}>
                <div className="flex flex-col items-center text-center flex-1">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all ${
                      isDone
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 text-gray-400 bg-white"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`text-xs mt-1 ${
                      isDone ? "text-green-600 font-medium" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {/* Thanh nối giữa các bước */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-4 left-[calc(${
                      (index + 1) / steps.length
                    }*100%-8px)] h-[2px] w-[calc(100%/${steps.length})] ${
                      index < currentIndex ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Grid thông tin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Thông tin đơn hàng */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Truck size={16} /> Thông tin đơn hàng
            </h3>
            <p>
              <b>Ngày đặt:</b> {order.createdAt}
            </p>
            <p>
              <b>Thanh toán:</b> {order.paymentMethod} / {order.paymentStatus}
            </p>
            <p>
              <b>Ghi chú:</b> {order.notes || "-"}
            </p>
          </div>

          {/* Thông tin khách hàng */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <CheckCircle size={16} /> Khách hàng
            </h3>
            <p>
              <b>Người đặt:</b>{" "}
              {order.user?.personalInfo?.fullName || "Không rõ"}
            </p>
            <p>
              <b>Người nhận:</b> {order.shippingAddress?.fullName}
            </p>
            <p>
              <b>SĐT:</b> {order.shippingAddress?.phone}
            </p>
            <p>
              <b>Địa chỉ:</b>{" "}
              {`${order.shippingAddress?.address || ""}, ${
                order.shippingAddress?.city || ""
              }`}
            </p>
          </div>
        </div>

        {/* Thông tin tài chính */}
        <div className="mt-6 border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-1">
            <p>
              <b>Phí ship:</b> {formatVND(order.shippingFee)}
            </p>
            <p>
              <b>Tổng tiền:</b> {formatVND(order.totalAmount)}
            </p>
            <p>
              <b>Giảm giá:</b> {formatVND(order.discount)}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-green-50 rounded-lg px-4 py-2 text-center">
              <p className="text-sm text-gray-500 font-medium">Khách trả</p>
              <p className="text-xl font-bold text-green-600">
                {formatVND(order.finalAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* Hành động */}
        <div className="flex justify-end gap-3 mt-8 border-t pt-4">
          {order.status === "new" && (
            <button
              onClick={() => onConfirm(order._id || order.id)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
            >
              <CheckCircle size={16} className="inline mr-1" />
              Xác nhận đơn
            </button>
          )}

          {order.status === "confirmed" && (
            <button
              onClick={() => onConfirm(order._id || order.id)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
            >
              <Truck size={16} className="inline mr-1" />
              Giao hàng
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
