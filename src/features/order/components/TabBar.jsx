import React from "react";

export default function TabBar({ activeTab, onTabChange }) {
  const tabs = [
    { label: "Tất cả", value: "all" },
    { label: "Chờ xác nhận", value: "new" },
    { label: "Chờ giao hàng", value: "confirmed" },
    { label: "Đang vận chuyển", value: "shipping" },
    { label: "Đã giao", value: "done_shipping" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "cancelled" },
  ];

  return (
    <div className="flex flex-wrap justify-between bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`flex-1 text-center py-2 text-sm font-medium transition-all border-b-2 
            ${
              activeTab === tab.value
                ? "border-que-accent bg-que-accent/10 text-que-accent font-semibold"
                : "border-transparent text-gray-600 hover:text-que-accent hover:bg-gray-50"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
