import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Truck,
  CheckCircle,
  Clock,
  PackageCheck,
  BadgeCheck,
  MapPin,
  Phone,
  CreditCard,
  DollarSign,
  X,
  ExternalLink,
} from "lucide-react";

export default function ShipperOrderDetailModal({ open, onClose, order }) {
  if (!order) return null;

  const formatVND = (n) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(n || 0));

  const steps = [
    { key: "confirmed", label: "Đã xác nhận", icon: <CheckCircle size={16} /> },
    { key: "shipping", label: "Đang giao", icon: <Truck size={16} /> },
    {
      key: "done_shipping",
      label: "Đã giao",
      icon: <PackageCheck size={16} />,
    },
    { key: "completed", label: "Hoàn tất", icon: <BadgeCheck size={16} /> },
  ];

  const currentIndex = steps.findIndex((s) => s.key === order.status);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay sáng hơn, có hiệu ứng mờ */}
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
              <Dialog.Panel className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-gray-200 relative">
                {/* Nút đóng */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={20} />
                </button>

                {/* Tiêu đề */}
                <Dialog.Title className="text-2xl font-bold text-que-primary mb-4">
                  Đơn hàng #{order.code || order._id.slice(-6)}
                </Dialog.Title>

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

                {/* Thông tin giao hàng + khách hàng */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Truck size={16} /> Thông tin giao hàng
                    </h3>
                    <p>
                      <b>Ngày đặt:</b>{" "}
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </p>
                    <p>
                      <b>Phương thức:</b> {order.paymentMethod}
                    </p>
                    <p>
                      <b>Trạng thái:</b>{" "}
                      <span className="px-2 py-1 bg-que-secondary/10 text-que-primary rounded text-xs">
                        {order.status}
                      </span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <MapPin size={16} /> Người nhận
                    </h3>
                    <p>
                      <b>Họ tên:</b> {order.shippingAddress?.fullName}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={14} className="text-gray-500" />
                      {order.shippingAddress?.phone}
                      {/* <a
                        href={`tel:${order.shippingAddress?.phone}`}
                        className="ml-2 text-que-primary text-xs hover:underline"
                      >
                        Gọi ngay
                      </a> */}
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <MapPin size={14} className="text-gray-400" />
                      {order.shippingAddress?.address},{" "}
                      {order.shippingAddress?.city}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          order.shippingAddress?.address +
                            "," +
                            order.shippingAddress?.city
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-que-primary text-xs hover:underline flex items-center gap-1"
                      >
                        <ExternalLink size={12} /> Xem bản đồ
                      </a>
                    </p>
                  </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="border-t pt-4 mb-4">
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

                {/* Tổng tiền */}
                <div className="border-t pt-4 grid grid-cols-2 gap-6 text-sm">
                  <div className="space-y-1">
                    <p>
                      <CreditCard size={14} className="inline mr-1" />
                      <b>Thanh toán:</b> {order.paymentStatus}
                    </p>
                    <p>
                      <b>Phí ship:</b> {formatVND(order.shippingFee)}
                    </p>
                    <p>
                      <b>Tổng tiền:</b> {formatVND(order.totalAmount)}
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

                {/* Ghi chú */}
                {order.notes && (
                  <div className="mt-4 text-sm text-gray-700 border-t pt-3">
                    <b>Ghi chú:</b> {order.notes}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
