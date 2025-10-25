import { useState } from "react";
import { MdAccessTime } from "react-icons/md"; // Chờ xác nhận
import { FaTruck } from "react-icons/fa"; // Vận chuyển
import { MdLocalShipping } from "react-icons/md"; // Chờ giao hàng
import { MdCheckCircle } from "react-icons/md"; // Hoàn thành
import { MdCancel } from "react-icons/md"; // Đã hủy
import { MdReplay } from "react-icons/md"; // Trả hàng/Hoàn tiền
import { MdArrowForwardIos } from "react-icons/md";
import OrderDetailModal from "./OrderDetailItem";
import OrderActions from "./OrderActions";

const STATUS_NOTES = {
  // Chờ xác nhận (gom new + confirmed)
  new: "🆕 Đơn hàng vừa được tạo, chờ shop xác nhận",
  confirmed: "✅ Đơn hàng đã được xác nhận, chuẩn bị xử lý",
  // Đang xử lý
  processing: "🛒 Shop đang chuẩn bị đơn hàng cho bạn",
  // Vận chuyển
  shipping: "🚚 Đơn hàng đang trên đường giao đến bạn",
  // ✅ Bổ sung done_shipping
  done_shipping:
    "📦 Đơn hàng đã được giao thành công. Vui lòng xác nhận nếu bạn đã nhận hàng.",
  // Hoàn thành
  completed:
    "🎉 Bạn đã xác nhận đã nhận hàng. Cảm ơn bạn đã mua sắm cùng chúng tôi!",
  // Hủy
  cancelled: "❌ Đơn hàng đã bị hủy",
  cancel_requested: "⚠️ Yêu cầu hủy đơn đã được gửi, chờ shop phản hồi",
  // Hoàn tiền
  refund: "🔄 Đơn hàng trong quá trình trả hàng/hoàn tiền",
};

const OrderItem = ({ order }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const renderStatusBadge = (status) => {
    const base =
      "inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full font-medium";

    switch (status) {
      case "new":
      case "confirmed":
        return (
          <span className={`${base} bg-yellow-100 text-yellow-700`}>
            <MdAccessTime size={16} /> Chờ xác nhận
          </span>
        );
      case "processing":
        return (
          <span className={`${base} bg-blue-100 text-blue-700`}>
            <FaTruck size={16} /> Đang chuẩn bị
          </span>
        );
      case "shipping":
        return (
          <span className={`${base} bg-sky-100 text-sky-700`}>
            <FaTruck size={16} /> Đang giao hàng
          </span>
        );
      case "done_shipping":
        return (
          <span className={`${base} bg-indigo-100 text-indigo-700`}>
            <MdLocalShipping size={16} /> Đã giao - chờ xác nhận
          </span>
        );
      case "completed":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            <MdCheckCircle size={16} /> Hoàn thành
          </span>
        );
      case "cancelled":
        return (
          <span className={`${base} bg-red-100 text-red-700`}>
            <MdCancel size={16} /> Đã hủy
          </span>
        );
      case "cancel_requested":
        return (
          <span className={`${base} bg-orange-100 text-orange-700`}>
            <MdCancel size={16} /> Yêu cầu hủy
          </span>
        );
      case "refund":
        return (
          <span className={`${base} bg-purple-100 text-purple-700`}>
            <MdReplay size={16} /> Hoàn tiền
          </span>
        );
      default:
        return (
          <span className={`${base} bg-gray-100 text-gray-600`}>{status}</span>
        );
    }
  };

  return (
    <div className="border rounded-lg mb-3 shadow-sm bg-white">
      {/* Header: Shop + trạng thái */}
      <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
            Yêu thích
          </span>
          <h2 className="font-semibold">
            Đơn hàng #{order.items?.[0]?.product?.name || order._id.slice(-6)}
          </h2>
        </div>
        <div>{renderStatusBadge(order.status)}</div>
      </div>

      {/* Sản phẩm đầu tiên (preview) */}
      <div className="flex justify-between items-start px-4 py-3">
        <div className="flex items-center gap-4">
          <img
            src={order.items?.[0]?.product?.images?.[0]}
            alt={order.items?.[0]?.product?.name}
            className="w-16 h-16 object-cover rounded-lg border shadow-sm hover:scale-105 transition"
          />
          <div>
            <p className="text-gray-600 font-medium">
              {order.items?.[0]?.product?.name}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Số lượng sản phẩm: x{order.items?.length}
            </p>
          </div>
        </div>

        <div className="text-right flex flex-col gap-2">
          <div className="text-lg font-bold text-blue-600">
            {order.totalAmount?.toLocaleString()}₫
          </div>
          <button
            onClick={() => setSelectedOrder(order)}
            className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition flex items-center gap-1"
          >
            Xem chi tiết
            <MdArrowForwardIos size={14} />
          </button>
        </div>
      </div>

      <OrderDetailModal
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />

      {/* Footer: tổng tiền + hành động + Phí vận chuyển */}
      <div className="px-4 py-3 bg-gray-50 flex justify-between items-start border-t">
        <div className="text-sm text-gray-600 space-y-1">
          <p className="flex items-center gap-2">
            <span className="font-medium">Phí vận chuyển:</span>
            <span className="text-green-600">
              +{order.shippingFee?.toLocaleString()}₫
            </span>
          </p>
          <p className="text-xs text-gray-400">
            Ngày đặt: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
          </p>
          <p className="text-xs text-gray-500 italic mt-2">
            {STATUS_NOTES[order.status]}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="text-lg">
            Thành tiền:{" "}
            <span className="text-red-600 font-bold">
              {order.finalAmount?.toLocaleString()}₫
            </span>
          </p>
          <OrderActions order={order} />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
