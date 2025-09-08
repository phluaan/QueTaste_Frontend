import { useState } from "react";
import ProfileLayout from "../components/ProfileLayout";
import ProfileForm from "../components/ProfileForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import SidebarButton from "../components/SideBarButton";
import OrderForm from "../components/OrderForm";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <ProfileLayout>
      {/* Sidebar */}
      <div className="w-1/5 border-r p-6 space-y-4 bg-white">
        <h2 className="text-xl font-bold mb-4">Cài đặt tài khoản</h2>
        <SidebarButton
          label="Thông tin cá nhân"
          isActive={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
        <SidebarButton
          label="Đổi mật khẩu"
          isActive={activeTab === "password"}
          onClick={() => setActiveTab("password")}
        />
        <SidebarButton
          label="Đơn hàng của tôi"
          isActive={activeTab === "orders"}
          onClick={() => setActiveTab("orders")}
        />
        <SidebarButton
          label="Lịch sử mua hàng"
          isActive={activeTab === "history"}
          onClick={() => setActiveTab("history")}
        />
      </div>

      {/* Nội dung chính */}
      <div className="w-4/5 p-6 min-h-[50vh] bg-white">
        {activeTab === "profile" && <ProfileForm />}
        {activeTab === "password" && <ChangePasswordForm />}
        {activeTab === "orders" && <div><OrderForm /></div>}
        {activeTab === "history" && <div>Lịch sử mua hàng</div>}
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;
