import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import OrderStats from "../components/OrderStats";
import OrderToolbar from "../components/OrderToolbar";
import OrderTable from "../components/OrderTable";
import OrderDetailModal from "../components/OrderDetailModal";
import TabBar from "../../../order/components/TabBar";
import Pagination from "../../../../components/Pagination";
import useAdminOrders from "../hooks/useAdminOrder";
import ConfirmModal from "../../../../components/ConfirmModal";

export default function AdminOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    page: 1,
    limit: 20,
  });

  // Gọi API
  const {
    orders = [],
    pagination,
    loading,
    error,
    confirmOrder,
    confirmOrders,
  } = useAdminOrders(filters);

  // Toggle chọn đơn
  const toggleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  // Toggle chọn tất cả
  const toggleSelectAll = () => {
    //console.log("SelectAll: ", selectedOrders);
    //console.log("Order when SelectAll: ", orders);
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((o) => o.id));
    }
  };

  const stats = {
    total: orders.length,
    new: orders.filter((o) => o.status === "new").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    shipping: orders.filter((o) => o.status === "shipping").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    cancel_requested: orders.filter((o) => o.status === "cancel_requested")
      .length,
    refund: orders.filter((o) => o.status === "refund").length,
  };

  const statusColors = {
    new: "bg-blue-100 text-blue-600",
    confirmed: "bg-teal-100 text-teal-600",
    shipping: "bg-sky-100 text-sky-600",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
    cancel_requested: "bg-amber-100 text-amber-700",
    refund: "bg-gray-200 text-gray-700",
  };

  useEffect(() => {
  }, [orders, pagination]);

  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Quản lý đơn hàng</h1>

        {/* Thống kê */}
        <OrderStats stats={stats} />

        {/* Bộ lọc trạng thái */}
        <TabBar
          activeTab={filters.status}
          onTabChange={(status) =>
            setFilters((f) => ({ ...f, status, page: 1 }))
          }
        />

        {/* Thanh công cụ tìm kiếm */}
        <OrderToolbar
          selectedOrders={selectedOrders}
          onSearch={(q) => setFilters((f) => ({ ...f, search: q, page: 1 }))}
          onConfirmOrders={() => setOpenConfirm(true)}
        />

        {/* Loading / Error */}
        {loading && <p>Đang tải đơn hàng...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Bảng đơn hàng */}
        {!loading && !error && (
          <>
            <OrderTable
              orders={orders}
              selectedOrders={selectedOrders}
              onToggleSelect={toggleSelectOrder}
              onToggleSelectAll={toggleSelectAll}
              onViewDetail={setSelectedOrder}
              statusColors={statusColors}
            />

            {/* Modal chi tiết đơn */}
            {selectedOrder && (
              <OrderDetailModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
                statusColors={statusColors}
                onConfirm={(id) => {
                  confirmOrder(id);
                  setSelectedOrder(null); // đóng modal sau khi xác nhận
                }}
              />
            )}

            {/* Phân trang */}
            <Pagination
              page={pagination?.page || filters.page}
              limit={pagination?.limit || filters.limit}
              total={pagination?.total || 0}
              onPageChange={(p) => setFilters((f) => ({ ...f, page: p }))}
              onLimitChange={(l) =>
                setFilters((f) => ({ ...f, limit: l, page: 1 }))
              }
            />

            {/* Xác nhận */}
            <ConfirmModal
              open={openConfirm}
              onClose={() => setOpenConfirm(false)}
              onConfirm={async () => {
                await confirmOrders(selectedOrders);
                setOpenConfirm(false);
              }}
              title="Xác nhận các đơn đã chọn"
              message={`Bạn có chắc muốn xác nhận ${selectedOrders.length} đơn hàng?`}
              confirmText="Xác nhận"
              cancelText="Đóng"
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
}
