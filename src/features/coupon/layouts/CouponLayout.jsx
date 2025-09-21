import React from "react";
import AdminHeader from "../../../components/Header/AdminHeader";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";

const CouponLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="flex flex-1">
            <AdminSidebar />
            <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
        </div>
    );
};

export default CouponLayout;