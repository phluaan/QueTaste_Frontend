import {
    AreaChart, Area,
    LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";

const COLORS = {
    primary: "#4F46E5",
    buyers: "#22C55E",
    nonBuyers: "#EF4444",
};

export default function AdminUsersPage() {
    // ----- Bộ lọc tháng/năm cho biểu đồ tăng trưởng -----
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth() + 1); // 1..12

    // ----- Bộ lọc NĂM cho “Tỉ lệ khách mua hàng” -----
    const [ratioYear, setRatioYear] = useState(now.getFullYear());

    const monthNames = ["Thg 1","Thg 2","Thg 3","Thg 4","Thg 5","Thg 6","Thg 7","Thg 8","Thg 9","Thg 10","Thg 11","Thg 12"];
    const fmt = (n) => new Intl.NumberFormat("vi-VN").format(n);

    // --------- PRNG + random-walk để mock dữ liệu ổn định ----------
    const makeLCG = (seed) => {
        let v = (seed >>> 0) || 123456789;
        return () => ((v = (1664525 * v + 1013904223) >>> 0) / 2**32);
    };
    const genRandomWalk = (len, { base = 50, drift = 0.25, vol = 4 }, rnd) => {
        let x = base + (rnd() - 0.5) * 8;
        return Array.from({ length: len }, () => {
        x += (rnd() - 0.5) * vol + drift;
        if (x < 2) x = 2 + rnd() * 2;
        if (x > 120) x = 120 - rnd() * 2;
        return Math.round(x);
        });
    };

    // --------- Dữ liệu biểu đồ miền: người dùng mới theo NGÀY của tháng đã chọn ----------
    const usersByDay = useMemo(() => {
        const rnd = makeLCG(year * 100 + month * 7);
        const days = 30; // demo
        const arr = genRandomWalk(days, { base: 40 + (month - 6) * 2, drift: 0.3, vol: 5 }, rnd);
        return Array.from({ length: days }, (_, i) => ({ day: i + 1, users: arr[i] }));
    }, [year, month]);

    // --------- Top 3 người dùng chi tiêu nhiều nhất (mock) ----------
    const topSpenders = [
        { id: "u01", name: "Nguyễn Văn A", email: "a@example.com", totalSpend: 128_000_000, orders: 36, memberSince: "2023-02-11" },
        { id: "u02", name: "Trần Thị B",   email: "b@example.com", totalSpend: 96_500_000,  orders: 28, memberSince: "2022-10-03" },
        { id: "u03", name: "Phạm Hoàng C", email: "c@example.com", totalSpend: 75_300_000,  orders: 21, memberSince: "2024-01-19" },
    ];

    // --------- Tỉ lệ khách mua hàng THEO NĂM: 12 tháng, 2 line (có giao cắt) ----------
    const buyerLines = useMemo(() => {
        const rndBuy = makeLCG(ratioYear * 911);
        const rndNon = makeLCG(ratioYear * 353);
        const phase = (ratioYear % 5) * 0.6;
        const clamp = (x, lo = 5, hi = 120) => Math.max(lo, Math.min(hi, x));

        return Array.from({ length: 12 }, (_, i) => {
        const m = i + 1;
        const t = (m / 12) * Math.PI * 2;
        const s = Math.sin(t + phase);
        const c = Math.cos(2 * t + phase / 2);
        const noise1 = (rndBuy() - 0.5) * 6;
        const noise2 = (rndNon() - 0.5) * 6;

        const buyers    = clamp(50 + 18 * s + 8 * c + noise1, 10, 100);
        const nonBuyers = clamp(55 - 16 * s - 7 * c + noise2, 10, 100);

        return { month: m, buyers: Math.round(buyers), nonBuyers: Math.round(nonBuyers) };
        });
    }, [ratioYear]);

    return (
        <AdminLayout>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
        <div>
            <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
            <p className="text-sm text-gray-500">Thống kê & danh sách người dùng trên hệ thống</p>
        </div>

        <Link
            to="/admin/users-list"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 active:bg-indigo-700 transition"
            aria-label="Đi đến danh sách người dùng"
        >
            Đi đến danh sách
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
        </Link>
        </div>

        {/* Hàng 1: Biểu đồ miền (2/3) + Top 3 người dùng (1/3) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Biểu đồ miền */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
                <div>
                <h2 className="font-semibold">Người dùng mới theo tháng</h2>
                <p className="text-xs text-gray-500">
                    {`Tăng trưởng ${monthNames[month - 1]} năm ${year}`}
                </p>
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
                    {[now.getFullYear() - 2, now.getFullYear() - 1, now.getFullYear()].map((y) => (
                    <option key={y} value={y}>{y}</option>
                    ))}
                </select>
                </div>
            </div>

            <div className="h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usersByDay} margin={{ left: 8, right: 8, bottom: 12, top: 8 }}>
                    <defs>
                    <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.25} />
                        <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tickMargin={8} />
                    <YAxis tickMargin={8} />
                    <Tooltip labelFormatter={(d) => `Ngày ${d}`} formatter={(v) => [fmt(v), "Người dùng mới"]} />
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
            </div>
            </div>

            {/* Top 3 người dùng chi nhiều nhất (giãn vừa phải + avatar) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Top 3 người dùng chi nhiều nhất</h3>
            </div>

            {/* Giãn nhẹ: space-y-3 (ít hơn so với justify-between trước đó) */}
            <ul className="space-y-3">
                {topSpenders.map((u, idx) => (
                <li
                    key={u.id}
                    className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
                >
                    {/* Avatar placeholder ổn định */}
                    <img
                    src={`https://i.pravatar.cc/80?img=${10 + idx}`}
                    alt={u.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    loading="lazy"
                    />
                    <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <p className="font-medium">{u.name}</p>
                        <span className="text-xs text-gray-500">
                        Từ {new Date(u.memberSince).toLocaleDateString("vi-VN")}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500">{u.email}</p>
                    <div className="mt-1 text-sm">
                        Tổng chi: <b>{fmt(u.totalSpend)} ₫</b> • Đơn: <b>{u.orders}</b>
                    </div>
                    </div>
                </li>
                ))}
            </ul>
            </div>
        </div>

        {/* Hàng 2: Tỉ lệ khách mua hàng THEO NĂM (LineChart 2 line) — full width */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
            <div>
                <h3 className="font-semibold">Tỉ lệ khách mua hàng</h3>
                <p className="text-xs text-gray-500">
                {`Theo năm ${ratioYear} (12 tháng)`}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <select
                value={ratioYear}
                onChange={(e) => setRatioYear(parseInt(e.target.value))}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white"
                >
                {[now.getFullYear() - 2, now.getFullYear() - 1, now.getFullYear()].map((y) => (
                    <option key={y} value={y}>{y}</option>
                ))}
                </select>
            </div>
            </div>

            <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={buyerLines} margin={{ left: 16, right: 16, top: 8, bottom: 12 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                    dataKey="month"
                    tickMargin={8}
                    tickFormatter={(m) => monthNames[m - 1]}
                />
                <YAxis tickMargin={8} />
                <Tooltip
                    labelFormatter={(m) => monthNames[m - 1]}
                    formatter={(val, key) => [fmt(val), key === "buyers" ? "Có mua hàng" : "Chỉ đăng ký"]}
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
            </div>
        </div>
        </AdminLayout>
    );
}