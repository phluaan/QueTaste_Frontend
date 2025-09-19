export default function OrderDetailModal({ order, onClose, statusColors }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Chi tiết đơn hàng {order.id}
        </h2>

        <div className="space-y-2 text-sm">
          <p>
            <b>Khách hàng:</b> {order.user}
          </p>
          <p>
            <b>Ngày đặt:</b> {order.createdAt}
          </p>
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
          <p>
            <b>Địa chỉ giao:</b> {order.shippingAddress.fullName},{" "}
            {order.shippingAddress.phone},{" "}
            {order.shippingAddress.address},{" "}
            {order.shippingAddress.city}
          </p>
          <p>
            <b>Phí ship:</b> {order.shippingFee.toLocaleString()}đ
          </p>
          <p>
            <b>Tổng tiền:</b> {order.totalAmount.toLocaleString()}đ
          </p>
          <p>
            <b>Giảm giá:</b> {order.discount.toLocaleString()}đ
          </p>
          <p className="font-bold text-green-600">
            <b>Khách trả:</b> {order.finalAmount.toLocaleString()}đ
          </p>
          <p>
            <b>Ghi chú:</b> {order.notes || "-"}
          </p>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button className="px-3 py-2 bg-green-500 text-white rounded">
            Cập nhật
          </button>
          <button className="px-3 py-2 bg-red-500 text-white rounded">
            Hủy đơn
          </button>
        </div>
      </div>
    </div>
  );
}
