import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCancelOrder from "../hooks/useCancelOrder";
import CancelRequestModal from "./CancelRequestModal";
import ConfirmModal from "../../../components/ConfirmModal";
import useOrder from "../hooks/useOrder";
import useOrderActions from "../hooks/useOrderActions";

const OrderActions = ({ order }) => {
  const navigate = useNavigate();
  const { _id, status } = order;
  const { handleCancel, handleRequestCancel } = useCancelOrder();

  const [showCancelModal, setShowCancelModal] = useState(false); // modal gửi yêu cầu hủy (processing)
  const [openConfirm, setOpenConfirm] = useState(false); // modal xác nhận hủy trực tiếp (new/confirmed)

  const { reorder, confirmReceived, requestCancel, loading } =
    useOrderActions();

  const handleReOrder = async () => {
    const action = await reorder(_id);
    if (action.type.endsWith("/fulfilled")) {
      navigate("/cart");
    }
  };
  const renderPrimary = () => {
    switch (status) {
      case "new":
        // Hủy trực tiếp
        return (
          <>
            <button
              onClick={() => setOpenConfirm(true)}
              className="px-4 py-2 rounded text-sm bg-red-500 text-white hover:bg-red-600"
            >
              Hủy đơn
            </button>
            <ConfirmModal
              open={openConfirm}
              onClose={() => setOpenConfirm(false)}
              onConfirm={async () => {
                await handleCancel(_id);
                setOpenConfirm(false);
              }}
              title="Xác nhận hủy đơn"
              message="Bạn có chắc muốn hủy đơn hàng này?"
              confirmText="Xác nhận hủy"
              cancelText="Đóng"
            />
          </>
        );

      case "confirmed":
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

      case "done_shipping":
        return (
          <>
            <button
              onClick={() => setOpenConfirm(true)}
              disabled={loading.confirmReceived}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-60"
            >
              Tôi đã nhận hàng
            </button>
            <ConfirmModal
              open={openConfirm}
              onClose={() => setOpenConfirm(false)}
              onConfirm={async () => {
                await confirmReceived(_id);
                setOpenConfirm(false);
              }}
              title="Xác nhận đã nhận được đơn hàng"
              message="Bạn xác nhận đã nhận được đơn hàng này?"
              confirmText="Xác nhận"
              cancelText="Đóng"
            />
          </>
        );

      case "completed":
      case "cancelled":
      case "cancel_requested":
        return (
          <button
            className="px-4 py-2 rounded text-sm bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            onClick={handleReOrder}
            disabled={loading.reorder}
          >
            {loading.reorder ? "Đang thêm..." : "Mua lại"}
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
    // if (status === "completed") {
    //   return (
    //     <button
    //       className="px-4 py-2 rounded text-sm border bg-red-500 text-white hover:bg-red-600"
    //       onClick={() => navigate(`/orders/${_id}/return`)}
    //     >
    //       Trả hàng/Hoàn tiền
    //     </button>
    //   );
    // }
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
