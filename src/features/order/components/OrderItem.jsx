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
  // Hai cái dưới này gom thành pending
  new: "🆕 Đơn hàng vừa được tạo, chờ shop xác nhận",
  confirmed: "✅ Đơn hàng đã được xác nhận, chuẩn bị xử lý",
  // Cái dưới là Chờ giao hàng
  processing: "🛒 Shop đang chuẩn bị đơn hàng cho bạn",
  // Hai cái dưới là của Vận chuyển
  shipping: "🚚 Đơn hàng đang trên đường đến kho trung chuyển",
  delivering: "📦 Shipper đang giao hàng, vui lòng giữ điện thoại",
  //Hoàn thành
  completed: "🎉 Bạn đã nhận hàng thành công. Đừng quên đánh giá sản phẩm nhé!",
  //Hủy
  cancelled: "❌ Đơn hàng đã bị hủy",
  cancel_requested: "⚠️ Yêu cầu hủy đơn đã được gửi, chờ shop phản hồi",
  //Hoàn tiền
  refund: "🔄 Đơn hàng trong quá trình trả hàng/hoàn tiền",
};

const OrderItem = ({ order }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="border rounded-lg mb-3 shadow-sm bg-white">
      {/* Header: Shop + trạng thái */}
      <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
            Yêu thích
          </span>
          <h2 className="font-semibold">
            Đơn hàng #{order.items[0].product.name}
          </h2>
        </div>
        <div className="flex flex-col items-end">
          <span
            className={`inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full ${
              order.status === "new"
                ? "bg-yellow-100 text-yellow-600"
                : order.status === "confirmed"
                ? "bg-yellow-100 text-yellow-600"
                : order.status === "processing"
                ? "bg-blue-100 text-blue-600"
                : order.status === "shipping"
                ? "bg-blue-100 text-blue-600"
                : order.status === "delivering"
                ? "bg-indigo-100 text-indigo-600"
                : order.status === "completed"
                ? "bg-green-100 text-green-600"
                : order.status === "cancelled"
                ? "bg-red-100 text-red-600"
                : order.status === "cancel_requested"
                ? "bg-orange-100 text-orange-600"
                : order.status === "refund"
                ? "bg-purple-100 text-purple-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {order.status === "new" && <MdAccessTime size={16} />}
            {order.status === "confirmed" && <MdAccessTime size={16} />}
            {order.status === "processing" && <FaTruck size={16} />}
            {order.status === "shipping" && <FaTruck size={16} />}
            {order.status === "delivering" && <MdLocalShipping size={16} />}
            {order.status === "completed" && <MdCheckCircle size={16} />}
            {order.status === "cancelled" && <MdCancel size={16} />}
            {order.status === "refund" && <MdReplay size={16} />}
            {order.status === "cancel_requested" && <MdCancel size={16} />}
            {order.statusLabel || order.status}
          </span>
        </div>
      </div>

      {/* Sản phẩm đầu tiên (preview) */}
      <div className="flex justify-between items-start px-4 py-3">
        <div className="flex items-center gap-4">
          <img
            src={order.items[0].product.images[0]}
            alt={order.items[0].product.name}
            className="w-16 h-16 object-cover rounded-lg border shadow-sm hover:scale-105 transition"
          />
          <div>
            <p className="text-gray-600 font-medium">
              {order.items[0].product.name}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Số lượng sản phẩm: x{order.items.length}
            </p>
          </div>
        </div>

        {/* Bên phải */}
        <div className="text-right flex flex-col gap-2">
          <div className="text-lg font-bold text-blue-600">
            {order.totalAmount.toLocaleString()}₫
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
        {/* Bên trái: Phí vận chuyển */}
        <div className="text-sm text-gray-600 space-y-1">
          <p className="flex items-center gap-2">
            <span className="font-medium">Phí vận chuyển:</span>
            <span className="text-green-600">
              +{order.shippingFee.toLocaleString()}₫
            </span>
          </p>

          <p className="text-xs text-gray-400">
            Ngày đặt: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
          </p>
          {/* Ghi chú trạng thái */}
          <p className="text-xs text-gray-500 italic mt-2">
            {STATUS_NOTES[order.status]}
          </p>
        </div>

        {/* Bên phải: Tổng tiền + nút hành động */}
        <div className="flex flex-col items-end gap-2">
          <p className="text-lg">
            Thành tiền:{" "}
            <span className="text-red-600 font-bold">
              {order.finalAmount.toLocaleString()}₫
            </span>
          </p>
          <OrderActions order={order} />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
