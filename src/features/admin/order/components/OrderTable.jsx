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
        <thead className="bg-gray-100">
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
            <th className="border px-2 py-2">Trạng thái</th>
            <th className="border px-2 py-2">Thanh toán</th>
            <th className="border px-2 py-2">Khách trả</th>
            <th className="border px-2 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="border px-2 py-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => onToggleSelect(order.id)}
                />
              </td>
              <td className="border px-2 py-2">{order.id}</td>
              <td className="border px-2 py-2">{order.user}</td>
              <td className="border px-2 py-2">{order.createdAt}</td>
              <td className="border px-2 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    statusColors[order.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="border px-2 py-2">
                {order.paymentMethod} / {order.paymentStatus}
              </td>
              <td className="border px-2 py-2 font-bold text-green-600">
                {order.finalAmount.toLocaleString()}đ
              </td>
              <td className="border px-2 py-2 text-center">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded"
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
