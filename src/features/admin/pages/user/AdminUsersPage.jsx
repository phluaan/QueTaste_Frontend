import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";
import {
  useUserRegistrationsByDay,
  useTopSpenders,
  useBuyerRatio,
} from "../../hooks/useStatistics";

const COLORS = { primary: "#4F46E5", buyers: "#22C55E", nonBuyers: "#EF4444" };

export default function AdminUsersPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [ratioYear, setRatioYear] = useState(now.getFullYear());

  const monthNames = [
    "Thg 1",
    "Thg 2",
    "Thg 3",
    "Thg 4",
    "Thg 5",
    "Thg 6",
    "Thg 7",
    "Thg 8",
    "Thg 9",
    "Thg 10",
    "Thg 11",
    "Thg 12",
  ];
  const fmt = (n) => new Intl.NumberFormat("vi-VN").format(n);

  // API: users registrations by day
  const { usersByDay, loading: loadingA } = useUserRegistrationsByDay({
    year,
    month,
  });

  // API: top spenders
  const { topSpendersUsers, loading: loadingB } = useTopSpenders(3);

  // API: buyer ratio
  const { buyerRatio, loading: loadingC } = useBuyerRatio(ratioYear);
  const buyerLines = useMemo(() => buyerRatio, [buyerRatio]);

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
          <p className="text-sm text-gray-500">
            Thống kê & danh sách người dùng trên hệ thống
          </p>
        </div>
        <Link
          to="/admin/users-list"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 active:bg-indigo-700 transition"
        >
          Đi đến danh sách
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Area chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Người dùng mới theo tháng</h2>
              <p className="text-xs text-gray-500">{`Tăng trưởng ${
                monthNames[month - 1]
              } năm ${year}`}</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value))}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>{`Tháng ${m}`}</option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white"
              >
                {[
                  now.getFullYear() - 2,
                  now.getFullYear() - 1,
                  now.getFullYear(),
                ].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={usersByDay}
                margin={{ left: 8, right: 8, bottom: 12, top: 8 }}
              >
                <defs>
                  <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={COLORS.primary}
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="95%"
                      stopColor={COLORS.primary}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickMargin={8} />
                <YAxis tickMargin={8} />
                <Tooltip
                  labelFormatter={(d) => `Ngày ${d}`}
                  formatter={(v) => [fmt(v), "Người dùng mới"]}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  name="Người dùng mới"
                  stroke={COLORS.primary}
                  fill="url(#gradUsers)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
            {loadingA && (
              <div className="text-xs text-gray-500 mt-2">Đang tải…</div>
            )}
          </div>
        </div>

        {/* Top spenders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Top 3 người dùng chi nhiều nhất</h3>
          </div>
          <ul className="space-y-3">
            {(topSpendersUsers || []).map((u, idx) => (
              <li
                key={u.id}
                className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
              >
                <img
                  src={u.avatar || `https://i.pravatar.cc/80?img=${10 + idx}`}
                  alt={u.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{u.name || "—"}</p>
                    <span className="text-xs text-gray-500">
                      Từ{" "}
                      {u.memberSince
                        ? new Date(u.memberSince).toLocaleDateString("vi-VN")
                        : "—"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{u.email}</p>
                  <div className="mt-1 text-sm">
                    Tổng chi: <b>{fmt(u.totalSpend || 0)} ₫</b> • Đơn:{" "}
                    <b>{fmt(u.orders || 0)}</b>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {loadingB && (
            <div className="text-xs text-gray-500 mt-2">Đang tải…</div>
          )}
        </div>
      </div>

      {/* Buyer ratio */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">Tỉ lệ khách mua hàng</h3>
            <p className="text-xs text-gray-500">{`Theo năm ${ratioYear} (12 tháng)`}</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={ratioYear}
              onChange={(e) => setRatioYear(parseInt(e.target.value))}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white"
            >
              {[
                now.getFullYear() - 2,
                now.getFullYear() - 1,
                now.getFullYear(),
              ].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={buyerLines}
              margin={{ left: 16, right: 16, top: 8, bottom: 12 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickMargin={8}
                tickFormatter={(m) => monthNames[m - 1]}
              />
              <YAxis tickMargin={8} />
              <Tooltip
                labelFormatter={(m) => monthNames[m - 1]}
                formatter={(val, key) => [
                  fmt(val),
                  key === "buyers" ? "Có mua hàng" : "Chỉ đăng ký",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="buyers"
                name="Có mua hàng"
                stroke={COLORS.buyers}
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="nonBuyers"
                name="Chỉ đăng ký"
                stroke={COLORS.nonBuyers}
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          {loadingC && (
            <div className="text-xs text-gray-500 mt-2">Đang tải…</div>
          )}
        </div>
      </div>
    </>
  );
}
