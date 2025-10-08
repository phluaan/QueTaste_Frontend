export default function OrderTable({
  orders,
  selectedOrders,
  onToggleSelect,
  onToggleSelectAll,
  onViewDetail,
  statusColors,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-lg shadow text-sm">
        <thead className="bg-que-background">
          <tr>
            <th className="border px-2 py-2 w-10">
              <input
                type="checkbox"
                checked={
                  selectedOrders.length === orders.length && orders.length > 0
                }
                onChange={onToggleSelectAll}
              />
            </th>
            <th className="border px-2 py-2">Mã đơn</th>
            <th className="border px-2 py-2">Khách hàng</th>
            <th className="border px-2 py-2">Ngày đặt</th>
            <th className="border px-2 py-2">Nơi nhận</th>
            <th className="border px-2 py-2">Trạng thái</th>
            <th className="border px-2 py-2">Thanh toán</th>
            <th className="border px-2 py-2">Khách trả</th>
            <th className="border px-2 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-que-surface transition-colors"
            >
              <td className="border px-2 py-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => onToggleSelect(order.id)}
                />
              </td>
              <td className="border px-2 py-2">{order.code}</td>
              <td className="border px-2 py-2">
                {order.user.personalInfo.fullName}
              </td>
              <td className="border px-2 py-2">{order.createdAt}</td>
              <td className="border px-2 py-2">
                {order.shippingAddress.address} {order.shippingAddress.city}
              </td>
              <td className="border px-2 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    statusColors[order.status] ||
                    "bg-que-background text-que-text-muted"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="border px-2 py-2">
                {order.paymentMethod} / {order.paymentStatus}
              </td>
              <td className="border px-2 py-2 font-bold text-que-secondary">
                {order.finalAmount.toLocaleString()}đ
              </td>
              <td className="border px-2 py-2 text-center">
                <button
                  className="px-3 py-1 bg-que-primary hover:bg-que-accent text-white rounded transition-colors"
                  onClick={() => onViewDetail(order)}
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
