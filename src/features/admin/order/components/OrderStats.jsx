export default function OrderStats({ stats }) {
  const items = [
    { label: "Tổng đơn", value: stats.total, color: "text-blue-600" },
    { label: "Chờ xử lý", value: stats.pending, color: "text-yellow-600" },
    { label: "Đang giao", value: stats.shipping, color: "text-blue-500" },
    { label: "Hoàn thành", value: stats.completed, color: "text-green-600" },
    { label: "Đã hủy", value: stats.canceled, color: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white shadow rounded-xl p-4 text-center"
        >
          <h2 className="text-gray-500">{item.label}</h2>
          <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
