import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function OrderDetailModal({ open, onClose, order }) {
  if (!order) return null;

  return (
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
            <Dialog.Panel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-gray-900"
              >
                Chi tiết đơn hàng
              </Dialog.Title>

              {/* Thông tin đơn hàng */}
              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <span className="font-medium">Trạng thái:</span>{" "}
                  {order.status}
                </p>
                <p>
                  <span className="font-medium">Thanh toán:</span>{" "}
                  {order.paymentMethod} - {order.paymentStatus}
                </p>
                <p>
                  <span className="font-medium">Giao hàng:</span>{" "}
                  {order.deliveryStatus}
                </p>
                <p>
                  <span className="font-medium">Người nhận:</span>{" "}
                  {order.shippingAddress?.fullName},{" "}
                  {order.shippingAddress?.phone}
                </p>
                <p>
                  <span className="font-medium">Địa chỉ:</span>{" "}
                  {order.shippingAddress?.address},{" "}
                  {order.shippingAddress?.city}
                </p>
              </div>

              <hr className="my-4" />

              {/* Chi tiết sản phẩm */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{item.product?.name}</p>
                      <p className="text-xs text-gray-500">
                        SL: {item.quantity} ×{" "}
                        {item.price.toLocaleString()}₫
                      </p>
                    </div>
                    <span className="font-semibold">
                      {(item.quantity * item.price).toLocaleString()}₫
                    </span>
                  </div>
                ))}
              </div>

              <hr className="my-4" />

              <p className="text-right font-bold">
                Tổng cộng: {order.finalAmount.toLocaleString()}₫
              </p>

              <div className="mt-6 flex justify-end">
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
  );
}
