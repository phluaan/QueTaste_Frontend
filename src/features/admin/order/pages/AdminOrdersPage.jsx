import { useEffect, useState } from "react";
import OrderStats from "../components/OrderStats";
import OrderToolbar from "../components/OrderToolbar";
import OrderTable from "../components/OrderTable";
import OrderDetailModal from "../components/OrderDetailModal";
import AdminLayout from "../../layouts/AdminLayout";
import useAdminOrders from "../hooks/useAdminOrder";
import TabBar from "../../../order/components/TabBar";

export default function AdminOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [filters, setFilters] = useState({ status: "all", search: "", page: 1, limit: 10 });

  // 👇 gọi API thông qua hook
  const { orders, pagination, loading, error } = useAdminOrders(filters);

  const toggleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    console.log("Orders in component:", orders);
    console.log("Pagination:", pagination);
  }, [orders, pagination]);

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

      {/* Loading / Error state */}
      {loading && <p>Đang tải đơn hàng...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <OrderStats stats={stats} />

          <TabBar
            activeTab={filters.status}
            onTabChange={(status) => setFilters((f) => ({ ...f, status, page: 1 }))}
          />

          <OrderToolbar
            selectedOrders={selectedOrders}
            onSearch={(q) => setFilters((f) => ({ ...f, search: q, page: 1 }))}
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
        </>
      )}
    </AdminLayout>
  );
}
