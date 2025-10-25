import { useState } from "react";
import ConfirmModal from "../../../../components/ConfirmModal";
import { Truck, CheckCircle, XCircle, Search } from "lucide-react";

export default function OrderToolbar({
  selectedOrders,
  onSearch,
  onConfirmOrders,
  onCancelOrders,
  onCallingShipper,
}) {
  const [modalInfo, setModalInfo] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: "",
    onConfirm: null,
  });

  const closeModal = () => setModalInfo((prev) => ({ ...prev, open: false }));

  const handleAction = (type) => {
    if (!selectedOrders.length) return;

    const count = selectedOrders.length;
    const base = { open: true, onConfirm: null };

    switch (type) {
      case "confirm":
        setModalInfo({
          ...base,
          title: "Xác nhận đơn hàng",
          message: `Bạn có chắc muốn xác nhận ${count} đơn hàng này?`,
          confirmText: "Xác nhận",
          onConfirm: () => onConfirmOrders(selectedOrders),
        });
        break;

      case "cancel":
        setModalInfo({
          ...base,
          title: "Hủy đơn hàng",
          message: `Bạn có chắc muốn hủy ${count} đơn hàng này?`,
          confirmText: "Hủy đơn",
          onConfirm: () => onCancelOrders(selectedOrders),
        });
        break;

      case "shipper":
        setModalInfo({
          ...base,
          title: "Vận chuyển",
          message: `Bạn có chắc muốn chuyển ${count} đơn sang trạng thái “Đang giao”?`,
          confirmText: "Vận chuyển",
          onConfirm: () => onCallingShipper(selectedOrders),
        });
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Search box */}
        <div className="flex items-center gap-2 flex-1 max-w-md bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        {/* Bulk actions */}
        <div className="flex gap-3 flex-wrap">
          {/* Nút vận chuyển */}
          <button
            onClick={() => handleAction("shipper")}
            disabled={!selectedOrders.length}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-all
              ${
                selectedOrders.length
                  ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            <Truck size={18} />
            <span>Vận chuyển</span>
          </button>

          {/* Nút xác nhận */}
          <button
            onClick={() => handleAction("confirm")}
            disabled={!selectedOrders.length}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-all
              ${
                selectedOrders.length
                  ? "bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            <CheckCircle size={18} />
            <span>Xác nhận</span>
          </button>

          {/* Nút hủy đơn */}
          <button
            onClick={() => handleAction("cancel")}
            disabled={!selectedOrders.length}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-all
              ${
                selectedOrders.length
                  ? "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            <XCircle size={18} />
            <span>Hủy đơn</span>
          </button>
        </div>
      </div>

      {/* Confirm modal */}
      <ConfirmModal
        open={modalInfo.open}
        title={modalInfo.title}
        message={modalInfo.message}
        confirmText={modalInfo.confirmText}
        cancelText="Đóng"
        onClose={closeModal}
        onConfirm={async () => {
          await modalInfo.onConfirm?.();
          closeModal();
        }}
      />
    </>
  );
}
