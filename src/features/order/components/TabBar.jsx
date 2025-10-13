const TabBar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { label: "Tất cả", value: "all" },
    { label: "Chờ xác nhận", value: "new" },
    { label: "Chờ giao hàng", value: "confirmed" },
    { label: "Vận chuyển", value: "shipping" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "cancelled" },
    { label: "Yêu cầu hủy", value: "cancel_requested" },
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
                ? "border-que-accent text-que-accent"
                : "border-transparent text-que-text-muted hover:text-que-accent"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
