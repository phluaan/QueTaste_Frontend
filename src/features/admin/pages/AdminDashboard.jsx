import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AdminLayout from "../layouts/AdminLayout";
import useStatistics from "../hooks/useStatistics";

export default function AdminDashboard() {
  const { revenue, cashFlow, loadingRevenue, loadingCashFlow } = useStatistics({
    filterType: "month",
    range: "2025-09", // test trước, sau này làm UI chọn filter
  });

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4">Trang chủ Admin</h1>

      {/* Cashflow cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-500">Tiền vào ví</h2>
          <p className="text-2xl font-bold text-green-600">
            {cashFlow?.cashFlow.moneyInWallet?.toLocaleString()} VND
          </p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-500">Tiền đang chờ</h2>
          <p className="text-2xl font-bold text-yellow-600">
            {cashFlow?.cashFlow.moneyPending?.toLocaleString()} VND
          </p>
        </div>
      </div>

      {/* Revenue line chart */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Doanh thu theo thời gian</h2>
        {loadingRevenue ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenue?.data || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </AdminLayout>
  );
}