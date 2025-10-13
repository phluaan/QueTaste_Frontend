export default function ProductStats({ stats }) {
  const items = [
    { label: "Tổng sản phẩm", value: stats.total, color: "text-blue-600" },
    { label: "Còn bán", value: stats.active, color: "text-green-600" },
    { label: "Ngừng bán", value: stats.inactive, color: "text-gray-500" },
    { label: "Hết hàng", value: stats.outOfStock, color: "text-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {items.map((i) => (
        <div key={i.label} className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-gray-500">{i.label}</h2>
          <p className={`text-2xl font-bold ${i.color}`}>{i.value}</p>
        </div>
      ))}
    </div>
  );
}
