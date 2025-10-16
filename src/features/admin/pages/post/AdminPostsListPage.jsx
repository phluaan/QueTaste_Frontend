import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import usePost from "../../../post/hooks/usePost";
import PostCard from "../../../post/components/PostCard";

const normalize = (s) =>
    (s || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

export default function AdminPostsListPage() {
    const { allPosts, loading, error } = usePost({ admin: true });
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        const k = normalize(q);
        if (!k) return allPosts || [];
        return (allPosts || []).filter((p) => normalize(p.title).includes(k));
    }, [allPosts, q]);

    return (
        <AdminLayout>
        <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
            <div>
            <h1 className="text-2xl font-semibold">Danh sách bài viết</h1>
            <p className="text-sm text-gray-500">Tìm kiếm & quản trị bài viết</p>
            </div>
            <Link
            to="/admin/posts"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
            aria-label="Quay lại trang thống kê bài viết"
            >
            Quay lại
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
            <div className="w-full md:w-96">
            <label htmlFor="post-search" className="sr-only">Tìm bài viết</label>
            <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                id="post-search"
                type="text"
                placeholder="Tìm theo tên bài viết…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                autoComplete="off"
                />
            </div>
            </div>
        </div>

        {loading ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-500">Đang tải danh sách bài viết…</div>
        ) : error ? (
            <div className="bg-white rounded-2xl border border-red-100 p-8 text-center text-red-600">❌ {error}</div>
        ) : (
            <>
            <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-500">
                Tổng: <b>{filtered?.length || 0}</b> bài viết
                {q && <span className="ml-2 text-gray-400">(lọc theo: “{q}”)</span>}
                </div>
            </div>

            {filtered && filtered.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {filtered.map((post) => (
                    <PostCard key={post._id || post.id} post={post} to={`/admin/posts/${post.slug || post._id}`} />
                ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-dashed border-gray-2 00 p-10 text-center text-gray-500">Không tìm thấy bài viết phù hợp.</div>
            )}
            </>
        )}
        </AdminLayout>
    );
}