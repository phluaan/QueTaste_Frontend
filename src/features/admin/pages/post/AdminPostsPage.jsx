import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { usePostsStatistics } from "../../hooks/useStatistics";
import usePost from "../../../post/hooks/usePost";

const fmtNumber = (n) => new Intl.NumberFormat("vi-VN").format(n);

const makeLCG = (seed) => {
  let v = seed >>> 0 || 123456789;
  return () => (v = (1664525 * v + 1013904223) >>> 0) / 2 ** 32;
};

const genYearSeries = (
  year,
  {
    start = 18,
    goal = 220,
    seasonAmp = 36,
    vol = 22,
    meanRev = 0.35,
    shockProb = 0.22,
    shockAmp = 110,
    min = 5,
    max = 420,
  } = {}
) => {
  const rnd = makeLCG(year * 2027 + 73);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const phase = (year % 7) * 0.6;
  const clamp = (x) => Math.max(min, Math.min(max, x));
  const lerp = (a, b, t) => a + (b - a) * t;

  let x = start + (rnd() - 0.5) * 6;
  const out = [];
  let hasSpike = false;
  let hasDip = false;

  months.forEach((m) => {
    const t = (m - 1) / 11;
    const trend = lerp(start, goal, t);
    const season = seasonAmp * Math.sin((m / 12) * Math.PI * 2 + phase);
    const target = trend + season;
    const deviation = x - target;
    const ar = deviation * (1 - meanRev) + (rnd() - 0.5) * vol;

    let shock = 0;
    if (rnd() < shockProb) {
      const sign = rnd() < 0.5 ? -1 : 1;
      shock = sign * shockAmp * (0.6 + 0.4 * rnd());
      if (sign > 0) hasSpike = true;
      else hasDip = true;
    }

    x = clamp(target + ar + shock);
    out.push({ month: m, views: Math.round(x) });
  });

  if (!hasSpike) {
    const i = 5 + Math.floor(rnd() * 2);
    out[i].views = clamp(out[i].views + shockAmp * (0.7 + 0.3 * rnd()));
  }
  if (!hasDip) {
    const j = 9 + Math.floor(rnd() * 2);
    out[j].views = clamp(out[j].views - shockAmp * (0.7 + 0.3 * rnd()));
    if (out[j].views === min) out[j].views += 3;
  }

  for (let k = 1; k < out.length - 1; k++) {
    const avg = (out[k - 1].views + out[k + 1].views) / 2;
    if (Math.abs(out[k].views - avg) > 140) {
      out[k].views = Math.round(out[k].views * 0.7 + avg * 0.3);
    }
  }
  return out;
};

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

export default function AdminPostsPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const yearlyData = useMemo(() => genYearSeries(year), [year]);
  const { totalViews, topPosts, loading } = usePostsStatistics(5);
  const { allPosts } = usePost();

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Quản lý bài viết</h1>
          <p className="text-sm text-gray-500">
            Thống kê & quản trị bài viết đặc sản
          </p>
        </div>

        <Link
          to="/admin/posts-list"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 active:bg-indigo-700 transition"
          aria-label="Đi đến danh sách bài viết"
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Thống kê lượt xem theo năm</h2>
              <p className="text-xs text-gray-500">12 tháng năm {year}</p>
            </div>
            <div className="flex items-center gap-2">
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
              <LineChart
                data={yearlyData}
                margin={{ left: 20, right: 20, bottom: 24, top: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickMargin={8}
                  padding={{ left: 0, right: 8 }}
                  tickFormatter={(m) => monthNames[m - 1]}
                />
                <YAxis
                  width={56}
                  tickMargin={8}
                  tickFormatter={(v) => fmtNumber(v)}
                />
                <Tooltip
                  labelFormatter={(m) => monthNames[m - 1]}
                  formatter={(val) => [
                    `${fmtNumber(val)} lượt xem`,
                    "Lượt xem",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  name={`Năm ${year}`}
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-[112px]">
            <div className="h-full flex items-center justify-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  Tổng lượt xem toàn bộ bài viết
                </div>
                <div className="text-3xl font-bold leading-tight">
                  {loading.total ? "…" : fmtNumber(totalViews || 0)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-[112px]">
            <div className="h-full flex items-center">
              <div>
                <div className="text-sm text-gray-500">Tổng bài viết</div>
                <div className="text-2xl font-bold leading-tight">
                  {fmtNumber(allPosts?.length || 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Top 5 bài viết có lượt xem cao nhất</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2 pr-4">#</th>
                <th className="py-2 pr-4">Tiêu đề</th>
                <th className="py-2 pr-4">Lượt xem</th>
                <th className="py-2 pr-4">Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {loading.top ? (
                <tr>
                  <td className="py-3" colSpan={4}>
                    Đang tải…
                  </td>
                </tr>
              ) : (topPosts || []).length > 0 ? (
                topPosts.map((p, idx) => (
                  <tr key={p._id || p.slug} className="border-b last:border-0">
                    <td className="py-2 pr-4 text-gray-500">{idx + 1}</td>
                    <td className="py-2 pr-4 font-medium">{p.title}</td>
                    <td className="py-2 pr-4 font-semibold">
                      {fmtNumber(p.views || 0)}
                    </td>
                    <td className="py-2 pr-4 text-gray-500">
                      {p.updatedAt
                        ? new Date(p.updatedAt).toLocaleDateString("vi-VN")
                        : "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 text-gray-500" colSpan={4}>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
