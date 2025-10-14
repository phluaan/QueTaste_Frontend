export default function ProductToolbar({
  filters,
  onSearch,
  onFilterChange,
  onAdd,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const categories = ["Túi xách", "Vòng tay", "Mũ", "Kính", "Khác"];
  const regions = ["Miền Bắc", "Miền Trung", "Miền Nam"];
  const sortOptions = [
    { label: "Mới nhất", value: "createdAt" },
    { label: "Giá", value: "price" },
    { label: "Lượt xem", value: "views" },
    { label: "Bán chạy", value: "totalSold" },
    { label: "Đánh giá cao", value: "rating" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white rounded-lg p-4 shadow">
      {/* Tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        className="border border-que-primary px-3 py-2 rounded-lg w-60 focus:outline-none focus:ring-2 focus:ring-que-primary"
        value={filters.search || ""}
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* Bộ lọc */}
      <div className="flex gap-3 flex-wrap">
        <select
          name="category"
          value={filters.category || ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg bg-white"
        >
          <option value="">Danh mục</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          name="region"
          value={filters.region || ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg bg-white"
        >
          <option value="">Khu vực</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          name="sortBy"
          value={filters.sortBy || "createdAt"}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg bg-white"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sắp xếp: {opt.label}
            </option>
          ))}
        </select>

        <select
          name="order"
          value={filters.order || "desc"}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg bg-white"
        >
          <option value="desc">Giảm dần</option>
          <option value="asc">Tăng dần</option>
        </select>
      </div>

      {/* Nút thêm */}
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-que-secondary text-white rounded-lg hover:bg-que-primary transition-colors"
      >
        + Thêm sản phẩm
      </button>
    </div>
  );
}
