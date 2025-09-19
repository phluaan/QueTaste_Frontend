import { useState } from "react";
import OrderStats from "../components/OrderStats";
import OrderToolbar from "../components/OrderToolbar";
import OrderTable from "../components/OrderTable";
import OrderDetailModal from "../components/OrderDetailModal";
import AdminLayout from "../../layouts/AdminLayout"

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
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const toggleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((o) => o.id));
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    shipping: orders.filter((o) => o.status === "shipping").length,
    completed: orders.filter((o) => o.status === "completed").length,
    canceled: orders.filter((o) => o.status === "canceled").length,
  };

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

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4">Quản lý đơn hàng</h1>

      <OrderStats stats={stats} />

      <OrderToolbar
        selectedOrders={selectedOrders}
        onSearch={(q) => console.log("search:", q)}
        onFilterChange={(s) => console.log("filter:", s)}
      />

      <OrderTable
        orders={orders}
        selectedOrders={selectedOrders}
        onToggleSelect={toggleSelectOrder}
        onToggleSelectAll={toggleSelectAll}
        onViewDetail={setSelectedOrder}
        statusColors={statusColors}
      />

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        statusColors={statusColors}
      />
    </AdminLayout>
  );
}
