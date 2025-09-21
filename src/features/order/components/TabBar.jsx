const TabBar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { label: "Tất cả", value: "all" },
    { label: "Chờ xác nhận", value: "pending" },
    { label: "Chờ giao hàng", value: "processing" },
    { label: "Vận chuyển", value: "shipping" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "cancelled" },
    { label: "Trả hàng/Hoàn tiền", value: "refund" },
  ];

  return (
    <div className="flex border-b mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`flex-1 text-center py-2 border-b-2 font-medium transition
            ${
              activeTab === tab.value
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-600 hover:text-blue-500"
            }`}
        >
          {tab.label} 
        </button>
      ))}
    </div>
  );
};

export default TabBar;
