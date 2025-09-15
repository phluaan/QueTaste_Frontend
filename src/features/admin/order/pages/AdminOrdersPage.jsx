import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";


export default function AdminOrdersPage() {
  const [orders] = useState([
    {
      id: "DH001",
      user: "Nguyễn Văn A",
      createdAt: "2025-09-13",
      status: "new",
      paymentMethod: "cash",
      paymentStatus: "pending",
      shippingAddress: {
        fullName: "Nguyễn Văn A",
        phone: "0901234567",
        address: "123 Đường A",
        city: "Hà Nội",
        postalCode: "100000",
      },
      shippingFee: 20000,
      totalAmount: 1100000,
      discount: 40000,
      finalAmount: 1080000,
      notes: "Giao trong giờ hành chính",
    },
    {
      id: "DH002",
      user: "Trần Thị B",
      createdAt: "2025-09-12",
      status: "completed",
      paymentMethod: "momo",
      paymentStatus: "paid",
      shippingAddress: {
        fullName: "Trần Thị B",
        phone: "0907654321",
        address: "456 Đường B",
        city: "HCM",
        postalCode: "700000",
      },
      shippingFee: 30000,
      totalAmount: 1500000,
      discount: 0,
      finalAmount: 1530000,
      notes: "",
    },
    {
      id: "DH003",
      user: "Lê Văn C",
      createdAt: "2025-09-11",
      status: "shipping",
      paymentMethod: "credit-card",
      paymentStatus: "paid",
      shippingAddress: {
        fullName: "Lê Văn C",
        phone: "0912345678",
        address: "789 Đường C",
        city: "Đà Nẵng",
        postalCode: "550000",
      },
      shippingFee: 15000,
      totalAmount: 900000,
      discount: 50000,
      finalAmount: 865000,
      notes: "Khách cần gọi trước khi giao",
    },
  ]);

  // Badge style map
  const statusColors = {
    new: "bg-blue-100 text-blue-600",
    confirmed: "bg-teal-100 text-teal-600",
    processing: "bg-amber-100 text-amber-600",
    shipping: "bg-sky-100 text-sky-600",
    delivering: "bg-purple-100 text-purple-600",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
    refund: "bg-gray-200 text-gray-700",
  };

  // Tính thống kê
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    shipping: orders.filter(o => o.status === "shipping").length,
    completed: orders.filter(o => o.status === "completed").length,
    canceled: orders.filter(o => o.status === "canceled").length,
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4">Quản lý đơn hàng</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-gray-500">Tổng đơn</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-gray-500">Chờ xử lý</h2>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-gray-500">Đang giao</h2>
          <p className="text-2xl font-bold text-blue-500">{stats.shipping}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-gray-500">Hoàn thành</h2>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-gray-500">Đã hủy</h2>
          <p className="text-2xl font-bold text-red-600">{stats.canceled}</p>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng..."
          className="border px-3 py-2 rounded-lg w-1/3"
        />
        <select className="border px-3 py-2 rounded-lg">
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xử lý</option>
          <option value="shipping">Đang giao</option>
          <option value="completed">Hoàn thành</option>
          <option value="canceled">Đã hủy</option>
        </select>
      </div>

      {/* Bảng đơn hàng */}
 <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg shadow text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-2">Mã đơn</th>
              <th className="border px-2 py-2">Khách hàng</th>
              <th className="border px-2 py-2">Ngày đặt</th>
              <th className="border px-2 py-2">Trạng thái</th>
              <th className="border px-2 py-2">Thanh toán</th>
              <th className="border px-2 py-2">Địa chỉ giao</th>
              <th className="border px-2 py-2">Phí ship</th>
              <th className="border px-2 py-2">Tổng tiền</th>
              <th className="border px-2 py-2">Giảm giá</th>
              <th className="border px-2 py-2">Khách trả</th>
              <th className="border px-2 py-2">Ghi chú</th>
              <th className="border px-2 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
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
                <td className="border px-2 py-2">
                  {order.shippingAddress.fullName}, {order.shippingAddress.phone}
                  <br />
                  {order.shippingAddress.address}, {order.shippingAddress.city}
                </td>
                <td className="border px-2 py-2">{order.shippingFee.toLocaleString()}đ</td>
                <td className="border px-2 py-2">{order.totalAmount.toLocaleString()}đ</td>
                <td className="border px-2 py-2 text-red-500">{order.discount.toLocaleString()}đ</td>
                <td className="border px-2 py-2 font-bold text-green-600">
                  {order.finalAmount.toLocaleString()}đ
                </td>
                <td className="border px-2 py-2">{order.notes || "-"}</td>
                <td className="border px-2 py-2 text-center space-x-1">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded">Xem</button>
                  <button className="px-2 py-1 bg-green-500 text-white rounded">Cập nhật</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded">Hủy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
