import React from "react";
import {
  Truck,
  CheckCircle,
  XCircle,
  PackageCheck,
  BadgeCheck,
  Clock,
  Eye,
} from "lucide-react";

// Hàm giúp kết hợp class tailwind dễ đọc
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Icon trạng thái
const statusIcons = {
  new: <Clock size={14} className="text-blue-500" />,
  confirmed: <CheckCircle size={14} className="text-teal-500" />,
  shipping: <Truck size={14} className="text-sky-500" />,
  done_shipping: <PackageCheck size={14} className="text-indigo-500" />,
  completed: <BadgeCheck size={14} className="text-green-600" />,
  cancelled: <XCircle size={14} className="text-red-500" />,
};

// Màu nền trạng thái
const statusColors = {
  new: "bg-blue-100 text-blue-700",
  confirmed: "bg-teal-100 text-teal-700",
  shipping: "bg-sky-100 text-sky-700",
  done_shipping: "bg-indigo-100 text-indigo-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrderTable({
  orders,
  selectedOrders,
  onToggleSelect,
  onToggleSelectAll,
  onViewDetail,
}) {
  const fmtVND = (n) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(n || 0));

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="border px-3 py-3 w-10 text-center">
              <input
                type="checkbox"
                checked={
                  selectedOrders.length === orders.length && orders.length > 0
                }
                onChange={onToggleSelectAll}
              />
            </th>
            <th className="border px-3 py-3 text-left">Mã đơn</th>
            <th className="border px-3 py-3 text-left">Khách hàng</th>
            <th className="border px-3 py-3 text-left">Ngày đặt</th>
            <th className="border px-3 py-3 text-left">Địa chỉ nhận</th>
            <th className="border px-3 py-3 text-left">Trạng thái</th>
            <th className="border px-3 py-3 text-left">Thanh toán</th>
            <th className="border px-3 py-3 text-right">Khách trả</th>
            <th className="border px-3 py-3 text-center w-28">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr
              key={order.id}
              className={cn(
                i % 2 === 0 ? "bg-white" : "bg-gray-50",
                "hover:bg-blue-50 transition-colors"
              )}
            >
              <td className="border px-3 py-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => onToggleSelect(order.id)}
                />
              </td>
              <td className="border px-3 py-2 font-medium">{order.code}</td>
              <td className="border px-3 py-2">
                {order.user?.personalInfo?.fullName || "Không rõ"}
              </td>
              <td className="border px-3 py-2 text-gray-700">
                {order.createdAt}
              </td>
              <td className="border px-3 py-2 text-gray-700">
                {order.shippingAddress?.address}, {order.shippingAddress?.city}
              </td>
              <td className="border px-3 py-2">
                <div className="flex items-center gap-2">
                  {statusIcons[order.status]}
                  <span
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      statusColors[order.status] || "bg-gray-200 text-gray-700"
                    )}
                  >
                    {order.status}
                  </span>
                </div>
              </td>
              <td className="border px-3 py-2">
                {order.paymentMethod} / {order.paymentStatus}
              </td>
              <td className="border px-3 py-2 text-right font-semibold text-que-secondary">
                {fmtVND(order.finalAmount)}
              </td>
              <td className="border px-3 py-2 text-center">
                <button
                  onClick={() => onViewDetail(order)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-sm border rounded hover:bg-gray-50 text-gray-700 hover:text-que-accent transition"
                >
                  <Eye size={14} />
                  Xem
                </button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td
                colSpan="9"
                className="text-center py-6 text-gray-500 italic border"
              >
                Không có đơn hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
