import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Truck,
  CheckCircle,
  Clock,
  PackageCheck,
  BadgeCheck,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import ReviewModal from "../../review/components/ReviewModal";

export default function CustomerOrderDetailModal({
  open,
  onClose,
  order,
  statusColors = {},
}) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenReview = (product) => {
    setSelectedProduct(product);
    setShowReviewModal(true);
  };

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
    <>
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
                <Dialog.Panel className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl relative border border-gray-200">
                  {/* Đóng */}
                  <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                  >
                    <X size={20} />
                  </button>

                  {/* Header */}
                  <div className="border-b pb-3 mb-4 text-center">
                    <Dialog.Title className="text-2xl font-bold text-que-primary">
                      Đơn hàng #{order.code || order._id.slice(-6)}
                    </Dialog.Title>
                    <p className="text-sm text-gray-500 mt-1">
                      Cảm ơn bạn đã mua sắm cùng{" "}
                      <b className="text-que-accent">QueTaste</b> 💚
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center justify-between mb-8 relative">
                    {steps.map((step, index) => {
                      const done = index <= currentIndex;
                      return (
                        <div
                          key={step.key}
                          className="flex-1 text-center relative"
                        >
                          <div
                            className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full border-2 transition-all ${
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
                          {index < steps.length - 1 && (
                            <div
                              className={`absolute top-4 left-1/2 w-full h-[2px] ${
                                index < currentIndex
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Thông tin giao hàng */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        🧾 Thông tin đơn
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
                        <b>Trạng thái:</b>{" "}
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            statusColors[order.status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        👤 Người nhận
                      </h3>
                      <p>
                        <b>Họ tên:</b> {order.shippingAddress?.fullName}
                      </p>
                      <p>
                        <b>SĐT:</b> {order.shippingAddress?.phone}
                      </p>
                      <p>
                        <b>Địa chỉ:</b> {order.shippingAddress?.address},{" "}
                        {order.shippingAddress?.city}
                      </p>
                    </div>
                  </div>

                  {/* Danh sách sản phẩm */}
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                      🛍️ Sản phẩm trong đơn
                    </h3>
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div
                          key={item._id || idx}
                          className="flex items-center justify-between gap-3 border-b pb-3"
                        >
                          <Link
                            to={`/product/${item.product._id}`}
                            className="flex items-center gap-3 flex-1"
                          >
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
                          </Link>

                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-800">
                              {formatVND(item.quantity * item.price)}
                            </span>

                            {order.status === "completed" &&
                              item.isReviewed === false && (
                                <button
                                  onClick={() => handleOpenReview(item.product)}
                                  className="px-3 py-1 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                                >
                                  Đánh giá
                                </button>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tổng tiền */}
                  <div className="mt-6 border-t pt-4 grid grid-cols-2 gap-6 text-sm">
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
                      <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center shadow-sm">
                        <p className="text-sm text-gray-600 font-medium">
                          Tổng thanh toán
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

      {/* Modal đánh giá sản phẩm */}
      <ReviewModal
        open={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        product={selectedProduct}
        orderId={order._id || order.id}
      />
    </>
  );
}
