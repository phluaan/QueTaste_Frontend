import { useState } from "react";
import useShipperOrders from "../hooks/useShipperOrders";
import { formatCurrency } from "../../../../utils/format";
import ConfirmModal from "../../../../components/ConfirmModal"; // 🧩 import modal

const ShipperOrdersPage = () => {
  const { orders, loading, handleMarkDone, handleRequestCancel } =
    useShipperOrders();

  // --- State điều khiển modal ---
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // 'done' | 'cancel'
  const [selectedOrder, setSelectedOrder] = useState(null);

  // --- Mở modal xác nhận ---
  const openConfirm = (order, type) => {
    setSelectedOrder(order);
    setActionType(type);
    setConfirmOpen(true);
  };

  // --- Xử lý xác nhận ---
  const handleConfirm = () => {
    if (!selectedOrder) return;
    if (actionType === "done") {
      handleMarkDone(selectedOrder._id);
    } else if (actionType === "cancel") {
      handleRequestCancel(selectedOrder._id);
    }
    setConfirmOpen(false);
    setSelectedOrder(null);
    setActionType(null);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        Đang tải danh sách đơn hàng...
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">📦 Đơn hàng đang giao</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">Không có đơn hàng nào đang giao.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white shadow-sm border rounded-xl p-5 flex justify-between items-start hover:shadow-md transition"
            >
              <div className="space-y-1">
                <p className="font-semibold text-gray-800">
                  Mã đơn:{" "}
                  <span className="text-blue-600">{o._id.slice(-6)}</span>
                </p>
                <p className="text-gray-700">
                  <b>Khách hàng:</b> {o.shippingAddress?.fullName} —{" "}
                  <span className="text-gray-600">
                    {o.shippingAddress?.phone}
                  </span>
                </p>
                <p className="text-gray-600 text-sm leading-snug">
                  <b>Địa chỉ:</b> {o.shippingAddress?.address},{" "}
                  {o.shippingAddress?.city}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Thanh toán:</b> {o.paymentMethod} (
                  {o.paymentStatus === "pending"
                    ? "Chưa thanh toán"
                    : "Đã thanh toán"}
                  )
                </p>
                <p className="text-gray-800 font-medium">
                  Tổng: {formatCurrency(o.finalAmount)}{" "}
                  <span className="text-gray-500 text-sm">
                    (phí ship {formatCurrency(o.shippingFee)})
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => openConfirm(o, "done")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  ✅ Đã giao
                </button>
                <button
                  onClick={() => openConfirm(o, "cancel")}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  ❌ Không giao được
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Modal xác nhận */}
      <ConfirmModal
        open={confirmOpen}
        title={
          actionType === "done" ? "Xác nhận giao hàng" : "Yêu cầu hủy đơn hàng"
        }
        message={
          actionType === "done"
            ? "Bạn có chắc chắn đã giao đơn hàng này cho khách chưa?"
            : "Bạn có chắc muốn yêu cầu hủy đơn hàng này không?"
        }
        confirmText={actionType === "done" ? "Đã giao" : "Xác nhận hủy"}
        cancelText="Hủy"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default ShipperOrdersPage;
