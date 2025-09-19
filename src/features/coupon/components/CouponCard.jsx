import React from "react";
import { Link } from "react-router-dom";
import saleLogo from "../../../assets/sale.png"; 

const getStatusClass = (status) => {
    switch (status) {
        case "active":
        return "bg-green-100 text-green-700";
        case "paused":
        return "bg-yellow-100 text-yellow-700";
        case "expired":
        return "bg-red-100 text-red-700";
        case "archived":
        return "bg-gray-200 text-gray-600";
        default:
        return "bg-gray-100 text-gray-700";
    }
};

const CouponCard = ({ c }) => {
    return (
        <Link
        to={`/admin/coupons/${c._id}`}
        className="block bg-white rounded-lg shadow p-4 border hover:shadow-md transition hover:scale-[1.01] text-gray-900 no-underline"
        >
        <div className="flex justify-between items-start">
            {/* Nội dung bên trái */}
            <div className="flex-1 pr-3">
            <h3 className="font-bold text-lg">{c.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{c.description}</p>

            <p className="mt-2">
                <span className="font-medium">Mã: </span> {c.code || "-"}
            </p>

            <p>
                <span className="font-medium">Loại: </span> {c.type} ({c.value}
                {c.type === "percentage" ? "%" : "₫"})
            </p>

            <p>
                <span className="font-medium">Trạng thái: </span>{" "}
                <span
                className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(
                    c.status
                )}`}
                >
                {c.status}
                </span>
            </p>
            </div>

            {/* Logo bên phải */}
            <div className="flex-shrink-0">
            <img
                src={saleLogo}
                alt="Sale Logo"
                className="w-28 h-28 object-contain ml-2"
            />
            </div>
        </div>
        </Link>
    );
};

export default CouponCard;