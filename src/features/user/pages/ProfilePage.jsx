import { useState } from "react";
import ProfileLayout from "../components/ProfileLayout";
import ProfileForm from "../components/ProfileForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import SidebarButton from "../components/SideBarButton";

import OrderForm from "../../order/components/OrderForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserCouponForm from "../components/UserCouponForm";

const ProfilePage = () => {

  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "profile";
  const navigate = useNavigate();

  return (
    <ProfileLayout>
      {/* Sidebar */}
      <div className="w-1/5 border-r p-6 space-y-4 bg-white">
        <h2 className="text-xl font-bold mb-4">Cài đặt tài khoản</h2>
        <SidebarButton
          label="Thông tin cá nhân"
          isActive={tabFromUrl === "profile"}
          onClick={() => navigate("/profile?tab=profile")}
        />
        <SidebarButton
          label="Đổi mật khẩu"
          isActive={tabFromUrl === "password"}
          onClick={() => navigate("/profile?tab=password")}
        />
        <SidebarButton
          label="Đơn hàng của tôi"
          isActive={tabFromUrl === "orders"}
          onClick={() => navigate("/profile?tab=orders")}
        />
        <SidebarButton
          label="Coupon của tôi"
          isActive={tabFromUrl === "coupons"}
          onClick={() => navigate("/profile?tab=coupons")}
        />
      </div>

      {/* Nội dung chính */}
      <div className="w-4/5 p-6 min-h-[50vh] bg-white">
        {tabFromUrl === "profile" && <ProfileForm />}
        {tabFromUrl === "password" && <ChangePasswordForm />}
        {tabFromUrl === "orders" && <OrderForm />}
        {tabFromUrl === "coupons" && <UserCouponForm />}
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;
