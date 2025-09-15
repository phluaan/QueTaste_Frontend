import AdminLayout from "../layouts/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4">Trang chủ Admin</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-500">Đơn hôm nay</h2>
          <p className="text-2xl font-bold text-blue-600">123</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-500">Doanh thu hôm nay</h2>
          <p className="text-2xl font-bold text-green-600">12.3M</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-500">Khách hàng mới</h2>
          <p className="text-2xl font-bold text-purple-600">45</p>
        </div>
      </div>
    </AdminLayout>
  );
}
