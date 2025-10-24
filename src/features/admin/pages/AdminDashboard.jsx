import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Eye,
  DollarSign,
  Package,
  Users as UsersIcon,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import useStatistics from "../../admin/hooks/useStatistics";

const COLORS = [
  "#4F46E5",
  "#22C55E",
  "#06B6D4",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

export default function AdminDashboard() {
  const [mode, setMode] = useState("month"); // "month" | "quarter"
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [quarter, setQuarter] = useState(1);
  const [metric, setMetric] = useState("revenue"); // "revenue" | "orders"

  const now = new Date();
  const currentYear = now.getFullYear();
  const range =
    mode === "month"
      ? { year: currentYear, month }
      : { year: currentYear, quarter };

  // load statistics from store
  const {
    summary,
    compare,
    weeklyProfit,
    orderStatus,
    topProducts,
    newCustomers,
    loading,
    error,
  } = useStatistics({ filterType: mode, range, metric });

  const fmtNumber = (n) => new Intl.NumberFormat("vi-VN").format(n ?? 0);
  const currencyVN = (n) =>
    new Intl.NumberFormat("vi-VN").format(n ?? 0) + " ₫";
  const unit = metric === "revenue" ? "₫" : "đơn";

  // Stat cards: lấy từ summary (views vẫn fake)
  const statCards = [
    { icon: Eye, title: "Lượt xem", value: "3.456K", delta: "+0.43%" }, // vẫn fake như yêu cầu
    {
      icon: DollarSign,
      title: "Lợi nhuận",
      value: currencyVN(summary.profit),
      delta: "",
    },
    {
      icon: Package,
      title: "Sản phẩm",
      value: fmtNumber(summary.products),
      delta: "",
    },
    {
      icon: UsersIcon,
      title: "Người dùng",
      value: fmtNumber(summary.users),
      delta: "",
    },
  ];

  // Map trạng thái EN -> VI cho Pie
  const statusVnMap = {
    new: "Mới",
    confirmed: "Đã xác nhận",
    shipping: "Đang vận chuyển",
    completed: "Hoàn tất",
    cancelled: "Đã hủy",
  };
  const ordersStatusData = (orderStatus || []).map((s) => ({
    name: statusVnMap[s.name] || s.name,
    value: s.value,
  }));

  // Top products
  const topProductsData = (topProducts || []).map((p) => ({
    name: p.name,
    sold: p.sold,
  }));

  // New customers last 3 months
  const newCustomersData = newCustomers || [];

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Trang chủ</h1>
          <p className="text-sm text-gray-500">Tổng quan hoạt động hệ thống</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {statCards.map(({ icon: Icon, title, value, delta }) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Icon className="w-5 h-5" />
              </div>
              {!!delta && (
                <span className="inline-flex items-center text-xs font-medium text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" /> {delta}
                </span>
              )}
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-sm text-gray-500">{title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Row main charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Big chart (Compare) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Doanh thu & Doanh số (so sánh)</h2>
              <p className="text-xs text-gray-500">{compare.subtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white"
              >
                <option value="month">Theo tháng</option>
                <option value="quarter">Theo quý</option>
              </select>

              {mode === "month" ? (
                <select
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value))}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>{`Tháng ${m}`}</option>
                  ))}
                </select>
              ) : (
                <select
                  value={quarter}
                  onChange={(e) => setQuarter(parseInt(e.target.value))}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white"
                >
                  {[1, 2, 3, 4].map((q) => (
                    <option key={q} value={q}>{`Quý ${q}`}</option>
                  ))}
                </select>
              )}

              <select
                value={metric}
                onChange={(e) => setMetric(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white"
              >
                <option value="revenue">Doanh thu</option>
                <option value="orders">Đơn hàng</option>
              </select>
            </div>
          </div>

          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={compare.data}
                margin={{ left: 20, right: 20, bottom: 24, top: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey={compare.xKey}
                  tickMargin={8}
                  padding={{ left: 0, right: 8 }}
                />
                <YAxis
                  width={48}
                  tickMargin={8}
                  tickFormatter={(v) => fmtNumber(v)}
                />
                <Tooltip
                  labelFormatter={(label) =>
                    mode === "month" ? `Ngày ${label}` : `Tuần ${label}`
                  }
                  formatter={(val, name) => [`${fmtNumber(val)} ${unit}`, name]}
                />
                <Legend />
                {(compare.series || []).map((s) => (
                  <Line
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={s.name}
                    stroke={s.color}
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly profit: hiển thị tổng tuần (2 cột: Doanh thu / Lợi nhuận) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Lợi nhuận tuần này</h2>
            <span className="text-xs text-gray-500">
              {weeklyProfit.weekStart
                ? new Date(weeklyProfit.weekStart).toLocaleDateString()
                : ""}{" "}
              -{" "}
              {weeklyProfit.weekEnd
                ? new Date(weeklyProfit.weekEnd).toLocaleDateString()
                : ""}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Doanh thu: <b>{currencyVN(weeklyProfit.revenue)}</b> • Lợi nhuận
            (20%): <b>{currencyVN(weeklyProfit.profit)}</b>
          </p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { label: "Doanh thu", value: weeklyProfit.revenue },
                  { label: "Lợi nhuận", value: weeklyProfit.profit },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" tickMargin={6} />
                <YAxis tickMargin={6} tickFormatter={(v) => fmtNumber(v)} />
                <Tooltip formatter={(val) => currencyVN(val)} />
                <Legend />
                <Bar
                  dataKey="value"
                  name="Giá trị"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                  fill="#06B6D4"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row secondary charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order status */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold mb-4">Trạng thái đơn hàng</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ordersStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {COLORS.map((c, i) => (
                    <Cell key={i} fill={c} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold mb-4">Sản phẩm bán chạy</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topProductsData}
                layout="vertical"
                margin={{ left: 20, right: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={170} />
                <Tooltip />
                <Bar
                  dataKey="sold"
                  name="Đã bán"
                  barSize={14}
                  radius={[0, 10, 10, 0]}
                >
                  {["#4F46E5", "#06B6D4", "#22C55E", "#F59E0B", "#8B5CF6"].map(
                    (c, i) => (
                      <Cell key={i} fill={c} />
                    )
                  )}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New customers */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold mb-4">
            Khách hàng mới (3 tháng gần nhất)
          </h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={newCustomersData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" tickMargin={6} />
                <YAxis tickMargin={6} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  name="Người dùng"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
