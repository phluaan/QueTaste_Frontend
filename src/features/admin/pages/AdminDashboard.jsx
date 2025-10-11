import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Eye, DollarSign, Package, Users as UsersIcon, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

const COLORS = ["#4F46E5", "#22C55E", "#06B6D4", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function AdminDashboard() {
  const [mode, setMode] = useState("month");   // "month" | "quarter"
  const [month, setMonth] = useState(3);       // 1..12
  const [quarter, setQuarter] = useState(1);   // 1..4
  const [metric, setMetric] = useState("revenue"); // "revenue" | "orders"

  const fmtNumber = (n) => new Intl.NumberFormat("vi-VN").format(n);
  const unit = metric === "revenue" ? "nghìn ₫" : "đơn";

  /** ---------- Stat cards (mock) ---------- */
  const statCards = [
    { icon: Eye,    title: "Lượt xem",  value: "3.456K", delta: "+0.43%" },
    { icon: DollarSign, title: "Lợi nhuận", value: "$45.2K", delta: "+4.35%" },
    { icon: Package,    title: "Sản phẩm", value: "2.450", delta: "+2.99%" },
    { icon: UsersIcon,  title: "Người dùng", value: "3.456", delta: "+0.95%" },
  ];

  const now = new Date();
  const currentYear = now.getFullYear();

  const labelThang = (m, y) => `Tháng ${m}${y ? ` năm ${y}` : ""}`;
  const labelQuy = (q, y) => `Quý ${q}${y ? ` năm ${y}` : ""}`;

  const getPrevMonthYear = (m, y) => (m === 1 ? { m: 12, y: y - 1 } : { m: m - 1, y });
  const getPrevQuarterYear = (q, y) => (q === 1 ? { q: 4, y: y - 1 } : { q: q - 1, y });

  /** ---------- PRNG & Random Walk sinh dữ liệu khác biệt ---------- */
  const makeLCG = (seed) => {
    let v = (seed >>> 0) || 123456789;
    return () => {
      v = (1664525 * v + 1013904223) >>> 0;
      return v / 2**32; // 0..1
    };
  };

  // Tạo random-walk ổn định theo seed
  const genRandomWalk = (len, { base = 60, drift = 0, vol = 6 }, rnd) => {
    let x = base + (rnd() - 0.5) * 10;
    const out = [];
    for (let i = 0; i < len; i++) {
      const step = (rnd() - 0.5) * vol + drift; // nhiễu + xu hướng
      x = x + step;
      // giới hạn biên cho đẹp mắt
      if (x < 5) x = 5 + rnd() * 3;
      if (x > 110) x = 110 - rnd() * 3;
      out.push(Math.round(x));
    }
    return out;
  };

  // Cấu hình khác nhau cho từng series để tạo hình dáng khác nhau
  const styleFor = (seriesKey) => {
    if (seriesKey === "cur")  return { drift:  0.35, vol: 7.5 };
    if (seriesKey === "prev") return { drift: -0.20, vol: 8.5 };
    return { drift:  0.05, vol: 9.5 }; // "last"
  };

  /** ---------- THÁNG: 30 ngày ---------- */
  const genMonthSeries = (year, monthNum, seriesKey) => {
    const rnd = makeLCG(year * 100 + monthNum * 7 + (seriesKey === "cur" ? 1 : seriesKey === "prev" ? 2 : 3));
    const cfg = styleFor(seriesKey);
    const base = 50 + (monthNum - 6) * 2 + (year % 7); // nền thay đổi theo tháng/năm
    const arr = genRandomWalk(30, { base, ...cfg }, rnd);
    const scale = metric === "orders" ? 0.8 : 1;
    return Array.from({ length: 30 }, (_, i) => ({ day: i + 1, value: Math.round(arr[i] * scale) }));
  };

  /** ---------- QUÝ: 13 tuần ---------- */
  const genQuarterSeries = (year, quarterNum, seriesKey) => {
    const rnd = makeLCG(year * 1000 + quarterNum * 97 + (seriesKey === "cur" ? 11 : 22));
    const cfg = styleFor(seriesKey === "last" ? "prev" : seriesKey);
    const base = 90 + quarterNum * 8 + (year % 5) * 2;
    const arr = genRandomWalk(13, { base, ...cfg }, rnd);
    const scale = metric === "orders" ? 0.8 : 1;
    return Array.from({ length: 13 }, (_, i) => ({ week: i + 1, value: Math.round(arr[i] * scale) }));
  };

  /** ---------- DỮ LIỆU BIỂU ĐỒ LỚN (Tháng/Quý) ---------- */
  const compareData = useMemo(() => {
    if (mode === "month") {
      const y0 = currentYear;
      const m0 = month;
      const { m: mPrev, y: yPrev } = getPrevMonthYear(m0, y0);
      const yLast = y0 - 1;

      const a = genMonthSeries(y0,   m0,   "cur");
      const b = genMonthSeries(yPrev, mPrev, "prev");
      const c = genMonthSeries(yLast, m0,   "last");

      return {
        xKey: "day",
        series: [
          { key: "cur",  name: labelThang(m0, y0),       color: "#4F46E5", data: a },
          { key: "prev", name: labelThang(mPrev, yPrev), color: "#06B6D4", data: b },
          { key: "last", name: labelThang(m0, yLast),    color: "#22C55E", data: c },
        ],
        data: a.map((_, i) => ({
          day: i + 1,
          cur:  a[i].value,
          prev: b[i]?.value ?? b[b.length - 1].value,
          last: c[i]?.value ?? c[c.length - 1].value,
        })),
        subtitle: `${labelThang(m0, y0)} (so với ${labelThang(mPrev, yPrev)} & ${labelThang(m0, yLast)})`,
      };
    } else {
      const y0 = currentYear;
      const q0 = quarter;
      const { q: qPrev, y: yPrev } = getPrevQuarterYear(q0, y0);

      const a = genQuarterSeries(y0,   q0,   "cur");
      const b = genQuarterSeries(yPrev, qPrev, "prev");

      return {
        xKey: "week",
        series: [
          { key: "cur",  name: labelQuy(q0, y0),       color: "#4F46E5", data: a },
          { key: "prev", name: labelQuy(qPrev, yPrev), color: "#06B6D4", data: b },
        ],
        data: a.map((_, i) => ({
          week: i + 1,
          cur:  a[i].value,
          prev: b[i]?.value ?? b[b.length - 1].value,
        })),
        subtitle: `${labelQuy(q0, y0)} (so với ${labelQuy(qPrev, yPrev)})`,
      };
    }
  }, [mode, month, quarter, metric]);

  /** ---------- Các widget khác (giữ nguyên) ---------- */
  const ordersStatus = [
    { name: "Mới", value: 120 },
    { name: "Đã xác nhận", value: 140 },
    { name: "Đang vận chuyển", value: 80 },
    { name: "Hoàn tất", value: 200 },
    { name: "Đã hủy", value: 45 },
  ];

  const topProducts = [
    { name: "Nước mắm Phú Quốc", sold: 420 },
    { name: "Cà phê Buôn Ma Thuột", sold: 380 },
    { name: "Bánh pía Sóc Trăng", sold: 250 },
    { name: "Nem chua Thanh Hóa", sold: 210 },
    { name: "Kẹo dừa Bến Tre", sold: 190 },
  ];

  const monthNames = ["Thg 1","Thg 2","Thg 3","Thg 4","Thg 5","Thg 6","Thg 7","Thg 8","Thg 9","Thg 10","Thg 11","Thg 12"];
  const newCustomers = Array.from({ length: 3 }, (_, i) => {
    const date = new Date(currentYear, now.getMonth() - (2 - i), 1);
    const base = 60 + (i * 10) + (Math.sin(i / 2) * 8);
    return { label: monthNames[date.getMonth()], users: Math.round(base) };
  });

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Trang chủ</h1>
          <p className="text-sm text-gray-500">Tổng quan hoạt động hệ thống</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {statCards.map(({ icon: Icon, title, value, delta }) => (
          <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Icon className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600">
                <TrendingUp className="w-3.5 h-3.5 mr-1" /> {delta}
              </span>
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
        {/* Big chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Doanh thu & Doanh số (so sánh)</h2>
              <p className="text-xs text-gray-500">{compareData.subtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              <select value={mode} onChange={(e) => setMode(e.target.value)} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white">
                <option value="month">Theo tháng</option>
                <option value="quarter">Theo quý</option>
              </select>

              {mode === "month" ? (
                <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>{`Tháng ${m}`}</option>
                  ))}
                </select>
              ) : (
                <select value={quarter} onChange={(e) => setQuarter(parseInt(e.target.value))} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white">
                  {[1,2,3,4].map((q) => (
                    <option key={q} value={q}>{`Quý ${q}`}</option>
                  ))}
                </select>
              )}

              <select value={metric} onChange={(e) => setMetric(e.target.value)} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white">
                <option value="revenue">Doanh thu</option>
                <option value="orders">Đơn hàng</option>
              </select>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={compareData.data} margin={{ left: 20, right: 20, bottom: 24, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey={compareData.xKey} tickMargin={8} padding={{ left: 0, right: 8 }} />
                <YAxis width={48} tickMargin={8} tickFormatter={(v) => fmtNumber(v)} />
                <Tooltip
                  labelFormatter={(label) => (mode === "month" ? `Ngày ${label}` : `Tuần ${label}`)}
                  formatter={(val, name) => [`${fmtNumber(val)} ${unit}`, name]}
                />
                <Legend />
                {compareData.series.map((s) => (
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

        {/* Small chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Lợi nhuận tuần này</h2>
            <span className="text-xs text-gray-500">Tuần này</span>
          </div>
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { day: "T2", sales: 30, revenue: 60 },
                { day: "T3", sales: 35, revenue: 70 },
                { day: "T4", sales: 28, revenue: 65 },
                { day: "T5", sales: 40, revenue: 80 },
                { day: "T6", sales: 25, revenue: 55 },
                { day: "T7", sales: 45, revenue: 90 },
                { day: "CN", sales: 36, revenue: 72 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickMargin={6} />
                <YAxis tickMargin={6} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" name="Doanh số" fill="#4F46E5" radius={[6,6,0,0]} barSize={18} />
                <Bar dataKey="revenue" name="Doanh thu" fill="#06B6D4" radius={[6,6,0,0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row secondary charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold mb-4">Trạng thái đơn hàng</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[
                  { name: "Mới", value: 120 },
                  { name: "Đã xác nhận", value: 140 },
                  { name: "Đang vận chuyển", value: 80 },
                  { name: "Hoàn tất", value: 200 },
                  { name: "Đã hủy", value: 45 },
                ]} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}>
                  {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
                </Pie>
                <Legend verticalAlign="bottom" height={36}/>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold mb-4">Sản phẩm bán chạy</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: "Nước mắm Phú Quốc", sold: 420 },
                { name: "Cà phê Buôn Ma Thuột", sold: 380 },
                { name: "Bánh pía Sóc Trăng", sold: 250 },
                { name: "Nem chua Thanh Hóa", sold: 210 },
                { name: "Kẹo dừa Bến Tre", sold: 190 },
              ]} layout="vertical" margin={{ left: 20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false}/>
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={170}/>
                <Tooltip />
                <Bar dataKey="sold" name="Đã bán" barSize={14} radius={[0,10,10,0]}>
                  {["#4F46E5","#06B6D4","#22C55E","#F59E0B","#8B5CF6"].map((c, i) => (
                    <Cell key={i} fill={c} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold mb-4">Khách hàng mới (3 tháng gần nhất)</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={Array.from({ length: 3 }, (_, i) => {
                const date = new Date(currentYear, now.getMonth() - (2 - i), 1);
                const base = 60 + (i * 10) + (Math.sin(i / 2) * 8);
                return { label: monthNames[date.getMonth()], users: Math.round(base) };
              })}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="label" tickMargin={6} />
                <YAxis tickMargin={6} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" name="Người dùng" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}