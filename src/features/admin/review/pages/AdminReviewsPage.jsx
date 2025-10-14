// src/admin/pages/AdminReviewsPage.jsx
import React, { useState } from "react";
import { Eye, Trash2, Star } from "lucide-react";
import useAdminReview from "../hooks/useAdminReview";
import Pagination from "../../../../components/Pagination";

const AdminReviewsPage = () => {
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [productId, setProductId] = useState("");
  const [orderBy, setOrderBy] = useState("newest");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { reviews, pagination, loading, error, handleDelete } = useAdminReview({
    productId,
    rating,
    search,
    orderBy,
    page: page,
    limit: limit,
  });

  const handleView = (r) => setSelected(r);
  const handleClose = () => setSelected(null);

  const onDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đánh giá này?")) {
      console.log("Xóa review:", id);
      handleDelete(id);
    }
  };

  const filtered = reviews || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-que-primary">
          Quản lý đánh giá
        </h1>
        {/* <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
          Xuất CSV
        </button> */}
      </div>

      {/* Bộ lọc */}
      <div className="grid md:grid-cols-4 gap-3">
        {/* Tìm kiếm */}
        <input
          type="text"
          placeholder="Tìm theo sản phẩm hoặc người dùng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
        />

        {/* Lọc theo số sao */}
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
        >
          <option value="">Tất cả sao</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} sao
            </option>
          ))}
        </select>

        {/* Chọn sản phẩm */}
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
        >
          <option value="">Tất cả sản phẩm</option>
          <option value="66efa7...">Bánh tráng me Tây Ninh</option>
          <option value="66efb8...">Nước mắm Phan Thiết</option>
        </select>

        {/* Sắp xếp */}
        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="highest">Điểm cao nhất</option>
          <option value="lowest">Điểm thấp nhất</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        {loading ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            Đang tải dữ liệu...
          </div>
        ) : error ? (
          <div className="text-center py-6 text-red-500 text-sm">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            Không tìm thấy đánh giá nào
          </div>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 font-medium">Sản phẩm</th>
                <th className="px-4 py-3 font-medium">Người dùng</th>
                <th className="px-4 py-3 font-medium">Đánh giá</th>
                <th className="px-4 py-3 font-medium">Nội dung</th>
                <th className="px-4 py-3 font-medium">Ngày</th>
                <th className="px-4 py-3 font-medium text-center">
                  Trạng thái
                </th>
                <th className="px-4 py-3 font-medium text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r._id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">{r.product?.name}</td>
                  <td className="px-4 py-3">
                    {r.user?.personalInfo?.fullName ||
                      r.user?.email ||
                      "Ẩn danh"}
                  </td>
                  <td className="px-4 py-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`inline ${
                          i < r.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </td>
                  <td className="px-4 py-3 truncate max-w-[200px]">
                    {r.comment}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(r.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3">{r.isDeleted && <p>Đã xóa</p>}</td>
                  <td className="px-4 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleView(r)}
                      className="p-1.5 rounded-lg hover:bg-gray-100"
                      title="Xem chi tiết"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(r._id)}
                      disabled={r.isDeleted}
                      className={`p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition
    ${r.isDeleted ? "opacity-40 cursor-not-allowed hover:bg-transparent" : ""}`}
                      title={r.isDeleted ? "Đánh giá đã bị xóa" : "Xóa"}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination
          page={pagination?.page || page}
          limit={pagination?.limit || limit}
          total={pagination?.total || 0}
          onPageChange={(p) => setPage(p)}
          onLimitChange={(l) => setLimit(l)}
        />
      </div>

      {/* Modal xem chi tiết */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-3">Chi tiết đánh giá</h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Sản phẩm:</strong> {selected.product?.name}
              </p>
              <p>
                <strong>Người dùng:</strong>{" "}
                {selected.user?.personalInfo?.fullName || selected.user?.email}
              </p>
              <p>
                <strong>Đánh giá:</strong>{" "}
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`inline ${
                      i < selected.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </p>
              <p>
                <strong>Nội dung:</strong> {selected.content}
              </p>
              <p>
                <strong>Ngày:</strong>{" "}
                {new Date(selected.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={handleClose}
                className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviewsPage;
