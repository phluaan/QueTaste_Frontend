import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  PackageCheck,
  BadgeCheck,
} from "lucide-react";

export default function OrderDetailModal({
  open,
  onClose,
  order,
  statusColors,
  onConfirm,
}) {
  if (!order) return null;

  const formatVND = (n) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(n || 0));

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

  const currentIndex = steps.findIndex((s) => s.key === order.status);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay sáng nhẹ */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/10 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 relative">
                {/* Nút đóng */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                >
                  ✕
                </button>

                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-que-primary">
                    Đơn hàng #{order.code || order.id}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      statusColors?.[order.status] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Timeline trạng thái */}
                <div className="flex items-center justify-between mb-6 relative">
                  {steps.map((step, idx) => {
                    const done = idx <= currentIndex;
                    return (
                      <div
                        key={step.key}
                        className="flex-1 text-center relative"
                      >
                        <div
                          className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full border-2 ${
                            done
                              ? "border-green-500 bg-green-500 text-white"
                              : "border-gray-300 bg-white text-gray-400"
                          }`}
                        >
                          {step.icon}
                        </div>
                        <p
                          className={`mt-2 text-xs ${
                            done
                              ? "text-green-600 font-medium"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                        {idx < steps.length - 1 && (
                          <div
                            className={`absolute top-4 left-1/2 w-full h-[2px] ${
                              idx < currentIndex
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Thông tin đơn + khách */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  {/* Thông tin đơn hàng */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Truck size={16} /> Thông tin đơn hàng
                    </h3>
                    <p>
                      <b>Ngày đặt:</b>{" "}
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </p>
                    <p>
                      <b>Thanh toán:</b> {order.paymentMethod} /{" "}
                      {order.paymentStatus}
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

                {/* Danh sách sản phẩm */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                    Sản phẩm trong đơn
                  </h3>
                  <div className="space-y-3">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-3 border-b pb-3"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <img
                            src={item.product?.images?.[0] || "/no-image.png"}
                            alt={item.product?.name}
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {item.product?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              SL: {item.quantity} × {formatVND(item.price)}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-gray-700">
                          {formatVND(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
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
                    <div className="bg-green-50 border border-green-200 rounded-lg px-5 py-3 text-center shadow-sm">
                      <p className="text-sm text-gray-600 font-medium">
                        Khách cần thanh toán
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatVND(order.finalAmount)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nút hành động */}
                <div className="flex justify-end gap-3 mt-8 border-t pt-4">
                  {order.status === "new" && (
                    <button
                      onClick={() => onConfirm(order._id || order.id)}
                      className="px-4 py-2 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-all"
                    >
                      <CheckCircle size={16} /> Xác nhận đơn
                    </button>
                  )}

                  {order.status === "confirmed" && (
                    <button
                      onClick={() => onConfirm(order._id || order.id)}
                      className="px-4 py-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-all"
                    >
                      <Truck size={16} /> Giao hàng
                    </button>
                  )}

                  <button
                    onClick={onClose}
                    className="px-4 py-2 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300 transition-all"
                  >
                    <XCircle size={16} /> Đóng
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
