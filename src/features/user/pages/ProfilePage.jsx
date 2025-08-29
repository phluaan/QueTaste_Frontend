import { useState } from "react";
import ProfileLayout from "../components/ProfileLayout";
import ProfileForm from "../components/ProfileForm";
import ChangePasswordForm from "../components/ChangePasswordForm";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
<ProfileLayout>
  {/* Sidebar */}
  <div className="w-1/4 border-r p-6 space-y-4 bg-white">
    <h2 className="text-xl font-bold mb-4">Cài đặt tài khoản</h2>
    <button
      onClick={() => setActiveTab("profile")}
      className={`block w-full text-left px-4 py-2 rounded-lg ${
        activeTab === "profile"
          ? "bg-red-400 text-white"
          : "hover:bg-gray-100"
      }`}
    >
      Thông tin cá nhân
    </button>
    <button
      onClick={() => setActiveTab("password")}
      className={`block w-full text-left px-4 py-2 rounded-lg ${
        activeTab === "password"
          ? "bg-red-400 text-white"
          : "hover:bg-gray-100"
      }`}
    >
      Đổi mật khẩu
    </button>
  </div>

  {/* Nội dung chính */}
  <div className="w-3/4 p-6 min-h-[50vh] bg-white">
    {activeTab === "profile" && <ProfileForm />}
    {activeTab === "password" && <ChangePasswordForm />}
  </div>
</ProfileLayout>

  );
};

export default ProfilePage;
