import { useState } from "react";
import useRowSelection from "../hooks/useRowSelection";

export default function ProductTable({
  products,
  onViewDetail,
  onToggleActive,
  onBulkHide,     
  onBulkShow, 
}) {
  const [togglingId, setTogglingId] = useState(null);
  const {
    selectedIds, allSelected, toggleOne, toggleAll, clear, headerRef,
  } = useRowSelection(products, (x) => x._id);

  const handleToggle = async (id) => {
    try {
      setTogglingId(id);
      await onToggleActive(id);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="overflow-x-auto border rounded">
      {/* Bulk bar */}
      <div className="flex items-center justify-between p-2 border-b bg-gray-50">
        <div className="text-sm">
          {selectedIds.length > 0 ? `${selectedIds.length} bản ghi đã chọn` : "Chưa chọn bản ghi nào"}
        </div>
        <div className="flex gap-2">
          <button
            disabled={selectedIds.length === 0}
            onClick={async () => { await onBulkHide(selectedIds); clear(); }}
            className={`px-3 py-1 rounded border ${selectedIds.length ? "hover:bg-yellow-500 hover:text-white" : "opacity-50 cursor-not-allowed"}`}
            title="Ẩn tất cả bản ghi đã chọn (trong trang hiện tại)"
          >
            Ẩn đã chọn
          </button>

          <button
            disabled={selectedIds.length === 0}
            onClick={async () => { await onBulkShow(selectedIds); clear(); }}
            className={`px-3 py-1 rounded border ${selectedIds.length ? "hover:bg-green-600 hover:text-white" : "opacity-50 cursor-not-allowed"}`}
          >
            Hiện đã chọn
          </button>

          <button
            disabled={selectedIds.length === 0}
            onClick={clear}
            className={`px-3 py-1 rounded border ${selectedIds.length ? "hover:bg-gray-200" : "opacity-50 cursor-not-allowed"}`}
          >
            Bỏ chọn
          </button>
        </div>
      </div>

      <table className="w-full border-collapse rounded-lg shadow text-sm">
        <thead className="bg-que-background">
          <tr>
            <th className="border px-2 py-2 w-10 text-center">
              {/* Chọn tất cả trong trang */}
              <input
                ref={headerRef}
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                title="Chọn tất cả bản ghi trong trang"
              />
            </th>
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
            const checked = selectedIds.includes(p._id);
            return (
              <tr key={p._id} className="hover:bg-que-surface">
                <td className="border px-2 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleOne(p._id)}
                    aria-label={`Chọn ${p.name}`}
                  />
                </td>

                <td className="border px-2 py-2 font-medium">{p.name}</td>
                <td className="border px-2 py-2">{(p.salePrice || p.price).toLocaleString("vi-VN")}đ</td>
                <td className="border px-2 py-2">{p.stock}</td>
                <td className="border px-2 py-2">{p.category}</td>

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
                    title="Nhấn để chuyển trạng thái hiển/ẩn"
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

                  {/* Không còn nút Xóa */}
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded disabled:opacity-60"
                    onClick={() => handleToggle(p._id)}
                    disabled={isRowLoading}
                  >
                    {isRowLoading ? "..." : p.isActive ? "Ẩn" : "Hiện"}
                  </button>
                </td>
              </tr>
            );
          })}
          {products.length === 0 && (
            <tr><td colSpan={7} className="p-4 text-center text-gray-500">Không có sản phẩm</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
