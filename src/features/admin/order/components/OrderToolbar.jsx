export default function OrderToolbar({
  selectedOrders,
  onSearch,
  onFilterChange,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
      {/* Search + Filter */}
      <div className="flex gap-3 flex-1">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng..."
          className="border px-3 py-2 rounded-lg w-1/3"
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded-lg"
          onChange={(e) => onFilterChange?.(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="new">Mới</option>
          <option value="shipping">Đang giao</option>
          <option value="completed">Hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Bulk Actions */}
      <div className="flex gap-2">
        <button
          disabled={selectedOrders.length === 0}
          className={`px-3 py-2 rounded ${
            selectedOrders.length === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white"
          }`}
        >
          Cập nhật trạng thái
        </button>
        <button
          disabled={selectedOrders.length === 0}
          className={`px-3 py-2 rounded ${
            selectedOrders.length === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-red-500 text-white"
          }`}
        >
          Hủy đơn
        </button>
      </div>
    </div>
  );
}
