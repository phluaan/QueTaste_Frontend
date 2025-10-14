export default function OrderToolbar({
  selectedOrders,
  onSearch,
  onConfirmOrders,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
      {/* Search + Filter */}
      <div className="flex gap-3 flex-1">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng..."
          className="border border-que-primary px-3 py-2 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-que-primary"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>

      {/* Bulk Actions */}
      <div className="flex gap-2">
        <button
          disabled={selectedOrders.length === 0}
          className={`px-3 py-2 rounded transition-colors ${
            selectedOrders.length === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-que-secondary text-white hover:bg-que-primary"
          }`}
          onClick={() => onConfirmOrders?.()}
        >
          Xác nhận đơn hàng
        </button>
        <button
          disabled={selectedOrders.length === 0}
          className={`px-3 py-2 rounded transition-colors ${
            selectedOrders.length === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-que-accent text-white hover:bg-que-danger"
          }`}
        >
          Hủy đơn
        </button>
      </div>
    </div>
  );
}
