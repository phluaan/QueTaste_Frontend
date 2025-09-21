import { Link } from "react-router-dom";
import { Package, Home, Ticket } from "lucide-react";

export default function AdminSidebar() {
    return (
        <aside className="w-64 bg-white shadow-lg">
        <nav className="mt-4">
            <ul className="space-y-2">
            <li>
                <Link
                to="/admin"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                <Home className="w-5 h-5 mr-2" />
                Trang chủ
                </Link>
            </li>
            <li>
                <Link
                to="/admin/orders"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                <Package className="w-5 h-5 mr-2" />
                Quản lý đơn hàng
                </Link>
            </li>
            <li>
                <Link
                to="/admin/coupons"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                <Ticket className="w-5 h-5 mr-2" />
                Quản lý phiếu giảm giá
                </Link>
            </li>
            </ul>
        </nav>
        </aside>
    );
}