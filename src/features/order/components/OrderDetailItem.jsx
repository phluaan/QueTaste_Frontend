import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ReviewModal from "../../review/components/ReviewModal";
import { Link } from "react-router-dom";

export default function OrderDetailModal({
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

          {/* modal wrapper: cho phép cuộn */}
          <div className="fixed inset-0 overflow-y-auto">
            {/* container để canh giữa */}
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
                {/* panel: giới hạn chiều cao và bật cuộn */}
                <Dialog.Panel className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-que-surface p-6 shadow-xl relative">
                  {/* Close button */}
                  <button
                    className="absolute top-3 right-3 text-que-text-muted hover:text-que-text-main"
                    onClick={onClose}
                  >
                    ✕
                  </button>

                  {/* Header cố định (tuỳ chọn) */}
                  <div className="top-0 bg-que-surface pt-2 pb-3 -mx-6 px-6 border-b">
                    <Dialog.Title className="text-2xl font-semibold text-que-text-main">
                      Đơn hàng #{order.code || order.id}
                    </Dialog.Title>
                  </div>

                  {/* Nội dung */}
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-6 text-sm">
                      {/* Thông tin đơn */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-que-text-main mb-2">
                          Thông tin đơn
                        </h3>
                        <p>
                          <b>Ngày đặt:</b> {order.createdAt}
                        </p>
                        <p>
                          <b>Trạng thái:</b>{" "}
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              statusColors[order.status] ||
                              "bg-que-background text-que-text-muted"
                            }`}
                          >
                            {order.status}
                          </span>
                        </p>
                        <p>
                          <b>Thanh toán:</b> {order.paymentMethod} /{" "}
                          {order.paymentStatus}
                        </p>
                        <p>
                          <b>Giao hàng:</b> {order.deliveryStatus}
                        </p>
                      </div>

                      {/* Thông tin khách */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-que-text-main mb-2">
                          Khách hàng
                        </h3>
                        <p>
                          <b>Người nhận:</b> {order.shippingAddress?.fullName}
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

                    {/* Chi tiết sản phẩm */}
                    <div className="mt-6 border-t pt-4 text-sm">
                      <h3 className="font-semibold text-que-text-main mb-2">
                        Sản phẩm
                      </h3>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div
                            key={item._id || idx}
                            className="flex justify-between items-center border-b pb-2"
                          >
                            <Link
                              to={`/product/${item.product._id}`}
                              className="flex-1"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={
                                    item.product?.images?.[0] || "/no-image.png"
                                  }
                                  alt={item.product?.name}
                                  className="w-14 h-14 object-cover rounded-md border"
                                />

                                <div>
                                  <p className="font-medium">
                                    {item.product?.name}
                                  </p>
                                  <p className="text-xs text-que-text-muted">
                                    SL: {item.quantity} ×{" "}
                                    {item.price.toLocaleString()}₫
                                  </p>
                                </div>
                              </div>
                            </Link>

                            <div className="flex items-center gap-3">
                              <span className="font-semibold">
                                {(item.quantity * item.price).toLocaleString()}₫
                              </span>
                              {order.status === "completed" &&
                              item.isReviewed == false ? (
                                <button
                                  onClick={() => handleOpenReview(item.product)}
                                  className="px-3 py-1 text-sm bg-que-accent text-que-surface rounded hover:bg-que-primary"
                                >
                                  Đánh giá
                                </button>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tài chính */}
                    <div className="mt-6 border-t pt-4 grid grid-cols-2 gap-6 text-sm">
                      <div className="space-y-1">
                        <p>
                          <b>Phí ship:</b> {order.shippingFee.toLocaleString()}₫
                        </p>
                        <p>
                          <b>Tổng tiền:</b> {order.totalAmount.toLocaleString()}
                          ₫
                        </p>
                        <p>
                          <b>Giảm giá:</b> {order.discount.toLocaleString()}₫
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="text-xl font-bold text-que-secondary">
                          Khách trả: {order.finalAmount.toLocaleString()}₫
                        </p>
                      </div>
                    </div>

                    {/* Ghi chú */}
                    <div className="mt-4 text-sm">
                      <b>Ghi chú:</b> {order.notes || "-"}
                    </div>
                  </div>

                  {/* Footer cố định (tuỳ chọn) */}
                  <div className="bottom-0 bg-que-surface pt-4 -mx-6 px-6">
                    <div className="flex justify-end border-t pt-4">
                      <button
                        onClick={onClose}
                        className="px-4 py-2 bg-que-primary text-que-surface rounded-md hover:bg-que-secondary"
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
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
