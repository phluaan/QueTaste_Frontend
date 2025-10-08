import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menus = [
    {
      name: "Home",
      icon: <Home size={20} className="text-que-text-main" />,
      path: "/",
    },
    {
      name: "Products",
      icon: <ShoppingBag size={20} className="text-que-text-main" />,
      path: "/products",
    },
    {
      name: "Cart",
      icon: <ShoppingBag size={20} className="text-que-text-main" />,
      path: "/cart",
    },
    {
      name: "Orders",
      icon: <ShoppingCart size={20} className="text-que-text-main" />,
      path: "/orders",
    },
    {
      name: "Settings",
      icon: <Settings size={20} className="text-que-text-main" />,
      path: "/settings",
    },
  ];

  return (
    <div
      className={`min-h-full bg-que-surface border-r border-que-secondary/20 shadow-md transition-all duration-300 flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Menu list */}
      <ul className="mt-6 space-y-2 flex-1">
        {menus.map((menu, index) => (
          <li key={index}>
            <Link
              to={menu.path}
              className="flex items-center gap-3 p-3 mx-2 rounded-lg cursor-pointer text-que-text-muted hover:text-que-primary hover:bg-que-background transition-colors"
            >
              {menu.icon}
              {isOpen && (
                <span className="text-que-text-main">{menu.name}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Toggle button */}
      <div className="p-4 mt-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md w-full flex justify-center text-que-text-muted hover:text-que-primary hover:bg-que-background focus:outline-none focus:ring-0 transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
