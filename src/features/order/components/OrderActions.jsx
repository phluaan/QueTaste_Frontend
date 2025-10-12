import { useState } from "react";
import useCancelOrder from "../hooks/useCancelOrder";
import CancelRequestModal from "./CancelRequestModal";
import ConfirmCancelModal from "./ConfirmCancelModal";

const OrderActions = ({ order }) => {
  const { _id, status } = order;
  const { handleCancel, handleRequestCancel } = useCancelOrder();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [open, setOpen] = useState(false);

  switch (status) {
    case "new":
    case "confirmed":
      return (
        <div className="flex gap-2">
          {/* Primary - hủy trực tiếp */}
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded text-sm bg-red-500 text-white hover:bg-red-600"
          >
            Hủy đơn
          </button>
          {/* Secondary */}
          <button className="px-4 py-2 rounded text-sm border border-gray-300 text-gray-600 hover:bg-gray-100">
            Liên hệ người bán
          </button>
          <ConfirmCancelModal
            onClose={() => setOpen(false)}
            onConfirm={() => {
              // xử lý khi xác nhận
              handleCancel(_id);
              setOpen(false);
            }}
            open={open}
          />
        </div>
      );

    case "processing":
      return (
        <>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCancelModal(true)}
              className="px-4 py-2 rounded text-sm bg-orange-500 text-white hover:bg-orange-600"
            >
              Gửi yêu cầu hủy đơn
            </button>
            <button className="px-4 py-2 rounded text-sm border border-gray-300 text-gray-600 hover:bg-gray-100">
              Liên hệ người bán
            </button>
          </div>

          {/* Modal */}
          <CancelRequestModal
            open={showCancelModal}
            onClose={() => setShowCancelModal(false)}
            order={order}
            onSubmit={async (reason) => {
              await handleRequestCancel(order._id, reason); // gọi API từ hook
              setShowCancelModal(false);
            }}
          />
        </>
      );

    case "shipping":
      return (
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded text-sm bg-blue-500 text-white hover:bg-blue-600">
            Theo dõi vận chuyển
          </button>
          <button className="px-4 py-2 rounded text-sm border border-gray-300 text-gray-600 hover:bg-gray-100">
            Liên hệ người bán
          </button>
        </div>
      );

    case "delivering":
      return (
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded text-sm bg-green-500 text-white hover:bg-green-600">
            Đã nhận hàng
          </button>
          <button className="px-4 py-2 rounded text-sm border border-gray-300 text-gray-600 hover:bg-gray-100">
            Liên hệ người bán
          </button>
        </div>
      );

    case "completed":
      return (
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded text-sm bg-blue-500 text-white hover:bg-blue-600">
            Mua lại
          </button>
          <button className="px-4 py-2 rounded text-sm border border-gray-300 text-gray-600 hover:bg-gray-100">
            Trả hàng/Hoàn tiền
          </button>
        </div>
      );

    case "cancelled":
      return (
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded text-sm bg-blue-500 text-white hover:bg-blue-600">
            Mua lại
          </button>
          <button className="px-4 py-2 rounded text-sm border border-gray-300 text-gray-600 hover:bg-gray-100">
            Liên hệ người bán
          </button>
        </div>
      );

    case "refund":
      return (
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded text-sm bg-purple-500 text-white hover:bg-purple-600">
            Xem chi tiết khiếu nại
          </button>
          <button className="px-4 py-2 rounded text-sm border border-gray-300 text-gray-600 hover:bg-gray-100">
            Liên hệ người bán
          </button>
        </div>
      );

    default:
      return null;
  }
};

export default OrderActions;
