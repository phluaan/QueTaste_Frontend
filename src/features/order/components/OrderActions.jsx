import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCancelOrder from "../hooks/useCancelOrder";
import CancelRequestModal from "./CancelRequestModal";
import ConfirmCancelModal from "./ConfirmCancelModal";

const OrderActions = ({ order }) => {
  const navigate = useNavigate();
  const { _id, status } = order;
  const { handleCancel, handleRequestCancel } = useCancelOrder();

  const [showCancelModal, setShowCancelModal] = useState(false); // modal gửi yêu cầu hủy (processing)
  const [openConfirm, setOpenConfirm] = useState(false); // modal xác nhận hủy trực tiếp (new/confirmed)

  const renderPrimary = () => {
    switch (status) {
      case "new":
      case "confirmed":
        // Hủy trực tiếp
        return (
          <>
            <button
              onClick={() => setOpenConfirm(true)}
              className="px-4 py-2 rounded text-sm bg-red-500 text-white hover:bg-red-600"
            >
              Hủy đơn
            </button>
            <ConfirmCancelModal
              open={openConfirm}
              onClose={() => setOpenConfirm(false)}
              onConfirm={async () => {
                await handleCancel(_id); // thunk sẽ hiện toast lỗi/thành công
                setOpenConfirm(false);
              }}
              title="Xác nhận hủy đơn"
              message="Bạn có chắc muốn hủy đơn hàng này?"
              confirmText="Xác nhận hủy"
              cancelText="Đóng"
            />
          </>
        );

      case "processing":
        // Gửi yêu cầu hủy + liên hệ
        return (
          <>
            <button
              onClick={() => setShowCancelModal(true)}
              className="px-4 py-2 rounded text-sm bg-orange-500 text-white hover:bg-orange-600"
            >
              Gửi yêu cầu hủy đơn
            </button>

            <CancelRequestModal
              open={showCancelModal}
              onClose={() => setShowCancelModal(false)}
              order={order}
              onSubmit={async (reason) => {
                await handleRequestCancel(_id, reason);
                setShowCancelModal(false);
              }}
            />
          </>
        );

      case "shipping":
        return (
          <button
            className="px-4 py-2 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => navigate(`/orders/${_id}/tracking`)}
          >
            Theo dõi vận chuyển
          </button>
        );

      case "delivering":
        return (
          <button
            className="px-4 py-2 rounded text-sm bg-green-500 text-white hover:bg-green-600"
            onClick={() => navigate(`/orders/${_id}/receive`)}
          >
            Đã nhận hàng
          </button>
        );

      case "completed":
        return (
          <button
            className="px-4 py-2 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => navigate(`/products/reorder?orderId=${_id}`)}
          >
            Mua lại
          </button>
        );

      case "cancelled":
        return (
          <button
            className="px-4 py-2 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => navigate(`/products/reorder?orderId=${_id}`)}
          >
            Mua lại
          </button>
        );

      case "refund":
        return (
          <button
            className="px-4 py-2 rounded text-sm bg-purple-500 text-white hover:bg-purple-600"
            onClick={() => navigate(`/orders/${_id}/refund`)}
          >
            Xem chi tiết khiếu nại
          </button>
        );

      default:
        return null;
    }
  };

  const renderSecondary = () => {
    if (status === "completed") {
      return (
        <button
          className="px-4 py-2 rounded text-sm border bg-red-500 text-white hover:bg-red-600"
          onClick={() => navigate(`/orders/${_id}/return`)}
        >
          Trả hàng/Hoàn tiền
        </button>
      );
    }
    // Mặc định: Liên hệ người bán
    return (
      <button
        className="px-4 py-2 rounded text-sm border border-gray-300 text-gray-600 hover:bg-gray-100"
        onClick={() => navigate(`/contact`)}
      >
        Liên hệ người bán
      </button>
    );
  };

  return (
    <div className="flex gap-2">
      {renderPrimary()}
      {renderSecondary()}
    </div>
  );
};

export default OrderActions;
