import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ReviewModal from "../../review/components/ReviewModal";

export default function OrderDetailModal({ open, onClose, order, statusColors = {} }) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenReview = (product) => {
    setSelectedProduct(product);
    setShowReviewModal(true);
  };

  if (!order) return null;

  return (
    <>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        {/* modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl relative">
              {/* Close button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                onClick={onClose}
              >
                ✕
              </button>

              {/* Header */}
              <Dialog.Title className="text-2xl font-semibold mb-4 border-b pb-2">
                Đơn hàng #{order.code || order.id}
              </Dialog.Title>

              <div className="grid grid-cols-2 gap-6 text-sm">
                {/* Thông tin đơn */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700 mb-2">Thông tin đơn</h3>
                  <p><b>Ngày đặt:</b> {order.createdAt}</p>
                  <p>
                    <b>Trạng thái:</b>{" "}
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        statusColors[order.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p>
                    <b>Thanh toán:</b> {order.paymentMethod} / {order.paymentStatus}
                  </p>
                  <p><b>Giao hàng:</b> {order.deliveryStatus}</p>
                </div>

                {/* Thông tin khách */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700 mb-2">Khách hàng</h3>
                  <p><b>Người nhận:</b> {order.shippingAddress?.fullName}</p>
                  <p><b>SĐT:</b> {order.shippingAddress?.phone}</p>
                  <p><b>Địa chỉ:</b> {order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
                </div>
              </div>

              {/* Chi tiết sản phẩm */}
              <div className="mt-6 border-t pt-4 text-sm">
                <h3 className="font-semibold text-gray-700 mb-2">Sản phẩm</h3>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={item._id || idx}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      {/* ảnh + thông tin */}
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product?.images?.[0] || "/no-image.png"}
                          alt={item.product?.name}
                          className="w-14 h-14 object-cover rounded-md border"
                        />
                        <div>
                          <p className="font-medium">{item.product?.name}</p>
                          <p className="text-xs text-gray-500">
                            SL: {item.quantity} ×{" "}
                            {item.price.toLocaleString()}₫
                          </p>
                        </div>
                      </div>

                      {/* Giá + nút đánh giá */}
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">
                          {(item.quantity * item.price).toLocaleString()}₫
                        </span>
                        { (order.status === "completed" && item.isReviewed == false) ?
                                                <button
                          onClick={() => handleOpenReview(item.product)}
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Đánh giá
                        </button> : null
                        }

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tài chính */}
              <div className="mt-6 border-t pt-4 grid grid-cols-2 gap-6 text-sm">
                <div className="space-y-1">
                  <p><b>Phí ship:</b> {order.shippingFee.toLocaleString()}₫</p>
                  <p><b>Tổng tiền:</b> {order.totalAmount.toLocaleString()}₫</p>
                  <p><b>Giảm giá:</b> {order.discount.toLocaleString()}₫</p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-xl font-bold text-green-600">
                    Khách trả: {order.finalAmount.toLocaleString()}₫
                  </p>
                </div>
              </div>

              {/* Ghi chú */}
              <div className="mt-4 text-sm">
                <b>Ghi chú:</b> {order.notes || "-"}
              </div>

              {/* Buttons */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
                >
                  Đóng
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
    {/* Modal đánh giá sản phẩm */}
    <ReviewModal
      open={showReviewModal}
      onClose={() => setShowReviewModal(false)}
      product={selectedProduct}
      orderId={order._id}
    />
    </>
  );
}
