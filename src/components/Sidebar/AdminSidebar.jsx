import { Link } from "react-router-dom";
import { Package, Home, Ticket, MessageSquare, ShoppingBag } from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-que-surface shadow-lg border-r border-que-secondary/20">
      <nav className="mt-4">
        <ul className="space-y-1">
          <li>
            <Link
              to="/admin"
              className="flex items-center px-4 py-2 text-que-text-muted hover:text-que-primary hover:bg-que-background rounded-md transition-colors"
            >
              <Home className="w-5 h-5 mr-2 text-que-text-main" />
              Trang chủ
            </Link>
          </li>

          {/* ✅ Quản lý sản phẩm */}
          <li>
            <Link
              to="/admin/products"
              className="flex items-center px-4 py-2 text-que-text-muted hover:text-que-primary hover:bg-que-background rounded-md transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-2 text-que-text-main" />
              Quản lý sản phẩm
            </Link>
          </li>

          <li>
            <Link
              to="/admin/orders"
              className="flex items-center px-4 py-2 text-que-text-muted hover:text-que-primary hover:bg-que-background rounded-md transition-colors"
            >
              <Package className="w-5 h-5 mr-2 text-que-text-main" />
              Quản lý đơn hàng
            </Link>
          </li>
          <li>
            <Link
              to="/admin/coupons"
              className="flex items-center px-4 py-2 text-que-text-muted hover:text-que-primary hover:bg-que-background rounded-md transition-colors"
            >
              <Ticket className="w-5 h-5 mr-2 text-que-text-main" />
              Quản lý phiếu giảm giá
            </Link>
          </li>
          <li>
            <Link
              to="/admin/reviews"
              className="flex items-center px-4 py-2 text-que-text-muted hover:text-que-primary hover:bg-que-background rounded-md transition-colors"
            >
              <MessageSquare className="w-5 h-5 mr-2 text-que-text-main" />
              Quản lý đánh giá
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
