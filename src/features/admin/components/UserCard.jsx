import { Link } from "react-router-dom";
import { Coins, ShoppingBag, CalendarDays, Mail } from "lucide-react";

export default function UserCard({ user = {} }) {
    const {
        id, name = "Unknown User", email = "no-email@example.com", avatar,
        totalSpend = 0, orders = 0, memberSince
    } = user;

    const fmt = (n) => new Intl.NumberFormat("vi-VN").format(n);
    const joinDate = memberSince
        ? new Date(memberSince).toLocaleDateString("vi-VN")
        : null;

    return (
        <div
        className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col focus-within:ring-2 focus-within:ring-indigo-200"
        role="region"
        aria-label={`Thẻ người dùng ${name}`}
        >
        {/* Header */}
        <div className="flex items-start gap-3">
            <img
            src={
                avatar ||
                `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name || "U")}`
            }
            alt={name}
            className="w-12 h-12 rounded-full object-cover border"
            loading="lazy"
            />
            <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
                <div className="font-semibold leading-tight truncate">{name}</div>
                {/* Orders badge */}
                <span className="ml-auto inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                <ShoppingBag className="w-3.5 h-3.5" />
                {orders}
                </span>
            </div>

            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 truncate">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{email}</span>
            </div>
            </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-amber-500" />
            <span>Chi tiêu: <b>{fmt(Math.round(totalSpend))} ₫</b></span>
            </div>
            <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
            <span>Đơn hàng: <b>{orders}</b></span>
            </div>

            {joinDate && (
            <div className="col-span-2 flex items-center gap-2 text-gray-500 text-[13px]">
                <CalendarDays className="w-4 h-4" />
                <span>Thành viên từ: {joinDate}</span>
            </div>
            )}
        </div>

        {/* Action */}
        <div className="mt-4">
            <Link
            to={`/admin/users/${id}`}
            className="inline-flex items-center justify-center w-full px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-300"
            aria-label={`Xem chi tiết ${name}`}
            >
            Xem chi tiết
            </Link>
        </div>
        </div>
    );
}