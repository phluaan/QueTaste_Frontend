export default function OrderDetailModal({
  order,
  onClose,
  statusColors,
  onConfirm,
}) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-que-surface w-full max-w-3xl rounded-2xl shadow-xl p-6 relative animate-fadeIn">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-que-text-muted hover:text-que-text-main"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-que-primary">
          Đơn hàng #{order.code || order.id}
        </h2>

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
              <b>Thanh toán:</b> {order.paymentMethod} / {order.paymentStatus}
            </p>
          </div>

          {/* Thông tin khách */}
          <div className="space-y-2">
            <h3 className="font-semibold text-que-text-main mb-2">
              Khách hàng
            </h3>
            <p>
              <b>Người đặt:</b> {order.user.personalInfo.fullName}
            </p>
            <p>
              <b>Người nhận:</b> {order.shippingAddress.fullName}
            </p>
            <p>
              <b>SĐT:</b> {order.shippingAddress.phone}
            </p>
            <p>
              <b>Địa chỉ:</b> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city}
            </p>
          </div>
        </div>

        {/* Tài chính */}
        <div className="mt-6 border-t pt-4 grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-1">
            <p>
              <b>Phí ship:</b> {order.shippingFee.toLocaleString()}đ
            </p>
            <p>
              <b>Tổng tiền:</b> {order.totalAmount.toLocaleString()}đ
            </p>
            <p>
              <b>Giảm giá:</b> {order.discount.toLocaleString()}đ
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-xl font-bold text-que-secondary">
              Khách trả: {order.finalAmount.toLocaleString()}đ
            </p>
          </div>
        </div>

        {/* Ghi chú */}
        <div className="mt-4 text-sm">
          <b>Ghi chú:</b> {order.notes || "-"}
        </div>

        {/* Buttons */}
        {/* <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => onConfirm(order._id || order.id)}
            className="px-4 py-2 bg-que-secondary hover:bg-que-primary text-white rounded-lg shadow"
          >
            Cập nhật
          </button>
          <button className="px-4 py-2 bg-que-danger hover:bg-red-700 text-white rounded-lg shadow">
            Hủy đơn
          </button>
        </div> */}
      </div>
    </div>
  );
}
