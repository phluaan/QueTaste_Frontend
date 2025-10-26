import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import defaultAvatar from "../../../assets/defaultAvatar.jpg";
import { FiLogOut, FiTruck } from "react-icons/fi";
import { logoutAsync } from "../../auth/slices/authSlice";

export default function ShipperLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  const handleLogout = async () => {
    await dispatch(logoutAsync());
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-que-background text-que-text-main">
      {/* Header */}
      <header className="h-16 bg-que-surface border-b border-que-secondary/20 shadow-sm flex items-center justify-between px-6">
        {/* Logo / tiêu đề */}
        <div className="flex items-center gap-2 font-semibold text-que-primary text-lg">
          <FiTruck className="w-6 h-6" />
          <span>QueTaste Shipper</span>
        </div>

        {/* Avatar + Logout */}
        <div className="flex items-center gap-4">
          {/* <div className="flex items-center gap-2">
            <img
              src={user?.avatar || defaultAvatar}
              alt="avatar"
              className="w-9 h-9 rounded-full border border-que-secondary/40 object-cover"
            />
            <span className="font-medium text-que-text-main">
              {user?.fullName || "Shipper"}
            </span>
          </div> */}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
                       bg-que-danger text-white text-sm font-medium 
                       hover:bg-red-600 transition shadow-sm hover:shadow-md"
          >
            <FiLogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
