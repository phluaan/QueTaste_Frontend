import React from "react";
import {
  Clock,
  CheckCircle,
  Truck,
  PackageCheck,
  BadgeCheck,
  XCircle,
} from "lucide-react";

const statusColors = {
  new: "bg-blue-100 text-blue-700",
  confirmed: "bg-teal-100 text-teal-700",
  shipping: "bg-sky-100 text-sky-700",
  done_shipping: "bg-indigo-100 text-indigo-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusIcons = {
  new: <Clock size={18} />,
  confirmed: <CheckCircle size={18} />,
  shipping: <Truck size={18} />,
  done_shipping: <PackageCheck size={18} />,
  completed: <BadgeCheck size={18} />,
  cancelled: <XCircle size={18} />,
};

export default function MiniStats({ stats, onClick }) {
  const items = Object.entries(stats || {});

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
      {items.map(([key, value]) => (
        <button
          key={key}
          onClick={() => onClick?.(key)}
          className={`rounded-xl p-3 text-left shadow-sm hover:shadow-md transition cursor-pointer ${
            statusColors[key] || "bg-gray-100 text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2 text-sm font-semibold capitalize">
            {statusIcons[key] || <Clock size={18} />}
            <span>{key.replace("_", " ")}</span>
          </div>
          <div className="mt-1 text-xl font-bold">{value}</div>
        </button>
      ))}
    </div>
  );
}
