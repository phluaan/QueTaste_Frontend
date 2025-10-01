import React from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import AdminHeader from "../../../components/Header/AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-que-background">
      {/* Header ở trên cùng */}
      <AdminHeader />

      {/* Sidebar + Main */}
      <div className="flex flex-1">
        <AdminSidebar />

        {/* Chừa khoảng trống cho header */}
        <main className="p-6 flex-1 overflow-auto pt-20 bg-que-surface text-que-text-main">
          {children}
        </main>
      </div>
    </div>
  );
}
