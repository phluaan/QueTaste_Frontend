import { useState } from "react";

export default function ProductTable({
  products,
  onViewDetail,
  onToggleActive,
  onDelete,
}) {
  const [togglingId, setTogglingId] = useState(null);

  const handleToggle = async (id) => {
    try {
      setTogglingId(id);
      await onToggleActive(id); // thunk trả về promise
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-lg shadow text-sm">
        <thead className="bg-que-background">
          <tr>
            <th className="border px-2 py-2">Tên sản phẩm</th>
            <th className="border px-2 py-2">Giá</th>
            <th className="border px-2 py-2">Tồn kho</th>
            <th className="border px-2 py-2">Danh mục</th>
            <th className="border px-2 py-2">Trạng thái</th>
            <th className="border px-2 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const isRowLoading = togglingId === p._id;
            return (
              <tr key={p._id} className="hover:bg-que-surface">
                <td className="border px-2 py-2 font-medium">{p.name}</td>
                <td className="border px-2 py-2">
                  {(p.salePrice || p.price).toLocaleString("vi-VN")}đ
                </td>
                <td className="border px-2 py-2">{p.stock}</td>
                <td className="border px-2 py-2">{p.category}</td>

                {/* Badge trạng thái -> thành nút toggle */}
                <td className="border px-2 py-2">
                  <button
                    type="button"
                    onClick={() => handleToggle(p._id)}
                    disabled={isRowLoading}
                    aria-pressed={p.isActive}
                    className={[
                      "px-2 py-1 rounded text-xs border transition",
                      p.isActive
                        ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                        : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200",
                      isRowLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
                    ].join(" ")}
                    title="Nhấn để chuyển trạng thái hiển thị"
                  >
                    {isRowLoading ? "Đang cập nhật..." : p.isActive ? "Đang hiển thị" : "Đã ẩn"}
                  </button>
                </td>

                <td className="border px-2 py-2 text-center space-x-2">
                  <button
                    className="px-3 py-1 bg-que-primary text-white rounded disabled:opacity-60"
                    onClick={() => onViewDetail(p)}
                    disabled={isRowLoading}
                  >
                    Xem
                  </button>

                  {/* Nút Ẩn/Hiện giữ lại (tuỳ thích), cũng dùng loading theo hàng */}
                  <button
                    className="px-3 py-1 bg-yellow-400 text-white rounded disabled:opacity-60"
                    onClick={() => handleToggle(p._id)}
                    disabled={isRowLoading}
                  >
                    {isRowLoading ? "..." : p.isActive ? "Ẩn" : "Hiện"}
                  </button>

                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-60"
                    onClick={() => onDelete(p._id)}
                    disabled={isRowLoading}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
