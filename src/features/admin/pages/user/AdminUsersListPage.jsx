import { useEffect, useMemo, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import UserCard from "../../../../features/admin/components/UserCard";
import { useUsersList } from "../../hooks/useStatistics";

export default function UsersListPage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({ page, limit: 20, search: q.trim() || undefined }),
    [page, q]
  );
  const { usersList, loading } = useUsersList(params);

  // simple debounce UX
  useEffect(() => {
    const t = setTimeout(() => {
      /* trigger in hook via params change */
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  const items = usersList?.items || [];

  return (
    <>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Danh sách người dùng</h1>
          <p className="text-sm text-gray-500">
            Tìm kiếm và xem thông tin nhanh người dùng trên hệ thống
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition text-sm"
          aria-label="Quay lại"
          title="Quay lại"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label htmlFor="user-search" className="sr-only">
          Tìm người dùng
        </label>
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="user-search"
            type="text"
            placeholder="Tìm theo tên hoặc email…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            autoComplete="off"
          />
        </div>
      </div>

      {/* Grid */}
      {loading && (
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-500">
          Đang tải…
        </div>
      )}

      {!loading && items.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center text-gray-500">
          Không tìm thấy người dùng nào phù hợp.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {items.map((u) => (
            <UserCard
              key={u._id}
              user={{
                id: u._id,
                name: u.personalInfo?.fullName || u.email,
                email: u.email,
                avatar: u.avatar,
                memberSince: u.createdAt,
                totalSpend: u.totalSpend ?? 0,
                orders: u.orders ?? 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Pagination (đơn giản) */}
      {!!usersList?.pagination?.totalPages &&
        usersList.pagination.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 border rounded disabled:opacity-50"
            >
              Trước
            </button>
            <div className="text-sm">
              Trang {usersList.pagination.page} /{" "}
              {usersList.pagination.totalPages}
            </div>
            <button
              disabled={page >= usersList.pagination.totalPages}
              onClick={() =>
                setPage((p) => Math.min(usersList.pagination.totalPages, p + 1))
              }
              className="px-3 py-1.5 border rounded disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        )}
    </>
  );
}
