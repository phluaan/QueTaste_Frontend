import { Link, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">User Panel</h2>
        <nav className="space-y-3">
          <Link to="/profile" className="block text-gray-700 hover:text-blue-500">
            Thông tin cá nhân
          </Link>
          <Link to="/profile/security" className="block text-gray-700 hover:text-blue-500">
            Bảo mật
          </Link>
          <Link to="/profile/settings" className="block text-gray-700 hover:text-blue-500">
            Cài đặt
          </Link>
        </nav>
      </aside>

      {/* Nội dung */}
      <main className="flex-1 p-8">
        <Outlet /> {/* Nơi render các trang con */}
      </main>
    </div>
  );
};

export default ProfileLayout;
