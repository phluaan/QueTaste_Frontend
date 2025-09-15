import { Link } from "react-router-dom";
import { Package, Home } from "lucide-react";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="h-16 flex items-center justify-center font-bold text-xl border-b">
          Admin Panel
        </div>
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
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white shadow flex items-center justify-end px-6">
          <span className="text-gray-600">👤 Admin</span>
        </header>

        {/* Content */}
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
